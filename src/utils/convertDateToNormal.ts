export const convertDateToNormal = (date: Date | string) => {
  if (typeof date === "string") {
    return date.slice(0, 10).split(".").reverse().join("-");
  }
  if (typeof date === "object") {
    const olddate = Date.parse(date.toString());
    const newDate = new Date(olddate).toISOString();
    return newDate.slice(0, 10).split(".").reverse().join("-");
  }
};
