const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function formatarBRL(centavos: number) {
  return moeda.format(centavos / 100)
}
