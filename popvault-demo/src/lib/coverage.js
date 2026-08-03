const COVERAGE_STEP = 5000

// Rounds a value up to the nearest $5,000 so it reads as a clean suggested
// coverage limit rather than an exact-to-the-cent figure, e.g. 36865.41 -> 40000.
export function roundUpToCoverageStep(value, step = COVERAGE_STEP) {
  return Math.ceil(value / step) * step
}

// Items priced above this are offered full coverage as individually
// scheduled high-value items, rather than folded into the blanket limit.
export const FULL_COVERAGE_THRESHOLD = 2000
