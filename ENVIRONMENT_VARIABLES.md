# Variáveis de Ambiente

## Para Desenvolvimento Local

Crie um arquivo `.env` na raiz do projeto com:

```env
VITE_SUPABASE_URL=https://shefhxkgcxiplvixvwog.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoZWZoeGtnY3hpcGx2aXh2d29nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NDI3ODUsImV4cCI6MjA3MzAxODc4NX0.iklM78Xuc7qNcUjBCQtzw1OB6cAAMNZ54FSSet92xdE
VITE_OPEN_FOOD_FACTS_BASE_URL=https://world.openfoodfacts.org
VITE_USE_API=true
```

## Para Produção (Netlify)

Configure no Netlify Dashboard:

1. Vá em **Site settings** → **Environment variables**
2. Adicione as seguintes variáveis:

| Nome | Valor |
|------|-------|
| `VITE_SUPABASE_URL` | `https://shefhxkgcxiplvixvwog.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoZWZoeGtnY3hpcGx2aXh2d29nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NDI3ODUsImV4cCI6MjA3MzAxODc4NX0.iklM78Xuc7qNcUjBCQtzw1OB6cAAMNZ54FSSet92xdE` |
| `VITE_OPEN_FOOD_FACTS_BASE_URL` | `https://world.openfoodfacts.org` |
| `VITE_USE_API` | `true` |

## Como Funciona

- As variáveis `VITE_*` são expostas para o frontend
- O código usa `import.meta.env.VITE_*` para acessar as variáveis
- Se as variáveis não estiverem definidas, usa valores padrão
