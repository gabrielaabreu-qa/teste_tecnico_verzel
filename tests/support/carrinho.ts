import { expect, type Locator, type Page } from '@playwright/test';

export function cardDoProduto(page: Page, nome: string): Locator {
  return page.getByRole('article', { name: nome });
}

export async function adicionarAoCarrinho(page: Page, nome: string, quantidade: number) {
  await page.goto('/');
  const card = cardDoProduto(page, nome);
  await expect(card).toBeVisible();
  const adicionar = card.getByRole('button', { name: 'Adicionar ao carrinho' });

  for (let unidades = 1; unidades <= quantidade; unidades++) {
    await adicionar.click();
    await expect(card.getByText(`${unidades} no carrinho`)).toBeVisible();
  }
}

export async function abrirCarrinho(page: Page) {
  await page.goto('/carrinho');
  await expect(page.getByRole('heading', { name: 'Carrinho', level: 1 })).toBeVisible();
  await expect(page.locator('.coluna-resumo')).toHaveAttribute('aria-busy', 'false');
}

export async function alterarQuantidade(page: Page, nome: string, quantidade: number) {
  const grupo = page.getByRole('group', { name: `Quantidade de ${nome}` });
  const atual = grupo.locator('output');
  const valorAtual = Number(await atual.textContent());

  if (quantidade === valorAtual) {
    return;
  }

  const botao =
    quantidade > valorAtual
      ? page.getByRole('button', { name: `Aumentar quantidade de ${nome}` })
      : page.getByRole('button', { name: `Diminuir quantidade de ${nome}` });

  const passos = Math.abs(quantidade - valorAtual);
  for (let i = 0; i < passos; i++) {
    await botao.click();
  }

  await expect(atual).toHaveText(String(quantidade));
  await expect(page.locator('.coluna-resumo')).toHaveAttribute('aria-busy', 'false');
}

export function valorResumo(page: Page, campo: 'subtotal' | 'desconto' | 'frete' | 'total') {
  return page.locator(`[data-valor="${campo}"]`);
}
