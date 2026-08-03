import { AppStateProvider, useAppState } from './state.jsx'

import Welcome from './screens/Welcome.jsx'
import ImportMethod from './screens/ImportMethod.jsx'
import HighValueItems from './screens/HighValueItems.jsx'
import SuggestedValue from './screens/SuggestedValue.jsx'
import Questionnaire from './screens/Questionnaire.jsx'
import QuoteSummary from './screens/QuoteSummary.jsx'
import BindPay from './screens/BindPay.jsx'
import PolicyIssued from './screens/PolicyIssued.jsx'
import Dashboard from './screens/Dashboard.jsx'

// Maps the `screen` state value to the component that renders it.
// This is the only place that needs updating when a screen is added.
const SCREEN_MAP = {
  welcome: Welcome,
  'import-method': ImportMethod,
  'high-value-items': HighValueItems,
  'suggested-value': SuggestedValue,
  questionnaire: Questionnaire,
  'quote-summary': QuoteSummary,
  'bind-pay': BindPay,
  'policy-issued': PolicyIssued,
  dashboard: Dashboard,
}

function PhoneFrame() {
  const { state } = useAppState()
  const Screen = SCREEN_MAP[state.screen] ?? Welcome

  return (
    <div className="phone-shell">
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="screen-scroll">
          {/* key={state.screen} forces remount on navigation, which retriggers the fade-in animation */}
          <div key={state.screen} className="screen-enter min-h-full">
            <Screen />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppStateProvider>
      <PhoneFrame />
    </AppStateProvider>
  )
}
