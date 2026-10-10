# Verzel Store - testes Playwright

Automacao dos cenarios da [Verzel Store](https://verzel-store.qa-test-verzel-store.workers.dev/), com base na [documentacao da loja](https://verzel-store.qa-test-verzel-store.workers.dev/documentacao).

| ID | Arquivo | Tipo |
| --- | --- | --- |
| CT-CUPOM-04 | `tests/ct-cupom-04.spec.ts` | UI |
| CT-FRETE-02 | `tests/ct-frete-02.spec.ts` | UI |
| CT-API-14 | `tests/ct-api-14.spec.ts` | API `POST /api/carrinho/calcular` |

## Pre-requisitos

- Node.js LTS e npm
- Git, para clonar ou enviar o projeto a um repositorio remoto

Confira se as ferramentas estao disponiveis no terminal:

```powershell
node --version
npm --version
git --version
```

## Instalar e executar

No terminal, acesse a pasta do projeto e instale as dependencias e o Chromium:

```powershell
npm install
npx playwright install chromium
```

Execute todos os testes:

```powershell
npm test
```

Para executar um teste especifico:

```powershell
npx playwright test tests/ct-api-14.spec.ts
npx playwright test tests/ct-cupom-04.spec.ts
npx playwright test tests/ct-frete-02.spec.ts
```

O Playwright tambem pode abrir o navegador durante a execucao ou iniciar a interface interativa:

```powershell
npm run test:headed
npm run test:ui
```

Depois da execucao, o resultado resumido aparece no terminal. Para abrir o relatorio HTML:

```powershell
npx playwright show-report
```

## Enviar para o Git

### Repositorio ja conectado a um remoto

Confira as alteracoes, adicione os arquivos, crie um commit e envie para o remoto:

```powershell
git status
git add .
git commit -m "Adiciona automacao Playwright"
git push
```

### Primeiro envio para um repositorio remoto vazio

Crie um repositorio vazio no GitHub ou em outro servico Git. Na pasta do projeto, inicialize o Git e troque a URL abaixo pela URL do repositorio criado:

```powershell
git init
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git add .
git commit -m "Adiciona automacao Playwright"
git push -u origin main
```

O arquivo `.gitignore` exclui `node_modules` e os relatorios gerados pelos testes.

## Solucao de problemas

- Se `node` ou `npm` nao forem reconhecidos, instale o Node.js LTS e reabra o terminal do VS Code.
- Se `git` nao for reconhecido, instale o Git for Windows e reabra o terminal.
- Se o Chromium estiver faltando, execute novamente `npx playwright install chromium`.
