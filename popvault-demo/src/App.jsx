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
import AskAi from './screens/AskAi.jsx'
import ClaimItem from './screens/ClaimItem.jsx'
import ClaimIncident from './screens/ClaimIncident.jsx'
import ClaimReview from './screens/ClaimReview.jsx'
import ClaimSubmitted from './screens/ClaimSubmitted.jsx'
import CollectionView from './screens/CollectionView.jsx'

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
  'ask-ai': AskAi,
  'claim-item': ClaimItem,
  'claim-incident': ClaimIncident,
  'claim-review': ClaimReview,
  'claim-submitted': ClaimSubmitted,
  'collection-view': CollectionView,
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
