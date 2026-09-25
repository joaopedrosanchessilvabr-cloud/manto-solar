# Manto Solar — Camisa UV 50+

Site (HTML/CSS/JS + 2 funções serverless) da landing page e checkout da camisa "Quem Me Protege Não Dorme".

## Estrutura

- `index.html` — landing page do produto
- `checkout.html` — checkout em 3 etapas (Identificação → Entrega → Pagamento)
- `images/` — fotos do produto, selos de segurança e logos das transportadoras
- `api/create-pix.js` — função serverless que gera o depósito Pix real na SimplifyBR
- `api/simplify-webhook.js` — recebe as notificações de status de pagamento da SimplifyBR

## Deploy

Publicado em: **https://manto-solar.vercel.app**

O projeto está importado na Vercel a partir deste repositório GitHub. Qualquer `git push` para a branch `main` atualiza o site publicado automaticamente (não precisa subir nada manualmente).

## Pagamento (SimplifyBR)

O checkout gera cobranças Pix reais através da API da SimplifyBR. Para isso funcionar, configure na Vercel (**Project → Settings → Environment Variables**):

- `SIMPLIFY_CLIENT_ID` — Client-id gerado em simplifybr.com → Integrações → API
- `SIMPLIFY_CLIENT_SECRET` — Client-secret gerado no mesmo lugar
- `SIMPLIFY_WEBHOOK_URL` (opcional) — normalmente `https://manto-solar.vercel.app/api/simplify-webhook`

⚠️ Essas chaves nunca devem ser coladas no código nem commitadas no repositório (que é público) — elas ficam só nas variáveis de ambiente da Vercel.

Pagamento por cartão ainda está desativado no checkout ("Em breve") até a integração de cartão ser configurada.

## Domínio

O site usa por enquanto o domínio gratuito `manto-solar.vercel.app`. Ao decidir um domínio próprio (ex: `mantosolar.com.br`), atualize:
- `<link rel="canonical">` e `<meta property="og:url">` no `index.html`
- Adicione o domínio em **Vercel → Project → Settings → Domains**
