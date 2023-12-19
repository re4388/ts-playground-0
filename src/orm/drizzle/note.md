

## doc
- https://orm.drizzle.team/docs/overview
- https://github.com/drizzle-team/drizzle-orm




## migrate

`drizzle-kit generate:pg --out migrations-folder --schema src/db/schema.ts`

example:
```bash -> run at root folder
drizzle-kit generate:pg --out /src/orm/drizzle/db --schema /src/orm/drizzle/db/schema.ts
```
- 跑完後，去 db apply








## 使用心得
- 主要跟 typeorm 相比較
- 建立 entity 的時候，也程式化了
  - 表示可以 autocomplete
  - typesafe
  - 以上都是 ease of dev and early fast 的特性
- 寫 leftJoin and rightJoin 也都是typesafe and autocomplete, subquery 也是
  - ref: https://orm.drizzle.team/docs/select#select-from-subquery
- zod 整合
  - https://orm.drizzle.team/docs/zod
  - 


## thoughts
one day, maybe we can try to use this kind of new ORM, typsafe, autocomplete when setup the entity and write query, currently typeorm just cannot do that
