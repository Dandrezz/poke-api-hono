import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('user', {
    id: integer('id',{ mode: 'number' }).primaryKey({ autoIncrement: true}),
    name: text('name', { length: 255 }).notNull(),
    score: integer('score', { mode: 'number' }).notNull(),
    timestamp: integer('timestamp').default(sql`CURRENT_TIMESTAMP`).notNull()
})