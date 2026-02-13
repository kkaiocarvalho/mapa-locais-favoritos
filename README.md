# Desafio Frontend Junior - Mapa de Locais

Aplicacao React para buscar locais, visualizar no mapa e salvar favoritos no navegador.

Projeto desenvolvido como desafio tecnico com foco em:

- React Query para busca e sincronização de estado assinado por cache/invalidation
- Tailwind CSS para composição visual e responsividade
- Context API para estado de interface compartilhado

## Objetivo

Construir uma interface simples e funcional para:

- pesquisar locais por nome
- selecionar um resultado e navegar no mapa
- salvar/remover locais no `localStorage`
- recuperar locais salvos e voltar para eles no mapa

## Preview funcional

- Aba `Pesquisar`: busca via OpenStreetMap (Nominatim), lista de resultados e formulario para salvar local selecionado.
- Aba `Salvos`: lista dos locais persistidos, com acoes de visualizar no mapa e remover.
- Layout responsivo: painel e mapa se adaptam para desktop e mobile.

## Tecnologias

- React 19 + TypeScript
- Vite
- React Query (`@tanstack/react-query`)
- Tailwind CSS v4
- React Leaflet + OpenStreetMap
- shadcn/ui (Tabs, Button, Card, Input)

## Arquitetura e fluxo

### 1) Estado de UI (Context API)

`src/context/PlacesUIContext.tsx` centraliza:

- `selected`: coordenada atualmente selecionada
- `draftName`: nome em edicao no formulario de salvar
- `selectPosition`: seleciona coordenada (opcionalmente com nome sugerido)
- `clearDraft`: limpa selecao e formulario

Esse estado e compartilhado entre:

- `MapView` (clique no mapa, marcador e recentralizacao)
- `ListPlaces` (seleciona resultado da busca)
- `SavePlace` (formulario de persistencia)
- `SavedPlacesList` (reabrir local salvo no mapa)

### 2) Estado assinado por dados (React Query)

#### Busca de locais

Arquivo: `src/components/ListPlaces.tsx`

- `queryKey`: `["places", placeName]`
- `queryFn`: `fetchPlaces(placeName)` (Nominatim)
- `enabled`: somente quando texto tem 3+ caracteres
- `staleTime`: 5 minutos

#### Locais salvos

Arquivo: `src/hooks/useSavedPlaces.ts`

- `queryKey`: `["places", "saved"]`
- leitura de `localStorage` com `staleTime: Infinity`
- mutacoes de salvar/remover invalidam a query para reidratar a lista

### 3) Persistencia local

Arquivo: `src/storage/placesStorage.ts`

- chave local: `locais_salvos`
- leitura com fallback seguro em caso de JSON invalido
- escrita de array completo apos cada mutacao

## Estrutura de pastas (resumo)

```text
src/
  components/
    ListPlaces.tsx
    MapView.tsx
    SavePlace.tsx
    SavedPlacesList.tsx
    SearchPlaces.tsx
    ui/
  context/
    PlacesUIContext.tsx
  hooks/
    useSavedPlaces.ts
  pages/
    Map.tsx
  service/
    api.ts
  storage/
    placesStorage.ts
  App.tsx
  main.tsx
```

## Como rodar o projeto

### Pre-requisitos

- Node.js 18+ (recomendado: 20+)
- npm

### Instalacao e execucao

```bash
npm install
npm run dev
```

Acesse: `http://localhost:5173`

### Scripts disponiveis

```bash
npm run dev      # ambiente de desenvolvimento
npm run build    # build de producao
npm run preview  # preview local da build
npm run lint     # analise estatica
```

## Como usar

1. Digite um local na aba `Pesquisar`.
2. Clique no botao de busca.
3. Selecione um item da lista para posicionar no mapa.
4. Informe um nome amigavel e clique em `Salvar local`.
5. Abra a aba `Salvos` para visualizar/remover locais persistidos.

## Decisões tecnicas

- Separacao clara entre estado de UI (Context API) e estado de dados (React Query).
- Persistencia local para manter o desafio sem backend.
- Composicao de layout com Tailwind utilitario para iteracao rapida.
- Interface em abas para reduzir complexidade de navegacao.

## Transparência sobre uso de IA

Usei IA como apoio principalmente na estruturacao inicial do `Context API` (`PlacesUIContext`), para acelerar um ponto em que eu ainda estava consolidando repertorio.

Mesmo com esse apoio, revisei e adaptei o codigo para o fluxo deste projeto, entendendo como cada parte conversa com os componentes e com o React Query.
