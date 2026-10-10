import { expect, test } from '@playwright/test';

test.describe('CT-API-14 | Impedir mais de 5 unidades do mesmo produto', () => {
  test('Impedir mais de 5 unidades do mesmo produto', async ({ request }) => {
    const resposta = await request.post('/api/carrinho/calcular', {
      data: {
        itens: [{ produtoId: 'P001', quantidade: 6 }],
      },
    });

    expect(resposta.status()).toBe(422);

    const corpo = await resposta.json();
    expect(corpo.erro.codigo).toBe('QUANTIDADE_MAXIMA_EXCEDIDA');
  });
});
