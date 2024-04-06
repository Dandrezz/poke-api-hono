import { Hono } from 'hono'
import { cors } from 'hono/cors';
import { userRoutes } from './routers/users/routes';

export type Env = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Env }>();

app.use('/api/*', cors());

app.route('/api/user', userRoutes );

export default app
