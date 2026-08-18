import { createContext, useContext, useState, useCallback } from 'react'

// SCREENS is the full list of steps in the journey, in order.
// Adding a new screen later just means adding its key here and
// building a matching component in src/screens/.
export const SCREENS = [
  'welcome',
  'import-method',
  'high-value-items',
  'suggested-value',
  'questionnaire',
  'quote-summary',
  'bind-pay',
  'policy-issued',
  'dashboard',
  'ask-ai',
  'claim-item',
  'claim-incident',
  'claim-review',
  'claim-submitted',
  'collection-view',
]

const AppStateContext = createContext(null)

// Central place for the "fake backend" of the demo — collection data,
// answers to the questionnaire, and the running price. Every screen
// reads from and writes to this instead of passing props down manually.
const initialState = {
  screen: 'welcome',
  history: [],
  importMethod: null, // 'collectr' | 'manual'
  collectrRows: [], // rows from the last parsed CSV, for the selected portfolios
  collection: {
    suggestedValue: null,
    declaredValue: null,
    itemCount: null,
  },
  questionnaire: {
    address: null,
    natCatZone: null, // 'low' | 'medium' | 'high'
    storageSecurity: null, // 'display' | 'drawer' | 'safe'
    hasHighValueItems: null,
    highValueItemsTotal: 0,
  },
  pricing: {
    basePremium: 0,
    natCatLoading: 0,
    securityDiscount: 0,
    highValueLoading: 0,
    totalAnnual: 0,
    totalMonthly: 0,
  },
  billingPlan: 'annual', // 'annual' | 'monthly'
  policyNumber: null,
  claim: {
    items: [], // [{ label, value }] — one or more items being claimed for
    incidentType: null, // 'lost' | 'stolen' | 'damaged' | 'other'
    dateOfLoss: null,
    description: null,
    claimNumber: null,
  },
}

export function AppStateProvider({ children }) {
  const [state, setState] = useState(initialState)

  const navigate = useCallback((screen) => {
    setState((prev) => ({
      ...prev,
      screen,
      history: [...prev.history, prev.screen],
    }))
  }, [])

  const back = useCallback(() => {
    setState((prev) => {
      const history = [...prev.history]
      const last = history.pop()
      if (!last) return prev
      return { ...prev, screen: last, history }
    })
  }, [])

  const update = useCallback((patch) => {
    setState((prev) => ({ ...prev, ...patch }))
  }, [])

  // Merge a partial update into a nested slice, e.g. update('questionnaire', { natCatZone: 'high' })
  const updateSlice = useCallback((key, patch) => {
    setState((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }))
  }, [])

  const reset = useCallback(() => setState(initialState), [])

  const value = { state, navigate, back, update, updateSlice, reset }

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used inside AppStateProvider')
  return ctx
}
