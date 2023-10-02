export const convertDateToNormal = (date: Date | string) => {
  const olddate = Date.parse(date.toString())
  const newDate = new Date(olddate).toISOString()
  return newDate.slice(0, 10).split(".").reverse().join("-")
}