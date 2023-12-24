import dotenv from 'dotenv';
import statusRouter from './src/routes/statusRouter';

import { gatherStats } from './src/workflow/gatherStats';
import { getDonations } from "./src/workflow/donationsManager";

dotenv.config();
gatherStats();  
// getDonations();