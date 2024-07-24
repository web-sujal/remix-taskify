export const isInvalidDueDate = (dueDate: string): boolean => {
  let currentDate = new Date().toISOString();
  currentDate = currentDate.slice(0, 10);

  return dueDate < currentDate;
};

export const getCurrentDate = (): string => {
  let currentDate = new Date().toISOString();
  currentDate = currentDate.slice(0, 10);

  return currentDate;
};
