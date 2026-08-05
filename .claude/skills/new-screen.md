# new-screen

Scaffolds a new screen in the PopVault app following the project's conventions.

## Steps

1. **Create the screen file** at `popvault-demo/src/screens/<ScreenName>.jsx` using this template:

```jsx
import { useAppState } from '../state.jsx'
import ScreenHeader from '../components/ScreenHeader.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'

export default function <ScreenName>() {
  const { navigate } = useAppState()

  return (
    <div className="flex flex-col h-full px-6 pb-10">
      <ScreenHeader title="<Screen Title>" />
      <div className="flex-1 flex flex-col gap-6">
        {/* screen content */}
      </div>
      <PrimaryButton onClick={() => navigate('<next-screen-key>')}>
        Continue
      </PrimaryButton>
    </div>
  )
}
```

2. **Register the screen** in `popvault-demo/src/App.jsx` — import the component and add it to `SCREEN_MAP`:

```jsx
import <ScreenName> from './screens/<ScreenName>.jsx'

const SCREEN_MAP = {
  // ...existing screens...
  '<screen-key>': <ScreenName>,
}
```

3. **Add the screen key** to the `SCREENS` array in `popvault-demo/src/state.jsx` in the correct position in the journey.

4. **Verify** the app runs and navigating to the new screen works.

## Usage

Tell Claude the screen name, its key, title, and where it sits in the journey. Example:

> /new-screen — add a "Contact Details" screen with key `contact-details` between `quote-summary` and `bind-pay`
