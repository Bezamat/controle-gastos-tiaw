import type { ChangeEvent, FormEvent } from 'react'
import { categorias, type CamposTransacao, type Categoria, type TipoTransacao } from '../tipos'

type Props = {
  campos: CamposTransacao
  editando: boolean
  onAlterar: (campos: CamposTransacao) => void
  onSalvar: (valorCentavos: number) => void
  onCancelar: () => void
}

const classeCampo = 'rounded border px-3 py-2 focus:outline-2 focus:outline-emerald-500'

export function FormTransacao({ campos, editando, onAlterar, onSalvar, onCancelar }: Props) {
  const descricaoInvalida = campos.descricao.trim().length < 3
  const valor = Number(campos.valor)
  const valorCentavos = Math.round(valor * 100)

  let erroValor = ''
  if (!Number.isFinite(valor) || valor <= 0) {
    erroValor = 'Informe um valor maior que zero.'
  } else if (!Number.isSafeInteger(valorCentavos)) {
    erroValor = 'Informe um valor menor.'
  } else if (valorCentavos / 100 !== valor) {
    erroValor = 'Use até duas casas decimais no valor em reais.'
  }

  const invalido = descricaoInvalida || erroValor !== ''

  function alterarDescricao(e: ChangeEvent<HTMLInputElement>) {
    onAlterar({ ...campos, descricao: e.target.value })
  }

  function alterarValor(e: ChangeEvent<HTMLInputElement>) {
    onAlterar({ ...campos, valor: e.target.value })
  }

  function alterarTipo(e: ChangeEvent<HTMLSelectElement>) {
    onAlterar({ ...campos, tipo: e.target.value as TipoTransacao })
  }

  function alterarCategoria(e: ChangeEvent<HTMLSelectElement>) {
    onAlterar({ ...campos, categoria: e.target.value as Categoria })
  }

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (invalido) return
    onSalvar(valorCentavos)
  }

  return (
    <form
      id="formulario"
      aria-labelledby="titulo-formulario"
      onSubmit={enviar}
      className="space-y-4 rounded-lg bg-white p-3 shadow-sm"
    >
      <h2 id="titulo-formulario" className="font-bold">
        {editando ? 'Editar transação' : 'Nova transação'}
      </h2>

      <div className="space-y-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm">Descrição</span>
          <input
            value={campos.descricao}
            onChange={alterarDescricao}
            aria-invalid={descricaoInvalida}
            aria-describedby={descricaoInvalida ? 'erro-descricao' : undefined}
            className={classeCampo}
          />
        </label>
        {descricaoInvalida && (
          <p id="erro-descricao" className="text-sm text-red-600">
            Digite ao menos 3 caracteres na descrição.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm">Valor (R$)</span>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={campos.valor}
            onChange={alterarValor}
            aria-invalid={erroValor !== ''}
            aria-describedby={erroValor ? 'erro-valor' : undefined}
            className={classeCampo}
          />
        </label>
        {erroValor && (
          <p id="erro-valor" className="text-sm text-red-600">
            {erroValor}
          </p>
        )}
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm">Tipo</span>
        <select value={campos.tipo} onChange={alterarTipo} className={classeCampo}>
          <option value="despesa">Despesa</option>
          <option value="receita">Receita</option>
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm">Categoria</span>
        <select value={campos.categoria} onChange={alterarCategoria} className={classeCampo}>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </label>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={invalido}
          className="rounded bg-emerald-600 px-4 py-2 text-white focus:outline-2 focus:outline-emerald-500 disabled:opacity-40"
        >
          {editando ? 'Salvar' : 'Adicionar'}
        </button>
        {editando && (
          <button
            type="button"
            onClick={onCancelar}
            className="rounded bg-slate-200 px-3 py-1 focus:outline-2 focus:outline-emerald-500"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
