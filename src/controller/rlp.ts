import { BN } from 'ethereumjs-util';
import rlp from 'rlp';
import { get, exists } from '@controller/db';
import * as dsl from '@server/dsl';
import { patterns } from './match';
import fs from 'fs';

const decodeRlp = (encoded: Buffer) => {
  const res = rlp.decode(encoded);
  return {
    nonce: new BN(res[0] as Uint8Array).toString(),
    gasPrice: new BN(res[1] as Uint8Array).toString(),
    gasLimit: new BN(res[2] as Uint8Array).toString(),
    to: Buffer.from(res[3] as Uint8Array).toString('hex'),
    value: new BN(res[4] as Uint8Array).toString(),
    data: Buffer.from(res[5] as Uint8Array).toString('hex'),
    v: new BN(res[6] as Uint8Array).toString(),
    r: new BN(res[7] as Uint8Array).toString(),
    s: new BN(res[8] as Uint8Array).toString(),
  };
};

const decodeRlpController = async (req, res) => {
  const { hex } = req.body;
  var decoded;
  try {
    decoded = decodeRlp(Buffer.from(hex, 'hex'));
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: 'malformed input' });
    return;
  }
  // console.log(decoded);
  var meta = {};
  if (decoded.data.length !== 0) {
    meta['type'] = 'contract';
    const address = decoded.to;
    const sig = '0x' + decoded.data.substring(0, 8);
    if (await exists(address)) {
      const { methods, doc, abi } = await get(address);
      const method = methods[sig];
      meta['method'] = method;
      meta['dialogue'] = await dsl.evaluate(
        doc['methods'][method.fullname]['notice'],
        abi,
        '0x' + decoded.data,
        decoded.to,
      );
    } else if (sig in patterns) {
      const pattern = patterns[sig];
      meta['type'] = pattern.type;
      meta['dialogue'] = await dsl.evaluate(
        pattern.dialogue,
        pattern.abi,
        '0x' + decoded.data,
        decoded.to,
      );
    } else {
      const content = fs
        .readFileSync('4bytes/with_parameter_names/' + sig.substring(2))
        .toString();
      const methodName = content.split('\n')[0].split(';')[0];
      meta[
        'dialogue'
      ] = `Method invocation \`${methodName}\` for contract \`${address}\``;
    }
  } else {
    meta['type'] = 'transfer';
    meta['dialogue'] = `Transfered ${decoded.value} wei to ${decoded.to}`;
  }

  res.json({ tx: decoded, meta });
};

export { decodeRlpController };
