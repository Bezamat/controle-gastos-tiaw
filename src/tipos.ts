export type TipoTransacao = 'receita' | 'despesa'
export type Categoria = 'Bolsa' | 'Freela' | 'Mercado' | 'Moradia' | 'Saúde' | 'Transporte' | 'Lazer'

export type Transacao = {
  id: string
  descricao: string
  valorCentavos: number
  tipo: TipoTransacao
  categoria: Categoria
}

export type CamposTransacao = {
  descricao: string
  valor: string
  tipo: TipoTransacao
  categoria: Categoria
}

export type FiltroTipo = 'todos' | TipoTransacao
export type FiltroCategoria = 'todas' | Categoria

export const categorias: Categoria[] = ['Bolsa', 'Freela', 'Mercado', 'Moradia', 'Saúde', 'Transporte', 'Lazer']
