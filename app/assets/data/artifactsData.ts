const artifactsData = [
  {
    id: 1,
    name: "Arca Ganesha Periode Majapahit",
    type: "arca",
    period: "Majapahit (1293-1527)",
    description:
      "Arca dewa berkepala gajah yang melambangkan kebijaksanaan, ditemukan di bekas kompleks kerajaan Majapahit.",
    image: "https://placehold.co/400x400/2C5F4F/FFF?text=Arca+Ganesha",
    museum: {
      name: "Museum Nasional Indonesia",
      lat: -6.1764,
      lng: 106.8227,
      province: "DKI Jakarta",
    },
    origin: "Trowulan, Jawa Timur",
  },
  {
    id: 2,
    name: "Prasasti Yupa Mulawarman",
    type: "prasasti",
    period: "Kutai (Abad 4-5)",
    description:
      "Prasasti tertua di Indonesia, mencatat tentang Raja Mulawarman dan kerajaan Kutai. Ditulis dalam aksara Pallawa dan bahasa Sansekerta.",
    image: "https://placehold.co/400x400/D4A574/FFF?text=Prasasti+Yupa",
    museum: {
      name: "Museum Nasional Indonesia",
      lat: -6.1764,
      lng: 106.8227,
      province: "DKI Jakarta",
    },
    origin: "Kutai, Kalimantan Timur",
  },
  {
    id: 3,
    name: "Batik Tulis Keraton Yogyakarta",
    type: "tekstil",
    period: "Mataram Islam (Abad 18)",
    description:
      "Batik tulis dengan motif parang rusak dan kawung yang hanya boleh dipakai keluarga keraton. Simbol filosofi Jawa yang mendalam.",
    image: "https://placehold.co/400x400/3A7763/FFF?text=Batik+Keraton",
    museum: {
      name: "Museum Ullen Sentalu",
      lat: -7.61,
      lng: 110.4262,
      province: "DI Yogyakarta",
    },
    origin: "Keraton Yogyakarta",
  },
  {
    id: 4,
    name: "Keris Empu Gandring",
    type: "senjata",
    period: "Singhasari (1222-1292)",
    description:
      "Keris legendaris yang dikisahkan dalam cerita Ken Arok. Memiliki 13 luk dengan pamor berkualitas tinggi.",
    image: "https://placehold.co/400x400/2C5F4F/FFF?text=Keris+Gandring",
    museum: {
      name: "Museum Nasional Indonesia",
      lat: -6.1764,
      lng: 106.8227,
      province: "DKI Jakarta",
    },
    origin: "Singhasari, Jawa Timur",
  },
  {
    id: 5,
    name: "Arca Prajnaparamita",
    type: "arca",
    period: "Singhasari (1222-1292)",
    description:
      "Arca dewi kebijaksanaan yang dipercaya menggambarkan Ratu Ken Dedes. Karya seni puncak zaman Singhasari.",
    image: "https://placehold.co/400x400/D4A574/FFF?text=Prajnaparamita",
    museum: {
      name: "Museum Nasional Indonesia",
      lat: -6.1764,
      lng: 106.8227,
      province: "DKI Jakarta",
    },
    origin: "Singhasari, Jawa Timur",
  },
  {
    id: 6,
    name: "Ulos Batak Toba",
    type: "tekstil",
    period: "Tradisional Batak",
    description:
      'Kain tenun tradisional Batak dengan motif geometris dan filosofi "Hasangapon, Hamoraon, Hagabeon" (kehormatan, kekayaan, keturunan).',
    image: "https://placehold.co/400x400/3A7763/FFF?text=Ulos+Batak",
    museum: {
      name: "Museum Negeri Sumatera Utara",
      lat: 3.5952,
      lng: 98.6722,
      province: "Sumatera Utara",
    },
    origin: "Danau Toba, Sumatera Utara",
  },
  {
    id: 7,
    name: "Nekara Perunggu Dong Son",
    type: "keramik",
    period: "Prasejarah (500 SM - 100 M)",
    description:
      "Nekara perunggu dengan motif geometris khas budaya Dong Son, digunakan untuk upacara ritual dan simbol status sosial.",
    image: "https://placehold.co/400x400/2C5F4F/FFF?text=Nekara+Dong+Son",
    museum: {
      name: "Museum Bali",
      lat: -8.6576,
      lng: 115.2176,
      province: "Bali",
    },
    origin: "Pejeng, Bali",
  },
  {
    id: 8,
    name: "Rencong Aceh",
    type: "senjata",
    period: "Kesultanan Aceh (Abad 16)",
    description:
      "Senjata tradisional berbentuk huruf L dengan ukiran kaligrafi Arab, simbol keberanian dan identitas budaya Aceh.",
    image: "https://placehold.co/400x400/D4A574/FFF?text=Rencong+Aceh",
    museum: {
      name: "Museum Aceh",
      lat: 5.5577,
      lng: 95.3222,
      province: "Aceh",
    },
    origin: "Aceh Darussalam",
  },
  {
    id: 9,
    name: "Prasasti Ciaruteun",
    type: "prasasti",
    period: "Tarumanegara (Abad 5)",
    description:
      "Prasasti berisi telapak kaki Raja Purnawarman, menandai kejayaan Kerajaan Tarumanegara di Jawa Barat.",
    image: "https://placehold.co/400x400/3A7763/FFF?text=Prasasti+Ciaruteun",
    museum: {
      name: "Museum Nasional Indonesia",
      lat: -6.1764,
      lng: 106.8227,
      province: "DKI Jakarta",
    },
    origin: "Bogor, Jawa Barat",
  },
  {
    id: 10,
    name: "Songket Palembang",
    type: "tekstil",
    period: "Sriwijaya (Abad 7-13)",
    description:
      "Kain tenun dengan benang emas/perak yang menjadi warisan Kesultanan Palembang, simbol kemewahan dan status tinggi.",
    image: "https://placehold.co/400x400/2C5F4F/FFF?text=Songket",
    museum: {
      name: "Museum Bali",
      lat: -8.6576,
      lng: 115.2176,
      province: "Bali",
    },
    origin: "Palembang, Sumatera Selatan",
  },
  {
    id: 11,
    name: "Lampit Stone Sarcophagus",
    type: "keramik",
    period: "Prasejarah (2000 SM)",
    description:
      "Peti jenazah batu dari era megalitikum, menunjukkan kepercayaan dan tradisi pemakaman masyarakat prasejarah.",
    image: "https://placehold.co/400x400/D4A574/FFF?text=Sarcophagus",
    museum: {
      name: "Museum Bali",
      lat: -8.6576,
      lng: 115.2176,
      province: "Bali",
    },
    origin: "Bali",
  },
  {
    id: 12,
    name: "Gamelan Jawa Kuno",
    type: "keramik",
    period: "Majapahit (Abad 14)",
    description:
      "Seperangkat instrumen musik perunggu yang digunakan dalam upacara kerajaan dan pertunjukan wayang.",
    image: "https://placehold.co/400x400/3A7763/FFF?text=Gamelan",
    museum: {
      name: "Museum Ullen Sentalu",
      lat: -7.61,
      lng: 110.4262,
      province: "DI Yogyakarta",
    },
    origin: "Jawa Tengah",
  },
];

export default artifactsData;
