import { Router } from 'express';
import { askGPT } from '../controllers/openAI';

const router = Router();

// Handles POST requests to /openai
router.post('/', askGPT); // see controllers/openAI.ts for details

export default router;
