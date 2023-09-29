import { z } from 'zod'
import { BasicVipPlanInfoForManager } from './common'

export const VipDiscountSchema = z.object({
  id: z.string(),
  source: z.string(),
  discount: z.number(),
  countdown: z.number(),
  endAt: z.date(),
  allowVipPlanIds: z.array(z.string()).nullable().optional()
})

export const GetVipInfoResponseSchema = z.object({
  specialPlans: z.array(
    z.object({
      id: z.string({ description: 'VIP 計畫 ID' }),
      title: z.string({ description: 'VIP 計畫名稱' }),
      description: z.string({ description: 'VIP 計畫促銷描述' }),
      price: z.number({ description: 'VIP 計畫價錢' }),
      originalPrice: z.number({ description: 'VIP 原價錢' }).nullable(),
      durationMonth: z.number({ description: 'VIP 方案週期' }),
      durationDay: z.number({ description: 'VIP 方案週期 (日)' }),
      continuedPlanId: z.string({ description: 'VIP 續訂 ID' }).nullable()
    }),
    { description: 'VIP 特殊限定計畫清單' }
  ),
  plans: z.array(
    z.object({
      id: z.string({ description: 'VIP 計畫 ID' }),
      title: z.string({ description: 'VIP 計畫名稱' }),
      description: z.string({ description: 'VIP 計畫促銷描述' }),
      price: z.number({ description: 'VIP 計畫價錢' }),
      originalPrice: z.number({ description: 'VIP 原價錢' }).nullable(),
      durationMonth: z.number({ description: 'VIP 方案週期' }),
      durationDay: z.number({ description: 'VIP 方案週期 (日)' }),
      continuedPlanId: z.string({ description: 'VIP 續訂 ID' }).nullable()
    }),
    { description: 'VIP 計畫清單' }
  ),
  tripDiscountMap: z.array(
    z.object({
      threshold: z.number({ description: ' 騎乘次數門檻值' }),
      discount: z.number({ description: ' 折扣係數' })
    }),
    { description: ' 騎乘次數折扣表' }
  ),
  durationVoucherAmount: z.number({ description: ' 每 30 天發放 VIP 騎乘券數量' }),
  durationVoucherTitle: z.string({ description: ' 每月贈送騎乘券文案標題' }),
  durationVoucherDescription: z.string({ description: ' 每月贈送騎乘券文案內文' }),
  otherBenefits: z.array(
    z.object({
      title: z.string({ description: ' 其他優惠說明標題' }),
      description: z.string({ description: ' 其他優惠說明內文' })
    })
  ),
  vipDiscount: VipDiscountSchema.nullable()
})

export const GetVipPlanListResponseSchema = z.array(BasicVipPlanInfoForManager)


// import { z } from 'zod'
//
// export const PurchaseVipRequestSchema = z.object(
//   {
//     subscription: z.object({
//       paymentType: z.number({ description: ' 續訂付款方式 (1: creditCard, 2: wallet)' })
//     }),
//     vipDiscount: z
//       .object(
//         {
//           id: z.string({ description: 'VIP 折扣資料 ID' }),
//           discount: z.number({ description: 'VIP 折扣方案金額' })
//         },
//         { description: ' 套用 VIP 折扣資料' }
//       )
//       .optional()
//   },
//   { description: ' 使用者的 VIP 開始訂閱 / 接續訂閱參數' }
// )
//
// export const PurchaseVipResponseSchema = z.object(
//   {
//     orderId: z.string({ description: ' 訂單號碼' }),
//     amount: z.number({ description: ' 應付金額' }),
//     estimatedEndAt: z.date({ description: ' 預計最後到期時間' })
//   },
//   { description: ' 使用者的 VIP 開始訂閱 / 接續訂閱回應資料' }
// )


