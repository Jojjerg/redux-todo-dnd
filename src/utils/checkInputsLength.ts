export const checkInputsLength = <T extends {}>(object: T): boolean => {
  const values = Object.values(object);

  for (const value of values) {
    if (typeof value === "string" && value.length === 0) {
      return false;
    }
  }

  return true;
};