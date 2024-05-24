SELECT
   "RentChargingMapping"."id" AS "RentChargingMapping_id",
   "RentChargingMapping"."rentId" AS "RentChargingMapping_rentId",
   "RentChargingMapping"."chargingDetailId" AS "RentChargingMapping_chargingDetailId",
   "RentChargingMapping__chargingDetail"."id" AS "RentChargingMapping__chargingDetail_id",
   "RentChargingMapping__chargingDetail"."chargingItemId" AS "RentChargingMapping__chargingDetail_chargingItemId",
   "RentChargingMapping__chargingDetail"."description" AS "RentChargingMapping__chargingDetail_description",
   "RentChargingMapping__chargingDetail"."amount" AS "RentChargingMapping__chargingDetail_amount",
   "RentChargingMapping__chargingDetail"."defaultInvoiceAmount" AS "RentChargingMapping__chargingDetail_defaultInvoiceAmount",
   "RentChargingMapping__chargingDetail"."comment" AS "RentChargingMapping__chargingDetail_comment",
   "RentChargingMapping__chargingDetail"."managerId" AS "RentChargingMapping__chargingDetail_managerId",
   "RentChargingMapping__chargingDetail"."deletedAt" AS "RentChargingMapping__chargingDetail_deletedAt",
   "RentChargingMapping__chargingDetail"."createdAt" AS "RentChargingMapping__chargingDetail_createdAt",
   "RentChargingMapping__chargingDetail"."updatedAt" AS "RentChargingMapping__chargingDetail_updatedAt"
FROM
   "hermes-qat"."rent_charging_mapping" "RentChargingMapping"
   LEFT JOIN "hermes-qat"."charging_detail" "RentChargingMapping__chargingDetail" ON "RentChargingMapping__chargingDetail"."id" = "RentChargingMapping"."chargingDetailId"
WHERE
   "RentChargingMapping"."rentId" IN () parameters: [] }