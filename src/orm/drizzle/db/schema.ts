import { serial, text, timestamp, pgTable, varchar, integer } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  role: text('role', { enum: ['user', 'admin'] }).default('user').notNull(),
  cityId: integer('city_id').references(() => cities.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});


export const cities = pgTable('cities', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

//////////////////////////

export const userV3 = pgTable('userV3', {
  id: serial('id').primaryKey(),
  name: text('name').notNull()
})

export const petV0 = pgTable('petV0',{
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  ownerId: integer('ownerId').notNull().references(()=> userV3.id)
})
