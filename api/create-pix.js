// Função serverless (Vercel) — cria um depósito Pix real na SimplifyBR.
// As credenciais (Client-id / Client-secret) ficam em variáveis de ambiente
// da Vercel (Settings → Environment Variables), nunca aqui no código.
//
// Front-end: checkout.html faz um POST para /api/create-pix com
// { amount, payer: { name, email, document, phone }, external_id }
// e recebe de volta apenas o necessário para exibir o QR code — as
// credenciais nunca chegam ao navegador do cliente.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  const { amount, payer, external_id } = req.body || {};

  if (
    !amount ||
    typeof amount !== 'number' ||
    !payer ||
    !payer.name ||
    !payer.email ||
    !payer.document ||
    !payer.phone
  ) {
    return res.status(422).json({ error: 'Dados incompletos para gerar o Pix.' });
  }

  const clientId = process.env.SIMPLIFY_CLIENT_ID;
  const clientSecret = process.env.SIMPLIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error('[create-pix] Faltam SIMPLIFY_CLIENT_ID / SIMPLIFY_CLIENT_SECRET nas variáveis de ambiente da Vercel.');
    return res.status(500).json({ error: 'Pagamento por Pix está temporariamente indisponível. Tente novamente em instantes.' });
  }

  try {
    const payload = {
      amount,
      payer: {
        name: payer.name,
        email: payer.email,
        document: payer.document,
        phone: payer.phone,
      },
      external_id: external_id || undefined,
    };

    if (process.env.SIMPLIFY_WEBHOOK_URL) {
      payload.webhookURL = process.env.SIMPLIFY_WEBHOOK_URL;
    }

    const simplifyRes = await fetch('https://simplifybr.com/api/v1/pix/deposit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-id': clientId,
        'Client-secret': clientSecret,
      },
      body: JSON.stringify(payload),
    });

    const data = await simplifyRes.json().catch(() => ({}));

    if (!simplifyRes.ok) {
      console.error('[create-pix] SimplifyBR respondeu com erro:', simplifyRes.status, data);
      return res.status(simplifyRes.status).json({
        error: data?.message || 'Não foi possível gerar o Pix agora. Tente novamente.',
      });
    }

    return res.status(201).json({
      internal_id: data.internal_id,
      external_id: data.external_id,
      status: data.status,
      qrcode: data.qrcode,
      amount: data.amount,
    });
  } catch (err) {
    console.error('[create-pix] Erro ao chamar a SimplifyBR:', err);
    return res.status(500).json({ error: 'Erro ao conectar com o gateway de pagamento.' });
  }
}
