import { expect, test } from '@playwright/test';
import { adicionarAoCarrinho, abrirCarrinho, valorResumo } from './support/carrinho';

test.describe('CT-CUPOM-04 | Cupom inexistente exibe "Cupom inválido." e não dá desconto: "ABC123"', () => {
  test('Cupom inexistente exibe "Cupom inválido." e não dá desconto: "ABC123"', async ({ page }) => {
    await adicionarAoCarrinho(page, 'Tênis Casual Urbano', 1);
    await abrirCarrinho(page);

    await page.getByLabel('Cupom de desconto').fill('ABC123');
    await page.getByRole('button', { name: 'Aplicar cupom' }).click();

    await expect(page.getByRole('alert')).toHaveText('Cupom inválido.');
    await expect(valorResumo(page, 'desconto')).toHaveText('R$ 0,00');
    await expect(valorResumo(page, 'total')).toHaveText('R$ 209,80');
  });
});
