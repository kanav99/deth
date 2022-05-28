import * as radspec from 'radspec';
import ERC20Contract from 'erc20-contract-js';
import Web3 from 'web3';

import config from '@config/network';
const ethNetwork = `https://${config.network}.infura.io/v3/${config.infura.project}`;

const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

async function addrToToken(address) {
  const ctr = new ERC20Contract(web3, address);
  const symbol = await ctr.symbol().call();
  return symbol;
}

const evaluate = async (expression, abi, data, to_addr) => {
  const options = {
    userHelpers: {
      tokenSymbol: () => async (address) => {
        return {
          type: 'string',
          value: await addrToToken(address),
        };
      },
      to: () => async () => {
        return {
          type: 'address',
          value: to_addr,
        };
      },
    },
  };
  const call = {
    abi,
    transaction: {
      data,
    },
  };
  return radspec.evaluate(expression, call, options);
};

// ropsten - 1 weenus to 1 xeenus
// const example = () => {
//   const expression =
//     'Exchanged `q1` `@tokenName(t1)` for `q2` `@tokenName(t2)`';
//   const abi = [
//     {
//       inputs: [
//         { internalType: 'uint256', name: 'q1', type: 'uint256' },
//         { internalType: 'address', name: 't1', type: 'address' },
//         { internalType: 'uint256', name: 'q2', type: 'uint256' },
//         { internalType: 'address', name: 't2', type: 'address' },
//       ],
//       name: 'exchange',
//       outputs: [],
//       stateMutability: 'nonpayable',
//       type: 'function',
//     },
//   ];
//   const data =
//     '0xfad13e1c0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000101848d5c5bbca18e6b4431eedf6b95e9adf82fa00000000000000000000000000000000000000000000000000000000000000010000000000000000000000007e0480ca9fd50eb7a3855cf53c347a1b4d6a2ff5';

//   evaluate(expression, abi, data);
// };

export { evaluate };
