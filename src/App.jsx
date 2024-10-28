import { useState } from 'react'

const Button = ({ handleClick, text }) =>
  <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, metric }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{metric}</td>
    </tr>
  )
}

const Statistics = ({ stat }) => {
  if (stat.total === 0)
    return 'No feedback given'
  return (
    <table>
      <tbody>
        <StatisticLine text="good" metric={stat.good} />
        <StatisticLine text="neutral" metric={stat.neutral} />
        <StatisticLine text="bad" metric={stat.bad} />
        <StatisticLine text="all" metric={stat.total} />
        <StatisticLine text="average" metric={stat.average.toFixed(1)} />
        <StatisticLine text="positive" metric={`${(stat.positive * 100).toFixed(1)} %`} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [stat, setStat] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
    average: 0,
    positive: 0
  })

  const handleGoodClick = () => {
    const avg = (stat.good + 1 - stat.bad) / (stat.good + stat.neutral + stat.bad + 1)
    const pos = (stat.good + 1) / (stat.good + 1 + stat.neutral + stat.bad)
    setStat({
      ...stat,
      good: stat.good + 1,
      total: stat.total + 1,
      average: avg,
      positive: pos
    })
  }

  const handleNeutralClick = () => {
    const avg = (stat.good - stat.bad) / (stat.good + stat.neutral + stat.bad + 1)
    const pos = (stat.good) / (stat.good + 1 + stat.neutral + stat.bad)
    setStat({
      ...stat,
      neutral: stat.neutral + 1,
      total: stat.total + 1,
      average: avg,
      positive: pos
    })
  }

  const handleBadClick = () => {
    const avg = (stat.good - stat.bad - 1) / (stat.good + stat.neutral + stat.bad + 1)
    const pos = (stat.good) / (stat.good + 1 + stat.neutral + stat.bad)
    setStat({
      ...stat,
      bad: stat.bad + 1,
      total: stat.total + 1,
      average: avg,
      positive: pos 
    })
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics stat={stat} />
    </div>
  )
}

export default App
