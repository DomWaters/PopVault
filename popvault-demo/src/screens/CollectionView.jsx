import { useAppState } from '../state.jsx'
import ScreenHeader from '../components/ScreenHeader.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'

export default function CollectionView() {
  const { state, navigate } = useAppState()
  const { collectrRows, collection } = state

  return (
    <div className="flex flex-col h-full px-6 pb-10">
      <ScreenHeader title="Collection" />

      <div className="flex flex-col gap-4 flex-1 min-h-0">
        <div className="bg-vault-panel border border-vault-line rounded-2xl px-5 py-4">
          <p className="text-vault-mute text-xs">Declared value</p>
          <p className="text-vault-text text-2xl font-bold mt-1">
            ${Number(collection.declaredValue ?? 0).toLocaleString()}
          </p>
          <p className="text-vault-mute text-xs">{collection.itemCount ?? 0} items covered</p>
        </div>

        {collectrRows.length > 0 ? (
          <div className="flex-1 overflow-y-auto flex flex-col gap-2">
            {collectrRows.map((row, index) => (
              <div
                key={`${row.portfolio}-${row.product}-${index}`}
                className="flex items-center gap-3 bg-vault-panel border border-vault-line rounded-2xl px-4 py-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-vault-text text-sm truncate">{row.product}</p>
                  <p className="text-vault-mute text-xs">
                    {row.portfolio} · qty {row.quantity}
                  </p>
                </div>
                <span className="text-vault-text text-sm font-semibold whitespace-nowrap">
                  ${row.price.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-vault-panel border border-vault-line rounded-2xl px-5 py-4 text-center">
            <p className="text-vault-text text-sm font-medium">No item-level detail</p>
            <p className="text-vault-mute text-xs mt-1">
              You entered your collection manually during setup, so individual items aren't
              available in this demo — only the total declared value above.
            </p>
          </div>
        )}
      </div>

      <PrimaryButton onClick={() => navigate('dashboard')} className="mt-6">
        Back to dashboard
      </PrimaryButton>
    </div>
  )
}
