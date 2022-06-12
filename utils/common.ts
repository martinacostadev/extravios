const DATE_UNITS = {
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
}

const getSecondsDiff = (timestamp: number) => (Date.now() - timestamp) / 1000

interface Props {
  value: number
  unit: string
}

const getUnitAndValueDate = (secondsElapsed: number): Props => {
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsElapsed >= secondsInUnit || unit === 'second') {
      const value = Math.floor(secondsElapsed / secondsInUnit) * -1
      return { value, unit }
    }
  }

  return { value: 0, unit: 'second' }
}

export const getTimeAgo = (timestamp: number) => {
  const rtf = new Intl.RelativeTimeFormat()

  const secondsElapsed = getSecondsDiff(timestamp)
  const { value, unit } = getUnitAndValueDate(secondsElapsed)
  return rtf.format(value, unit as Intl.RelativeTimeFormatUnit)
}
