import { useRef, useState } from 'react'
import { useAppState } from '../state.jsx'
import ScreenHeader from '../components/ScreenHeader.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import { manualEntryDefault } from '../data/collectrSample.js'
import { parseCollectrCsv, summarizeCollectrRows } from '../lib/parseCollectrCsv.js'
import { roundUpToCoverageStep, FULL_COVERAGE_THRESHOLD } from '../lib/coverage.js'

export default function ImportMethod() {
  const { navigate, update, updateSlice } = useAppState()
  const [step, setStep] = useState('choose') // 'choose' | 'collectr-upload'
  const [fileName, setFileName] = useState(null)
  const [rows, setRows] = useState(null)
  const [portfolios, setPortfolios] = useState([])
  const [selectedPortfolios, setSelectedPortfolios] = useState([])
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const chooseManual = () => {
    update({ importMethod: 'manual' })
    updateSlice('collection', {
      itemCount: manualEntryDefault.itemCount,
      suggestedValue: manualEntryDefault.suggestedValue,
      declaredValue: roundUpToCoverageStep(manualEntryDefault.suggestedValue),
    })
    navigate('suggested-value')
  }

  const handleFile = async (file) => {
    setError(null)
    setRows(null)
    setPortfolios([])
    setSelectedPortfolios([])
    setFileName(file.name)
    try {
      const text = await file.text()
      const result = parseCollectrCsv(text)
      setRows(result.rows)
      setPortfolios(result.portfolios)
      setSelectedPortfolios(result.portfolios) // default: all selected
    } catch (err) {
      setError(err.message)
    }
  }

  const onFileInputChange = (e) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const togglePortfolio = (name) => {
    setSelectedPortfolios((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    )
  }

  const summary = rows ? summarizeCollectrRows(rows, selectedPortfolios) : null

  const continueWithImport = () => {
    if (!summary) return
    const selectedRows = rows.filter((row) => selectedPortfolios.includes(row.portfolio))
    update({ importMethod: 'collectr', collectrRows: selectedRows })
    updateSlice('collection', {
      itemCount: summary.itemCount,
      suggestedValue: summary.suggestedValue,
      declaredValue: roundUpToCoverageStep(summary.suggestedValue),
    })
    const hasHighValueItems = selectedRows.some((row) => row.price > FULL_COVERAGE_THRESHOLD)
    navigate(hasHighValueItems ? 'high-value-items' : 'suggested-value')
  }

  if (step === 'collectr-upload') {
    return (
      <div className="flex flex-col h-full px-6 pb-10">
        <div className="flex items-center justify-between px-0 pt-14 pb-4">
          <button
            onClick={() => setStep('choose')}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-vault-panel text-vault-text"
            aria-label="Go back"
          >
            ‹
          </button>
          <h1 className="text-base font-medium text-vault-text">Import from Collectr</h1>
          <div className="w-9 h-9" />
        </div>

        <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
          <p className="text-vault-mute text-sm text-center">
            Export your portfolio from Collectr as a CSV, then upload it here.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={onFileInputChange}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="border border-dashed border-vault-line rounded-2xl py-8 flex flex-col items-center gap-2 text-vault-mute active:bg-vault-panel"
          >
            <span className="text-2xl">📄</span>
            <span className="text-sm font-medium text-vault-text">
              {fileName ?? 'Choose a CSV file'}
            </span>
            <span className="text-xs">Tap to browse</span>
          </button>

          {error && <p className="text-vault-danger text-xs text-center">{error}</p>}

          {portfolios.length > 0 && (
            <div>
              <label className="block text-vault-text text-sm font-medium mb-2">
                Which portfolios should we cover?
              </label>
              <div className="flex flex-col gap-2">
                {portfolios.map((name) => (
                  <label
                    key={name}
                    className="flex items-center gap-3 bg-vault-panel border border-vault-line rounded-2xl px-4 py-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPortfolios.includes(name)}
                      onChange={() => togglePortfolio(name)}
                      className="w-4 h-4 accent-vault-purple"
                    />
                    <span className="text-vault-text text-sm">{name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {summary && (
            <div className="bg-vault-panel border border-vault-line rounded-2xl px-4 py-4 text-center">
              <p className="text-vault-text text-lg font-semibold">
                {summary.itemCount} items · ${summary.suggestedValue.toLocaleString()}
              </p>
              <p className="text-vault-mute text-xs mt-1">
                {selectedPortfolios.length} of {portfolios.length} portfolios selected
              </p>
            </div>
          )}
        </div>

        <PrimaryButton
          disabled={!summary || selectedPortfolios.length === 0}
          onClick={continueWithImport}
          className="mt-6"
        >
          Use this collection
        </PrimaryButton>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full px-6 pb-10">
      <ScreenHeader title="Start your quote" />

      <div className="flex-1 flex flex-col justify-center gap-4">
        <p className="text-vault-mute text-sm text-center mb-2">
          How would you like to value your collection?
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <PrimaryButton onClick={() => setStep('collectr-upload')}>
          Import from Collectr
        </PrimaryButton>
        <PrimaryButton variant="outline" onClick={chooseManual}>
          Enter manually
        </PrimaryButton>
      </div>
    </div>
  )
}
