import { formatarBRL } from '../formatarBRL'
import type { Transacao } from '../tipos'

type Props = {
  transacoes: Transacao[]
  onEditar: (transacao: Transacao) => void
  onRemover: (id: string) => void
}

export function ListaTransacoes({ transacoes, onEditar, onRemover }: Props) {
  if (transacoes.length === 0) {
    return <p className="text-sm text-slate-500">Nenhuma transação encontrada.</p>
  }

  return (
    <ul className="space-y-2">
      {transacoes.map((transacao) => (
        <li key={transacao.id} className="space-y-2 rounded-lg bg-white p-3 shadow-sm">
          <div>
            <p className="font-bold">{transacao.descricao}</p>
            <p className="text-sm text-slate-500">
              {transacao.categoria} · {transacao.tipo === 'receita' ? 'Receita' : 'Despesa'}
            </p>
          </div>

          <p className="font-bold">
            {formatarBRL(transacao.tipo === 'despesa' ? -transacao.valorCentavos : transacao.valorCentavos)}
          </p>

          <div className="flex gap-2">
            <a
              href="#formulario"
              onClick={() => onEditar(transacao)}
              aria-label={`Editar ${transacao.descricao}`}
              className="rounded bg-slate-200 px-3 py-1 text-sm focus:outline-2 focus:outline-emerald-500"
            >
              Editar
            </a>
            <button
              type="button"
              onClick={() => onRemover(transacao.id)}
              aria-label={`Remover ${transacao.descricao}`}
              className="rounded px-3 py-1 text-sm text-red-600 focus:outline-2 focus:outline-emerald-500"
            >
              Remover
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
