// import web3 from 'web3';
import * as ethjs from 'ethereumjs-util';
import Web3 from 'web3';
import { set } from '@controller/db';

import config from '@config/network';
const ethNetwork = `https://${config.network}.infura.io/v3/${config.infura.project}`;
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

const magic = Buffer.from('test', 'utf-8');

const uploadContract = async (req, res) => {
  const { signature, address, abi, doc } = req.body;
  try {
    const sign = ethjs.fromRpcSig(signature);
    const publicKey = ethjs.ecrecover(
      ethjs.keccak256(magic),
      sign.v,
      sign.r,
      sign.s,
    );
    const signerAddress = ethjs.pubToAddress(publicKey).toString('hex');
    if (config.admins.includes(signerAddress)) {
      // this fucking call mutates `abi`....but for good actually
      // const contract = new web3.eth.Contract(abi);
      new web3.eth.Contract(abi);

      var methods = {};
      for (let i = 0; i < abi.length; i++) {
        const meth = abi[i];
        if (meth.type === 'function') {
          const fullname =
            meth.name + '(' + meth.inputs.map((m) => m['type']).join(',') + ')';
          methods[meth.signature] = {
            name: meth.name,
            fullname,
          };
        }
      }
      await set(address, { methods, abi, doc });

      res.json({ message: 'ok', address });
    } else {
      res.status(403).json({ message: 'forbidden' });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'invalid signature' });
  }
};

export { uploadContract };
