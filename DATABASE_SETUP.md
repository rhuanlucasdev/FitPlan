# 🗄️ FitPlan Database Setup

Este guia explica como configurar o banco de dados SQL para o FitPlan.

## 🚀 Instalação Rápida

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Banco de Dados

```bash
# Gerar cliente Prisma
npm run db:generate

# Criar banco de dados e tabelas
npm run db:push

# Popular com dados iniciais
npm run db:seed
```

### 3. Iniciar Aplicação

```bash
# Iniciar servidor API + Frontend
npm run dev:full

# Ou iniciar separadamente:
# Terminal 1: npm run server
# Terminal 2: npm run dev
```

## 📊 Estrutura do Banco

### Tabelas Principais:

- **foods** - Alimentos com informações nutricionais
- **food_categories** - Categorias de alimentos
- **food_units** - Unidades de medida
- **exercises** - Exercícios
- **exercise_categories** - Categorias de exercícios
- **muscle_groups** - Grupos musculares
- **exercise_muscle_groups** - Relacionamento exercício-grupo muscular

### Relacionamentos:

- `foods` → `food_categories` (categoria)
- `foods` → `food_units` (unidade)
- `exercises` → `exercise_categories` (categoria)
- `exercises` ↔ `muscle_groups` (muitos para muitos)

## 🔧 Comandos Úteis

```bash
# Visualizar banco de dados
npm run db:studio

# Resetar banco de dados
rm prisma/dev.db
npm run db:push
npm run db:seed

# Apenas servidor API
npm run server

# Apenas frontend
npm run dev
```

## 🌐 API Endpoints

### Alimentos

- `GET /api/foods` - Listar alimentos
- `GET /api/foods/:id` - Buscar alimento por ID
- `POST /api/foods` - Criar alimento
- `PUT /api/foods/:id` - Atualizar alimento
- `DELETE /api/foods/:id` - Deletar alimento
- `GET /api/food-categories` - Listar categorias
- `GET /api/food-units` - Listar unidades

### Exercícios

- `GET /api/exercises` - Listar exercícios
- `POST /api/exercises` - Criar exercício
- `GET /api/exercise-categories` - Listar categorias
- `GET /api/muscle-groups` - Listar grupos musculares

### Sistema

- `GET /health` - Status da API

## 🔄 Migração do localStorage

O sistema agora usa banco de dados SQL em vez de localStorage. Os dados são:

✅ **Persistentes** - Salvos em arquivo SQLite  
✅ **Relacionados** - Categorias e unidades vinculadas  
✅ **Escaláveis** - Suporta milhares de registros  
✅ **Confiáveis** - Transações ACID  
✅ **Consultáveis** - Queries SQL complexas

## 🚀 Próximos Passos

1. **Desenvolvimento**: SQLite (arquivo local)
2. **Produção**: PostgreSQL (servidor)
3. **Backup**: Automático e confiável
4. **Performance**: Índices otimizados

## 🛠️ Desenvolvimento

### Estrutura de Arquivos:

```
server/
├── index.ts          # Servidor Express
├── seed.ts           # Dados iniciais
prisma/
├── schema.prisma     # Schema do banco
src/services/
├── ApiClient.ts      # Cliente HTTP
├── SqlFoodService.ts # Serviço de alimentos
```

### Adicionando Novos Campos:

1. Atualizar `prisma/schema.prisma`
2. Executar `npm run db:push`
3. Atualizar `SqlFoodService.ts`
4. Atualizar endpoints da API

## 🎯 Vantagens do SQL

- **Integridade**: Dados consistentes e válidos
- **Performance**: Consultas otimizadas
- **Escalabilidade**: Cresce com o projeto
- **Backup**: Dados seguros e recuperáveis
- **Relacionamentos**: Estrutura organizada
- **Consultas**: Buscas complexas e filtros

---

**🎉 Pronto! Seu banco de dados SQL está configurado e funcionando!**
