import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import statusRouter from './src/routes/statusRouter';

import { gatherStats, createParties } from './src/workflow/gatherStats';
import { setupNeo } from './src/workflow/neoManager';

dotenv.config()

const app: Express = express();
const port = process.env.PORT;

app.use(cors())
app.use("/status", statusRouter);

app.listen(port, () => {  
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  gatherStats();  
});