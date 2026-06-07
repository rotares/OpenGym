export const formatNumberToTime  = (initialTime: number):string => {
  const hours = Math.floor(initialTime / 60)
  const minutes = initialTime - hours * 60

  return !hours ? `${minutes} мин.` : `${hours} ч. ${minutes} мин.` 

}