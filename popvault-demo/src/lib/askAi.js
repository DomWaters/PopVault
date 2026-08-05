// Rule-based "AI" for the Ask AI demo screen. No network calls — this is a
// scripted keyword matcher over the app's own fake state, dressed up as chat.
// Replying to a clarifying question with a topic word (e.g. "premium") just
// matches that intent on the next call, which is what gives the illusion of
// a follow-up conversation without any real conversation-state tracking.

import { NAT_CAT_LOADING_RATE, SECURITY_DISCOUNT_RATE } from './pricing.js'

const SECURITY_LABEL = { display: 'a display case', drawer: 'a drawer', safe: 'a safe' }
const pct = (rate) => Math.round(rate * 100)

const INTENTS = [
  {
    test: (t) => /^(hi|hello|hey|yo)[\s!.,]*$/.test(t),
    respond: () => "Hello again! What would you like to know — coverage, premium, or claims?",
  },
  {
    test: (t) => /policy number|policy id|which policy/.test(t),
    respond: (s) =>
      s.policyNumber
        ? `Your policy number is ${s.policyNumber}.`
        : "Your policy hasn't been issued yet, so there's no policy number on file.",
  },
  {
    test: (t) => /\bclaim/.test(t),
    respond: () =>
      "To file a claim, use the 'File a claim' quick action on your dashboard: describe what happened and attach photos or receipts. We review it against your declared value and policy terms. (This demo doesn't process real claims.)",
  },
  {
    test: (t) => /high.?value|valuable item|expensive item/.test(t),
    respond: (s) =>
      s.questionnaire.hasHighValueItems
        ? `Yes — you flagged $${Number(s.questionnaire.highValueItemsTotal).toLocaleString()} in high-value items, individually covered up to their declared value.`
        : "You didn't flag any high-value items during your quote, so everything's covered under the standard per-item limit.",
  },
  {
    test: (t) => /discount|security|\bsafe\b|drawer|display case/.test(t),
    respond: (s) => {
      const security = s.questionnaire.storageSecurity
      if (!security) return "We don't have your storage security on file yet — that's set during the quote questionnaire."
      return `You store your collection in ${SECURITY_LABEL[security]}, which gets you a ${pct(SECURITY_DISCOUNT_RATE[security] ?? 0)}% discount on your base premium.`
    },
  },
  {
    test: (t) => /flood|storm|earthquake|nat.?cat|natural disaster|risk zone|location risk/.test(t),
    respond: (s) => {
      const zone = s.questionnaire.natCatZone
      if (!zone) return "We don't have a nat-cat risk zone on file yet — that's set from your address during the quote."
      return `Your address is in a ${zone} nat-cat risk zone, adding a ${pct(NAT_CAT_LOADING_RATE[zone] ?? 0)}% loading to your base premium.`
    },
  },
  {
    test: (t) => /declared value|coverage limit|insured for|sum insured/.test(t),
    respond: (s) =>
      `Your collection is declared at $${Number(s.collection.declaredValue ?? 0).toLocaleString()} across ${s.collection.itemCount ?? 0} items — that's your total coverage limit.`,
  },
  {
    test: (t) => /premium|\bcost\b|\bprice\b|\bbill\b|\bpay\b/.test(t),
    respond: (s) => {
      const amount = s.billingPlan === 'monthly' ? s.pricing.totalMonthly : s.pricing.totalAnnual
      const cadence = s.billingPlan === 'monthly' ? '/mo' : '/yr'
      return `You're on the ${s.billingPlan} plan at $${amount.toFixed(0)}${cadence}, based on your declared value and risk factors.`
    },
  },
  {
    test: (t) => /what.{0,30}(cover|protect)|am i (covered|protected)/.test(t),
    respond: () =>
      "Your policy covers accidental damage, theft, and loss for the items in your declared collection, subject to your nat-cat zone and storage security terms.",
  },
]

const AMBIGUOUS_COVERAGE = /\b(cover|covers|covered|coverage|insur\w*)\b/

export function answerQuestion(question, state) {
  const text = question.trim().toLowerCase()
  if (!text) return "Go ahead and type a question whenever you're ready."

  for (const intent of INTENTS) {
    if (intent.test(text)) return intent.respond(state)
  }

  if (AMBIGUOUS_COVERAGE.test(text)) {
    return "Just to make sure I answer the right question — are you asking what's covered (the perils), or how much coverage you have (your declared value/limit)? Try \"what's covered\" or \"what's my coverage limit\"."
  }

  return "I'm not sure I follow. I can help with: what's covered, your premium, your declared value, high-value items, your security discount, nat-cat risk, the claims process, or your policy number — which one?"
}
