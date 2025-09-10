import { PrismaClient } from '@prisma/client';

async function testConnection() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Testando conexão com Supabase...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
    
    // Testar conexão simples
    await prisma.$connect();
    console.log('✅ Conexão estabelecida com sucesso!');
    
    // Testar query simples
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Query de teste executada:', result);
    
  } catch (error) {
    console.error('❌ Erro de conexão:', error.message);
    console.error('Código do erro:', error.code);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
