import { z } from 'zod'

export const PurchaseVipRequestSchema = z.object(
  {
    subscription: z.object({
      paymentType: z.number().describe(' 續訂付款方式 (1: creditCard, 2et)')
    }),
    vipDiscount: z
      .object(
        {
          id: z.string().describe('VIP 折扣資料 ID'),
          discount: z.number().describe('VIP 折扣方案金額')
        },
        { description: ' 套用 VIP 折扣資料' }
      )
      .optional()
  },
  { description: ' 使用者的 VIP 開始訂閱 / 接續訂閱參數' }
)

export const PurchaseVipResponseSchema = z.object(
  {
    orderId: z.string().describe(' 訂單號碼'),
    amount: z.number().describe(' 應付金額'),
    estimatedEndAt: z.date().describe(' 預計最後到期時間')
  },
  { description: ' 使用者的 VIP 開始訂閱 / 接續訂閱回應資料' }
)
