# 🚀 Deploy do FitPlan no Netlify

## 📋 Pré-requisitos

- Conta no [Netlify](https://netlify.com)
- Conta no [Supabase](https://supabase.com) (gratuito)

## 🗄️ Opção 1: Supabase (Recomendado)

### 1.1 Configurar Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Anote as credenciais:
   - `DATABASE_URL`
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

### 1.2 Atualizar Prisma para PostgreSQL

```bash
# Instalar driver PostgreSQL
npm install pg @types/pg

# Atualizar schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 1.3 Configurar Variáveis de Ambiente

Criar `.env`:

```env
DATABASE_URL="postgresql://user:password@host:port/database"
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
```

### 1.4 Deploy

```bash
# Gerar cliente Prisma
npm run db:generate

# Fazer push do schema
npm run db:push

# Fazer seed
npm run db:seed
```

## 🌐 Opção 2: PlanetScale (MySQL)

### 2.1 Configurar PlanetScale

1. Acesse [planetscale.com](https://planetscale.com)
2. Crie um banco MySQL
3. Configure as credenciais

### 2.2 Atualizar Prisma

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

## 🔧 Opção 3: Netlify Functions + FaunaDB

### 3.1 Configurar FaunaDB

1. Acesse [fauna.com](https://fauna.com)
2. Crie um banco
3. Configure as credenciais

### 3.2 Migrar para FaunaDB

- Usar FaunaDB como banco NoSQL
- Adaptar queries para FaunaDB

## 🚀 Deploy no Netlify

### 1. Preparar Build

```bash
# Instalar dependências
npm install

# Build do frontend
npm run build

# Build do backend (se usando Netlify Functions)
npm run build:server
```

### 2. Configurar netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[functions]
  directory = "netlify/functions"
```

### 3. Deploy

1. Conectar repositório GitHub ao Netlify
2. Configurar variáveis de ambiente
3. Deploy automático

## 📊 Estrutura Final

```
fitplan/
├── src/                    # Frontend React
├── netlify/
│   └── functions/          # API Functions
├── prisma/
│   └── schema.prisma       # Schema do banco
├── .env                    # Variáveis de ambiente
└── netlify.toml           # Configuração Netlify
```

## 🔐 Variáveis de Ambiente no Netlify

No painel do Netlify, adicionar:

- `DATABASE_URL`
- `SUPABASE_URL` (se usando Supabase)
- `SUPABASE_ANON_KEY` (se usando Supabase)

## ✅ Checklist de Deploy

- [ ] Configurar banco de dados (Supabase/PlanetScale)
- [ ] Atualizar Prisma schema
- [ ] Configurar variáveis de ambiente
- [ ] Testar localmente
- [ ] Fazer build
- [ ] Deploy no Netlify
- [ ] Testar em produção

## 🎯 Recomendação

**Use Supabase** - É gratuito, fácil de configurar e funciona perfeitamente com Netlify!
