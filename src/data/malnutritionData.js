// Deterministic pseudo-random generator (fixed seed) so the 200 dummy
// records below are identical on every load, not re-randomized per render.
function mulberry32(seed) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rand = mulberry32(42)

export const STATES = [
  { code: 'TX', name: 'Texas' },
  { code: 'CA', name: 'California' },
  { code: 'NY', name: 'New York' },
  { code: 'FL', name: 'Florida' },
  { code: 'IL', name: 'Illinois' },
  { code: 'OH', name: 'Ohio' },
  { code: 'GA', name: 'Georgia' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'WA', name: 'Washington' },
]

export const TYPES = ['Stunting', 'Wasting', 'Underweight']

const TYPE_BASELINE = { Stunting: 21, Wasting: 8, Underweight: 15 }

const START_DATE = new Date('2023-01-01T00:00:00Z')
const END_DATE = new Date('2024-12-01T00:00:00Z')

function randomMonth() {
  const span = END_DATE.getTime() - START_DATE.getTime()
  const offset = Math.floor(rand() * span)
  const d = new Date(START_DATE.getTime() + offset)
  d.setUTCDate(1)
  return d.toISOString().slice(0, 7) // "YYYY-MM"
}

export const MALNUTRITION_DATA = Array.from({ length: 200 }, (_, i) => {
  const state = STATES[Math.floor(rand() * STATES.length)]
  const type = TYPES[Math.floor(rand() * TYPES.length)]
  const date = randomMonth()
  const baseline = TYPE_BASELINE[type]
  const stateVariance = (rand() - 0.5) * 6
  const noise = (rand() - 0.5) * 4
  const value = Math.max(1, Math.round((baseline + stateVariance + noise) * 10) / 10)
  const affected = Math.round(200 + rand() * 4800)

  return {
    id: i + 1,
    date,
    state: state.code,
    stateName: state.name,
    type,
    value,
    affected,
  }
})

export const DATE_BOUNDS = {
  min: '2023-01-01',
  max: '2024-12-01',
}
