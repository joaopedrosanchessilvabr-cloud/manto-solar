# Manto Solar — Camisa UV 50+

Site estático (HTML/CSS/JS puro, sem build) da landing page e checkout da camisa "Quem Me Protege Não Dorme".

## Estrutura

- `index.html` — landing page do produto
- `checkout.html` — checkout em 3 etapas (Identificação → Entrega → Pagamento)
- `images/` — fotos do produto e selo de segurança

## Deploy

Este projeto não precisa de build. Basta importar o repositório na [Vercel](https://vercel.com/new) — ela detecta e publica os arquivos estáticos automaticamente.

Após o primeiro deploy, qualquer `git push` para a branch principal atualiza o site publicado automaticamente.

## Domínio

Ainda não há domínio próprio configurado — o site fica acessível pela URL `*.vercel.app` gerada no primeiro deploy. Depois de decidir o domínio final, atualize:
- `<link rel="canonical">` e `<meta property="og:url">` no `index.html`
- O domínio pode ser adicionado em **Vercel → Project → Settings → Domains**
