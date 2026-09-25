// Função serverless (Vercel) — recebe as notificações de status da SimplifyBR
// (deposit.pending / deposit.paid / deposit.cancelled).
//
// Configure esta URL em SimplifyBR → Integrações → Webhooks:
//   https://manto-solar.vercel.app/api/simplify-webhook
//
// Por enquanto só confirma o recebimento e grava um log (visível em
// Vercel → Deployments → Functions → Logs). Quando o site tiver um banco
// de dados ou envio de e-mail configurado, é aqui que entra a lógica de
// marcar o pedido como pago e notificar o cliente/loja.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }

  const event = req.body || {};
  console.log('[simplify-webhook] Evento recebido:', JSON.stringify(event));

  // Responder 200 rapidamente, como recomenda a documentação da SimplifyBR.
  return res.status(200).json({ received: true });
}
