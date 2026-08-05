// Toy rating engine for the demo. Not actuarially meaningful — just enough
// to make the live price readout feel responsive to real inputs.

const BASE_RATE = 0.008 // 0.8% of declared value
export const NAT_CAT_LOADING_RATE = { low: 0, medium: 0.1, high: 0.25 }
export const SECURITY_DISCOUNT_RATE = { display: 0, drawer: 0.05, safe: 0.15 }
const HIGH_VALUE_RATE = 0.015
const MIN_ANNUAL_PREMIUM = 60

export function calculatePricing(collection, questionnaire) {
  const declaredValue = collection?.declaredValue ?? 0
  const basePremium = declaredValue * BASE_RATE

  const natCatLoading = basePremium * (NAT_CAT_LOADING_RATE[questionnaire?.natCatZone] ?? 0)
  const securityDiscount = basePremium * (SECURITY_DISCOUNT_RATE[questionnaire?.storageSecurity] ?? 0)
  const highValueLoading = questionnaire?.hasHighValueItems
    ? (questionnaire?.highValueItemsTotal ?? 0) * HIGH_VALUE_RATE
    : 0

  const rawTotal = basePremium + natCatLoading + highValueLoading - securityDiscount
  const totalAnnual = Math.max(rawTotal, declaredValue > 0 ? MIN_ANNUAL_PREMIUM : 0)
  const totalMonthly = totalAnnual / 12

  return {
    basePremium,
    natCatLoading,
    securityDiscount,
    highValueLoading,
    totalAnnual,
    totalMonthly,
  }
}
