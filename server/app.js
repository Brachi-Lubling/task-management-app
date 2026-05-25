import express from 'express'
import { logger } from './middlewares/logger.middleware.js'
import cors from 'cors'
import userRouter from './routes/user.rout.js'
import projectRouter from './routes/projects.route.js'
import taskRouter from './routes/tasks.route.js'


const server=express()

server.set('etag', false);

server.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.removeHeader('etag');
  next();
});

server.use(cors())
server.use(express.json())
server.use(logger)
server.use('/users', userRouter)
server.use('/projects', projectRouter)
server.use('/tasks', taskRouter)
export default server