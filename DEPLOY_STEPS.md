# 🚀 Passo a Passo: Deploy no Netlify

## 📋 Pré-requisitos

- [x] Projeto funcionando localmente
- [x] Conta no [Netlify](https://netlify.com)
- [x] Conta no [Supabase](https://supabase.com)

## 🗄️ Passo 1: Configurar Supabase

### 1.1 Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Escolha organização e nome do projeto
4. Defina senha do banco
5. Aguarde a criação (2-3 minutos)

### 1.2 Obter Credenciais

1. Vá em **Settings** → **Database**
2. Copie a **Connection string**
3. Vá em **Settings** → **API**
4. Copie **Project URL** e **anon public**

## 🔧 Passo 2: Configurar Projeto

### 2.1 Instalar Dependências PostgreSQL

```bash
npm install pg @types/pg
```

### 2.2 Configurar Variáveis de Ambiente

Criar `.env`:

```env
# Supabase
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"
SUPABASE_URL="https://[PROJECT].supabase.co"
SUPABASE_ANON_KEY="[ANON_KEY]"
```

### 2.3 Migrar Schema para PostgreSQL

```bash
# Copiar schema PostgreSQL
cp prisma/schema-postgresql.prisma prisma/schema.prisma

# Gerar cliente Prisma
npm run db:generate

# Fazer push do schema
npm run db:push:postgres

# Migrar dados existentes
npm run migrate:supabase

# Fazer seed
npm run db:seed
```

## 🌐 Passo 3: Deploy no Netlify

### 3.1 Preparar Build

```bash
# Build do projeto
npm run build:netlify
```

### 3.2 Conectar ao Netlify

1. Acesse [netlify.com](https://netlify.com)
2. Clique em "New site from Git"
3. Conecte seu repositório GitHub
4. Configure:
   - **Build command**: `npm run build:netlify`
   - **Publish directory**: `dist`

### 3.3 Configurar Variáveis de Ambiente

No painel do Netlify:

1. Vá em **Site settings** → **Environment variables**
2. Adicione:
   - `DATABASE_URL` = sua connection string do Supabase
   - `SUPABASE_URL` = sua URL do Supabase
   - `SUPABASE_ANON_KEY` = sua chave anônima

### 3.4 Deploy

1. Clique em "Deploy site"
2. Aguarde o build (2-3 minutos)
3. Teste a aplicação

## ✅ Passo 4: Verificar Deploy

### 4.1 Testar Funcionalidades

- [ ] Página inicial carrega
- [ ] Seletor de alimentos funciona
- [ ] Busca na API funciona
- [ ] Salvamento no banco funciona
- [ ] Cálculos de macros funcionam

### 4.2 Verificar Logs

1. Vá em **Functions** no painel Netlify
2. Verifique se não há erros
3. Teste endpoints da API

## 🔧 Troubleshooting

### Problema: Erro de Conexão com Banco

**Solução**: Verificar se `DATABASE_URL` está correta

### Problema: Build Falha

**Solução**: Verificar se todas as dependências estão no `package.json`

### Problema: API não Funciona

**Solução**: Verificar se as variáveis de ambiente estão configuradas

## 📊 Estrutura Final

```
fitplan/
├── dist/                   # Build do frontend
├── netlify/
│   └── functions/          # API Functions
├── prisma/
│   └── schema.prisma       # Schema PostgreSQL
├── .env                    # Variáveis locais
├── netlify.toml           # Configuração Netlify
└── DEPLOY_STEPS.md        # Este arquivo
```

## 🎯 URLs Finais

- **Frontend**: `https://seu-projeto.netlify.app`
- **API**: `https://seu-projeto.netlify.app/api/foods`
- **Supabase**: Painel do Supabase

## 🚀 Próximos Passos

1. **Custom Domain**: Configurar domínio personalizado
2. **SSL**: Certificado automático do Netlify
3. **CDN**: Distribuição global automática
4. **Analytics**: Configurar Netlify Analytics
5. **Backups**: Configurar backups do Supabase

## 💡 Dicas

- Use **Supabase Dashboard** para gerenciar dados
- **Netlify Functions** têm limite de 100GB bandwidth/mês
- **Supabase** tem limite de 500MB de banco gratuito
- Configure **monitoring** para acompanhar performance
