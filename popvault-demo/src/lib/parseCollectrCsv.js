// Parses a Collectr portfolio export CSV (see export.csv at the repo root
// for a real sample) into per-row records, plus a helper to total up only
// the portfolios the user chooses to import.

function parseRows(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += char
      }
      continue
    }

    if (char === '"') {
      inQuotes = true
    } else if (char === ',') {
      row.push(field)
      field = ''
    } else if (char === '\n' || char === '\r') {
      if (char === '\r' && text[i + 1] === '\n') i++
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else {
      field += char
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }

  return rows.filter((r) => r.some((cell) => cell.trim() !== ''))
}

// Returns { rows, portfolios } where rows is
// [{ portfolio, product, quantity, price }] and portfolios is the sorted,
// de-duplicated list of portfolio names found.
export function parseCollectrCsv(text) {
  const rawRows = parseRows(text)
  if (rawRows.length < 2) {
    throw new Error('That file doesn’t look like a Collectr export — no rows found.')
  }

  const header = rawRows[0].map((h) => h.trim())
  const portfolioIndex = header.findIndex((h) => h === 'Portfolio Name')
  const productIndex = header.findIndex((h) => h === 'Product Name')
  const quantityIndex = header.findIndex((h) => h === 'Quantity')
  const priceIndex = header.findIndex((h) => h.startsWith('Market Price'))

  if (portfolioIndex === -1 || quantityIndex === -1 || priceIndex === -1) {
    throw new Error(
      'That file is missing the expected Collectr columns (Portfolio Name, Quantity, Market Price).'
    )
  }

  const rows = rawRows.slice(1).map((row) => ({
    portfolio: (row[portfolioIndex] || 'Unknown').trim(),
    product: (row[productIndex] || 'Unknown item').trim(),
    quantity: Number(row[quantityIndex]) || 0,
    price: Number((row[priceIndex] || '0').replace(/,/g, '')) || 0,
  }))

  const portfolios = [...new Set(rows.map((r) => r.portfolio))].sort()

  return { rows, portfolios }
}

// Totals item count and suggested value for just the selected portfolios.
export function summarizeCollectrRows(rows, selectedPortfolios) {
  const selected = new Set(selectedPortfolios)
  let itemCount = 0
  let suggestedValue = 0

  for (const row of rows) {
    if (!selected.has(row.portfolio)) continue
    itemCount += row.quantity
    suggestedValue += row.quantity * row.price
  }

  return {
    itemCount,
    suggestedValue: Math.round(suggestedValue * 100) / 100,
  }
}
