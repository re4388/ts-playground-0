export const PurchaseVipResponseSchema = z.object(
  {
    orderId: z.string({ description: ' 訂單號碼' }),
  },
)
