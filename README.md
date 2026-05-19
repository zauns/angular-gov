# Painel de Combustíveis — Frota Nacional

Mini-painel gerencial para visualização de dados de consumo e preço de combustíveis da frota nacional, seguindo o Padrão Digital de Governo (Gov.br).

## Como rodar

```bash
npm install
npm start
```

Acessar `http://localhost:4200/`. O mock de API roda em memória (In-Memory Web API) — não requer processo separado.

## Decisões arquiteturais

Ver [docs/adr/0001-facade-architecture.md](docs/adr/0001-facade-architecture.md) para detalhes completos.

- **Mock API**: `angular-in-memory-web-api` — roda dentro do interceptor HTTP do Angular, sem processo separado. Suporta paginação e filtros nativamente.
- **Facade pattern**: Cada feature (dashboard, consulta, detalhe) tem seu `*.facade.ts` que abstrai o acesso a dados. Componentes consomem apenas signals expostos pelo Facade. RxJS internamente, `toSignal()` na fronteira.
- **Estrutura**: Pastas planas por feature — `core/`, `dashboard/`, `consulta/`, `shared/`, `models/`. Lazy-loading via `loadComponent`.
- **Visual**: Montserrat (similar à Rawline), tokens CSS customizados (cor primária `#1351B4`), SCSS, Chart.js + ng2-charts para gráficos.
- **Estado**: Signals para estado local, `computed()` para estado derivado, `OnPush` em todos os componentes.

## O que ficou pronto

### Escopo obrigatório

- **Layout Gov.br**: Header com logo do Governo Federal, menu de navegação (Dashboard / Consulta), breadcrumbs data-driven (Home > Combustíveis > Página Atual), skip-link de acessibilidade.
- **Dashboard** (`/dashboard`): 4 cards de KPI (Preço Médio Gasolina, Preço Médio Etanol, Preço Médio Diesel, Total de Litros Consumidos) + gráfico de barras de Consumo por UF.
- **Consulta** (`/consulta`): Tabela paginada (Data, Posto, Cidade/UF, Tipo, Valor/Litro, Total Pago), filtro por UF, navegação anterior/próximo.
- **Facade**: `dashboard.facade.ts`, `consulta.facade.ts`, `detalhe.facade.ts` — componentes nunca importam `HttpClient`.
- **Mock de dados**: 121 registros cobrindo todos os 27 estados brasileiros e os 3 tipos de combustível (Gasolina, Etanol, Diesel).

### Bônus

- **Tela de Detalhe** (`/consulta/:id`): Exibe dados completos do abastecimento, motorista com CPF mascarado (`xxx.xxx.000-00`) e veículo.

## O que ficou de fora

- **Toggle de Alto Contraste**: Os botões de acessibilidade (alto contraste, VLibras, fonte) estão presentes no header mas não são funcionais — conforme permitido pelo escopo.
- **Segundo gráfico** (Evolução de Preço — linha temporal): Não implementado; escopo bônus limitado a um item.
- **Rota 404 customizada**: Rotas inexistentes redirecionam para `/dashboard`.
- **Testes automatizados**: Não implementados no escopo de 3h.
- **Menu responsivo**: O menu é horizontal fixo; não há menu colapsável para mobile.
