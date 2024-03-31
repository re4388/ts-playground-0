type RepairItem = { [key: string]: number }
type RepairMaterial = { [key: string]: number }

interface QuotationSpec {
  name: string
  age: number
}
type Spec = {
  spec: {
    repairItem: RepairItem
    repairMaterial: RepairMaterial
  }
}

export type QuotationSpecData = QuotationSpec & Spec

const ai_ts_test: QuotationSpecData = {
  name: 'a',
  age: 1,
  spec: {
    repairItem: {
      a: 1,
      b: 2
    },
    repairMaterial: {
      c: 3,
      d: 4
    }
  }
}

let a2 = ai_ts_test
