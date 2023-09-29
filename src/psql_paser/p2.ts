const { Parser } = require('node-sql-parser');

export function runParserP2() {
  const opt = {
    database: 'postgresql' // MySQL is the default database
  }
// import mysql parser only
  const { Parser } = require('node-sql-parser/build/postgresql');
  const parser = new Parser()
// opt is optional
  const ast = parser.astify(`CREATE TABLE "hermes-qat"."PromotionDetail" (
    id int8 NOT NULL DEFAULT nextval('promotiondetail_id_seq' :: regclass),
    "creditType" varchar(255) NULL,
    "promotionId" int8 NOT NULL,
    "userId" int8 NOT NULL,
    "creditBalance" int4 NULL DEFAULT 0,
    "expirationDate" timestamp NULL,
    "isDeleted" bool NOT NULL DEFAULT false,
    "deletingUserId" int8 NULL,
    "createdAt" timestamp NULL DEFAULT now(),
    "updatedAt" timestamp NULL DEFAULT now(),
    "discountValue" int4 NULL,
    "inviteeId" int8 NULL,
    "useBeginAt" timestamp NULL,
    "useEndAt" timestamp NULL,
    "timePlanDetailId" int8 NULL,
    "notifiedCount" int4 NULL,
    "discountQuantity" int4 NULL,
);`, opt);
  // const sql = parser.sqlify(ast, opt);

  console.log(ast); // SELECT * FROM `t`
}

