import moment from 'moment';

export default function dataToArr (obj, syms) {
  const arr = []
  for (const [dateKey, date] of Object.entries(obj)) {
    const arrRow = []
    arrRow.push(dateKey)
    syms.forEach(sym => {
      arrRow.push(date[sym])
    });
    arr.push(arrRow)
  }

  arr.sort((a, b) => {
    return moment(a[0]) - moment(b[0])
  })


  return arr
}
