export const monthRange = (year, month) => {
  const start = new Date(year, month - 1, 1); 
  const end = new Date(year, month, 1); 
  
  return { start, end };
};