// import web3 from 'web3';
import * as ethjs from 'ethereumjs-util';
import Web3 from 'web3';
import db from '@server/db';
// import { Low, JSONFile } from 'lowdb';
// import { join } from 'path';

import config from '@config/network';
const ethNetwork = `https://${config.network}.infura.io/v3/${config.infura.project}`;
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

const magic = Buffer.from('test', 'utf-8');

// const file = join(__dirname, 'db.json');
// const adapter = new JSONFile(file);

// const abi2signature = (abi) => {};

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
    // this fucking call mutates abi....but for good actually
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
    // console.log(contract.methods);
    // console.log(abi);
    console.log(signerAddress);
    // TODO: check if signerAddress is the same as the contract deployer
    // console.log(db[address]);
    db[address] = { methods, abi, doc };
    // console.log(db[address]);

    res.json({ message: 'ok', address });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'invalid signature' });
  }
};

export { uploadContract };
