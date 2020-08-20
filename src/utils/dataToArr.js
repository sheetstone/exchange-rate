export default function dataToArr (obj) {
  const arr = []
  for (const [dateKey, date] of Object.entries(obj)) {
    const arrRow = []
    arrRow.push(dateKey)
    for (const [, rate] of Object.entries(date)) {
      arrRow.push(rate)
    }
    arr.push(arrRow)
  }

  return arr
}
