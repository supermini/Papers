# Frontend React para n8n Webhook

Este projeto simples em React utiliza Vite, Tailwind CSS e componentes do shadcn/ui para enviar formulários para um Webhook do n8n.

## Scripts

- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — gera a versão de produção

## Estrutura

- `src/components/OrderForm.tsx` — componente reutilizável do formulário
- `src/App.tsx` — página principal que usa o componente

Configure o Webhook no n8n em `src/components/OrderForm.tsx` se necessário.
