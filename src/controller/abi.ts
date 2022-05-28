import db from '@server/db';

const getAbi = async (req, res) => {
  const { address } = req.body;
  if (address in db) {
    const { abi } = db[address];
    res.json({ address, abi });
  } else {
    res.status(404).json({ message: 'contract not found' });
  }
};

export { getAbi };
