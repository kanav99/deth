import { BN } from 'ethereumjs-util';
import rlp from 'rlp';
import db from '@server/db';

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

const decodeRlpController = (req, res) => {
  const { hex } = req.body;
  const decoded = decodeRlp(Buffer.from(hex, 'hex'));
  // console.log(decoded);
  var meta = {};
  if (decoded.data.length !== 0) {
    meta['type'] = 'contract';
    const address = decoded.to;
    if (address in db) {
      const { methods } = db[address];
      const method = methods['0x' + decoded.data.substring(0, 8)];
      console.log(methods);
      meta['method'] = method;
    }
  } else {
    meta['type'] = 'transfer';
  }

  res.json({ rlp: decoded, meta });
};

export { decodeRlpController };