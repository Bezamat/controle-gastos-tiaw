import { formatarBRL } from '../formatarBRL'

type Props = {
  receitas: number
  despesas: number
  saldo: number
}

export function Resumo({ receitas, despesas, saldo }: Props) {
  return (
    <dl aria-label="Resumo do mês" className="flex flex-col gap-2 sm:flex-row">
      <div className="flex-1 rounded-lg bg-white p-3 shadow-sm">
        <dt className="text-sm text-slate-500">Receitas</dt>
        <dd className="font-bold text-emerald-700">{formatarBRL(receitas)}</dd>
      </div>

      <div className="flex-1 rounded-lg bg-white p-3 shadow-sm">
        <dt className="text-sm text-slate-500">Despesas</dt>
        <dd className="font-bold">{formatarBRL(despesas)}</dd>
      </div>

      <div className="flex-1 rounded-lg bg-white p-3 shadow-sm">
        <dt className="text-sm text-slate-500">Saldo</dt>
        <dd className={saldo < 0 ? 'font-bold text-red-600' : 'font-bold'}>{formatarBRL(saldo)}</dd>
      </div>
    </dl>
  )
}
