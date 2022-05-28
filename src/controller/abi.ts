import { get, exists } from '@controller/db';

const getAbi = async (req, res) => {
  const { address } = req.body;
  if (await exists(address)) {
    const { abi } = await get(address);
    res.json({ address, abi });
  } else {
    res.status(404).json({ message: 'contract not found' });
  }
};

export { getAbi };
