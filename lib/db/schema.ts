import { pgTable, serial, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  interest: varchar('interest', { length: 100 }).notNull(),
  message: text('message'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});