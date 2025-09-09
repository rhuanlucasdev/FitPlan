# Deploy para Netlify com Banco de Dados

## Passo a Passo

### 1. Configurar Variáveis de Ambiente no Netlify

1. **Acesse o Netlify Dashboard**:
   - Vá para [netlify.com](https://netlify.com)
   - Faça login na sua conta
   - Selecione seu projeto "fitplan"

2. **Adicione as Variáveis de Ambiente**:
   - Vá em **Site settings** → **Environment variables**
   - Clique em **Add variable**
   - Adicione estas variáveis:

   | Nome | Valor |
   |------|-------|
   | `VITE_SUPABASE_URL` | `https://shefhxkgcxiplvixvwog.supabase.co` |
   | `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoZWZoeGtnY3hpcGx2aXh2d29nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NDI3ODUsImV4cCI6MjA3MzAxODc4NX0.iklM78Xuc7qNcUjBCQtzw1OB6cAAMNZ54FSSet92xdE` |
   | `VITE_OPEN_FOOD_FACTS_BASE_URL` | `https://world.openfoodfacts.org` |
   | `VITE_USE_API` | `true` |

### 2. Fazer Commit e Push das Alterações

```bash
# Adicionar todas as alterações
git add .

# Fazer commit
git commit -m "feat: adicionar integração com Supabase e variáveis de ambiente"

# Fazer push para o GitHub
git push origin main
```

### 3. Deploy Automático

O Netlify irá automaticamente:
- Detectar as mudanças no GitHub
- Fazer o build do projeto
- Usar as variáveis de ambiente configuradas
- Fazer o deploy da nova versão

### 4. Verificar o Deploy

1. **Acesse seu site** no Netlify
2. **Teste a funcionalidade**:
   - Vá para a aba "Dieta"
   - Digite um alimento (ex: "arroz")
   - Verifique se os dados da API aparecem
   - Clique em um resultado da API
   - Verifique se foi salvo no banco

### 5. Verificar Logs (se necessário)

Se houver problemas:
1. Vá em **Deploys** no Netlify
2. Clique no deploy mais recente
3. Verifique os logs de build
4. Verifique se as variáveis de ambiente estão corretas

## Estrutura do Projeto

- ✅ **Frontend**: React + Vite
- ✅ **Banco de Dados**: Supabase (PostgreSQL)
- ✅ **API**: Open Food Facts
- ✅ **Deploy**: Netlify
- ✅ **Variáveis de Ambiente**: Configuradas

## Funcionalidades Disponíveis

- 🔍 **Busca de Alimentos**: Local + API
- 💾 **Salvamento**: Dados da API salvos no banco
- 📊 **Cálculo de Macros**: Automático
- 🌐 **Tradução**: Português → Inglês para API
- 📱 **Responsivo**: Funciona em mobile e desktop
