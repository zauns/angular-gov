# CONTEXT — Painel de Combustíveis

## Domínio

- **Abastecimento** — Um registro de abastecimento de um veículo da frota nacional. Contém data, posto, cidade, UF, tipo de combustível, valor por litro, litros, total pago, motorista, CPF do motorista e veículo.
- **Posto** — Nome do posto de combustível onde o abastecimento ocorreu (ex: "Posto Ipiranga Centro").
- **UF** — Unidade Federativa brasileira de 2 letras (ex: SP, RJ, MG) onde o abastecimento foi realizado.
- **Tipo de Combustível** — Classificação do combustível: Gasolina, Etanol ou Diesel.
- **Valor/Litro** — Preço unitário do combustível em reais no momento do abastecimento.
- **Total Pago** — Valor total da transação (Valor/Litro × Litros).
- **Motorista** — Nome do condutor responsável pelo abastecimento.
- **CPF do Motorista** — Cadastro de Pessoa Física do motorista. Armazenado completo (11 dígitos), exibido mascarado na interface (XXX.XXX.XXX-XX).
- **Veículo** — Identificação do veículo abastecido (placa ou modelo).

## KPIs do Dashboard

- **Preço Médio Nacional (Gasolina)** — Média aritmética do Valor/Litro para todos os abastecimentos do tipo Gasolina.
- **Preço Médio Nacional (Diesel)** — Média aritmética do Valor/Litro para todos os abastecimentos do tipo Diesel.
- **Total de Litros Consumidos** — Soma de todos os litros abastecidos, independente de UF ou tipo.

## Gráfico

- **Consumo por UF** — Total de litros agrupado por UF, exibido como gráfico de barras.

## Consulta

- **Tabela de Abastecimentos** — Listagem paginada com colunas: Data, Posto, Cidade/UF, Tipo de Combustível, Valor/Litro, Total Pago.
- **Filtro por UF** — Seleção de UF que restringe os registros exibidos na tabela e ajusta a paginação.
- **Detalhe do Registro** — Tela individual (`/consulta/:id`) exibindo todos os campos do abastecimento, incluindo motorista (CPF mascarado) e veículo.

## Layout Gov.br

- **Barra de Governo** — Faixa superior com logo "Governo Federal" e links de acessibilidade (não-funcionais).
- **Header da Aplicação** — Título "Painel de Combustíveis — Frota Nacional".
- **Menu de Navegação** — Dois itens: Dashboard e Consulta.
- **Breadcrumbs** — Trilha de navegação: Home > Combustíveis > [Página Atual].
