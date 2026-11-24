/**
 * ============================================================================
 * CAFÉ ALEGRA · Catálogo Oficial de Productos y Definiciones de Datos
 * ============================================================================
 * Archivo: products.js
 * Descripción:
 *   Define la fuente de verdad del catálogo comercial de Café Alegra para la
 *   tienda web y la maqueta 1:1. Contiene:
 *     1. Historias editoriales y fichas de autor (window.COFFEE_STORIES).
 *     2. Taxonomía de categorías y navegación (window.CATEGORIES).
 *     3. Cafés de especialidad de origen único (ORIGINS).
 *     4. Accesorios y complementos cafeteros (COMPLEMENTS).
 *     5. Colección Praliné de autor con frutos secos reales (ASSEMBLAGES).
 *     6. Generación dinámica de variantes y catálogo global (window.PRODUCTS).
 *     7. Reglas de envío, formato de moneda (CLP) y utilidades de búsqueda.
 *
 * Todos los precios están expresados en pesos chilenos (CLP) con IVA incluido.
 * ============================================================================
 */

/* ============================================================================
 * 1. HISTORIAS DETALLADAS POR CAFÉ (Módulo "Saber Más" y Blog)
 * ============================================================================
 * Contenido editorial enriquecido para cada variedad de café. Se despliega
 * en las fichas de producto al interactuar con el botón "¿Quieres saber más?"
 * y enlaza a los artículos de fondo en el blog de especialidad.
 */
window.COFFEE_STORIES = {
  // Historia y territorio: Café de Especialidad Guatemala (Bourbon & Catuaí)
  "origen-guatemala": {
    title: "Historia y Territorio · Guatemala",
    kicker: "Café de Especialidad · Origen Único",
    lead: "De las laderas volcánicas sobre los 1.500 metros de altura a la tostaduría en Rancagua.",
    body: "Cultivado en suelos volcánicos de alta montaña que propician una maduración lenta del fruto, este café de Guatemala destaca por su acidez brillante y notas aromáticas florales y achocolatadas. La combinación de los varietales Bourbon y Catuai otorga un cuerpo sedoso con notas de ciruela roja y caramelo dulce. En Café Alegra aplicamos una curva de tueste medio para respetar y enaltecer su perfil dulce natural.",
    facts: [
      { k: "Región y Altura", v: "Sobre 1.500 msnm, suelos volcánicos" },
      { k: "Varietales", v: "Bourbon & Catuai 100% arábica" },
      { k: "Puntaje SCA", v: "85 puntos (Especialidad)" },
      { k: "Proceso", v: "Lavado tradicional y secado controlado" },
      { k: "Tueste en Rancagua", v: "Curva media para resaltar dulzor y flores" }
    ],
    articleUrl: "articulo-origen-y-territorio.html"
  },

  // Historia y territorio: Café de Especialidad Bolivia Caranavi
  "origen-bolivia": {
    title: "Historia y Territorio · Bolivia Caranavi",
    kicker: "Café de Especialidad · Origen Único",
    lead: "La exuberancia de los Yungas paceños condensada en una taza dulce y equilibrada.",
    body: "En las estribaciones de la cordillera andina, la zona de Caranavi ofrece un microclima de nieblas y vegetación tupida a 1.450 msnm. Su proceso de lavado con fermentación de 24 horas libera notas exquisitas de miel de caña, limón dulce y cacao fino. El tueste medio suave ejecutado en Rancagua preserva sus aceites florales y redondez en boca.",
    facts: [
      { k: "Origen", v: "Caranavi, Los Yungas, La Paz (1.450 msnm)" },
      { k: "Varietales", v: "Caturra y Castillo 100% arábica" },
      { k: "Puntaje SCA", v: "84 puntos (Especialidad)" },
      { k: "Proceso", v: "Lavado con fermentación húmeda 24 h" },
      { k: "Tueste en Rancagua", v: "Medio suave para preservar notas mieladas" }
    ],
    articleUrl: "articulo-procesos-lavado-natural-honey.html"
  },

  // Historia y territorio: Café de Especialidad Colombia (Varietal Castillo)
  "origen-colombia": {
    title: "Historia y Territorio · Colombia",
    kicker: "Café de Especialidad · Origen Único",
    lead: "El carácter, cuerpo intenso y aroma envolvente de las montañas colombianas.",
    body: "Nacido en fincas de alta montaña sobre los 1.600 msnm en reconocidas regiones cafetaleras colombianas (Huila/Antioquia). El varietal Castillo procesado por lavado tradicional y secado al sol en patio entrega una taza robusta, con notas persistentes de caramelo dulce, panela y cacao intenso. Su tueste medio intenso es la compañía perfecta para el ritual diario de espresso o cafetera italiana.",
    facts: [
      { k: "Origen", v: "Cordillera Central sobre 1.600 msnm" },
      { k: "Varietal", v: "Castillo 100% arábica" },
      { k: "Puntaje SCA", v: "85 puntos (Especialidad)" },
      { k: "Proceso", v: "Lavado y secado en patio" },
      { k: "Tueste en Rancagua", v: "Medio intenso con gran cuerpo" }
    ],
    articleUrl: "articulo-origen-y-territorio.html"
  },

  // Historia de Autor: Colección Praliné · Avellana Chilena & Caramelo
  "praline-avellana": {
    title: "Historia de Autor · Avellana Chilena & Caramelo",
    kicker: "Historia de Autor · Tostaduría en Rancagua",
    lead: "El carácter rústico, auténtico y noble del bosque chileno.",
    body: "Desde los bosques de Chile llega el carácter de la avellana chilena: auténtica, rústica y llena de fuerza. En Café Alegra trabajamos avellanas chilenas reales, cuidadosamente tostadas y molidas, para crear un ensamble que invita a concentrarse y avanzar con decisión. Avellana Chilena & Caramelo acompaña esos instantes en que hace falta claridad, firmeza y confianza para elegir el próximo camino.",
    facts: [
      { k: "Concepto", v: "Ensamble de Autor con avellanas chilenas reales" },
      { k: "Variedad", v: "100% arábica tostado y molido en Rancagua" },
      { k: "Formatos", v: "100 g ($7.000) y 250 g ($14.000)" },
      { k: "Molienda", v: "Media, para prensa francesa y cafeteras automáticas" },
      { k: "Tueste", v: "Medio-medio artesanal" }
    ],
    articleUrl: "praline-avellana.html"
  },

  // Historia de Autor: Colección Praliné · Nuez & Caramelo
  "praline-nuez": {
    title: "Historia de Autor · «La calidez del encuentro»",
    kicker: "Historia de Autor · Tostaduría en Rancagua",
    lead: "Un café elegante y acogedor para compartir, escuchar y disfrutar sin prisa.",
    body: "Nuez & Caramelo nace de esos momentos en que el tiempo parece detenerse: una conversación que se prolonga, la compañía de quienes queremos, un libro abierto o la música de fondo. En Café Alegra trabajamos nueces reales, cuidadosamente preparadas y molidas, para crear junto al café de especialidad y el caramelo un ensamble cálido, elegante y acogedor. Un café para compartir, escuchar y disfrutar sin prisa.",
    facts: [
      { k: "Concepto", v: "Ensamble de Autor con nueces reales" },
      { k: "Variedad", v: "100% arábica tostado y molido en Rancagua" },
      { k: "Formatos", v: "100 g ($7.000) y 250 g ($14.000)" },
      { k: "Molienda", v: "Media, para prensa francesa y cafeteras automáticas" },
      { k: "Tueste", v: "Medio-medio artesanal" }
    ],
    articleUrl: "praline-nuez.html"
  },

  // Historia de Autor: Colección Praliné · Pistacho & Caramelo con notas de amaretto
  "praline-pistacho": {
    title: "Historia de Autor · «La alegría de compartir»",
    kicker: "Historia de Autor · Tostaduría en Rancagua",
    lead: "Un ensamble brillante, alegre y expresivo con delicadas notas de amaretto.",
    body: "Hay cafés que acompañan el silencio y otros que despiertan conversaciones. Pistacho & Caramelo nace para compartir la alegría de estar juntos. En Café Alegra seleccionamos y trabajamos pistachos reales, que incorporamos artesanalmente al café de especialidad junto al caramelo. Sus delicadas notas de amaretto completan una creación brillante, alegre y expresiva. Un ensamble pensado para las reuniones entre amigos, las celebraciones espontáneas y esos momentos sencillos que se transforman en recuerdos especiales.",
    facts: [
      { k: "Concepto", v: "Ensamble de Autor con pistachos reales" },
      { k: "Variedad", v: "100% arábica tostado y molido en Rancagua" },
      { k: "Notas aromáticas", v: "Caramelo y notas de amaretto (sin alcohol)" },
      { k: "Formatos", v: "100 g ($7.000) y 250 g ($14.000)" },
      { k: "Molienda", v: "Media, para prensa francesa y cafeteras automáticas" },
      { k: "Tueste", v: "Medio-medio artesanal" }
    ],
    articleUrl: "praline-pistacho.html"
  },

  // Historia patrimonial: Café de Higos (sin cafeína)
  "cafe-de-higos": {
    title: "Historia Campesina · El Café de Higos",
    kicker: "Cafés de Nuestra Tradición · Sin Cafeína",
    lead: "El rescate de una bebida patrimonial campesina de la VI Región de Chile.",
    body: "Durante generaciones, las familias campesinas del valle central recolectaban los higos más dulces al término del verano para secarlos al sol, tostarlos lentamente y molerlos como alternativa caliente y reconfortante. Café Alegra rescata esta receta ancestral bajo rigurosos estándares artesanales: 100% natural, sin aditivos, sin azúcar añadida y naturalmente libre de cafeína.",
    facts: [
      { k: "Origen", v: "Valle Central de la VI Región, Chile" },
      { k: "Ingrediente", v: "Higos maduros seleccionados" },
      { k: "Proceso", v: "Cortado, deshidratado al sol, tostado y molido" },
      { k: "Cafeína", v: "0% (naturalmente libre de cafeína)" },
      { k: "Cualidad", v: "Reconfortante, digestivo y dulce natural" }
    ],
    articleUrl: "articulo-cafe-de-trigo.html"
  },

  // Historia patrimonial: Café de Trigo (sin cafeína)
  "cafe-de-trigo": {
    title: "Historia Campesina · El Café de Trigo",
    kicker: "Cafés de Nuestra Tradición · Sin Cafeína",
    lead: "El grano de trigo que se convirtió en el punto de partida de Café Alegra.",
    body: "El café de trigo es uno de los mayores emblemas de la memoria campesina chilena. Tostado en paila o en horno de barro, acompañó los inviernos de generaciones. Café Alegra nació en Rancagua precisamente para rescatar este patrimonio y darle una presentación contemporánea y cuidada, con variedades puras y aromatizadas.",
    facts: [
      { k: "Origen", v: "Tradición campesina de la VI Región" },
      { k: "Ingrediente", v: "Trigo chileno tostado artesanalmente" },
      { k: "Estado Comercial", v: "Estructura preparada · Venta en reserva de cosecha" },
      { k: "Cafeína", v: "0% (libre de cafeína y vegano)" }
    ],
    articleUrl: "articulo-cafe-de-trigo.html"
  }
};

/* ============================================================================
 * 2. CATEGORÍAS PRINCIPALES DEL CATÁLOGO
 * ============================================================================
 * Estructura de navegación para agrupar los productos en la tienda y menús.
 */
window.CATEGORIES = {
  especialidad: {
    name: "Cafés de origen",
    page: "cafe-de-especialidad.html#origenes",
    blurb: "Guatemala, Bolivia y Colombia"
  },
  autor: {
    name: "Colección Praliné",
    page: "cafe-de-especialidad.html#sabores-de-autor",
    blurb: "Nuez, avellana chilena y pistacho"
  },
  complementos: {
    name: "Complementos cafeteros",
    page: "complementos.html",
    blurb: "Prensas, teteras y cafeteras"
  }
};

/* ============================================================================
 * 3. CAFÉS DE ESPECIALIDAD DE ORIGEN ÚNICO (Base de datos de Orígenes)
 * ============================================================================
 * Cada origen define:
 *   - id: identificador base único.
 *   - name: nombre público del origen.
 *   - price: valor unitario en CLP para formato 250 g.
 *   - img: nombre del archivo de imagen en assets/img/.
 *   - short: descripción sensorial breve.
 *   - desc: ficha técnica de altura, varietal, proceso y puntaje SCA.
 *   - prep: recomendación técnica de preparación.
 *   - methods: métodos de extracción sugeridos.
 *   - notes: etiquetas clave de cata y origen.
 *   - roast: nivel de tueste artesanal aplicado en Rancagua.
 */
const ORIGINS = [
  {
    id: "guatemala",
    name: "Guatemala",
    price: 13500,
    img: "catalogo-guatemala.png",
    short: "Azúcar morena, cacao cremoso, chocolate amargo y ciruela. Acidez delicada y cuerpo limpio.",
    desc: "Sierra Madre, Guatemala. Proceso lavado. Bourbon y Catuaí, sobre 1.500 msnm; 85 puntos SCA.",
    prep: "Ideal en prensa francesa o métodos de filtrado.",
    methods: ["grano", "prensa", "filtrado"],
    notes: ["Bourbon y Catuaí", "1.500 msnm", "Lavado", "85 SCA"],
    roast: { label: "Medio", tone: "medio" },
    sourcePage: 4
  },
  {
    id: "bolivia",
    name: "Bolivia",
    price: 12000,
    img: "catalogo-bolivia.png",
    short: "Caramelo y miel, acidez de limón dulce y cuerpo redondo.",
    desc: "Caranavi, Los Yungas, La Paz. Lavado con fermentación de 24 horas. Castillo y Caturra, sobre 1.450 msnm; 84 puntos SCA.",
    prep: "Ideal para espresso y cafetera italiana (moka).",
    methods: ["grano", "italiana", "espresso"],
    notes: ["Castillo y Caturra", "Caramelo y miel", "1.450 msnm", "84 SCA"],
    roast: { label: "Medio suave", tone: "suave" },
    sourcePage: 5
  },
  {
    id: "colombia",
    name: "Colombia",
    price: 13000,
    img: "catalogo-colombia.png",
    short: "Caramelo y miel de caña. Acidez balanceada y cuerpo medio envolvente.",
    desc: "Cordillera Central, sobre 1.600 msnm. Varietal Castillo, proceso lavado; 85 puntos SCA.",
    prep: "Ideal en prensa francesa o métodos de filtrado.",
    methods: ["grano", "prensa", "filtrado"],
    notes: ["Castillo", "Caramelo y miel de caña", "1.600 msnm", "85 SCA"],
    roast: { label: "Medio intenso", tone: "intenso" },
    sourcePage: 6
  },
  {
    id: "colombia-huila",
    name: "Colombia Huila",
    price: 13000,
    img: "catalogo-colombia.png",
    short: "Caña de azúcar, chocolate de leche y mandarina. Acidez brillante (media-alta) y cuerpo redondo.",
    desc: "Huila, Colombia. Blend de Caturra y Colombia, 1.700–1.800 msnm, proceso lavado; 86 puntos SCA.",
    prep: "Ideal en prensa francesa o métodos de filtrado.",
    methods: ["grano", "prensa", "filtrado"],
    notes: ["Blend Caturra y Colombia", "1.700–1.800 msnm", "Lavado", "86 SCA"],
    roast: { label: "Medio claro", tone: "suave" },
    sourcePage: 6
  }
];

/* ============================================================================
 * 4. COMPLEMENTOS Y ACCESORIOS CAFETEROS
 * ============================================================================
 * Equipamiento para métodos de extracción por inmersión y fuego directo.
 */
const COMPLEMENTS = [
  {
    id: "cafetera-moka-roja",
    reference: "cafetera-moka-roja",
    referenceName: "Cafetera Italiana Moka Roja",
    cat: "complementos",
    collection: "complementos",
    name: "Cafetera Italiana Moka Roja · 3 Tazas",
    sub: "Moka",
    size: "3 tazas",
    grind: "",
    price: 16990,
    img: "cafetera-italiana-roja.webp",
    short: "Cuerpo de aluminio y válvula de seguridad. Ideal para extracciones con cuerpo e intensidad.",
    notes: ["Aluminio clásico", "Fuego directo", "3 tazas"],
    desc: "Clásica cafetera italiana Moka para fuego directo. Prepara un café concentrado y aromático, ideal para disfrutar solo o con leche.",
    prep: "Fuego medio-bajo, molienda media-fina, verter agua caliente en la base hasta la válvula.",
    sourcePage: 0,
    q: { caf: 0, sabor: "", met: ["italiana"], regalo: 1 }
  },
  {
    id: "prensa-francesa-cobre",
    reference: "prensa-francesa-cobre",
    referenceName: "Cafetera Prensa Francesa Cobre",
    cat: "complementos",
    collection: "complementos",
    name: "Cafetera Prensa Francesa Cobre · 350 ml",
    sub: "Prensa",
    size: "350 ml",
    grind: "",
    price: 19990,
    img: "cafetera-francesa-cobre.webp",
    short: "Vidrio borosilicato y acabado cobrizo Café Alegra. Extracción limpia y equilibrada por inmersión.",
    notes: ["Vidrio borosilicato", "Filtro acero inox", "Tono cobrizo"],
    desc: "Prensa francesa elegante que armoniza con los tonos cobrizos de Café Alegra. Filtro de acero inoxidable de malla fina para una taza sedosa.",
    prep: "Molienda gruesa, agua a 92°C, 4 minutos de infusión antes de bajar el émbolo suavemente.",
    sourcePage: 0,
    q: { caf: 0, sabor: "", met: ["prensa"], regalo: 1 }
  }
];

/* ============================================================================
 * 5. COLECCIÓN PRALINÉ · SABORES DE AUTOR
 * ============================================================================
 * Creaciones exclusivas de Café Alegra: café 100% arábica de especialidad
 * combinado con frutos secos reales cuidadosamente tostados y molidos.
 * Disponibles en dos formatos: 100 g ($7.000) y 250 g ($14.000).
 */
const ASSEMBLAGES = [
  {
    id: "nuez",
    name: "Nuez & Caramelo",
    fullName: "Ensamble Praliné Nuez & Caramelo",
    img: "catalogo-nuez.png",
    short: "Notas de nuez tostada y caramelo, con un cuerpo redondo y sedoso.",
    desc: "Nuez & Caramelo nace de esos momentos en que el tiempo parece detenerse. En Café Alegra trabajamos nueces reales, cuidadosamente preparadas y molidas, para crear junto al café de especialidad y el caramelo un ensamble cálido, elegante y acogedor.",
    prep: "Molienda media, ideal para prensa francesa y máquinas automáticas compatibles con café molido.",
    roast: { label: "Tueste: medio-medio", tone: "medio" },
    sensoryNotes: ["Nuez tostada", "Caramelo dulce", "Cuerpo sedoso"],
    inspirationTitle: "La calidez del encuentro",
    inspirationText: "Un café elegante y acogedor, para conversaciones sin prisa, un buen libro, escuchar música o disfrutar de quienes queremos.",
    flavor: "nueces",
    methods: ["prensa", "filtrado"]
  },
  {
    id: "avellana",
    name: "Avellana Chilena & Caramelo",
    fullName: "Ensamble Praliné Avellana Chilena & Caramelo",
    img: "catalogo-avellana.png",
    short: "Notas de avellana chilena tostada y caramelo, con acidez equilibrada, sabor intenso y cuerpo ligero. Un café de carácter rústico, fuerte y decidido.",
    desc: "Desde los bosques de Chile llega el carácter de la avellana chilena: auténtica, rústica y llena de fuerza. En Café Alegra trabajamos avellanas chilenas reales, cuidadosamente tostadas y molidas, para crear un ensamble que invita a concentrarse y avanzar con decisión.",
    prep: "Molienda media, ideal para prensa francesa y máquinas automáticas compatibles con café molido.",
    roast: { label: "Tueste: medio-medio", tone: "medio" },
    sensoryNotes: ["Acidez equilibrada", "Sabor intenso", "Cuerpo ligero"],
    inspirationTitle: "El carácter de decidir",
    inspirationText: "Un café inspirado en la fuerza del bosque chileno y la nobleza de la avellana. Ideal para momentos de concentración, nuevos proyectos y decisiones importantes.",
    flavor: "nueces",
    methods: ["prensa", "filtrado"]
  },
  {
    id: "pistacho",
    name: "Pistacho & Caramelo",
    subtitle: "con notas de amaretto",
    fullName: "Ensamble Praliné Pistacho & Caramelo",
    img: "catalogo-pistacho.png",
    short: "Notas de pistacho tostado y caramelo, con delicados matices de amaretto. Un ensamble expresivo y envolvente, de personalidad alegre y luminosa.",
    desc: "Hay cafés que acompañan el silencio y otros que despiertan conversaciones. En Café Alegra seleccionamos y trabajamos pistachos reales, que incorporamos artesanalmente al café de especialidad junto al caramelo y delicadas notas de amaretto.",
    prep: "Molienda media, ideal para prensa francesa y máquinas automáticas compatibles con café molido.",
    roast: { label: "Tueste: medio-medio", tone: "medio" },
    sensoryNotes: ["Pistacho tostado", "Caramelo dulce", "Notas de amaretto"],
    inspirationTitle: "La alegría de compartir",
    inspirationText: "Un café brillante y alegre, para reuniones de amigos, celebraciones y momentos que se disfrutan en buena compañía.",
    flavor: "exotico",
    methods: ["prensa", "filtrado"]
  }
];

/* ============================================================================
 * 6. GENERACIÓN DINÁMICA DE PRODUCTOS Y VARIANTES (window.PRODUCTS)
 * ============================================================================
 * Mapea:
 *   a) Orígenes únicos: 2 variantes de molienda por café ("grano" y "molido")
 *      en presentación de 250 g.
 *   b) Colección Praliné: 2 variantes de gramaje por ensamble (100 g y 250 g),
 *      ambas con molienda media calibrada.
 *   c) Complementos: artículos de preparación y cafeteras.
 */
window.PRODUCTS = ORIGINS.flatMap(function (origin) {
  return ["grano", "molido"].map(function (grind) {
    var presentation = grind === "grano" ? "Grano entero" : "Molido";
    var roastTone = origin.roast ? origin.roast.tone : (origin.id === "bolivia" ? "suave" : origin.id === "colombia" ? "intenso" : "medio");
    var roastLabel = origin.roast ? origin.roast.label : (origin.id === "bolivia" ? "Medio suave" : origin.id === "colombia" ? "Medio intenso" : "Medio");
    var refName = origin.id === "colombia-huila" ? "Microlote Colombia · Huila (86 SCA)" : (origin.id === "guatemala" ? "Café de Especialidad Guatemala (85 SCA)" : (origin.id === "bolivia" ? "Café de Especialidad Bolivia Caranavi (84 SCA)" : "Café de Especialidad Colombia (85 SCA)"));
    return {
      id: "origen-" + origin.id + "-" + grind,
      reference: "origen-" + origin.id,
      referenceName: refName,
      roast: { label: roastLabel, tone: roastTone },
      cat: "especialidad",
      collection: "origen",
      name: (origin.id === "colombia-huila" ? "Microlote Colombia · Huila" : "Café de Especialidad " + origin.name) + " · " + presentation,
      sub: origin.name,
      size: "250 g",
      grind: grind,
      price: origin.price,
      img: origin.img,
      short: origin.short,
      notes: origin.notes.concat(presentation),
      desc: origin.desc,
      prep: origin.prep,
      sourcePage: origin.sourcePage,
      q: {
        caf: 1,
        sabor: "puro",
        met: grind === "grano" ? ["grano"] : origin.methods.filter(function (m) { return m !== "grano"; }),
        regalo: 0
      }
    };
  });
}).concat(ASSEMBLAGES.flatMap(function (blend) {
  return [100, 250].map(function (weight) {
    return {
      id: "praline-" + blend.id + "-" + weight,
      reference: "praline-" + blend.id,
      referenceName: blend.fullName,
      cat: "autor",
      collection: "autor",
      name: blend.fullName,
      sub: blend.name,
      size: weight + " g",
      grind: "molido",
      price: weight === 100 ? 7000 : 14000,
      img: blend.img,
      short: blend.short,
      notes: ["100% arábica", "Molido (" + weight + " g)", "Frutos secos reales"],
      desc: blend.desc,
      prep: blend.prep,
      roast: blend.roast,
      sensoryNotes: blend.sensoryNotes,
      inspirationTitle: blend.inspirationTitle,
      inspirationText: blend.inspirationText,
      q: { caf: 1, sabor: blend.flavor, met: blend.methods, regalo: 0 }
    };
  });
})).concat(COMPLEMENTS);

/* ============================================================================
 * 7. CONFIGURACIÓN DE ENVÍOS, PROMOCIONES Y FUNCIONES DE UTILIDAD
 * ============================================================================
 */
// Política oficial de despachos: Blue Express a todo Chile
window.SHIPPING_NOTE = "Despachos a todo Chile mediante Blue Express. Las tarifas de envío se calculan según región y comuna en el checkout. No aplica despacho gratuito.";
window.FREE_SHIP = null;

// Lista de identificadores de productos agotados (vacía: stock disponible)
window.SOLDOUT = [];

// Cupón de bienvenida opcional para checkout
window.COUPON = { code: "MIPRIMERCAFE", pct: 0 };

/**
 * Formatea un valor numérico a moneda local chilena (CLP, ej: $13.000).
 * @param {number} n - Valor en pesos.
 * @returns {string} Texto formateado con símbolo de moneda y separador de miles.
 */
window.money = function (n) {
  return "$" + Math.round(n).toLocaleString("es-CL");
};

/**
 * Busca un producto por su id de variante o referencia base.
 * @param {string} id - Identificador del producto.
 * @returns {Object|undefined} Objeto de producto coincidente.
 */
window.findProduct = function (id) {
  return window.PRODUCTS.find(function (p) {
    return p.id === id;
  });
};
