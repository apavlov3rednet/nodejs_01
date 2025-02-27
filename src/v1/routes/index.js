import { Router } from 'express';
import Users from './userRoutes';

app.get('/user', Users);

export default router;