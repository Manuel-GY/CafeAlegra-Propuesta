/* Fuente: catálogo minorista del cliente, páginas 4-11. Precios en CLP, IVA incluido. */
window.CATEGORIES = {
  especialidad: { name: "Cafés de origen", page: "cafe-de-especialidad.html#origenes", blurb: "Guatemala, Bolivia y Colombia" },
  autor: { name: "Ensambles Praliné", page: "cafe-de-especialidad.html#sabores-de-autor", blurb: "Avellana, nuez y pistacho" }
};

const ORIGINS = [
  { id: "guatemala", name: "Guatemala", price: 14500, img: "catalogo-guatemala.png", short: "Notas florales, chocolate amargo, caramelo dulce y ciruela roja. Cuerpo cremoso.", desc: "Tueste medio. Proceso lavado. Bourbon y Catuai, sobre 1.500 msnm; 85 puntos SCA.", prep: "Espresso: dulce, de cuerpo intenso. Filtrados: resaltan notas frutales y florales.", methods: ["grano", "prensa", "italiana"], notes: ["100% arábica", "Tueste medio"], sourcePage: 4 },
  { id: "bolivia", name: "Bolivia", price: 12000, img: "catalogo-bolivia.png", short: "Limón dulce, cacao dulce, caramelo suave y notas mieladas. Cuerpo redondo.", desc: "Caranavi, Los Yungas, La Paz. Tueste medio suave. Lavado con fermentación de 24 horas. Caturra y Castillo, sobre 1.450 msnm; 84 puntos SCA.", prep: "Espresso: suave, de cuerpo equilibrado. Filtrados: resaltan notas frutales y mieladas.", methods: ["grano", "prensa", "italiana"], notes: ["100% arábica", "Tueste medio suave"], sourcePage: 5 },
  { id: "colombia", name: "Colombia", price: 13000, img: "catalogo-colombia.png", short: "Aroma intenso, miel de caña, caramelo dulce y cacao intenso. Cuerpo redondo.", desc: "Tueste medio intenso. Lavado y secado en patio. Varietal Castillo, sobre 1.600 msnm; 85 puntos SCA.", prep: "Espresso: intenso, con gran cuerpo. Cafeteras automáticas: ideal para uso diario.", methods: ["grano", "italiana", "practico"], notes: ["100% arábica", "Tueste medio intenso"], sourcePage: 6 }
];
const ASSEMBLAGES = [
  { id: "avellana", name: "Avellana & Caramelo", img: "catalogo-avellana.png", short: "Avellana tostada, caramelo dulce, perfil intenso y final rústico. Cuerpo cremoso.", desc: "La avellana chilena se une al dulzor del caramelo para crear una taza cálida y llena de personalidad.", prep: "Prensa francesa: cremoso y aromático. Moka italiana: profundo y persistente. Espresso: cremoso.", flavor: "nueces", methods: ["prensa", "italiana"], sourcePage: 8 },
  { id: "nuez", name: "Nuez & Caramelo", img: "catalogo-nuez.png", short: "Nuez tostada, caramelo dulce, aroma suave y final redondo. Cuerpo sedoso.", desc: "Los aceites naturales de la nuez aportan una textura sedosa y un aroma suave.", prep: "Prensa francesa: textura sedosa y redonda. Espresso suave: equilibrio y elegancia. Filtrados: aroma limpio y delicado.", flavor: "nueces", methods: ["prensa", "italiana"], sourcePage: 9 },
  { id: "pistacho", name: "Pistacho, Amaretto & Caramelo", img: "catalogo-pistacho.png", short: "Pistacho tostado, caramelo dulce, amaretto gourmet y final exótico. Sabor intenso.", desc: "Una combinación donde el amaretto y el caramelo potencian el toque gourmet del pistacho.", prep: "Filtrados: aromas más complejos. Prensa francesa: final largo y envolvente. Espresso: intensidad gourmet.", flavor: "exotico", methods: ["prensa", "italiana"], sourcePage: 10 }
];

window.PRODUCTS = ORIGINS.flatMap(function (origin) {
  return ["grano", "molido"].map(function (grind) {
    var presentation = grind === "grano" ? "Grano entero" : "Molienda media";
    return {
      id: "origen-" + origin.id + "-" + grind, reference: "origen-" + origin.id,
      referenceName: "Café de Origen " + origin.name,
      roast: { label: origin.id === "bolivia" ? "Medio suave" : origin.id === "colombia" ? "Medio intenso" : "Medio", tone: origin.id === "bolivia" ? "suave" : origin.id === "colombia" ? "intenso" : "medio" },
      cat: "especialidad", collection: "origen",
      name: "Café de Origen " + origin.name + " · " + presentation, sub: origin.name,
      size: "250 g", grind: grind, price: origin.price, img: origin.img,
      short: origin.short, notes: origin.notes.concat(presentation), desc: origin.desc,
      prep: origin.prep, sourcePage: origin.sourcePage,
      q: { caf: 1, sabor: "puro", met: grind === "grano" ? ["grano"] : origin.methods.filter(function (m) { return m !== "grano"; }), regalo: 0 }
    };
  });
}).concat(ASSEMBLAGES.flatMap(function (blend) {
  return [100, 250].map(function (weight) {
    return {
      id: "praline-" + blend.id + "-" + weight, reference: "praline-" + blend.id,
      referenceName: "Ensamble Praliné " + blend.name, cat: "autor", collection: "autor",
      name: "Ensamble Praliné " + blend.name, sub: blend.name, size: weight + " g",
      grind: "molido", price: weight === 100 ? 7000 : 14000, img: blend.img,
      short: blend.short, notes: ["100% arábica", "Molido", "Base de Guatemala"],
      desc: blend.desc + " Base de café de Guatemala, proceso lavado, sobre 1.500 msnm; 85 puntos SCA.",
      prep: blend.prep, sourcePage: blend.sourcePage,
      q: { caf: 1, sabor: blend.flavor, met: blend.methods, regalo: 0 }
    };
  });
}));
window.SHIPPING_NOTE = "El catálogo minorista no especifica tarifas ni plazos de envío. Confirmar condiciones con Café Alegra. El checkout de este demo es simulado.";
window.FREE_SHIP = 40000;
// Demostración del estado "Agotado": en el sitio real se activa desde WooCommerce.
window.SOLDOUT = ["praline-pistacho"];
window.COUPON = { code: "MIPRIMERCAFE", pct: 0 };
window.money = n => "$" + Math.round(n).toLocaleString("es-CL");
window.findProduct = id => window.PRODUCTS.find(p => p.id === id);
