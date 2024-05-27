import dayjs from 'dayjs'

export const DATE_FORMAT = 'YYYY.MM.DD'

export function getDateTime(date?: Date | string, template = DATE_FORMAT) {
  return date ? dayjs(date).format(template) : undefined
}

function isHoliday(date: dayjs.Dayjs, holydays?: Date[]) {
  const strDates = holydays?.map((date) => dayjs(date).format(DATE_FORMAT))
  if (!holydays) {
    return false
  } else if (strDates?.includes(date.format(DATE_FORMAT))) {
    return true
  }

  return false
}

function isBusinessDay(date: dayjs.Dayjs, holydays?: Date[]) {
  const workingWeekdays = [1, 2, 3, 4, 5]

  if (isHoliday(date, holydays)) return false
  else if (workingWeekdays.includes(date.day())) return true

  return false
}

export function nextBusinessDay(date: dayjs.Dayjs, holydays?: Date[]) {
  const searchLimit = 7
  let currentDay = date.clone()

  let loopIndex = 1
  while (loopIndex < searchLimit) {
    currentDay = currentDay.add(1, 'day')

    if (isBusinessDay(currentDay, holydays)) break
    loopIndex += 1
  }

  return currentDay
}
