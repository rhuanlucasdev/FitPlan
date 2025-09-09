// Translation service for food names (Portuguese to English)
export class TranslationService {
  private static readonly foodTranslations: { [key: string]: string } = {
    // Cereais e Grãos
    "arroz branco": "white rice",
    "arroz integral": "brown rice",
    arroz: "rice",
    aveia: "oats",
    quinoa: "quinoa",
    "pão integral": "whole wheat bread",
    pão: "bread",
    macarrão: "pasta",
    massa: "pasta",
    cereal: "cereal",
    granola: "granola",
    trigo: "wheat",
    cevada: "barley",
    centeio: "rye",
    milho: "corn",
    farinha: "flour",
    "farinha de trigo": "wheat flour",
    "farinha de aveia": "oat flour",

    // Proteínas
    frango: "chicken",
    "peito de frango": "chicken breast",
    "coxa de frango": "chicken thigh",
    sobrecoxa: "chicken drumstick",
    "carne bovina": "beef",
    "carne de vaca": "beef",
    carne: "meat",
    bife: "steak",
    alcatra: "sirloin",
    patinho: "bottom round",
    músculo: "shank",
    costela: "ribs",
    porco: "pork",
    "lombo de porco": "pork loin",
    bacon: "bacon",
    linguiça: "sausage",
    salsicha: "sausage",
    peixe: "fish",
    salmão: "salmon",
    atum: "tuna",
    bacalhau: "cod",
    tilápia: "tilapia",
    pescada: "hake",
    sardinha: "sardine",
    camarão: "shrimp",
    lagosta: "lobster",
    caranguejo: "crab",
    polvo: "octopus",
    lula: "squid",
    ovo: "egg",
    ovos: "eggs",
    "clara de ovo": "egg white",
    gema: "egg yolk",
    queijo: "cheese",
    "queijo minas": "minas cheese",
    "queijo prato": "prato cheese",
    "queijo mussarela": "mozzarella cheese",
    "queijo parmesão": "parmesan cheese",
    "queijo cheddar": "cheddar cheese",
    requeijão: "cream cheese",
    ricota: "ricotta cheese",
    cottage: "cottage cheese",

    // Frutas
    banana: "banana",
    maçã: "apple",
    laranja: "orange",
    limão: "lemon",
    lima: "lime",
    uva: "grape",
    morango: "strawberry",
    abacaxi: "pineapple",
    manga: "mango",
    pêssego: "peach",
    pêra: "pear",
    kiwi: "kiwi",
    melancia: "watermelon",
    melão: "melon",
    abacate: "avocado",
    coco: "coconut",
    tangerina: "tangerine",
    acerola: "acerola",
    caju: "cashew",
    goiaba: "guava",
    maracujá: "passion fruit",
    açaí: "acai",
    cajá: "caja",
    jabuticaba: "jabuticaba",

    // Vegetais
    tomate: "tomato",
    cebola: "onion",
    alho: "garlic",
    cenoura: "carrot",
    batata: "potato",
    "batata doce": "sweet potato",
    mandioca: "cassava",
    inhame: "yam",
    brócolis: "broccoli",
    couve: "kale",
    espinafre: "spinach",
    alface: "lettuce",
    rúcula: "arugula",
    agrião: "watercress",
    repolho: "cabbage",
    "couve-flor": "cauliflower",
    berinjela: "eggplant",
    abobrinha: "zucchini",
    pimentão: "bell pepper",
    pimenta: "pepper",
    "pimentão vermelho": "red bell pepper",
    "pimentão verde": "green bell pepper",
    "pimentão amarelo": "yellow bell pepper",
    pepino: "cucumber",
    rabanete: "radish",
    nabo: "turnip",
    beterraba: "beet",
    chuchu: "chayote",
    quiabo: "okra",
    jiló: "jilo",
    maxixe: "maxixe",

    // Laticínios
    leite: "milk",
    "leite integral": "whole milk",
    "leite desnatado": "skim milk",
    "leite semidesnatado": "low fat milk",
    iogurte: "yogurt",
    "iogurte natural": "natural yogurt",
    "iogurte grego": "greek yogurt",
    coalhada: "curd",
    manteiga: "butter",
    margarina: "margarine",
    "creme de leite": "heavy cream",
    chantilly: "whipped cream",
    sorvete: "ice cream",
    pudim: "pudding",
    flan: "flan",

    // Gorduras e Óleos
    óleo: "oil",
    "óleo de soja": "soybean oil",
    "óleo de girassol": "sunflower oil",
    "óleo de canola": "canola oil",
    "óleo de milho": "corn oil",
    azeite: "olive oil",
    "azeite de oliva": "olive oil",
    "azeite extra virgem": "extra virgin olive oil",
    "óleo de coco": "coconut oil",
    banha: "lard",
    gordura: "fat",

    // Bebidas
    água: "water",
    suco: "juice",
    "suco de laranja": "orange juice",
    "suco de maçã": "apple juice",
    "suco de uva": "grape juice",
    "suco de limão": "lemon juice",
    refrigerante: "soda",
    "coca-cola": "coca cola",
    pepsi: "pepsi",
    guaraná: "guarana",
    fanta: "fanta",
    sprite: "sprite",
    cerveja: "beer",
    vinho: "wine",
    "vinho tinto": "red wine",
    "vinho branco": "white wine",
    café: "coffee",
    chá: "tea",
    "chá verde": "green tea",
    "chá preto": "black tea",
    "chá de camomila": "chamomile tea",
    mate: "mate",
    chimarrão: "chimarrão",
    energético: "energy drink",
    "red bull": "red bull",
    monster: "monster",

    // Snacks e Doces
    biscoito: "cookie",
    bolacha: "cracker",
    bolo: "cake",
    torta: "pie",
    pudim: "pudding",
    mousse: "mousse",
    chocolate: "chocolate",
    "chocolate ao leite": "milk chocolate",
    "chocolate amargo": "dark chocolate",
    "chocolate branco": "white chocolate",
    doce: "candy",
    bala: "candy",
    pirulito: "lollipop",
    chiclete: "gum",
    balas: "candies",
    guloseimas: "sweets",
    açúcar: "sugar",
    "açúcar refinado": "refined sugar",
    "açúcar mascavo": "brown sugar",
    "açúcar demerara": "demerara sugar",
    mel: "honey",
    "açúcar cristal": "crystal sugar",

    // Leguminosas
    feijão: "beans",
    "feijão preto": "black beans",
    "feijão carioca": "pinto beans",
    "feijão branco": "white beans",
    "feijão fradinho": "black eyed peas",
    "feijão verde": "green beans",
    lentilha: "lentils",
    "grão de bico": "chickpeas",
    "grão-de-bico": "chickpeas",
    ervilha: "peas",
    soja: "soybeans",
    amendoim: "peanuts",
    castanha: "chestnut",
    "castanha do pará": "brazil nuts",
    nozes: "walnuts",
    amêndoas: "almonds",
    avelãs: "hazelnuts",
    pistache: "pistachios",
    macadâmia: "macadamia nuts",

    // Tubérculos
    "batata inglesa": "potato",
    "batata baroa": "parsnip",
    cará: "yam",
    inhame: "yam",

    // Temperos e Condimentos
    sal: "salt",
    "pimenta do reino": "black pepper",
    "pimenta branca": "white pepper",
    "pimenta rosa": "pink pepper",
    canela: "cinnamon",
    cravo: "cloves",
    "noz moscada": "nutmeg",
    gengibre: "ginger",
    açafrão: "turmeric",
    cominho: "cumin",
    coentro: "cilantro",
    salsa: "parsley",
    manjericão: "basil",
    orégano: "oregano",
    tomilho: "thyme",
    louro: "bay leaf",
    vinagre: "vinegar",
    "vinagre balsâmico": "balsamic vinegar",
    "vinagre de maçã": "apple cider vinegar",
    mostarda: "mustard",
    ketchup: "ketchup",
    maionese: "mayonnaise",
    "molho de tomate": "tomato sauce",
    "molho de soja": "soy sauce",
    shoyu: "soy sauce",
    "molho inglês": "worcestershire sauce",
    "pimenta malagueta": "malagueta pepper",
    "pimenta dedo de moça": "finger pepper",
    "pimenta biquinho": "biquinho pepper",
  };

  // Translate Portuguese food name to English
  static translateFoodName(portugueseName: string): string {
    const lowerName = portugueseName.toLowerCase().trim();

    // Direct translation
    if (this.foodTranslations[lowerName]) {
      return this.foodTranslations[lowerName];
    }

    // Try partial matches for compound names
    for (const [pt, en] of Object.entries(this.foodTranslations)) {
      if (lowerName.includes(pt) || pt.includes(lowerName)) {
        return en;
      }
    }

    // If no translation found, return the original name
    return portugueseName;
  }

  // Get all available translations
  static getAllTranslations(): { [key: string]: string } {
    return { ...this.foodTranslations };
  }

  // Add custom translation
  static addTranslation(portuguese: string, english: string): void {
    this.foodTranslations[portuguese.toLowerCase()] = english;
  }

  // Check if translation exists
  static hasTranslation(portugueseName: string): boolean {
    const lowerName = portugueseName.toLowerCase().trim();
    return !!this.foodTranslations[lowerName];
  }
}
