/* Café Alegra · Propuesta · main.js (sin dependencias) */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  var money = window.money, P = window.PRODUCTS || [], find = window.findProduct;
  function escapeHTML(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  var pendingCatalogPages = ["packs.html", "set-descubrimiento.html"];
  if (pendingCatalogPages.indexOf(location.pathname.split("/").pop()) !== -1) {
    $("#main").innerHTML = '<section class="section"><div class="wrap"><h1>Catálogo pendiente</h1><p class="lead">Esta línea no aparece en el catálogo minorista enviado. No se ofrecen productos, precios ni promociones sin respaldo del cliente.</p><a class="btn" href="tienda.html">Ver productos del catálogo actualizado</a></div></section>';
  }

  /* ---------- Iconos ---------- */
  var ICONS = {
    cart: '<path d="M3 4h2l2.2 11h10.6L20 8H6.2"/><circle cx="9" cy="19.5" r="1.3"/><circle cx="17" cy="19.5" r="1.3"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c.8-4 4-6 8-6s7.2 2 8 6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    truck: '<path d="M2 6h11v10H2zM13 9h4l3 3v4h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/>',
    leaf: '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19c3-5 6-8 10-10"/>',
    wheat: '<path d="M12 22V9M12 9c-2.5-.5-3.5-2.5-3.5-5 2.5.5 3.5 2.5 3.5 5zM12 9c2.5-.5 3.5-2.5 3.5-5-2.5.5-3.5 2.5-3.5 5zM12 15c-2.5-.5-3.5-2.5-3.5-5M12 15c2.5-.5 3.5-2.5 3.5-5M12 20c-2-.4-3-2-3-4M12 20c2-.4 3-2 3-4"/>',
    bean: '<ellipse cx="12" cy="12" rx="6" ry="9" transform="rotate(35 12 12)"/><path d="M9.5 5.5c4 3 1.5 6.5 5 13"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="1"/><path d="M8 11V8a4 4 0 018 0v3"/>',
    instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6"/>',
    facebook: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5c0-.3.2-.5.5-.5z"/>',
    whatsapp: '<path d="M4 20l1.3-4.2A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 .7c-1-.4-2-1.4-2.4-2.4l.7-1-1-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 6l9 7 9-7"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin: '<path d="M12 21s7-6 7-11a7 7 0 00-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    cup: '<path d="M5 9h12v5a5 5 0 01-5 5h-2a5 5 0 01-5-5z"/><path d="M17 10h1.5a2.5 2.5 0 010 5H17M9 3c0 1.5 1 1.5 1 3M13 3c0 1.5 1 1.5 1 3"/>',
    nocaf: '<ellipse cx="12" cy="12" rx="5.5" ry="8.5" transform="rotate(35 12 12)"/><path d="M9.5 6c3.5 3 1.5 6 4.5 12"/><path d="M3 3l18 18"/>',
    vegan: '<path d="M12 21V11M12 11c0-4 2.5-6.5 7-7 0 4.5-2.5 7-7 7zM12 14c0-3-2-5-6-5.5 0 3.5 2 5.5 6 5.5z"/>',
    nosugar: '<path d="M6 9l6-3 6 3v7l-6 3-6-3z"/><path d="M6 9l6 3 6-3M12 12v7"/><path d="M3 3l18 18"/>',
    gift: '<rect x="4" y="9" width="16" height="11"/><path d="M3 9h18M12 9v11M12 9c-3 0-4-4-1-4s1 4 1 4zm0 0c3 0 4-4 1-4s-1 4-1 4z"/>',
    heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.500-7 10-7 10z"/>',
    star: '<path d="M12 4l2.4 5 5.600.7-4.100 3.800 1.100 5.500L12 16.400 7 19l1.100-5.500L4 9.700 9.600 9z"/>'
  };
  window.CA_ICONS = ICONS;
  var sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">';
  Object.keys(ICONS).forEach(function (k) { sprite += '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + ICONS[k] + "</symbol>"; });
  sprite += '<symbol id="logo-mark" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="24" cy="24" r="18.500" fill="none" stroke="currentColor" stroke-width=".5" stroke-dasharray="1.500 2.500"/><path d="M24 40V15" stroke="currentColor" stroke-width="1.400" fill="none"/><g fill="currentColor"><ellipse cx="24" cy="11" rx="2" ry="4.200"/><ellipse cx="19.300" cy="19.500" rx="1.900" ry="4.300" transform="rotate(-38 19.300 19.500)"/><ellipse cx="28.700" cy="19.500" rx="1.900" ry="4.300" transform="rotate(38 28.700 19.500)"/><ellipse cx="19.300" cy="27.500" rx="1.900" ry="4.300" transform="rotate(-38 19.300 27.500)"/><ellipse cx="28.700" cy="27.500" rx="1.900" ry="4.300" transform="rotate(38 28.700 27.500)"/><ellipse cx="20" cy="34.500" rx="1.600" ry="3.600" transform="rotate(-38 20 34.500)"/><ellipse cx="28" cy="34.500" rx="1.600" ry="3.600" transform="rotate(38 28 34.500)"/></g></symbol></svg>';
  document.body.insertAdjacentHTML("afterbegin", sprite);
  var ic = function (n, c) { return '<svg class="i ' + (c || "") + '" aria-hidden="true" focusable="false"><use href="#i-' + n + '"/></svg>'; };
  window.ca_icon = ic;

  /* ---------- Carrito ---------- */
  var Cart = {
    items: function () {
      return store.get("ca_cart", []).filter(function (i) {
        var prod = find(i.id);
        if (!prod) return false;
        var isSold = (window.SOLDOUT || []).indexOf(prod.reference) > -1 || (window.SOLDOUT || []).indexOf(prod.id) > -1;
        return !isSold;
      });
    },
    save: function (a) { store.set("ca_cart", a); document.dispatchEvent(new CustomEvent("cart:change")); },
    add: function (id, q) {
      var prod = find(id);
      if (!prod) return false;
      var isSold = (window.SOLDOUT || []).indexOf(prod.reference) > -1 || (window.SOLDOUT || []).indexOf(prod.id) > -1;
      if (isSold) {
        toast("El producto <strong>" + (prod.referenceName || prod.name) + "</strong> está temporalmente agotado.");
        return false;
      }
      var a = Cart.items(), it = a.filter(function (x) { return x.id === id; })[0];
      if (it) it.qty = Math.min(99, it.qty + q); else a.push({ id: id, qty: q });
      Cart.save(a);
      return true;
    },
    set: function (id, q) {
      var a = Cart.items();
      a = q <= 0 ? a.filter(function (x) { return x.id !== id; }) : a.map(function (x) { if (x.id === id) x.qty = Math.min(99, q); return x; });
      Cart.save(a);
    },
    clear: function () { Cart.save([]); },
    count: function () { return Cart.items().reduce(function (s, i) { return s + i.qty; }, 0); },
    coupon: function () { return store.get("ca_coupon", null) === window.COUPON.code ? window.COUPON.code : null; },
    totals: function () {
      var sub = Cart.items().reduce(function (s, i) { return s + find(i.id).price * i.qty; }, 0);
      var disc = Cart.coupon() ? Math.round(sub * window.COUPON.pct / 100) : 0;
      var net = sub - disc;
      return { sub: sub, disc: disc, net: net, free: net >= window.FREE_SHIP && net > 0, missing: Math.max(0, window.FREE_SHIP - net), pct: Math.min(100, Math.round(net / window.FREE_SHIP * 100)) };
    }
  };
  window.CACart = Cart;

  /* ---------- Plantillas: header y footer ---------- */
  var NAV = [
    ["tienda", "tienda.html", "Nuestra tienda"],
    ["negocio", "cafe-para-tu-negocio.html", "Café para tu negocio"],
    ["seguimiento", "seguimiento.html", "Seguimiento de pedidos"],
    ["contacto", "contacto.html", "Atención al cliente"]
  ];
  var cur = document.body.getAttribute("data-nav") || "";
  var logo = function (inv) {
    return '<a class="logo' + (inv ? " inv" : "") + '" href="index.html" aria-label="Café Alegra, inicio">' +
      '<img src="assets/img/logo-alegra.png" alt="Café Alegra" class="logo-img">' +
      '<span class="wm"><b>CAFÉ ALEGRA</b><small>Tostaduría artesanal · Especialidad</small></span></a>';
  };
  window.ca_logo = logo;
  var hdr = $("#site-header");
  if (hdr) {
    var user = store.get("ca_user", null);
    hdr.outerHTML =
      '<div class="topbar">Maqueta para revisión · Precios con IVA incluido · Sin pagos reales</div>' +
      '<header class="site-header"><div class="wrap bar">' + logo(false) +
      '<nav class="nav" id="nav" aria-label="Principal"><button class="ic-btn nav-close" type="button" data-nav-close aria-label="Cerrar menú">' + ic("close") + '</button><div class="nav-brand only-mobile">' + logo(false) + '</div><ul>' +
      NAV.map(function (n) { return '<li><a href="' + n[1] + '"' + (cur === n[0] ? ' aria-current="page"' : "") + ">" + n[2] + "</a></li>"; }).join("") +
      '<li class="only-mobile"><a href="acceder.html"' + (cur === "acceder" ? ' aria-current="page"' : "") + ">Acceder</a></li></ul>" +
      '<div class="nav-foot only-mobile"><a class="btn gold block" href="https://wa.me/56977942117" target="_blank" rel="noopener">' + ic("whatsapp") + ' WhatsApp</a><p>Despachos a todo Chile</p></div></nav>' +
      '<div class="actions"><a class="ic-btn" href="acceder.html"' + (cur === "acceder" ? ' aria-current="page"' : "") + ">" + ic("user") + '<span class="lbl" data-user-lbl>' + (user ? "Hola, " + "" : "Acceder") + "</span></a>" +
      '<button class="ic-btn" type="button" data-cart-open aria-label="Abrir carrito" aria-haspopup="dialog">' + ic("cart") + '<span class="count" data-cart-count data-n="0">0</span></button>' +
      '<button class="ic-btn burger" type="button" data-nav-open aria-controls="nav" aria-expanded="false" aria-label="Abrir menú">' + ic("menu") + "</button></div></div></header>" +
      '<div class="nav-scrim" data-nav-close></div>';
    if (user) { var lb = $("[data-user-lbl]"); lb.textContent = "Hola, " + (user.name || "tú").split(" ")[0]; }
  }
  var ftr = $("#site-footer");
  if (ftr) {
    ftr.outerHTML =
      '<footer class="site-footer"><div class="wrap"><div class="fgrid"><div>' + logo(true) +
      '<p style="margin-top:1.4rem;max-width:34ch">Tostaduría artesanal de Rancagua. Café de especialidad y cafés de tradición chilena.</p>' +
      '<div class="social" role="group" aria-label="Redes sociales pendientes de confirmar"><span class="social-pending">' + ic("instagram") + ' Instagram</span><span class="social-pending">' + ic("facebook") + ' Facebook</span></div><p class="sm">Enlaces a redes sociales próximamente.</p></div>' +
      '<div><h4>Nuestra Tienda</h4><ul><li><a href="cafe-de-especialidad.html">Café de especialidad</a></li><li><a href="cafe-de-especialidad.html#sabores-de-autor">Praliné / Sabores de Autor</a></li><li><a href="cafes-de-tradicion-chilena.html">Cafés de Nuestra Tradición</a></li><li><a href="complementos.html">Complementos cafeteros</a></li></ul></div>' +
      '<div><h4>Café Alegra</h4><ul><li><a href="index.html">Nuestra Casa de Cafés</a></li><li><a href="cafe-para-tu-negocio.html">Café para tu negocio</a></li><li><a href="cobertura.html">Cobertura y envíos</a></li><li><a href="brand-guide.html">Guía de marca</a></li></ul></div>' +
      '<div><h4>Ayuda</h4><ul><li><a href="contacto.html">Atención al cliente</a></li><li><a href="seguimiento.html">Seguimiento de pedidos</a></li><li><a href="privacidad.html">Política de privacidad</a></li><li><a href="terminos.html">Términos y condiciones</a></li><li><a href="https://wa.me/56977942117" target="_blank" rel="noopener">WhatsApp +56 9 7794 2117</a></li></ul></div></div>' +
      '<div class="legal"><span>© ' + new Date().getFullYear() + ' Café Alegra · Rancagua, Chile · cafealegrachile@gmail.com</span><button type="button" data-open-cookie-banner style="background:none;border:none;color:inherit;font:inherit;cursor:pointer;text-decoration:underline;padding:0;margin-right:1rem">Preferencias de cookies</button><span>Propuesta de rediseño: demostración navegable, sin pagos reales.</span></div></div></footer>';
  }

  /* ---------- Menú móvil ---------- */
  var nav = $("#nav"), scrim = $(".nav-scrim"), burger = $("[data-nav-open]");
  function navToggle(open) {
    if (!nav) return;
    nav.classList.toggle("open", open); scrim.classList.toggle("on", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
    if (open) { var f = $("[data-nav-close]", nav) || $("a", nav); f && f.focus(); }
    else if (burger.getClientRects().length) burger.focus();
  }
  if (burger) {
    burger.addEventListener("click", function () { navToggle(true); });
    $$("[data-nav-close]").forEach(function (b) { b.addEventListener("click", function () { navToggle(false); }); });
    $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { navToggle(false); }); });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1024 && nav.classList.contains("open")) navToggle(false);
    });
  }

  /* ---------- Toast ---------- */
  var toastEl = document.createElement("div");
  toastEl.className = "toast"; toastEl.setAttribute("role", "status"); toastEl.setAttribute("aria-live", "polite");
  document.body.appendChild(toastEl);
  var toastT;
  function toast(html) {
    toastEl.innerHTML = html; toastEl.classList.add("on");
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove("on"); }, 3800);
  }
  window.caToast = toast;

  /* ---------- Banner de Consentimiento de Cookies (GDPR / Chile / WordPress) ---------- */
  function initCookieConsent() {
    var STORAGE_KEY = "ca_cookie_consent";
    var consent = null;
    try {
      consent = localStorage.getItem(STORAGE_KEY);
    } catch (e) {}

    var el = document.createElement("div");
    el.className = "cookie-banner";
    el.setAttribute("role", "region");
    el.setAttribute("aria-label", "Consentimiento de cookies");
    el.innerHTML =
      '<div class="wrap cookie-wrap">' +
        '<div class="cookie-text">' +
          '<div class="cookie-title"><strong>🍪 Tu privacidad en Café Alegra</strong></div>' +
          '<p>Utilizamos cookies esenciales para el funcionamiento del carrito de compras y cookies analíticas para mejorar tu experiencia en nuestra tienda. Puedes aceptar todas o navegar solo con las esenciales. Conoce más en nuestra <a href="privacidad.html">Política de privacidad</a>.</p>' +
        '</div>' +
        '<div class="cookie-actions">' +
          '<button type="button" class="btn ghost sm" data-cookie-essential>Solo esenciales</button>' +
          '<button type="button" class="btn gold sm" data-cookie-accept>Aceptar todas</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(el);

    function showBanner() {
      setTimeout(function () {
        el.classList.add("is-visible");
      }, 700);
    }

    function setConsent(type) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          choice: type,
          timestamp: new Date().toISOString()
        }));
      } catch (e) {}
      el.classList.remove("is-visible");
    }

    if (!consent) {
      showBanner();
    }

    var btnAccept = el.querySelector("[data-cookie-accept]");
    var btnEssential = el.querySelector("[data-cookie-essential]");
    if (btnAccept) btnAccept.addEventListener("click", function () { setConsent("all"); });
    if (btnEssential) btnEssential.addEventListener("click", function () { setConsent("essential"); });

    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-open-cookie-banner]");
      if (btn) {
        e.preventDefault();
        el.classList.add("is-visible");
      }
    });
  }
  initCookieConsent();


  /* ---------- Mini-carrito (drawer) ---------- */
  var scr = document.createElement("div"); scr.className = "scrim";
  var dr = document.createElement("aside");
  dr.className = "drawer"; dr.setAttribute("role", "dialog"); dr.setAttribute("aria-modal", "true"); dr.setAttribute("aria-label", "Carrito de compras"); dr.setAttribute("aria-hidden", "true");
  dr.setAttribute("inert", "");
  dr.innerHTML = '<header><h2>Tu carrito</h2><button class="ic-btn" type="button" data-drawer-close aria-label="Cerrar carrito">' + ic("close") + '</button></header><div class="body" data-drawer-body></div><footer data-drawer-foot></footer>';
  document.body.appendChild(scr); document.body.appendChild(dr);
  var lastFocus;
  function drawer(open) {
    dr.classList.toggle("open", open); scr.classList.toggle("on", open); dr.setAttribute("aria-hidden", open ? "false" : "true");
    if (open) dr.removeAttribute("inert"); else dr.setAttribute("inert", "");
    document.body.style.overflow = open ? "hidden" : "";
    if (open) { lastFocus = document.activeElement; renderDrawer(); $("[data-drawer-close]", dr).focus(); }
    else if (lastFocus) lastFocus.focus();
  }
  function lineHTML(it, compact) {
    var p = find(it.id);
    return '<div class="line"><a href="producto.html?id=' + p.id + '"><img src="assets/img/' + p.img + '" alt="' + p.name + '" loading="lazy"></a><div><a class="nm" href="producto.html?id=' + p.id + '">' + p.name + '</a><div class="meta">' +
      '<p class="line-variant">' + p.size + ' · ' + presentation(p) + '</p><div class="qty" role="group" aria-label="Cantidad de ' + p.name + '"><button type="button" data-q="-1" data-id="' + p.id + '" aria-label="Disminuir cantidad">' + ic("minus") + '</button><output aria-live="polite">' + it.qty + '</output><button type="button" data-q="1" data-id="' + p.id + '" aria-label="Aumentar cantidad">' + ic("plus") + "</button></div>" +
      "<strong>" + money(p.price * it.qty) + '</strong></div><button class="rm" type="button" data-rm="' + p.id + '">Quitar</button></div></div>';
  }
  function shipBar(t) {
    return "";
  }
  function renderCrossSell(items) {
    var itemIds = items.map(function (x) { return x.id; });
    var candidates = (window.PRODUCTS || []).filter(function (p) {
      var isSold = (window.SOLDOUT || []).indexOf(p.reference) > -1 || (window.SOLDOUT || []).indexOf(p.id) > -1;
      return !isSold && itemIds.indexOf(p.id) === -1;
    });
    if (!candidates.length) return "";
    var best = candidates.filter(function (p) { return p.cat === "complementos"; })[0] ||
               candidates.filter(function (p) { return p.size === "100 g"; })[0] ||
               candidates[0];
    if (!best) return "";

    return '<div class="cart-upsell">' +
      '<div class="upsell-label">✨ Completa tu ritual cafetero</div>' +
      '<div class="upsell-row">' +
        '<img src="assets/img/' + best.img + '" alt="' + escapeHTML(best.name) + '">' +
        '<div class="upsell-meta">' +
          '<strong>' + escapeHTML(best.referenceName || best.name) + '</strong>' +
          '<span class="upsell-price">' + money(best.price) + '</span>' +
        '</div>' +
        '<button type="button" class="btn sm gold" data-add="' + best.id + '" aria-label="Añadir ' + escapeHTML(best.name) + ' por ' + money(best.price) + '">+ Añadir</button>' +
      '</div>' +
    '</div>';
  }
  function renderDrawer() {
    var items = Cart.items(), t = Cart.totals(), b = $("[data-drawer-body]", dr), f = $("[data-drawer-foot]", dr);
    if (!items.length) {
      b.innerHTML = '<div class="cart-empty"><p>Aún no has agregado productos a tu pedido.</p><a class="btn" href="tienda.html">Explorar productos</a></div>'; f.style.display = "none"; return;
    }
    f.style.display = "";
    b.innerHTML = '<div style="padding-top:1.2rem">' + shipBar(t) + "</div>" + items.map(function (i) { return lineHTML(i, true); }).join("") + renderCrossSell(items);
    f.innerHTML = '<div class="tot"><span>Subtotal</span><span>' + money(t.sub) + '</span></div><a class="btn block" href="carrito.html">Ver carrito y pagar</a>';
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("button,a"); if (!t) return;
    if (t.hasAttribute("data-cart-open")) drawer(true);
    else if (t.hasAttribute("data-drawer-close")) drawer(false);
    else if (t.dataset.q) { var it = Cart.items().filter(function (x) { return x.id === t.dataset.id; })[0]; Cart.set(t.dataset.id, (it ? it.qty : 0) + parseInt(t.dataset.q, 10)); }
    else if (t.dataset.rm) Cart.set(t.dataset.rm, 0);
    else if (t.dataset.add) { if (Cart.add(t.dataset.add, 1)) toast("Añadido: " + find(t.dataset.add).name + ' <a href="carrito.html">Ver carrito</a>'); }
  });
  scr.addEventListener("click", function () { drawer(false); });
  function trapFocus(container, e) {
    var focusable = $$('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])', container)
      .filter(function (el) { return el.getClientRects().length && !el.closest("[inert]"); });
    if (!focusable.length) { e.preventDefault(); container.focus(); return; }
    var first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && (document.activeElement === last || !container.contains(document.activeElement))) {
      e.preventDefault(); first.focus();
    }
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (dr.classList.contains("open")) drawer(false);
      if (nav && nav.classList.contains("open")) navToggle(false);
      var m = $(".modal.open"); if (m) closeModal(m);
      return;
    }
    if (e.key !== "Tab") return;
    var modal = $(".modal.open");
    if (modal) trapFocus(modal, e);
    else if (dr.classList.contains("open")) trapFocus(dr, e);
    else if (nav && nav.classList.contains("open")) trapFocus(nav, e);
  });
  function updateCount() {
    $$("[data-cart-count]").forEach(function (c) { var n = Cart.count(); c.textContent = n; c.dataset.n = n; });
    if (dr.classList.contains("open")) renderDrawer();
  }
  document.addEventListener("cart:change", updateCount);
  window.addEventListener("storage", updateCount);
  updateCount();

  /* ---------- Modales (popup de cupón) ---------- */
  var modalFocus;
  function openModal(m) { modalFocus = document.activeElement; m.classList.add("open"); var f = $("input,button",m); f && f.focus(); }
  function closeModal(m) { m.classList.remove("open"); if (modalFocus) modalFocus.focus(); }
  function copyCode(code, btn) {
    var done = function () { btn.textContent = "¡Cupón copiado!"; };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(code).then(done, done); else done();
  }
  if (!document.body.hasAttribute("data-nopopup") && window.COUPON.pct > 0) {
    var pop = document.createElement("div"); pop.className = "modal";
    pop.setAttribute("role", "dialog"); pop.setAttribute("aria-modal", "true"); pop.setAttribute("aria-labelledby", "pop-t");
    pop.innerHTML = '<div class="box"><button class="ic-btn x" type="button" data-pop-close aria-label="Cerrar">' + ic("close") + '</button><span class="eyebrow">Bienvenida</span>' +
      '<h2 id="pop-t" style="font-size:2rem">Tu primer café, con <em>regalo</em></h2>' +
      '<div data-pop-form><p>Déjanos tus datos y te mostramos tu código de descuento de ' + window.COUPON.pct + '% para tu primer pedido.</p>' +
      '<form class="form" novalidate data-pop-f style="text-align:left"><div class="field"><label for="pn">Nombre</label><input id="pn" name="n" autocomplete="given-name" required><span class="err" aria-live="polite"></span></div><div class="field"><label for="pe">Email</label><input id="pe" name="e" type="email" autocomplete="email" required><span class="err" aria-live="polite"></span></div><button class="btn block" type="submit">Quiero mi código</button></form></div>' +
      '<div data-pop-code hidden><p>¡Qué alegría! Ya tienes tu primer código de descuento en Café Alegra. Lo aplicamos automáticamente en tu carrito.</p><div class="code">' + window.COUPON.code + '</div><br><button class="btn ghost" type="button" data-pop-copy>Copiar cupón</button></div></div>';
    document.body.appendChild(pop);
    $("[data-pop-close]", pop).addEventListener("click", function () { closeModal(pop); });
    pop.addEventListener("click", function (e) { if (e.target === pop) closeModal(pop); });
    $("[data-pop-copy]", pop).addEventListener("click", function (e) { copyCode(window.COUPON.code, e.currentTarget); });
    $("[data-pop-f]", pop).addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate(e.target)) return;
      store.set("ca_coupon", window.COUPON.code);
      $("[data-pop-form]", pop).hidden = true; $("[data-pop-code]", pop).hidden = false;
      document.dispatchEvent(new CustomEvent("cart:change"));
    });
    if (!store.get("ca_popup_seen", false) && !sessionStorage.getItem("ca_popup_s")) {
      setTimeout(function () {
        if (document.querySelector(".modal.open") || dr.classList.contains("open")) return;
        openModal(pop); store.set("ca_popup_seen", true); try { sessionStorage.setItem("ca_popup_s", "1"); } catch (e) {}
      }, 9000);
    }
    $$("[data-open-coupon]").forEach(function (b) { b.addEventListener("click", function () { openModal(pop); }); });
  }
  if (!window.COUPON.pct) $$("[data-open-coupon]").forEach(function (b) { b.remove(); });

  /* ---------- Validación de formularios ---------- */
  function validate(form) {
    var ok = true, first = null;
    $$("input,textarea,select", form).forEach(function (f) {
      var err = f.parentNode.querySelector(".err"), msg = "";
      if (!err && f.parentNode.nextElementSibling && f.parentNode.nextElementSibling.classList.contains("err")) err = f.parentNode.nextElementSibling;
      if (f.required && !f.value.trim() && f.type !== "checkbox") msg = "Este campo es obligatorio.";
      else if (f.type === "checkbox" && f.required && !f.checked) msg = "Debes aceptar para continuar.";
      else if (f.type === "email" && f.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value)) msg = "Ingresa un email válido.";
      else if (f.type === "password" && f.required && f.value.length < 6) msg = "Mínimo 6 caracteres.";
      else if (f.minLength > 0 && f.value && f.value.length < f.minLength) msg = "Mínimo " + f.minLength + " caracteres.";
      if (err) err.textContent = msg;
      f.setAttribute("aria-invalid", msg ? "true" : "false");
      if (msg) { ok = false; if (!first) first = f; }
    });
    if (first) first.focus();
    return ok;
  }

  /* ---------- Reveal on scroll ---------- */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (en) {
    en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
  }, { threshold: .12, rootMargin: "0px 0px -40px 0px" }) : null;
  function observe(root) { $$(".reveal", root || document).forEach(function (el) { io ? io.observe(el) : el.classList.add("in"); }); }

  /* ---------- Tarjeta de producto y grillas ---------- */
  function presentation(p) { if (!p.grind) return p.size || "Estándar"; return p.grind === "grano" ? "Grano entero" : "Molienda media"; }
  function roastProfile(p) {
    if (!p.roast) return "";
    return '<section class="roast-profile" aria-label="Nivel de tueste"><span class="roast-kicker">Perfil de tueste</span><h2>Tueste: ' + p.roast.label + '</h2><div class="roast-bar" aria-hidden="true">' +
      ["suave", "medio", "intenso"].map(function (tone) {
        return '<span class="roast-stop roast-' + tone + (tone === p.roast.tone ? ' is-selected' : '') + '">' +
          (tone === p.roast.tone ? '<i class="roast-marker">' + ic("bean") + '</i>' : '') + '</span>';
      }).join("") + '</div><div class="roast-labels" aria-hidden="true"><span' + (p.roast.tone === "suave" ? ' class="is-selected"' : '') + '>Medio suave</span><span' + (p.roast.tone === "medio" ? ' class="is-selected"' : '') + '>Medio</span><span' + (p.roast.tone === "intenso" ? ' class="is-selected"' : '') + '>Medio intenso</span></div><p>Comparación visual entre los tres tuestes de origen del catálogo; no es una escala técnica.</p></section>';
  }
  function references(list) {
    return list.filter(function (p, i) { return list.findIndex(function (x) { return x.reference === p.reference; }) === i; });
  }
  function card(p, variants) {
    variants = variants || P.filter(function (x) { return x.reference === p.reference; });
    var prices = variants.map(function (x) { return x.price; });
    var from = Math.min.apply(null, prices) !== Math.max.apply(null, prices);
    var off = p.was > p.price ? Math.round((1 - p.price / p.was) * 100) : 0;
    var scaTag = "";
    if (p.desc && p.desc.indexOf("SCA") > -1) {
      var scaMatch = p.desc.match(/(\d{2}\s*puntos\s*SCA|\d{2}\s*SCA)/i);
      if (scaMatch) scaTag = '<span class="tag sca">' + scaMatch[0] + '</span>';
    }
    var isSold = (window.SOLDOUT || []).indexOf(p.reference) > -1 || (window.SOLDOUT || []).indexOf(p.id) > -1;
    var actionBtn = isSold
      ? '<a class="btn ghost sm soldout-card-btn" href="producto.html?id=' + p.id + '" aria-label="Ver producto agotado: ' + p.referenceName + '">Ver producto (Agotado)</a>'
      : '<a class="btn ghost sm" href="producto.html?id=' + p.id + '" aria-label="Elegir presentación: ' + p.referenceName + '">Elegir presentación</a>';
    return '<article class="prod reveal"><a class="ph" href="producto.html?id=' + p.id + '" tabindex="-1" aria-hidden="true">' +
      (p.notes[0] === "Sin cafeína" ? '<span class="tag">Sin cafeína</span>' : (scaTag || "")) + (isSold ? '<span class="tag sale">Agotado</span>' : "") + (off ? '<span class="tag sale">-' + off + "%</span>" : "") +
      '<img src="assets/img/' + p.img + '" alt="" loading="lazy"></a><div class="bd"><span class="k">' + p.sub + '</span><h3><a href="producto.html?id=' + p.id + '">' + p.referenceName + '</a></h3><p class="variant-preview">' + (function(vars) {
        var sizes = vars.map(function(v){ return v.size; }).filter(function(v,i,a){ return a.indexOf(v) === i; });
        var grinds = vars.map(function(v){ return presentation(v); }).filter(Boolean).filter(function(v,i,a){ return a.indexOf(v) === i; });
        return sizes.join(" y ") + (grinds.length ? " · " + grinds.join(" o ") : "");
      })(variants) + '</p><p class="sm">' + p.short + '</p>' +
      '<div class="price"><span>' + (from ? "Desde " : "") + money(Math.min.apply(null, prices)) + "</span>" + (off ? '<del><span class="sr-only">Precio original </span>' + money(p.was) + "</del>" : "") + '</div>' + actionBtn + '</div></article>';
  }
  window.caCard = card;
  $$("[data-grid]").forEach(function (g) {
    var cat = g.dataset.cat, filter = g.dataset.filter, sortBy = "def", active = "all";
    var activeSub = "all", activeSize = "all", activeGrind = "all", maxPrice = Infinity;
    var base = g.dataset.ids ? g.dataset.ids.split(",").map(find).filter(Boolean) : P.filter(function (p) { return !cat || p.cat === cat; });
    var bar = g.parentNode.querySelector("[data-filter-bar]");
    var cnt = g.parentNode.querySelector("[data-count]");
    var q = new URLSearchParams(location.search);
    if (filter === "cat" && q.get("cat") && window.CATEGORIES[q.get("cat")]) active = q.get("cat");
    function draw() {
      var list = base.filter(function (p) {
        var matchesCategory = active === "all" || (active === "autor" ? p.collection === "autor" : (active === "packs" ? p.cat === "packs" : p.cat === active));
        return matchesCategory &&
          (activeSub === "all" || p.sub === activeSub) &&
          (activeSize === "all" || p.size === activeSize) &&
          (activeGrind === "all" || p.grind === activeGrind) &&
          p.price <= maxPrice;
      });
      if (sortBy === "asc" || sortBy === "desc") list = list.slice().sort(function (a, b) { return a.price - b.price; });
      // Agrupar después de filtrar y ordenar conserva el enlace a una variante coincidente.
      var grouped = references(list);
      if (sortBy === "desc") grouped.sort(function (a, b) { return b.price - a.price; });
      g.innerHTML = grouped.map(function (p) { return card(p, list.filter(function (x) { return x.reference === p.reference; })); }).join("") || '<p class="empty">No hay productos del catálogo minorista en esta selección.</p>';
      if (cnt) cnt.textContent = grouped.length + (grouped.length === 1 ? " referencia" : " referencias");
      observe(g);
      if (bar) $$("[data-f]", bar).forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.f === active ? "true" : "false"); });
    }
    if (bar && filter) {
      var keys = filter === "cat" ? Object.keys(window.CATEGORIES) : base.map(function (p) { return p.sub; }).filter(function (v, i, a) { return a.indexOf(v) === i; });
      bar.insertAdjacentHTML("afterbegin", '<button class="chip" type="button" data-f="all" aria-pressed="true">Todos</button>' + keys.map(function (k) { return '<button class="chip" type="button" data-f="' + k + '" aria-pressed="false">' + (filter === "cat" ? window.CATEGORIES[k].name : k) + "</button>"; }).join(""));
      bar.addEventListener("click", function (e) { var b = e.target.closest("[data-f]"); if (b) { active = b.dataset.f; draw(); } });
    }
    if (bar && filter === "cat") {
      [
        ["[data-filter-sub]", "sub", "Todos los sabores y orígenes"],
        ["[data-filter-size]", "size", "Todos los formatos"],
        ["[data-filter-grind]", "grind", "Grano o molido"]
      ].forEach(function (config) {
        var select = $(config[0], bar);
        if (!select) return;
        var values = base.map(function (p) { return p[config[1]]; }).filter(function (v, i, a) { return v && a.indexOf(v) === i; });
        select.insertAdjacentHTML("beforeend", values.map(function (v) { return '<option value="' + v + '">' + (v === "grano" ? "Grano entero" : v === "molido" ? "Molienda media" : v) + "</option>"; }).join(""));
      });
      var priceSelect = $("[data-filter-price]", bar);
      if (priceSelect) priceSelect.addEventListener("change", function () {
        maxPrice = priceSelect.value === "all" ? Infinity : Number(priceSelect.value);
        draw();
      });
      var subSelect = $("[data-filter-sub]", bar);
      var sizeSelect = $("[data-filter-size]", bar);
      var grindSelect = $("[data-filter-grind]", bar);
      if (subSelect) subSelect.addEventListener("change", function () { activeSub = subSelect.value; draw(); });
      if (sizeSelect) sizeSelect.addEventListener("change", function () { activeSize = sizeSelect.value; draw(); });
      if (grindSelect) grindSelect.addEventListener("change", function () { activeGrind = grindSelect.value; draw(); });
    }
    var sel = g.parentNode.querySelector("[data-sort]");
    if (sel) sel.addEventListener("change", function () { sortBy = sel.value; draw(); });
    draw();
  });

  /* ---------- Detalle de producto ---------- */
  var pd = $("#product-detail");
  if (pd) {
    var pid = new URLSearchParams(location.search).get("id"), p = find(pid);
    if (!p) {
      document.title = "Producto no encontrado · Café Alegra";
      pd.innerHTML = '<div class="cart-empty"><h1 style="font-size:2.4rem">No encontramos ese producto</h1><p>Puede que el enlace haya cambiado. Explora nuestra tienda.</p><a class="btn" href="tienda.html">Ver la tienda</a></div>';
    } else {
      var c = window.CATEGORIES[p.cat], off = p.was > p.price ? Math.round((1 - p.price / p.was) * 100) : 0;
      document.title = p.name + " · Café Alegra";
      var md = $('meta[name="description"]'); if (md) md.setAttribute("content", p.name + " (" + p.size + "). " + p.short);
      var ogt = $('meta[property="og:title"]'); if (ogt) ogt.setAttribute("content", p.name + " · Café Alegra");
      $("[data-crumb]").innerHTML = '<a href="index.html">Inicio</a><span aria-hidden="true">/</span><a href="' + c.page + '">' + c.name + '</a><span aria-hidden="true">/</span><span aria-current="page">' + p.name + "</span>";
      var sealIcons = { "Sin cafeína": "nocaf", Vegano: "vegan", "Sin azúcar añadida": "nosugar" };
      var seals = p.notes.filter(function (note) { return sealIcons[note]; }).map(function (note) {
        return '<span class="seal"><span class="disc">' + ic(sealIcons[note]) + "</span>" + note + "</span>";
      }).join("");
      if (seals) seals = '<div class="seals" style="margin:1.5rem 0">' + seals + "</div>";
      var variants = P.filter(function (x) { return x.reference === p.reference; });
      var isOrigin = p.collection === "origen";
      var variantHTML =
        '<fieldset class="variant-picker" id="product-variant" aria-describedby="variant-summary">' +
          '<legend>' + (isOrigin ? "Presentación" : "Formato · solo molienda media") + '</legend>' +
          '<div class="variant-options">' +
            variants.map(function (x) { return '<label class="variant-option"><input type="radio" name="product-variant" value="' + x.id + '"' + (x.id === p.id ? " checked" : "") + '><span>' + (isOrigin ? presentation(x) : x.size) + '<b aria-hidden="true"> ✓</b></span></label>'; }).join("") +
          '</div>' +
          '<p id="variant-summary" role="status" aria-live="polite">' + p.size + ' · ' + presentation(p) + ' · ' + money(p.price) + '</p>' +
        '</fieldset>';

      pd.innerHTML =
        '<div class="pd">' +
          '<div class="pd-img reveal"><img src="assets/img/' + p.img + '" alt="' + p.name + '"></div>' +
          '<div class="pd-info reveal">' +
            '<span class="eyebrow">' + c.name + '</span>' +
            '<h1>' + p.referenceName + '</h1>' +
            '<p class="lead">' + p.short + '</p>' +
            '<div class="price">' +
              '<span>' + money(p.price) + '</span>' +
              (off ? '<del>' + money(p.was) + '</del><small class="discount-badge">-' + off + '%</small>' : '') +
            '</div>' +
            variantHTML +
            '<div class="buy" id="pd-buy-container"></div>' +
            '<ul class="notes">' + p.notes.map(function (n) { return '<li>' + n + '</li>'; }).join('') + '</ul>' +
            '<div id="pd-roast-container">' + roastProfile(p) + '</div>' +
            '<dl class="product-facts">' +
              '<div><dt>Formato</dt><dd id="pd-fact-size">' + p.size + '</dd></div>' +
              '<div><dt>Origen o sabor</dt><dd>' + p.sub + '</dd></div>' +
              (p.grind ? '<div><dt>Presentación</dt><dd id="pd-fact-grind">' + presentation(p) + '</dd></div>' : '') +
            '</dl>' +
            seals +
            '<details class="acc" open><summary>Perfil y descripción</summary><div class="c"><p>' + p.desc + '</p></div></details>' +
            '<details class="acc"><summary>Cómo prepararlo</summary><div class="c"><p>' + p.prep + '</p></div></details>' +
            '<details class="acc"><summary>Envíos</summary><div class="c"><p>' + window.SHIPPING_NOTE + '</p></div></details>' +
            '<p class="notice">Fuente: catálogo minorista del cliente, ficha de la página ' + p.sourcePage + ' y precios de la página 11. IVA incluido. La imagen del PDF ilustra el producto y puede mostrar otro formato.</p>' +
          '</div>' +
        '</div>';

      var qn = 1;
      function renderBuyArea(currentProduct) {
        var buyEl = $("#pd-buy-container", pd);
        if (!buyEl) return;
        var isSold = (window.SOLDOUT || []).indexOf(currentProduct.reference) > -1 || (window.SOLDOUT || []).indexOf(currentProduct.id) > -1;
        if (isSold) {
          buyEl.innerHTML =
            '<div class="soldout-box">' +
              '<strong>' + ic("leaf") + ' Producto temporalmente agotado</strong>' +
              '<p>No contamos con stock de este lote en este momento. Tostamos semanalmente en Rancagua; consulta la fecha de la próxima tostada artesanal.</p>' +
              '<a class="btn ghost block" href="https://wa.me/56977942117?text=' + encodeURIComponent('Hola Café Alegra, quisiera consultar por la reposición de ' + (currentProduct.referenceName || currentProduct.name)) + '" target="_blank" rel="noopener" style="margin-top:.6rem">' +
                ic("whatsapp") + ' Consultar reposición por WhatsApp' +
              '</a>' +
            '</div>' +
            '<div style="margin-top:.7rem">' +
              '<button class="btn block disabled" type="button" disabled aria-disabled="true">Agotado</button>' +
            '</div>';
        } else {
          buyEl.innerHTML =
            '<div class="qty" role="group" aria-label="Cantidad">' +
              '<button type="button" data-pq="-1" aria-label="Disminuir">' + ic("minus") + '</button>' +
              '<output id="pq" aria-live="polite">' + qn + '</output>' +
              '<button type="button" data-pq="1" aria-label="Aumentar">' + ic("plus") + '</button>' +
            '</div>' +
            '<button class="btn" type="button" id="pd-add">Añadir al carrito</button>';

          var out = $("#pq", buyEl);
          $$("[data-pq]", buyEl).forEach(function (b) {
            b.addEventListener("click", function () {
              qn = Math.max(1, Math.min(99, qn + parseInt(b.dataset.pq, 10)));
              out.textContent = qn;
            });
          });
          var addBtn = $("#pd-add", buyEl);
          if (addBtn) {
            addBtn.addEventListener("click", function () {
              if (Cart.add(currentProduct.id, qn)) {
                toast("Añadido: " + currentProduct.name + ' <a href="carrito.html">Ver carrito</a>');
              }
            });
          }
        }
      }

      renderBuyArea(p);

      $("#product-variant").addEventListener("change", function (e) {
        p = find(e.target.value);
        var url = new URL(location.href); url.searchParams.set("id", p.id);
        history.replaceState(null, "", url);
        document.title = p.name + " · Café Alegra";
        if (md) md.setAttribute("content", p.name + " (" + p.size + "). " + p.short);
        if (ogt) ogt.setAttribute("content", document.title);
        $('[aria-current="page"]', $("[data-crumb]")).textContent = p.name;
        $(".notes", pd).innerHTML = p.notes.map(function (n) { return "<li>" + n + "</li>"; }).join("");
        var factSize = $("#pd-fact-size", pd); if (factSize) factSize.textContent = p.size;
        var factGrind = $("#pd-fact-grind", pd); if (factGrind) factGrind.textContent = presentation(p);
        $(".pd-img img", pd).alt = p.name;
        $(".price span", pd).textContent = money(p.price);
        $("#variant-summary").textContent = p.size + " · " + presentation(p) + " · " + money(p.price);
        renderBuyArea(p);
      });
            /* Lógica de "Saber Más" (oculto por defecto, visible por café) */
      var stories = window.COFFEE_STORIES || {};
      var storyKey = p.reference;
      if (!stories[storyKey] && p.cat === "tradicion") storyKey = p.id.indexOf("higo") > -1 ? "cafe-de-higos" : "cafe-de-trigo";
      var story = stories[storyKey];

      if (story) {
        var storyHTML = '<div class="saber-mas-wrap" style="margin-top:1.8rem">' +
          '<button type="button" class="btn ghost block copper-btn" id="btn-toggle-story" aria-expanded="false" aria-controls="box-story" style="border-color:var(--cobrizo);color:var(--cobrizo);font-weight:600">' +
            ic("star") + ' ¿Quieres saber más? Conoce su historia y origen' +
          '</button>' +
          '<div id="box-story" class="box-saber-mas" style="display:none;" aria-hidden="true">' +
            '<span class="badge-tag cobrizo">' + story.kicker + '</span>' +
            '<h2 style="font-size:clamp(1.6rem,3.5vw,2.2rem);margin:.4rem 0 .5rem">' + story.title + '</h2>' +
            '<p class="lead" style="color:var(--espresso);font-weight:500;margin-bottom:1.2rem">' + story.lead + '</p>' +
            '<p style="font-size:1.02rem;line-height:1.7;color:var(--suave);margin-bottom:1.5rem">' + story.body + '</p>' +
            '<div class="story-facts"><dl style="margin:0;display:contents">' +
              story.facts.map(function (f) { return '<div><dt>' + f.k + '</dt><dd>' + f.v + '</dd></div>'; }).join("") +
            '</dl></div>' +
            '<div class="acts" style="margin-top:2rem;align-items:center">' +
              '<a class="btn gold" href="tienda.html">← Regresar a la tienda</a>' +
              '<button type="button" class="btn ghost sm" id="btn-close-story">Ocultar historia</button>' +
              '<a class="link" href="' + story.articleUrl + '">Leer la historia completa en el blog</a>' +
            '</div>' +
          '</div>' +
        '</div>';

        pd.querySelector(".pd").insertAdjacentHTML("afterend", storyHTML);

      /* Inyección de Schema.org JSON-LD (Product + Offer) para SEO */
      var existingSchema = document.getElementById("product-schema-jsonld");
      if (existingSchema) existingSchema.remove();
      var scriptSchema = document.createElement("script");
      scriptSchema.id = "product-schema-jsonld";
      scriptSchema.type = "application/ld+json";
      var productSchemaData = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": p.referenceName + " (" + p.size + ")",
        "image": ["https://cafealegra.cl/assets/img/" + p.img],
        "description": p.short + " " + p.desc,
        "sku": "ALEGRA-" + p.id.toUpperCase(),
        "brand": { "@type": "Brand", "name": "Café Alegra" },
        "offers": {
          "@type": "Offer",
          "url": location.href,
          "priceCurrency": "CLP",
          "price": p.price,
          "priceValidUntil": "2027-12-31",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": (window.SOLDOUT || []).indexOf(p.reference) > -1 ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
          "seller": { "@type": "Organization", "name": "Café Alegra" }
        }
      };
      scriptSchema.text = JSON.stringify(productSchemaData, null, 2);
      document.head.appendChild(scriptSchema);


        var btnToggle = $("#btn-toggle-story");
        var boxStory = $("#box-story");
        var btnClose = $("#btn-close-story");

        function toggleStory(show) {
          var isExpanded = show !== undefined ? show : (boxStory.style.display === "none");
          boxStory.style.display = isExpanded ? "block" : "none";
          boxStory.setAttribute("aria-hidden", isExpanded ? "false" : "true");
          btnToggle.setAttribute("aria-expanded", isExpanded ? "true" : "false");
          btnToggle.innerHTML = isExpanded ? (ic("close") + ' Ocultar historia') : (ic("star") + ' ¿Quieres saber más? Conoce su historia y origen');
          if (isExpanded) {
            boxStory.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }

        btnToggle.addEventListener("click", function () { toggleStory(); });
        btnClose.addEventListener("click", function () { toggleStory(false); btnToggle.scrollIntoView({ behavior: "smooth", block: "center" }); });
      }

      var rel = $("[data-related]");
      if (rel) {
        var r = P.filter(function (x) { return x.cat === p.cat && x.reference !== p.reference; });
        if (references(r).length < 4) r = r.concat(P.filter(function (x) { return x.cat !== p.cat && x.cat !== "complementos"; }));
        rel.innerHTML = references(r).slice(0, 4).map(function (x) { return card(x); }).join("");
      }
    }
  }

  /* ---------- Página de carrito ---------- */
  var cp = $("#cart-page");
  if (cp) {
    var renderCart = function () {
      var items = Cart.items(), t = Cart.totals();
      if (!items.length && !cp.dataset.done) {
        cp.innerHTML = '<div class="cart-empty"><h2>Tu carrito está vacío</h2><p>Aún no has agregado productos a tu pedido. ¡Es un buen momento para hacer un pedido!</p><a class="btn" href="tienda.html">Explorar productos</a></div>'; return;
      }
      cp.innerHTML = '<div class="cart-wrap"><div>' + shipBar(t) + items.map(function (i) { return lineHTML(i); }).join("") + '<p style="margin-top:1.5rem"><a class="link" href="tienda.html">Seguir comprando</a></p></div>' +
        '<aside class="sum" aria-label="Resumen del pedido"><h2 style="font-size:1.6rem">Resumen</h2><form class="coupon" data-coupon><label class="sr-only" for="cp-in">Código de cupón</label><input id="cp-in" placeholder="Código de cupón" autocomplete="off" value="' + (Cart.coupon() || "") + '"><button class="btn sm ghost" type="submit">Aplicar</button></form><p class="msg" data-cmsg role="status"></p>' +
        '<dl><div class="r"><dt>Subtotal</dt><dd style="margin:0">' + money(t.sub) + "</dd></div>" + (t.disc ? '<div class="r"><dt>Cupón ' + window.COUPON.code + " (-" + window.COUPON.pct + '%)</dt><dd style="margin:0">-' + money(t.disc) + "</dd></div>" : "") +
        '<div class="r"><dt>Envío</dt><dd style="margin:0">' + "Se calcula al pagar" + '</dd></div><div class="r t"><dt>Total</dt><dd style="margin:0">' + money(t.net) + '</dd></div></dl><button class="btn block" type="button" data-checkout>Finalizar compra</button><p style="font-size:.8rem;color:var(--suave);margin:1rem 0 0">' + ic("lock") + ' Propuesta de rediseño: el pago es simulado.</p></aside></div>';
      $("[data-coupon]").addEventListener("submit", function (e) {
        e.preventDefault();
        var v = $("#cp-in").value.trim().toUpperCase(), m = $("[data-cmsg]");
        m.classList.add("show");
        if (!window.COUPON.pct) { m.textContent = "El catálogo minorista no incluye cupones ni descuentos."; m.className = "msg show notice"; }
        else if (v === window.COUPON.code) { store.set("ca_coupon", v); document.dispatchEvent(new CustomEvent("cart:change")); }
        else { m.textContent = "Ese cupón no es válido. Prueba con " + window.COUPON.code + "."; m.className = "msg show notice"; }
      });
      $("[data-checkout]").addEventListener("click", function () {
        var n = "CA-" + Math.floor(100000 + Math.random() * 900000), tot = Cart.totals();
        cp.dataset.done = "1"; Cart.clear();
        cp.innerHTML = '<div class="panel center" style="max-width:640px;margin:0 auto">' + ic("check", "") + '<h2 style="margin-top:1rem">¡Gracias por tu pedido!</h2><p>Esta es una demostración: no se realizó ningún cobro. Tu pedido simulado es el <strong>' + n + "</strong> por " + money(tot.net) + ".</p><p>Puedes probar el seguimiento con este número.</p><div class=\"acts\" style=\"justify-content:center\"><a class=\"btn\" href=\"seguimiento.html?n=" + n + '">Seguir mi pedido</a><a class="btn ghost" href="tienda.html">Volver a la tienda</a></div></div>';
      });
    };
    document.addEventListener("cart:change", renderCart);
    renderCart();
  }

  /* ---------- Quiz ---------- */
  var qr = $("#quiz-root");
  if (qr) {
    var QS = [
      { k: "caf", t: "¿Quieres tu café con o sin cafeína?", o: [["0", "Sin cafeína", "No disponible en este catálogo"], ["1", "Con cafeína", "Especialidad arábica"], ["x", "Me da igual", "Sorpréndeme"]] },
      { k: "sabor", t: "¿Qué sabor te seduce más?", o: [["nueces", "Nueces y caramelo", "Avellana o nuez"], ["exotico", "Un ensamble diferente", "Pistacho, amaretto y caramelo"], ["puro", "Café de origen", "Guatemala, Bolivia o Colombia"]] },
      { k: "met", t: "¿Cómo sueles prepararlo?", o: [["prensa", "Prensa francesa", "Molido"], ["italiana", "Cafetera italiana", "Espresso en casa"], ["grano", "Muelo mi grano", "Máxima frescura"], ["practico", "Rápido y práctico", "Listo en minutos"]] },
      { k: "regalo", t: "¿Es para ti o para regalar?", o: [["0", "Para mí", "Un gusto diario"], ["1", "Para regalar", "Presentación especial"]] }
    ];
    var ans = {}, step = 0;
    var recommend = function () {
      var best = null, bs = -1;
      P.forEach(function (p) {
        if (!p.q) return;
        if (ans.caf !== "x" && String(p.q.caf) !== ans.caf) return;
        if (p.grind !== (ans.met === "grano" ? "grano" : "molido")) return;
        var s = 0;
        if (p.q.sabor === ans.sabor) s += 3;
        if (p.q.met.indexOf(ans.met) > -1) s += 2;
        if (String(p.q.regalo) === ans.regalo) s += 2; else if (ans.regalo === "1" && p.q.regalo) s += 2;
        if (s > bs) { bs = s; best = p; }
      });
      return best;
    };
    var drawQ = function () {
      if (step >= QS.length) {
        var r = recommend();
        if (!r) {
          qr.innerHTML = '<h2>No hay una opción sin cafeína en este catálogo</h2><p>El catálogo disponible incluye cafés de especialidad con cafeína. Consulta al equipo por otras opciones; no recomendamos un producto que no cumpla esta preferencia.</p><div class="acts"><a class="btn" href="https://wa.me/56977942117" target="_blank" rel="noopener">Consultar por WhatsApp</a><button class="btn ghost" type="button" data-restart>Repetir el quiz</button></div>';
          $("[data-restart]", qr).addEventListener("click", function () { ans = {}; step = 0; drawQ(); });
          return;
        }
        qr.innerHTML = '<span class="eyebrow">Tu café ideal</span><div class="quiz-res" style="margin-top:1rem"><img src="assets/img/' + r.img + '" alt="' + r.name + '"><div><h2 style="font-size:2rem">' + r.name + "</h2><p>" + r.short + " " + r.size + " · " + presentation(r) + ' · <strong>' + money(r.price) + '</strong></p><div class="acts" style="margin-top:1rem"><a class="btn" href="producto.html?id=' + r.id + '">Ver producto</a><button class="btn ghost" type="button" data-add="' + r.id + '">Añadir al carrito</button></div><p style="margin:1.5rem 0 0"><button class="quiz-back" type="button" data-restart>Repetir el quiz</button></p></div></div>';
        $("[data-restart]", qr).addEventListener("click", function () { ans = {}; step = 0; drawQ(); });
        return;
      }
      var q = QS[step];
      qr.innerHTML = '<div class="quiz-prog" aria-hidden="true">' + QS.map(function (_, i) { return '<i class="' + (i <= step ? "on" : "") + '"></i>'; }).join("") + '</div><p class="sr-only" role="status">Pregunta ' + (step + 1) + " de " + QS.length + '</p><h3 class="quiz-q" id="qq" tabindex="-1">' + q.t + '</h3><div class="opts" role="group" aria-labelledby="qq">' +
        q.o.map(function (o) { return '<button class="opt" type="button" data-v="' + o[0] + '">' + o[1] + "<small>" + o[2] + "</small></button>"; }).join("") + "</div>" + (step ? '<button class="quiz-back" type="button" data-back>Volver</button>' : "");
      $$(".opt", qr).forEach(function (b) { b.addEventListener("click", function () { ans[q.k] = b.dataset.v; step++; drawQ(); var h = $("#qq", qr); if (h) h.focus(); }); });
      var bk = $("[data-back]", qr); if (bk) bk.addEventListener("click", function () { step--; drawQ(); });
    };
    drawQ();
  }

  /* ---------- Formularios genéricos ---------- */
  $$("form[data-form]").forEach(function (f) {
    f.setAttribute("novalidate", "");
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate(f)) return;
      var kind = f.dataset.form, box = f.parentNode.querySelector(".msg") || f.querySelector(".msg");
      if (kind === "seguimiento") {
        var n = $("[name=orden]", f).value.trim(), steps = [["Pedido recibido", "Confirmamos tu pago y preparamos tu café.", 1], ["Tostado y empaque", "Tu café se prepara con dedicación.", 1], ["Entregado a Blue Express", "Tu pedido salió de Rancagua.", 1], ["En reparto", "Llega en 1 a 2 días hábiles.", 0], ["Entregado", "¡A disfrutar!", 0]];
        box.className = "msg show panel";
        box.innerHTML = '<p class="eyebrow">Pedido ' + escapeHTML(n) + '</p><ol class="tl">' + steps.map(function (s) { return '<li class="' + (s[2] ? "done" : "") + '"><b>' + escapeHTML(s[0]) + "</b><span>" + escapeHTML(s[1]) + "</span></li>"; }).join("") + '</ol><p class="notice">Estado de demostración: en el sitio real se conecta con el seguimiento de Blue Express.</p>';
        box.setAttribute("tabindex", "-1"); box.focus(); return;
      }
      var texts = { b2b: "¡Gracias! Recibimos tu solicitud. Te contactaremos con información sin compromiso.", contacto: "¡Gracias por escribirnos! Te responderemos a la brevedad, dentro de nuestro horario de atención.", llamada: "¡Listo! Te llamaremos pronto." };
      box.className = "msg show notice ok"; box.textContent = texts[kind] + " (Demostración: el mensaje no se envía.)";
      box.setAttribute("tabindex", "-1"); box.focus(); f.reset();
    });
  });
  var sq = new URLSearchParams(location.search).get("n"), so = $("form[data-form=seguimiento] [name=orden]");
  if (so && sq) so.value = sq;

  /* ---------- Acceder (simulado) ---------- */
  var au = $("#auth");
  if (au) {
    var showAuth = function () {
      var u = store.get("ca_user", null);
      $("[data-auth-in]", au).hidden = !!u; $("[data-auth-out]", au).hidden = !u;
      if (u) $("[data-uname]", au).textContent = u.name;
    };
    $$("[data-tab]", au).forEach(function (t) {
      t.addEventListener("click", function () {
        $$("[data-tab]", au).forEach(function (x) { x.setAttribute("aria-selected", x === t ? "true" : "false"); });
        $$("[data-pane]", au).forEach(function (p) { p.hidden = p.dataset.pane !== t.dataset.tab; });
      });
    });
    $$("[data-go]", au).forEach(function (b) { b.addEventListener("click", function () { var t = $('[data-tab="' + b.dataset.go + '"]', au); if (t) t.click(); else { $$("[data-pane]", au).forEach(function (p) { p.hidden = p.dataset.pane !== b.dataset.go; }); } }); });
    $$("form[data-auth]", au).forEach(function (f) {
      f.setAttribute("novalidate", "");
      f.addEventListener("submit", function (e) {
        e.preventDefault(); if (!validate(f)) return;
        var kind = f.dataset.auth, email = $("[type=email]", f).value;
        if (kind === "reset") { var m = $(".msg", f); m.className = "msg show notice ok"; m.textContent = "Si el correo existe, recibirás un enlace para crear una nueva contraseña (demostración)."; return; }
        var nm = kind === "registro" ? $("[name=nombre]", f).value.trim() : (store.get("ca_user", null) || {}).name || email.split("@")[0];
        store.set("ca_user", { name: nm, email: email }); location.href = "acceder.html";
      });
    });
    $("[data-logout]", au).addEventListener("click", function () { try { localStorage.removeItem("ca_user"); } catch (e) {} location.reload(); });
    showAuth();
  }

  observe();
})();

(function () {
  var c = document.querySelector("[data-brand-car]"); if (!c) return;
  var tr = c.querySelector(".track"), n = tr.children.length, i = 0, dots = c.querySelectorAll(".dots button"), t;
  function go(k) { i = (k + n) % n; tr.style.transform = "translateX(-" + (i * 100) + "%)"; dots.forEach(function (d, j) { d.setAttribute("aria-current", j === i ? "true" : "false"); }); }
  function play() { clearInterval(t); if (!matchMedia("(prefers-reduced-motion: reduce)").matches) t = setInterval(function () { go(i + 1); }, 5000); }
  dots.forEach(function (d, j) { d.addEventListener("click", function () { go(j); play(); }); });
  c.addEventListener("mouseenter", function () { clearInterval(t); }); c.addEventListener("mouseleave", play); play();
})();
(function () {
  var NUM = "56977942117";
  var w = document.createElement("div"); w.className = "wa-bot";
  w.innerHTML = '<button type="button" class="wa-fab" aria-expanded="false" aria-controls="wa-panel" aria-label="Escríbenos por WhatsApp"><svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true"><path fill="#fff" d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3 29l6.8-1.8c1.8 1 3.9 1.5 6.2 1.5 7.2 0 13-5.800 13-13S23.200 3 16 3zm0 23.700c-2 0-3.900-.5-5.500-1.500l-.4-.2-4 1 1.100-3.900-.3-.4C5.800 20.100 5.300 18.100 5.300 16 5.300 10.100 10.100 5.300 16 5.300S26.700 10.100 26.700 16 21.900 26.700 16 26.700zm5.900-8c-.3-.2-1.900-.9-2.200-1-.3-.1-.5-.2-.7.200-.2.300-.8 1-1 1.200-.2.200-.4.200-.7.100-.3-.2-1.400-.5-2.600-1.600-1-.9-1.600-1.900-1.800-2.200-.2-.3 0-.5.100-.7l.5-.5c.1-.2.200-.3.300-.5.100-.2 0-.4 0-.5-.1-.2-.7-1.700-1-2.300-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.100-.8.400-.3.300-1 1-1 2.500s1.100 2.900 1.200 3.100c.2.200 2.100 3.300 5.200 4.500 3.100 1.200 3.100.8 3.600.8.600-.1 1.900-.8 2.100-1.500.3-.7.300-1.300.2-1.500-.1-.1-.3-.2-.6-.4z"/></svg><span>¿Hablamos?</span></button>' +
    '<form class="wa-panel" id="wa-panel" hidden><div class="wa-head"><span class="wa-av">☕</span><div><strong>Café Alegra</strong><small>Te respondemos por WhatsApp</small></div><button type="button" class="wa-x" aria-label="Cerrar">×</button></div><p class="wa-hi">Hola 👋 Cuéntanos qué buscas y seguimos la conversación en WhatsApp.</p>' +
    '<label>¿Cómo te llamas?<input name="n" required autocomplete="given-name"></label>' +
    '<label>¿Qué buscas?<select name="q"><option>Café de especialidad</option><option>Café de higos</option><option>Café de trigo</option><option>Packs</option><option>Complementos</option><option>Café para mi negocio</option><option>Otra consulta</option></select></label>' +
    '<label>Cuéntanos más (opcional)<textarea name="m" rows="2"></textarea></label>' +
    '<button type="submit" class="btn gold block">Continuar en WhatsApp</button></form>';
  document.body.appendChild(w);
  var fab = w.querySelector(".wa-fab"), f = w.querySelector("form");
  fab.addEventListener("click", function () { var o = f.hidden; f.hidden = !o; fab.setAttribute("aria-expanded", o ? "true" : "false"); });
  function cerrar() { f.hidden = true; fab.setAttribute("aria-expanded", "false"); }
  w.querySelector(".wa-x").addEventListener("click", cerrar);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") cerrar(); });
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    var d = new FormData(f), t = "Hola, soy " + d.get("n") + ". Busco: " + d.get("q") + "." + (d.get("m") ? " " + d.get("m") : "");
    window.open("https://wa.me/" + NUM + "?text=" + encodeURIComponent(t), "_blank", "noopener");
  });
})();