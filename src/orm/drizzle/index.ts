import { drizzle } from 'drizzle-orm/node-postgres'
import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { InferModel, eq, sql } from 'drizzle-orm'
import { Pool } from 'pg'
import { cities, petV0, users, userV3 } from './db/schema'
import * as _faker from 'faker'

import { randomUUID } from 'node:crypto'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod';







export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, 'insert'>;
export type City = InferModel<typeof cities>;
export type NewCity = InferModel<typeof cities, 'insert'>;


function init() {
  const pool = new Pool({
    connectionString: 'postgres://postgres:postgres@127.0.0.1:5444/typeorm_v0'
  })
  const db = drizzle(pool)
  console.log('------->db: ', db)

  return db
}

// export const userV3 = pgTable('userV3', {
//   id: serial('id').primaryKey(),
//   name: text('name').notNull()
// })
//
// export const petV0 = pgTable('petV0',{
//   id: serial('id').primaryKey(),
//   name: text('name').notNull(),
//   ownerId: integer('ownerId').notNull().references(()=> userV3.id)
// })


export async function run_main_drizzle() {
  // await insertUserV3()
  await leftJoinEx0()
}



async function zodExample0() {
  const db = init()
  // Schema for inserting a user - can be used to validate API requests
  const insertUserSchema = createInsertSchema(users);
// Schema for selecting a user - can be used to validate API responses
  const selectUserSchema = createSelectSchema(users);
// Overriding the fields
  const insertUserSchemaV2 = createInsertSchema(users, {
    role: z.string(),
  });


}


async function leftJoinEx0() {
  const db = init()
  const res = await db.select().from(userV3).leftJoin(
    petV0, eq(userV3.id, petV0.ownerId)
  )
  console.log("------->res: ", res);
}

async function insertPetV0() {
  const db = init()
  const data = {
    name: 'pet_0',
    ownerId: 1
  }
  const res0 = await db.insert(petV0).values(data).returning()
  console.log("------->res0: ", res0);
}



async function insertUserV3() {
  const db = init()
  const userV3Data = {
    name: 'jack_0'
  }
  const res0 = await db.insert(userV3).values(userV3Data).returning()
  console.log("------->res0: ", res0);
}


async function runDrizzleEX1() {
  const db = init()
  const randomStr = randomUUID()

// Insert
  const newUser: NewUser = {
    fullName: `John Doe:${randomStr}`,
    phone: '+123456789'
  }

  const insertedUsers /* : User[] */ = await db.insert(users).values(newUser).returning()
  const insertedUser = insertedUsers[0]!
  console.log("------->insertedUser: ", insertedUser);

  const newCity: NewCity = {
    name: `New York + ${randomStr}`
  }
  const insertedCities /* : City[] */ = await db.insert(cities).values(newCity).returning()
  const insertedCity = insertedCities[0]!

// Update
  const updateResult /* : { updated: Date }[] */ = await db.update(users)
    .set({ cityId: insertedCity.id, updatedAt: new Date() })
    .where(eq(users.id, insertedUser.id))
    .returning({ updated: users.updatedAt })
  console.log("------->updateResult: ", updateResult);

// Select
  const allUsers /* : User[] */ = await db.select().from(users)
  console.log('------->allUsers: ', allUsers)

// Select custom fields
  const upperCaseNames /* : { id: number; name: string }[] */ = await db
    .select({
      id: users.id,
      name: sql<string>`upper(${users.fullName})`
    })
    .from(users)
  console.log('------->upperCaseNames: ', upperCaseNames)



// You wouldn't BELIEVE how SMART the result type is! 😱
  const allUsersWithCities = await db
    .select({
      id: users.id,
      name: users.fullName,
      city: {
        id: cities.id,
        name: cities.name
      }
    })
    .from(users)
    .leftJoin(cities, eq(users.cityId, cities.id))
  console.log("------->allUsersWithCities: ", allUsersWithCities);

// Delete
  const deletedNames /* : { name: string }[] */ = await db.delete(users)
    .where(eq(users.id, insertedUser.id))
    .returning({ name: users.fullName })
  console.log("------->deletedNames: ", deletedNames);


}
