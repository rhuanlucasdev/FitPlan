import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://shefhxkgcxiplvixvwog.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoZWZoeGtnY3hpcGx2aXh2d29nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NDI3ODUsImV4cCI6MjA3MzAxODc4NX0.iklM78Xuc7qNcUjBCQtzw1OB6cAAMNZ54FSSet92xdE";

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabase() {
  try {
    console.log("🔍 Testando conexão com Supabase...");
    console.log("URL: https://shefhxkgcxiplvixvwog.supabase.co");

    // Testar conexão simples
    const { data, error } = await supabase
      .from("food_categories")
      .select("*")
      .limit(1);

    if (error) {
      console.error("❌ Erro:", error.message);
    } else {
      console.log("✅ Conexão estabelecida com sucesso!");
      console.log("Dados:", data);
    }
  } catch (error) {
    console.error("❌ Erro de conexão:", error.message);
  }
}

testSupabase();
