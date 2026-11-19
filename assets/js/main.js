(function () {
  "use strict";

  // Nomor WhatsApp untuk semua pesanan (0821-3409-4787)
  var WA_PESAN = "6282134094787";

  // Link Google Maps tiap cabang (urutan: Klitren, Condong Catur, Surakarta)
  var LINK_PETA = [
    "https://maps.app.goo.gl/Pb3pG2xJgNbXAoTK6",
    "https://maps.app.goo.gl/JjS4ij8GPnHUMior6",
    "https://maps.app.goo.gl/ati6o3GWNt1Dibqv5"
  ];

  // Daftar menu: [kategori, nama, file foto, deskripsi]
  var PRODUK = [
    ["misoa", "Misoa 99", "misoa-99", "Rasa orisinal yang gurih ringan. Misoa dengan telur, sayuran, jamur, ayam cincang, dan kuah kaldu."],
    ["misoa", "Misoa 99 Creamy", "misoa-99-creamy", "Misoa dengan kuah creamy, ditemani sayuran, jamur, telur, dan ayam cincang."],
    ["misoa", "Misoa Mala", "misoa-mala", "Pedas, gurih, dan beraroma rempah mala. Dengan beef slice, sayuran, dan telur."],
    ["misoa", "Misoa Udang", "misoa-udang", "Misoa berkuah kaldu dengan udang, sayuran, dan telur."],
    ["misoa", "Dry Misoa", "dry-misoa", "Misoa tanpa kuah dengan telur, sayuran, jamur, dan ayam cincang."],
    ["misoa", "Dumpling Soup", "dumpling-soup", "Dumpling dan jamur dalam kuah. Pilih kuah mala atau kuah kaldu."],
    ["misoa", "Skin Tofu Soup", "skin-tofu-soup", "Kulit tahu dan jamur dalam kuah. Pilih kuah kaldu atau mala."],
    ["dimsum", "Dumpling", "dumpling", "Dumpling kukus yang lembut, cocok untuk teman makan misoa."],
    ["dimsum", "Siomay", "siomay", "Siomay kukus dengan topping wortel atau jamur."],
    ["dimsum", "Lumpia Kulit Tahu", "lumpia-kulit-tahu", "Lumpia berbalut kulit tahu yang gurih, enak dicocol saus."],
    ["dimsum", "Dimsum Mentai", "dimsum-mentai", "Dimsum dengan saus mentai dan taburan nori."],
    ["minuman", "Es Teh 99", "es-teh-99", "Es teh khas Kedai 99, segar untuk menemani makan."],
    ["minuman", "Es Teh", "es-teh", "Es teh dingin yang klasik."],
    ["minuman", "Es Teh Hijau 99", "es-teh-hijau-99", "Varian es teh hijau yang segar."],
    ["minuman", "Sweet Honesty", "sweet-honesty", "Minuman segar dengan rasa manis yang pas."],
    ["minuman", "Mangga Phoria", "mangga-phoria", "Minuman segar rasa mangga."],
    ["minuman", "Milo", "milo", "Milo dingin yang manis dan creamy."],
    ["minuman", "Yellow Red", "yellow-red", "Minuman dingin dengan paduan warna kuning dan merah."],
    ["minuman", "Blue Lychee Mint", "blue-lychee-mint", "Minuman segar dengan rasa leci dan mint."],
    ["minuman", "Cutie Berry", "cutie-berry", "Minuman berry yang manis dan segar."]
  ];

  // ===== Tombol "Buka peta" pada tiga kartu cabang =====
  document.querySelectorAll(".kartu-cabang .btn").forEach(function (a, i) {
    if (!LINK_PETA[i]) return;
    a.href = LINK_PETA[i];
    a.target = "_blank";
    a.rel = "noopener";
  });

  // ===== Peta bertab (hanya jalan kalau elemennya ada di index.html) =====
  var tabCabang = document.getElementById("tab-cabang");
  var panelInfo = document.getElementById("peta-info");
  var petaFrame = document.getElementById("peta");

  if (tabCabang && panelInfo && petaFrame) {
    var CABANG = [
      { tab: "Klitren", nama: "Kedai Misoa Qiu Qiu 99", jenis: "Rumah Makan · Cabang pertama",
        alamat: "Jl. Langensari No.41, RW.02, Klitren, Kec. Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55222",
        koordinat: "-7.7860155,110.3861906",
        nilai: "4,5", ulasan: "1.370 ulasan", harga: "Rp 25.000–50.000 per orang",
        info: "Makan di tempat · Drive-through · Antar tanpa bertemu", jam: "Buka mulai pukul 16.00",
        link: LINK_PETA[0] },
      { tab: "Condong Catur", nama: "Kedai Misoa Qiu Qiu 99 Condong Catur", jenis: "Rumah Makan · Sleman, Yogyakarta",
        alamat: "Condong Catur, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta",
        koordinat: "-7.7349747,110.3990371",
        link: LINK_PETA[1] },
      { tab: "Surakarta", nama: "Kedai Misoa Qiu Qiu 99 Surakarta", jenis: "Rumah Makan · Solo",
        alamat: "Kota Surakarta (Solo), Jawa Tengah",
        koordinat: "-7.5707917,110.8066605",
        link: LINK_PETA[2] }
    ];

    var tampilCabang = function (i) {
      var c = CABANG[i], q = encodeURIComponent(c.koordinat);
      petaFrame.src = "https://www.google.com/maps?q=" + q + "&hl=id&z=17&output=embed";
      var h = "<h3>" + c.nama + "</h3>";
      if (c.nilai) h += '<div class="peta-nilai"><strong>' + c.nilai + '</strong> <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i> <small>(' + c.ulasan + ")</small></div>";
      h += '<div class="peta-baris"><i class="bi bi-shop"></i><span>' + c.jenis + "</span></div>";
      h += '<div class="peta-baris"><i class="bi bi-geo-alt-fill"></i><span>' + c.alamat + "</span></div>";
      if (c.jam) h += '<div class="peta-baris"><i class="bi bi-clock-fill"></i><span>' + c.jam + "</span></div>";
      if (c.harga) h += '<div class="peta-baris"><i class="bi bi-cash-coin"></i><span>' + c.harga + "</span></div>";
      if (c.info) h += '<div class="peta-baris"><i class="bi bi-check2-circle"></i><span>' + c.info + "</span></div>";
      h += '<div class="peta-tombol"><a class="btn btn-rute" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=' + q + '"><i class="bi bi-sign-turn-right-fill"></i> Rute</a>' +
           '<a class="btn btn-luar" target="_blank" rel="noopener" href="' + c.link + '"><i class="bi bi-box-arrow-up-right"></i> Buka di Google Maps</a></div>';
      panelInfo.innerHTML = h;
      tabCabang.querySelectorAll("button").forEach(function (b, n) { b.classList.toggle("aktif", n === i); });
    };

    tabCabang.innerHTML = CABANG.map(function (c) { return '<button type="button">' + c.tab + "</button>"; }).join("");
    tabCabang.querySelectorAll("button").forEach(function (b, n) {
      b.addEventListener("click", function () { tampilCabang(n); });
    });
    tampilCabang(0);
  }

  // ===== Daftar produk =====
  var daftar = document.getElementById("daftar-produk");
  daftar.innerHTML = PRODUK.map(function (p) {
    var foto = "assets/img/produk/" + p[2] + ".jpg";
    return '<div class="col-6 col-md-4 col-lg-3 produk-item" data-kategori="' + p[0] + '">' +
      '<article class="kartu-produk">' +
      '<a class="foto glightbox" href="' + foto + '" data-gallery="menu" data-title="' + p[1] + '" aria-label="Perbesar foto ' + p[1] + '">' +
      '<img src="' + foto + '" alt="' + p[1] + '" loading="lazy" width="513" height="640">' +
      '<span class="zoom"><i class="bi bi-zoom-in"></i></span></a>' +
      '<div class="kartu-isi"><h3>' + p[1] + '</h3><p>' + p[3] + '</p>' +
      '</div></article></div>';
  }).join("");

  var lightbox = GLightbox({ selector: ".glightbox", touchNavigation: true, loop: true });

  // ===== Filter kategori (khusus tombol di bagian Produk) =====
  var tombol = document.querySelectorAll("#produk .filter button");
  tombol.forEach(function (b) {
    b.addEventListener("click", function () {
      tombol.forEach(function (x) { x.classList.remove("aktif"); });
      b.classList.add("aktif");
      var f = b.dataset.filter;
      document.querySelectorAll(".produk-item").forEach(function (el) {
        el.classList.toggle("sembunyi", f !== "semua" && el.dataset.kategori !== f);
      });
    });
  });

  // ===== Tulisan berjalan di bawah hero =====
  var nama = PRODUK.map(function (p) { return p[1]; });
  var baris = nama.map(function (n) { return "<span>" + n + "</span><span><i class=\"bi bi-circle-fill\"></i></span>"; }).join("");
  document.getElementById("ticker").innerHTML = baris + baris;

  // ===== Header berubah saat di-scroll =====
  var header = document.getElementById("header");
  function cekScroll() { header.classList.toggle("menempel", window.scrollY > 40); }
  window.addEventListener("scroll", cekScroll, { passive: true });
  cekScroll();

  // ===== Tutup menu mobile setelah klik, tandai menu aktif =====
  var menu = document.getElementById("menu");
  var links = document.querySelectorAll(".nav-link");
  links.forEach(function (a) {
    a.addEventListener("click", function () {
      if (menu.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    });
  });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.toggle("aktif", a.getAttribute("href") === "#" + e.target.id); });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { io.observe(s); });
  }

  document.getElementById("tahun").textContent = new Date().getFullYear();
  
})();

/* Tombol kembali ke atas: muncul setelah menggulir, klik = langsung ke paling atas */
(function () {
  var tombol = document.getElementById("ke-atas");
  if (!tombol) return;
  function cek() { tombol.classList.toggle("tampil", window.scrollY > 400); }
  window.addEventListener("scroll", cek, { passive: true });
  cek();
  tombol.addEventListener("click", function (e) {
    e.preventDefault();
    var pelan = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: pelan ? "smooth" : "auto" });
  });
})();