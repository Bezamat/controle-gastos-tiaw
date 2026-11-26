import { useState } from 'react'
import { Filtros } from './componentes/Filtros'
import { FormTransacao } from './componentes/FormTransacao'
import { ListaTransacoes } from './componentes/ListaTransacoes'
import { Resumo } from './componentes/Resumo'
import type { CamposTransacao, FiltroCategoria, FiltroTipo, Transacao } from './tipos'

const camposIniciais: CamposTransacao = {
  descricao: '',
  valor: '',
  tipo: 'despesa',
  categoria: 'Mercado',
}

export function App() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([])
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>('todos')
  const [filtroCategoria, setFiltroCategoria] = useState<FiltroCategoria>('todas')
  const [campos, setCampos] = useState(camposIniciais)
  const [idEmEdicao, setIdEmEdicao] = useState<string | null>(null)

  function limparFormulario() {
    setCampos(camposIniciais)
    setIdEmEdicao(null)
  }

  function salvar(valorCentavos: number) {
    const dados = {
      descricao: campos.descricao.trim(),
      valorCentavos,
      tipo: campos.tipo,
      categoria: campos.categoria,
    }

    if (idEmEdicao) {
      setTransacoes((lista) =>
        lista.map((transacao) =>
          transacao.id === idEmEdicao ? { ...transacao, ...dados } : transacao,
        ),
      )
    } else {
      const nova: Transacao = { id: crypto.randomUUID(), ...dados }
      setTransacoes((lista) => [...lista, nova])
    }

    limparFormulario()
  }

  function editar(transacao: Transacao) {
    setIdEmEdicao(transacao.id)
    setCampos({
      descricao: transacao.descricao,
      valor: String(transacao.valorCentavos / 100),
      tipo: transacao.tipo,
      categoria: transacao.categoria,
    })
  }

  function remover(id: string) {
    setTransacoes((lista) => lista.filter((transacao) => transacao.id !== id))
    if (id === idEmEdicao) limparFormulario()
  }

  const visiveis = transacoes.filter((transacao) => {
    const doTipo = filtroTipo === 'todos' || transacao.tipo === filtroTipo
    const daCategoria = filtroCategoria === 'todas' || transacao.categoria === filtroCategoria
    return doTipo && daCategoria
  })

  let receitas = 0
  let despesas = 0

  for (const transacao of transacoes) {
    if (transacao.tipo === 'receita') {
      receitas += transacao.valorCentavos
    } else {
      despesas += transacao.valorCentavos
    }
  }

  const saldo = receitas - despesas

  return (
    <main className="mx-auto max-w-xl space-y-4 p-6">
      <header>
        <h1 className="text-2xl font-bold">Controle de gastos pessoais</h1>
        <p className="text-sm text-slate-500">Receitas e despesas do mês</p>
      </header>

      <Resumo receitas={receitas} despesas={despesas} saldo={saldo} />

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <FormTransacao
            campos={campos}
            editando={idEmEdicao !== null}
            onAlterar={setCampos}
            onSalvar={salvar}
            onCancelar={limparFormulario}
          />
        </div>

        <section aria-labelledby="titulo-lista" className="space-y-4">
          <h2 id="titulo-lista" className="font-bold">Lançamentos</h2>
          <Filtros
            tipo={filtroTipo}
            categoria={filtroCategoria}
            onAlterarTipo={setFiltroTipo}
            onAlterarCategoria={setFiltroCategoria}
          />
          <ListaTransacoes transacoes={visiveis} onEditar={editar} onRemover={remover} />
        </section>
      </div>
    </main>
  )
}
