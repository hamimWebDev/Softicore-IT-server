import { Router } from 'express';
import { chatWithBot } from './chat.controller';

const router = Router();

router.post('/', chatWithBot);

export const chatRoutes = router;



