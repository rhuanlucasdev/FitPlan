# 🗄️ Configuração do Supabase

## ✅ Status Atual

- **Conexão com Supabase**: ✅ Funcionando
- **Tabelas criadas**: ❌ Não criadas ainda
- **Problema**: URL do banco de dados não está acessível

## 🔧 Solução: Criar Tabelas Manualmente

### Passo 1: Acessar Supabase Studio

1. Vá para: https://supabase.com/dashboard
2. Selecione seu projeto: `shefhxkgcxiplvixvwog`
3. Clique em **"SQL Editor"** no menu lateral

### Passo 2: Executar SQL para Criar Tabelas

Cole o seguinte SQL no editor:

```sql
-- Criar tabela food_categories
CREATE TABLE IF NOT EXISTS food_categories (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela food_units
CREATE TABLE IF NOT EXISTS food_units (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    abbreviation TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela foods
CREATE TABLE IF NOT EXISTS foods (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    category_id TEXT NOT NULL REFERENCES food_categories(id),
    unit_id TEXT NOT NULL REFERENCES food_units(id),
    calories_per_unit DOUBLE PRECISION DEFAULT 0,
    protein_per_unit DOUBLE PRECISION DEFAULT 0,
    carbs_per_unit DOUBLE PRECISION DEFAULT 0,
    fat_per_unit DOUBLE PRECISION DEFAULT 0,
    fiber_per_unit DOUBLE PRECISION DEFAULT 0,
    sugar_per_unit DOUBLE PRECISION DEFAULT 0,
    sodium_per_unit DOUBLE PRECISION DEFAULT 0,
    description TEXT,
    is_custom BOOLEAN DEFAULT false,
    is_from_api BOOLEAN DEFAULT false,
    brand TEXT,
    image_url TEXT,
    original_query TEXT,
    translated_query TEXT,
    api_product_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela exercise_categories
CREATE TABLE IF NOT EXISTS exercise_categories (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela muscle_groups
CREATE TABLE IF NOT EXISTS muscle_groups (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela exercises
CREATE TABLE IF NOT EXISTS exercises (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    category_id TEXT NOT NULL REFERENCES exercise_categories(id),
    description TEXT,
    is_custom BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela exercise_muscle_groups
CREATE TABLE IF NOT EXISTS exercise_muscle_groups (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    exercise_id TEXT NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    muscle_group_id TEXT NOT NULL REFERENCES muscle_groups(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(exercise_id, muscle_group_id)
);

-- Inserir dados iniciais
INSERT INTO food_categories (id, name, description) VALUES
('1', 'Cereais e Grãos', 'Arroz, trigo, aveia, quinoa, etc.'),
('2', 'Proteínas', 'Carnes, peixes, ovos, leguminosas, etc.'),
('3', 'Frutas', 'Frutas frescas e secas'),
('4', 'Verduras e Legumes', 'Vegetais frescos'),
('5', 'Laticínios', 'Leite, queijos, iogurtes, etc.'),
('6', 'Gorduras', 'Óleos, manteigas, azeites, etc.'),
('7', 'Bebidas', 'Água, sucos, chás, etc.'),
('8', 'Outros', 'Outros alimentos');

INSERT INTO food_units (id, name, abbreviation) VALUES
('1', 'Gramas', 'g'),
('2', 'Mililitros', 'ml'),
('3', 'Unidade', 'un'),
('4', 'Colher de sopa', 'colher'),
('5', 'Xícara', 'xícara'),
('6', 'Fatia', 'fatia'),
('7', 'Pedaço', 'pedaço');

INSERT INTO exercise_categories (id, name, description) VALUES
('1', 'Força', 'Exercícios de musculação'),
('2', 'Cardio', 'Exercícios cardiovasculares'),
('3', 'Flexibilidade', 'Alongamentos e yoga'),
('4', 'Funcional', 'Exercícios funcionais');

INSERT INTO muscle_groups (id, name, description) VALUES
('1', 'Peito', 'Músculos do peitoral'),
('2', 'Costas', 'Músculos das costas'),
('3', 'Ombros', 'Músculos dos ombros'),
('4', 'Bíceps', 'Músculos do bíceps'),
('5', 'Tríceps', 'Músculos do tríceps'),
('6', 'Pernas', 'Músculos das pernas'),
('7', 'Glúteos', 'Músculos dos glúteos'),
('8', 'Abdômen', 'Músculos abdominais');
```

### Passo 3: Executar o SQL

1. Cole o SQL acima no editor
2. Clique em **"Run"** para executar
3. Aguarde a criação das tabelas

### Passo 4: Verificar se Funcionou

Após criar as tabelas, execute:

```bash
node test-supabase.js
```

Se funcionar, você verá:

```
✅ Conexão estabelecida com sucesso!
```

## 🚀 Próximos Passos

1. Criar as tabelas no Supabase Studio
2. Testar a conexão
3. Fazer deploy no Netlify
4. Configurar variáveis de ambiente no Netlify
