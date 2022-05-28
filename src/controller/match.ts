import patterns from './patterns';
import config from '@config/network';

import Web3 from 'web3';
const ethNetwork = `https://${config.network}.infura.io/v3/${config.infura.project}`;
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

var processedPatterns = {};

const processPatterns = () => {
  for (const pattern of patterns) {
    // magic: add signatures lmao
    const tmpabi = pattern.abi as any;
    new web3.eth.Contract(tmpabi);
    for (let i = 0; i < tmpabi.length; i++) {
      processedPatterns[tmpabi[i].signature] = {
        name: tmpabi[i].name,
        type: pattern.name,
        abi: tmpabi,
        dialogue: tmpabi[i].dialogue,
      };
    }
  }
  // console.log(processedPatterns);
};

export { processPatterns, processedPatterns as patterns };
