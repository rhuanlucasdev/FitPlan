import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://shefhxkgcxiplvixvwog.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoZWZoeGtnY3hpcGx2aXh2d29nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NDI3ODUsImV4cCI6MjA3MzAxODc4NX0.iklM78Xuc7qNcUjBCQtzw1OB6cAAMNZ54FSSet92xdE";

const supabase = createClient(supabaseUrl, supabaseKey);

async function testTables() {
  try {
    console.log("🔍 Testando tabelas do Supabase...");

    // Testar cada tabela
    const tables = [
      "food_categories",
      "food_units",
      "foods",
      "exercise_categories",
      "muscle_groups",
      "exercises",
      "exercise_muscle_groups",
    ];

    for (const table of tables) {
      try {
        const { data, error } = await supabase.from(table).select("*").limit(1);

        if (error) {
          console.log(`❌ Tabela ${table}: ${error.message}`);
        } else {
          console.log(`✅ Tabela ${table}: OK (${data.length} registros)`);
        }
      } catch (err) {
        console.log(`❌ Tabela ${table}: ${err.message}`);
      }
    }
  } catch (error) {
    console.error("❌ Erro geral:", error.message);
  }
}

testTables();
