import type { ChangeEvent } from 'react'
import { categorias, type FiltroCategoria, type FiltroTipo } from '../tipos'

type Props = {
  tipo: FiltroTipo
  categoria: FiltroCategoria
  onAlterarTipo: (tipo: FiltroTipo) => void
  onAlterarCategoria: (categoria: FiltroCategoria) => void
}

const classeFiltro = 'rounded border bg-white px-2 py-1 focus:outline-2 focus:outline-emerald-500'

export function Filtros({ tipo, categoria, onAlterarTipo, onAlterarCategoria }: Props) {
  function alterarTipo(e: ChangeEvent<HTMLSelectElement>) {
    onAlterarTipo(e.target.value as FiltroTipo)
  }

  function alterarCategoria(e: ChangeEvent<HTMLSelectElement>) {
    onAlterarCategoria(e.target.value as FiltroCategoria)
  }

  return (
    <div className="flex gap-2">
      <label className="flex flex-1 flex-col gap-2">
        <span className="text-sm">Filtrar por tipo</span>
        <select value={tipo} onChange={alterarTipo} className={classeFiltro}>
          <option value="todos">Todos</option>
          <option value="receita">Receitas</option>
          <option value="despesa">Despesas</option>
        </select>
      </label>

      <label className="flex flex-1 flex-col gap-2">
        <span className="text-sm">Filtrar por categoria</span>
        <select value={categoria} onChange={alterarCategoria} className={classeFiltro}>
          <option value="todas">Todas</option>
          {categorias.map((opcao) => (
            <option key={opcao} value={opcao}>
              {opcao}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
