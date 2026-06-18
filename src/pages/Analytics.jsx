import { useMemo, useState } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts'
import USAMap from 'react-usa-map'
import { MALNUTRITION_DATA, STATES, TYPES, DATE_BOUNDS } from '../data/malnutritionData.js'

const NO_DATA_FILL = '#e2e8f0'
const COLOR_LOW = [255, 237, 160]
const COLOR_HIGH = [189, 0, 38]

function colorForValue(value, max) {
  const t = Math.min(1, Math.max(0, value / max))
  const rgb = COLOR_LOW.map((start, i) => Math.round(start + (COLOR_HIGH[i] - start) * t))
  return `rgb(${rgb.join(',')})`
}

function inRange(monthStr, start, end) {
  const d = new Date(`${monthStr}-01T00:00:00Z`)
  return d >= new Date(start) && d <= new Date(end)
}

function average(values) {
  if (values.length === 0) return 0
  return values.reduce((sum, v) => sum + v, 0) / values.length
}

function Analytics() {
  const [dateStart, setDateStart] = useState(DATE_BOUNDS.min)
  const [dateEnd, setDateEnd] = useState(DATE_BOUNDS.max)
  const [selectedState, setSelectedState] = useState('ALL')
  const [selectedType, setSelectedType] = useState('ALL')

  const filteredMain = useMemo(() => {
    return MALNUTRITION_DATA.filter(
      (d) =>
        inRange(d.date, dateStart, dateEnd) &&
        (selectedState === 'ALL' || d.state === selectedState) &&
        (selectedType === 'ALL' || d.type === selectedType),
    )
  }, [dateStart, dateEnd, selectedState, selectedType])

  const filteredByType = useMemo(() => {
    return MALNUTRITION_DATA.filter(
      (d) =>
        inRange(d.date, dateStart, dateEnd) &&
        (selectedState === 'ALL' || d.state === selectedState),
    )
  }, [dateStart, dateEnd, selectedState])

  const avgPrevalence = useMemo(
    () => average(filteredMain.map((d) => d.value)),
    [filteredMain],
  )

  const totalAffected = useMemo(
    () => filteredMain.reduce((sum, d) => sum + d.affected, 0),
    [filteredMain],
  )

  const trendChange = useMemo(() => {
    if (filteredMain.length < 2) return null
    const sorted = [...filteredMain].sort((a, b) => (a.date < b.date ? -1 : 1))
    const mid = Math.floor(sorted.length / 2)
    const firstHalf = average(sorted.slice(0, mid).map((d) => d.value))
    const secondHalf = average(sorted.slice(mid).map((d) => d.value))
    return secondHalf - firstHalf
  }, [filteredMain])

  const trendData = useMemo(() => {
    const byMonth = {}
    filteredMain.forEach((d) => {
      if (!byMonth[d.date]) byMonth[d.date] = []
      byMonth[d.date].push(d.value)
    })
    return Object.keys(byMonth)
      .sort()
      .map((month) => ({ month, value: Math.round(average(byMonth[month]) * 10) / 10 }))
  }, [filteredMain])

  const barData = useMemo(() => {
    return TYPES.map((type) => {
      const values = filteredByType.filter((d) => d.type === type).map((d) => d.value)
      return { type, value: Math.round(average(values) * 10) / 10 }
    })
  }, [filteredByType])

  const mapValues = useMemo(() => {
    const byState = {}
    filteredMain.forEach((d) => {
      if (!byState[d.state]) byState[d.state] = []
      byState[d.state].push(d.value)
    })
    const result = {}
    Object.keys(byState).forEach((state) => {
      result[state] = average(byState[state])
    })
    return result
  }, [filteredMain])

  const mapCustomize = useMemo(() => {
    const config = {}
    Object.entries(mapValues).forEach(([state, value]) => {
      config[state] = { fill: colorForValue(value, 30) }
    })
    return config
  }, [mapValues])

  const typeLabel = selectedType === 'ALL' ? 'All Types' : selectedType

  return (
    <section className="page analytics">
      <h1>Analytics Dashboard</h1>

      <div className="filters-bar">
        <label className="filter-field">
          <span>From</span>
          <input
            type="date"
            value={dateStart}
            min={DATE_BOUNDS.min}
            max={dateEnd}
            onChange={(e) => setDateStart(e.target.value)}
          />
        </label>
        <label className="filter-field">
          <span>To</span>
          <input
            type="date"
            value={dateEnd}
            min={dateStart}
            max={DATE_BOUNDS.max}
            onChange={(e) => setDateEnd(e.target.value)}
          />
        </label>
        <label className="filter-field">
          <span>US State</span>
          <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
            <option value="ALL">All States</option>
            {STATES.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <label className="filter-field">
          <span>Malnutrition Type</span>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="ALL">All Types</option>
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-label">Avg. Prevalence Rate ({typeLabel})</span>
          <span className="metric-value">
            {filteredMain.length ? `${avgPrevalence.toFixed(1)}%` : 'No data'}
          </span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Children Affected (sample size)</span>
          <span className="metric-value">
            {filteredMain.length ? totalAffected.toLocaleString() : 'No data'}
          </span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Trend (first vs. second half)</span>
          <span
            className={`metric-value ${
              trendChange === null ? '' : trendChange > 0 ? 'trend-up' : 'trend-down'
            }`}
          >
            {trendChange === null
              ? 'No data'
              : `${trendChange > 0 ? '+' : ''}${trendChange.toFixed(1)} pts`}
          </span>
        </div>
      </div>

      <div className="chart-card">
        <h2>Prevalence Rate Over Time ({typeLabel})</h2>
        {trendData.length ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis unit="%" />
              <Tooltip formatter={(value) => `${value}%`} />
              <Line type="monotone" dataKey="value" stroke="#fca311" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="no-data">No data for the selected filters.</p>
        )}
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <h2>Prevalence by State ({typeLabel})</h2>
          <div className="usa-map-wrap">
            <USAMap customize={mapCustomize} defaultFill={NO_DATA_FILL} />
          </div>
          <p className="map-hint">Darker red = higher prevalence. Gray = no data for current filters.</p>
        </div>

        <div className="chart-card">
          <h2>Prevalence by Malnutrition Type</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis unit="%" />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="value" fill="#14213d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}

export default Analytics
