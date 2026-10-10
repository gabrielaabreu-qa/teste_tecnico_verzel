import { expect, test } from '@playwright/test';
import {
  adicionarAoCarrinho,
  alterarQuantidade,
  abrirCarrinho,
  valorResumo,
} from './support/carrinho';

test.describe('CT-FRETE-02 | O frete volta a ser cobrado ao reduzir a quantidade abaixo do limite', () => {
  test('O frete volta a ser cobrado ao reduzir a quantidade abaixo do limite', async ({ page }) => {
    await adicionarAoCarrinho(page, 'Camiseta Essencial', 4);
    await abrirCarrinho(page);

    await alterarQuantidade(page, 'Camiseta Essencial', 3);

    await expect(valorResumo(page, 'subtotal')).toHaveText('R$ 179,70');
    await expect(valorResumo(page, 'frete')).toHaveText('R$ 19,90');
    await expect(page.locator('.aviso-frete')).toHaveText('Faltam R$ 20,30 para o frete grátis.');
    await expect(valorResumo(page, 'total')).toHaveText('R$ 199,60');
  });
});
