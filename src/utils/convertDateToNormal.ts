export const convertDateToNormal = (date: string | undefined) => {
  if(!date) return ""
  return date.slice(0, 10).split(".").reverse().join("-")
}