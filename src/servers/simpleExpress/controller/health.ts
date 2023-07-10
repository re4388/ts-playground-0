import { RequestHandler } from 'express';

/**
 * Health check endpoint
 */
const getHealth: RequestHandler = (req, res) => {
  console.log(req.query);
  res.status(200).json({
    name: 'name',
    description: 'desc'
  });
};
export default getHealth;
