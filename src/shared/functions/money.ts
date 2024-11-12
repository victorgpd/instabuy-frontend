export const convertNumberToMoney = (value: number | string): string => {
  const valor = Number(value).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  if (valor != '0,00') {
    return valor
  } else {
    return ''
  }
}
