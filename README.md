# Controle de Gastos Pessoais

Aplicação web desenvolvida para a **Atividade 2** da disciplina de **Tecnologias para Interfaces de Aplicações Web**, do curso de **ADS — 3º período, IFTM UPT**.

A ideia do projeto é anotar as receitas e despesas de um mês e acompanhar quanto sobrou. Os lançamentos ficam disponíveis durante o uso do app. Ao recarregar a página, a lista começa vazia.

## Tecnologias

React 19, TypeScript, Vite 6 e Tailwind CSS 4.

## Instalação e execução

Use Node.js 22 e npm.

1. Abra o terminal na pasta do projeto.
2. Rode `npm install` para instalar as dependências.
3. Depois da instalação, rode `npm run dev`.
4. Abra no navegador o endereço que aparecer no terminal.

Para conferir a tipagem e gerar a versão de produção, use `npm run build`.

## Como usar

- Preencha a descrição com pelo menos três caracteres, informe um valor positivo com até duas casas decimais e escolha o tipo e a categoria. Clique em **Adicionar**.
- Use **Editar** e **Salvar** para corrigir um lançamento ou **Remover** para excluí-lo.
- Filtre a lista por tipo e categoria. Se nenhum lançamento combinar com os filtros, o app mostra um aviso.

O resumo mostra quanto entrou, quanto saiu e o saldo em reais. Se o saldo ficar negativo, ele aparece em vermelho. No celular, o formulário fica acima da lista. No computador, os dois ficam lado a lado.

## Exemplo de uso

| Descrição | Tipo | Categoria | Valor |
| --- | --- | --- | ---: |
| Bolsa de estudo | Receita | Bolsa | R$ 100,00 |
| Compra no mercado | Despesa | Mercado | R$ 35,50 |

Com esses dois lançamentos, o saldo fica em **R$ 64,50**. Ao filtrar por despesa, só a compra aparece na lista. O resumo continua considerando os dois lançamentos.

## Componentes

- `App` guarda o estado e calcula os totais e a lista visível.
- `FormTransacao` controla os campos e valida os dados ao adicionar ou editar.
- `Filtros` reúne os seletores de tipo e categoria.
- `ListaTransacoes` renderiza os lançamentos usando o ID como chave.
- `Resumo` exibe os totais calculados no `App`.

`src/tipos.ts` define as transações e as categorias Bolsa, Freela, Mercado, Moradia e Saúde. O cálculo é feito em centavos, e `src/formatarBRL.ts` exibe os valores em reais.

## Entrega

O link do repositório será enviado pelo AVA, conforme o enunciado da atividade.
