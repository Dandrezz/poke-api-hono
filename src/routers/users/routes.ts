import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { user } from '../../db/schema';
import { Env } from '../../index';
import { desc, eq } from 'drizzle-orm';

export const userRoutes = new Hono<{ Bindings: Env }>();

userRoutes.get('/', async (c) => {
    const db = drizzle(c.env.DB);
    const data = await db.select().from(user);
    return c.json(data);
})

userRoutes.get('/top', async (c) => {
    const db = drizzle(c.env.DB);
    const data = await db.select()
        .from(user)
        .limit(10)
        .orderBy(desc(user.score));
    return c.json(data);
})

userRoutes.get('/:id', async (c) => {
    const db = drizzle(c.env.DB);
    const data = await db
        .select()
        .from(user)
        .where(eq(user.id, Number(c.req.param('id'))));
    return c.json(data);
})

userRoutes.post('/', async (c) => {
    const db = drizzle(c.env.DB);
    const body = await c.req.json();
    const data = await db
        .insert(user)
        .values({ name: body.name, score: body.score })
        .returning();
    return c.json(data);
})

userRoutes.put('/:id', async (c) => {
    const db = drizzle(c.env.DB);
    const body = await c.req.json();
    const data = await db
        .update(user)
        .set(body)
        .where(eq(user.id, Number(c.req.param('id'))))
        .returning({ updatedId: user.id });
    return c.json(data);
})

userRoutes.delete('/:id', async (c) => {
    const db = drizzle(c.env.DB);
    const data = await db
        .delete(user)
        .where(eq(user.id, Number(c.req.param('id'))))
        .returning();
    return c.json(data);
})