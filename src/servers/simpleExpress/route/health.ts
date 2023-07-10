import express from 'express';
import getHealth from '../controller/health'

const health = express.Router();

// middleware that is specific to this router
function infoLog(req: any, res: any, next: () => void) {
  next();
}

health.use(infoLog);
health.get('/health', getHealth);

export default health;
