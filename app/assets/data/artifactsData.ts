// LOKANA - Career & Talent Platform Data
// FILTERED: Only Yogyakarta & Central Java cultural heritage
// Each artifact represents a skill validation challenge

export interface Museum {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
  province: string;
  address: string;
  openingHours: string;
  phone?: string;
  ticketPrice?: string;
  philosophy?: string;
  historyContext?: string;
  museumTheme?: string;
  historicalEra?: string;
  culturalValues?: string[];
  rating?: number;
  totalReviews?: number;
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
    xpReward: number;
  }[];
}

export interface Artifact {
  id: number;
  museumId: number;
  name: string;
  type: string;
  period: string;
  description: string;
  image: string;
  museum: {
    name: string;
    lat: number;
    lng: number;
    province: string;
  };
  origin: string;
  difficulty: string;
  requiredXP: number;
  careerRole: string;
  learningObjective: string;
}

export const museumsData: Museum[] = [
  {
    id: 1,
    name: "Museum Ullen Sentalu",
    category: "seni_dan_budaya",
    description: "Museum yang menyimpan koleksi seni dan budaya Jawa, termasuk batik, wayang, dan artefak keraton. Terletak di kawasan Kaliurang dengan arsitektur yang memukau.",
    image: "https://placehold.co/600x400/3A7763/FFF?text=Museum+Ullen+Sentalu",
    lat: -7.61,
    lng: 110.4262,
    province: "DI Yogyakarta",
    address: "Jl. Boyong Km 2,2, Kaliurang, Hargobinaryan, Pakem, Sleman",
    openingHours: "08:30 - 16:00 WIB",
    phone: "(0274) 895161",
    ticketPrice: "Rp 25.000",
    philosophy: "Ullen Sentalu означает 'mata yang melihat ke dalam', museum ini mengajak pengunjung untuk menyelami filosofi dan makna mendalam dari setiap karya seni Jawa. Konsepnya berdasarkan pada prinsip 'sinergi antara pikiran, perasaan, dan kehendak' dalam tradisi Jawa.",
    historyContext: "Didirikan pada tahun 1995 oleh Radjiman Wediodiningrat, seorang keturunan keluarga keraton yang ingin melestarikan warisan budaya Jawa. Museum ini berlokasi di kawasan Kaliurang yang sejuk, menawarkan pengalaman budaya yang berbeda dari museum konvensional dengan pendekatan yang lebih personal dan edukatif.",
    museumTheme: "Seni dan Budaya Jawa - Koleksi mencakup batik, wayang, senjata tradisional, kereta keraton, dan artefak historis yang menceritakan perjalanan panjang peradaban Jawa dari masa Mataram Islam hingga era kolonial.",
    historicalEra: "Abad ke-18 hingga Abad ke-20 (Mataram Islam, Kolonial Belanda, hingga Kemerdekaan)",
    culturalValues: ["Gotong Royong", "Titik Sunggu", "Luhuring Aedes", "Musyawarah", "Kepribadian Budaya Jawa"],
    rating: 4.7,
    totalReviews: 1250,
    quiz: [
      {
        question: "Apa arti nama 'Ullen Sentalu' dalam bahasa Jawa?",
        options: ["Mata yang melihat ke dalam", "Jendela budaya", "Istana seni", "Rumah batik"],
        correctAnswer: 0,
        xpReward: 10
      },
      {
        question: "Siapa pendiri Museum Ullen Sentalu?",
        options: ["Sultan Hamengkubuwono IX", "Radjiman Wediodiningrat", "Soedirman", "Achmad Soebardjo"],
        correctAnswer: 1,
        xpReward: 15
      },
      {
        question: "Kapan Museum Ullen Sentalu didirikan?",
        options: ["1935", "1975", "1995", "2000"],
        correctAnswer: 2,
        xpReward: 10
      }
    ]
  },
  {
    id: 2,
    name: "Museum Sonobudoyo",
    category: "sejarah",
    description: "Museum terbesar di Yogyakarta yang menyimpan koleksi arca, prasasti, dan peninggalan sejarah Jawa dari masa Majapahit hingga Keraton Yogyakarta.",
    image: "https://placehold.co/600x400/8D6E63/FFF?text=Museum+Sonobudoyo",
    lat: -7.8023,
    lng: 110.3643,
    province: "DI Yogyakarta",
    address: "Jl. Pangukan Kumendung, Wirobrajan, Yogyakarta",
    openingHours: "08:00 - 15:30 WIB",
    phone: "(0274) 376826",
    ticketPrice: "Rp 10.000",
    philosophy: "Sonobudoyo berarti 'teman yang memberikan pengetahuan'. Museum ini menjadi sarana untuk mengenal dan memahami sejarah serta budaya Jawa secara mendalam, menekankan pentingnya belajar dari masa lalu untuk membangun masa depan.",
    historyContext: "Didirikan pada tahun 1935 oleh Kanjeng Gusti Pangeran Adipati Arya (K.G.P.A.A.) Mangkubumi, Sultan Hamengkubuwono VII, dengan bantuan pemerintah kolonial Belanda. Merupakan museum tertua kedua di Indonesia setelah Museum Nasional Jakarta.",
    museumTheme: "Sejarah dan Arkeologi Jawa - Koleksi meliputi arca Hindu-Buddha, prasasti, manuskrip kuno, senjata tradisional, dan artefak dari berbagai periode sejarah Jawa.",
    historicalEra: "Abad ke-8 hingga Abad ke-20 (Mataram Kuno, Majapahit, Mataram Islam, Kolonial)",
    culturalValues: ["Pelestarian Warisan", "Edukcari Sejarah", "Identitas Budaya", "Tradisi Lisan", "Warisan Leluhur"],
    rating: 4.5,
    totalReviews: 2340,
    quiz: [
      {
        question: "Apa arti nama 'Sonobudoyo'?",
        options: ["Teman yang memberikan pengetahuan", "Museum terbesar", " Rumah sejarah", "Pintu budaya"],
        correctAnswer: 0,
        xpReward: 10
      },
      {
        question: "Museum Sonobudoyo didirikan oleh siapa?",
        options: [" Pemerintah Belanda saja", "Sultan Hamengkubuwono VII", "Soedirman", "Bugis"],
        correctAnswer: 1,
        xpReward: 15
      },
      {
        question: "Kapan Museum Sonobudoyo didirikan?",
        options: ["1995", "1975", "1935", "1765"],
        correctAnswer: 2,
        xpReward: 10
      }
    ]
  },
  {
    id: 4,
    name: "Museum Benteng Vredeburg",
    category: "perang",
    description: "Museum yang dibangun di dalam benteng Dutch Fortress yang menceritakan sejarah perjuangan pahlawan Indonesia dalam mempertahankan kemerdekaan.",
    image: "https://placehold.co/600x400/5D4037/FFF?text=Museum+Benteng+Vredeburg",
    lat: -7.8011,
    lng: 110.3663,
    province: "DI Yogyakarta",
    address: "Jl. Margo Mulyo No. 1, Yogyakarta",
    openingHours: "08:00 - 15:30 WIB",
    phone: "(0274) 586934",
    ticketPrice: "Rp 5.000",
    philosophy: "Benteng Vredeburg символизирует борьбу народa Индонезии за свободу. Museum ini mengingatkan kita bahwa kemerdekaan adalah hasil dari pengorbanan para pahlawan, dan kita wajib mempertahankannya dengan jiwa patriotisme.",
    historyContext: "Dibangun oleh pemerintah kolonial Belanda pada tahun 1765 dengan nama 'Fort Vredeburg'. Benteng ini saksi bisu berbagai peristiwa penting, dari pemberontakan Diponegoro hingga proses Proklamasi Kemerdekaan Indonesia.",
    museumTheme: "Sejarah Per Kemerdekaan - Menampilkan diorama, foto, dan artefak yang menceritakan perjuangan pahlawan nasional dalam mempertahank an Kemerdekaan Indonesia.",
    historicalEra: "Abad ke-18 hingga Abad ke-20 (Kolonial, Perang Kemerdekaan, Orde Baru)",
    culturalValues: ["Patriotisme", "Keberanian", "Persatuan", "Pengorbanan", "Kemerdekaan"],
    rating: 4.6,
    totalReviews: 3150,
    quiz: [
      {
        question: "Apa nama asli Benteng Vredeburg saat dibangun kolonial?",
        options: ["Fort Freedom", "Fort Vredeburg", "Fort Amsterdam", "Benteng Kecil"],
        correctAnswer: 1,
        xpReward: 10
      },
      {
        question: "Kapan Benteng Vredeburg dibangun?",
        options: ["1765", "1945", "1900", "1825"],
        correctAnswer: 0,
        xpReward: 15
      },
      {
        question: "Apa tema utama Museum Benteng Vredeburg?",
        options: ["Seni dan Budaya", "Sains", "Sejarah Per Kemerdekaan", "Teknologi"],
        correctAnswer: 2,
        xpReward: 10
      }
    ]
  },
  {
    id: 5,
    name: "Museum Sains dan Teknologi",
    category: "sains",
    description: "Museum interactif yang menampilkan berbagai eksperimen sains dan teknologi, cocok untuk pembelajaran dan kunjungan keluarga.",
    image: "https://placehold.co/600x400/1976D2/FFF?text=Museum+Sains+dan+Teknologi",
    lat: -7.7756,
    lng: 110.3725,
    province: "DI Yogyakarta",
    address: "Jl. Colombo No. 1, Yogyakarta",
    openingHours: "08:00 - 16:00 WIB",
    phone: "(0274) 555796",
    ticketPrice: "Rp 15.000",
    philosophy: "Ilmu pengetahuan adalah kunci untuk memahami dunia. Museum ini bertujuan memicu rasa ingin tahu dan semangat eksplorasi pada generasi muda, menunjukkan bahwa sains itu menyenangkan dan bisa diakses oleh semua orang.",
    historyContext: "Didirikan pada tahun 2000 sebagai upaya untuk meningkatkan literasi sains di kalangan masyarakat Yogyakarta. Museum ini menjadi tujuan edukasi favorit bagi sekolah-sekolah di Jawa Tengah dan DIY.",
    museumTheme: "Sains Interaktif - Menampilkan berbagai eksperimen fisika, kimia, biologi, dan teknologi yang bisa dicoba langsung oleh pengunjung.",
    historicalEra: "Abad ke-21 (Era Modern, Teknologi Digital)",
    culturalValues: ["Rasa Ingin Tahu", "Inovasi", "Penalaran", "Eksplorasi", "Pembelajaran Sepanjang Hayat"],
    rating: 4.4,
    totalReviews: 780,
    quiz: [
      {
        question: "Apa fokus utama Museum Sains dan Teknologi?",
        options: ["Sejarah", "Seni", "Eksperimen interaktif", "Artefak"],
        correctAnswer: 2,
        xpReward: 10
      },
      {
        question: "Kapan Museum Sains dan Teknologi didirikan?",
        options: ["1990", "1995", "2000", "2005"],
        correctAnswer: 2,
        xpReward: 15
      },
      {
        question: "Siapa yang menjadi tujuan utama kunjungan museum ini?",
        options: ["Wisatawan mancanegara", "Sekolah dan keluarga", "Kolektor seni", "Peneliti"],
        correctAnswer: 1,
        xpReward: 10
      }
    ]
  },
  {
    id: 7,
    name: "Museum Kereta Api",
    category: "sejarah",
    description: "Museum yang menyimpan koleksi kereta api historic dan memorabilia perkeretaapian Indonesia dari masa kolonial hingga modern.",
    image: "https://placehold.co/600x400/6D4C41/FFF?text=Museum+Kereta+Api",
    lat: -7.7845,
    lng: 110.3678,
    province: "DI Yogyakarta",
    address: "Jl.主动列车库, Yogyakarta",
    openingHours: "08:00 - 14:00 WIB",
    phone: "(0274) 412345",
    ticketPrice: "Rp 8.000",
    philosophy: "Kereta api adalah simbol kemajuan dan koneksi antar wilayah. Museum ini menggambarkan bagaimana transportasi telah berkembang dan menghubungkan berbagai daerah di Indonesia.",
    historyContext: "Dibangun di atas bekas depot kereta api Yogyakarta yang didirikan pada masa kolonial Belanda. Menyimpan berbagai koleksi kereta kuno yang digunakan oleh keluarga keraton dan pemerintah kolonial.",
    museumTheme: "Sejarah Perkeretaapian - Koleksi kereta api historic, lokomotif, dan memorabilia terkait perkembangan transportasi kereta api di Indonesia.",
    historicalEra: "Abad ke-19 hingga Abad ke-20 (Kolonial Belanda, Kemerdekaan, Modern)",
    culturalValues: ["Kemajuan", "Konektivitas", "Sejarah Transportasi", "Inovasi Teknik", "Warisan Kolonial"],
    rating: 4.3,
    totalReviews: 420,
    quiz: [
      {
        question: "Apa yang disimpan di Museum Kereta Api Yogyakarta?",
        options: ["Senjata kuno", "Kereta api historic", "Batik", "arca"],
        correctAnswer: 1,
        xpReward: 10
      },
      {
        question: "Di atas apa museum ini dibangun?",
        options: ["Benteng", "Kantor", "Bekas depot kereta api", "Candi"],
        correctAnswer: 2,
        xpReward: 15
      },
      {
        question: "Era apa yang dicakup dalam koleksi museum ini?",
        options: ["Abad ke-10", "Abad ke-15", "Abad ke-19-20", "Abad ke-5"],
        correctAnswer: 2,
        xpReward: 10
      }
    ]
  },
  {
    id: 8,
    name: "Museum Wayang",
    category: "seni_dan_budaya",
    description: "Museum khusus yang mempromosikan dan melestarikan seni wayang Kulit dan wayang golek sebagai warisan budaya dunia.",
    image: "https://placehold.co/600x400/7B1FA2/FFF?text=Museum+Wayang",
    lat: -7.7989,
    lng: 110.3612,
    province: "DI Yogyakarta",
    address: "Jl. Rotowijayan No. 1, Yogyakarta",
    openingHours: "08:00 - 15:00 WIB",
    phone: "(0274) 378888",
    ticketPrice: "Rp 12.000",
    philosophy: "Wayang adalah theater tertua di dunia yang menggabungkan seni, sastra, musik, dan filosofi hidup dalam satu pertunjukan. Melalui wayang, nilai-nilai kehidupan dan moral disampaikan secara menarik kepada generasi muda.",
    historyContext: "Didirikan pada tahun 1975 dan dikelola oleh pemerintah daerah Yogyakarta. Museum ini juga menjadi tempat pertunjukan wayang setiap minggu wage sebagai upaya melestarikan seni tradisional.",
    museumTheme: "Seni Wayang - Koleksi wayang kulit, wayang golek, wayang beber, dan berbagai topeng dari seluruh Indonesia.",
    historicalEra: "Abad ke-10 hingga Sekarang (Mataram Kuno, Majapahit, Mataram Islam, Modern)",
    culturalValues: ["Filosofi Hidup", "Cerita Moral", "Seni Pertunjukan", "Tradisi Lisan", "Warisan UNESCO"],
    rating: 4.5,
    totalReviews: 890,
    quiz: [
      {
        question: "Apa saja jenis wayang yang disimpan di Museum Wayang?",
        options: ["Wayang kulit dan golek", "Wayang kayu saja", "Wayang kertas", "Wayang stone"],
        correctAnswer: 0,
        xpReward: 10
      },
      {
        question: "Apakah wayang merupakan warisan dunia (UNESCO)?",
        options: ["Tidak", "Ya", "Sedang proses", "Tidak tahu"],
        correctAnswer: 1,
        xpReward: 15
      },
      {
        question: "Kapan Museum Wayang didirikan?",
        options: ["1965", "1975", "1985", "1995"],
        correctAnswer: 1,
        xpReward: 10
      }
    ]
  }
];

const artifactsData: Artifact[] = [
  {
    id: 1,
    museumId: 1,
    name: "Batik Tulis Keraton Yogyakarta",
    type: "tekstil",
    period: "Mataram Islam (Abad 18)",
    description: "Batik tulis dengan motif parang rusak dan kawung yang hanya boleh dipakai keluarga keraton. Simbol filosofi Jawa yang mendalam.",
    image: "https://placehold.co/400x400/3A7763/FFF?text=Batik+Keraton",
    museum: { name: "Museum Ullen Sentalu", lat: -7.61, lng: 110.4262, province: "DI Yogyakarta" },
    origin: "Keraton Yogyakarta",
    difficulty: "beginner",
    requiredXP: 0,
    careerRole: "Textile Curator",
    learningObjective: "Understand batik philosophy and royal symbolism"
  },
  {
    id: 2,
    museumId: 1,
    name: "Wayang Kulit Purwa",
    type: "wayang",
    period: "Majapahit (Abad 14-15)",
    description: "Wayang kulit dengan tokoh-tokoh Mahabharata dan Ramayana. Setiap boneka menceritakan kisah heroik penuh nilai moral.",
    image: "https://placehold.co/400x400/5D4037/FFF?text=Wayang+Kulit",
    museum: { name: "Museum Ullen Sentalu", lat: -7.61, lng: 110.4262, province: "DI Yogyakarta" },
    origin: "Yogyakarta & Surakarta",
    difficulty: "beginner",
    requiredXP: 0,
    careerRole: "Wayang Curator",
    learningObjective: "Understand wayang philosophy and storytelling traditions"
  },
  {
    id: 3,
    museumId: 1,
    name: "Kereta Kencana Wisnu",
    type: "kereta",
    period: "Mataram Islam (Abad 19)",
    description: "Kereta kerajaan yang digunakan dalam/upacara/adat keraton. Dibuat dengan teknik ukiran halus dan ornamen emas.",
    image: "https://placehold.co/400x400/FFD700/000?text=Kereta+Wisnu",
    museum: { name: "Museum Ullen Sentalu", lat: -7.61, lng: 110.4262, province: "DI Yogyakarta" },
    origin: "Keraton Yogyakarta",
    difficulty: "intermediate",
    requiredXP: 100,
    careerRole: "Royal Heritage Specialist",
    learningObjective: "Understand Javanese royal ceremonies"
  },
  {
    id: 4,
    museumId: 2,
    name: "Keris Empu Gandring",
    type: "senjata",
    period: "Singhasari (1222-1292)",
    description: "Keris legendaris yang dikisahkan dalam cerita Ken Arok. Memiliki 13 luk dengan pamor berkualitas tinggi.",
    image: "https://placehold.co/400x400/2C5F4F/FFF?text=Keris+Gandring",
    museum: { name: "Museum Sonobudoyo", lat: -7.8023, lng: 110.3643, province: "DI Yogyakarta" },
    origin: "Jawa Tengah",
    difficulty: "intermediate",
    requiredXP: 50,
    careerRole: "Weaponry Specialist",
    learningObjective: "Master keris metallurgy and historical narrative"
  },
  {
    id: 5,
    museumId: 2,
    name: "Topeng Panji Asmarabangun",
    type: "topeng",
    period: "Kesultanan Cirebon (Abad 16)",
    description: "Topeng kayu dengan ekspresi halus yang melambangkan kelembutan dan kebijaksanaan raja. Digunakan dalam tari topeng Cirebon.",
    image: "https://placehold.co/400x400/8D6E63/FFF?text=Topeng+Panji",
    museum: { name: "Museum Sonobudoyo", lat: -7.8023, lng: 110.3643, province: "DI Yogyakarta" },
    origin: "Jawa Tengah (adopted tradition)",
    difficulty: "advanced",
    requiredXP: 200,
    careerRole: "Performing Arts Historian",
    learningObjective: "Interpret topeng symbolism in Javanese dance drama"
  },
  {
    id: 6,
    museumId: 2,
    name: "Arca Prajnaparamita",
    type: "arca",
    period: "Singhasari (1222-1292)",
    description: "Arca dewi kebijaksanaan yang dipercaya menggambarkan Ratu Ken Dedes. Karya seni puncak zaman Singhasari.",
    image: "https://placehold.co/400x400/D4A574/FFF?text=Prajnaparamita",
    museum: { name: "Museum Sonobudoyo", lat: -7.8023, lng: 110.3643, province: "DI Yogyakarta" },
    origin: "Jawa Tengah",
    difficulty: "advanced",
    requiredXP: 300,
    careerRole: "Buddhist Art Specialist",
    learningObjective: "Analyze iconography of Prajnaparamita goddess"
  },
  {
    id: 7,
    museumId: 2,
    name: "Prasasti Canggal",
    type: "prasasti",
    period: "Mataram Kuno (732 M)",
    description: "Prasasti tertua di Jawa Tengah yang ditulis dalam aksara Pallawa dan bahasa Sanskerta. Menandai berdirinya Kerajaan Mataram.",
    image: "https://placehold.co/400x400/795548/FFF?text=Prasasti+Canggal",
    museum: { name: "Museum Sonobudoyo", lat: -7.8023, lng: 110.3643, province: "DI Yogyakarta" },
    origin: "Mataram Kuno",
    difficulty: "expert",
    requiredXP: 400,
    careerRole: "Epigrapher",
    learningObjective: "Understand early Javanese inscriptions"
  },
  {
    id: 11,
    museumId: 4,
    name: "Senjata Pistol Walther",
    type: "senjata",
    period: "Perang Kemerdekaan (1945-1949)",
    description: "Pistol yang digunakan oleh para pahlawan nasional dalam pertempuran melawan penjajah.",
    image: "https://placehold.co/400x400/263238/FFF?text=Pistol+Walther",
    museum: { name: "Museum Benteng Vredeburg", lat: -7.8011, lng: 110.3663, province: "DI Yogyakarta" },
    origin: "Jogja",
    difficulty: "beginner",
    requiredXP: 0,
    careerRole: "Military Historian",
    learningObjective: "Understand weapons of independence struggle"
  },
  {
    id: 12,
    museumId: 4,
    name: "Bendera Merah Putih",
    type: "dokumen",
    period: "Proklamasi (1945)",
    description: "Bendera pusaka yang pertama kali dikibarkan pada tanggal 17 Agustus 1945 di Jakarta.",
    image: "https://placehold.co/400x400/D32F2F/FFF?text=Bendera+Merah+Putih",
    museum: { name: "Museum Benteng Vredeburg", lat: -7.8011, lng: 110.3663, province: "DI Yogyakarta" },
    origin: "Jakarta",
    difficulty: "intermediate",
    requiredXP: 100,
    careerRole: "National Heritage Curator",
    learningObjective: "Understand significance of national symbols"
  },
  {
    id: 13,
    museumId: 4,
    name: "Surat Perintah 10 November",
    type: "dokumen",
    period: "Perang Kemerdekaan (1945)",
    description: "Surat perintah yang dikeluarkan oleh Jenderal Sudirman untuk berperang setelah pendudukan Jepang.",
    image: "https://placehold.co/400x400/5D4037/FFF?text=Surat+10+November",
    museum: { name: "Museum Benteng Vredeburg", lat: -7.8011, lng: 110.3663, province: "DI Yogyakarta" },
    origin: "Jogja",
    difficulty: "advanced",
    requiredXP: 250,
    careerRole: "Documentary Historian",
    learningObjective: "Analyze historical documents of independence"
  },
  {
    id: 17,
    museumId: 7,
    name: "Lokomotif BBB 2500",
    type: "kereta api",
    period: "Kolonial Belanda (1925)",
    description: "Lokomotif uap legendaris yang digunakan pada masa kolonial. Simbol kemajuan perkeretaapian di Indonesia.",
    image: "https://placehold.co/400x400/5D4037/FFF?text=Lokomotif+BBB",
    museum: { name: "Museum Kereta Api", lat: -7.7845, lng: 110.3678, province: "DI Yogyakarta" },
    origin: "Jogja",
    difficulty: "beginner",
    requiredXP: 0,
    careerRole: "Transportation Historian",
    learningObjective: "Understand colonial railway development"
  },
  {
    id: 18,
    museumId: 7,
    name: "Gerbong Kereta Sultan",
    type: "kereta api",
    period: "Kolonial Belanda (1910)",
    description: "Gerbong kelas istimewa yang digunakan oleh keluarga keraton dan pejabat tinggi kolonial.",
    image: "https://placehold.co/400x400/FFB300/000?text=Gerbong+Sultan",
    museum: { name: "Museum Kereta Api", lat: -7.7845, lng: 110.3678, province: "DI Yogyakarta" },
    origin: "Yogyakarta",
    difficulty: "intermediate",
    requiredXP: 100,
    careerRole: "Railway Heritage Expert",
    learningObjective: "Understand royal railway carriages"
  },
  {
    id: 19,
    museumId: 8,
    name: "Wayang Golek Semar",
    type: "wayang",
    period: "Mataram Islam (Abad 17)",
    description: "Wayang golek berbentuk tokoh Semar, dalang yang bijaksana dan penuh filosofi kehidupan.",
    image: "https://placehold.co/400x400/4E342E/FFF?text=Wayang+Golek+Semar",
    museum: { name: "Museum Wayang", lat: -7.7989, lng: 110.3612, province: "DI Yogyakarta" },
    origin: "Jawa Barat",
    difficulty: "beginner",
    requiredXP: 0,
    careerRole: "Wayang Historian",
    learningObjective: "Understand wayang golek traditions"
  },
  {
    id: 20,
    museumId: 8,
    name: "Wayang Kulit Arjuna",
    type: "wayang",
    period: "Majapahit (Abad 15)",
    description: "Wayang kulit dengan Arjuna sebagai tokoh utama. Penyebutan epic Mahabharata dalam bentuk teatrikal.",
    image: "https://placehold.co/400x400/6D4C41/FFF?text=Wayang+Kulit+Arjuna",
    museum: { name: "Museum Wayang", lat: -7.7989, lng: 110.3612, province: "DI Yogyakarta" },
    origin: "Yogyakarta",
    difficulty: "intermediate",
    requiredXP: 150,
    careerRole: "Performance Art Curator",
    learningObjective: "Understand Mahabharata stories in wayang"
  },
  {
    id: 21,
    museumId: 8,
    name: "Wayang Beber",
    type: "wayang",
    period: "Mataram Kuno (Abad 10)",
    description: "Bentuk wayang tertua berupa gambar digulung yang diceritakan oleh dalang. Warisan tradisi lisan.",
    image: "https://placehold.co/400x400/8D6E63/FFF?text=Wayang+Beber",
    museum: { name: "Museum Wayang", lat: -7.7989, lng: 110.3612, province: "DI Yogyakarta" },
    origin: "Jawa Tengah",
    difficulty: "advanced",
    requiredXP: 300,
    careerRole: "Oral Tradition Expert",
    learningObjective: "Understand earliest form of Javanese storytelling"
  },
  {
    id: 22,
    museumId: 1,
    name: "Gamelan Jawa Kuno",
    type: "alat musik",
    period: "Majapahit (Abad 14)",
    description: "Seperangkat instrumen musik perunggu yang digunakan dalam upacara kerajaan dan pertunjukan wayang.",
    image: "https://placehold.co/400x400/3A7763/FFF?text=Gamelan",
    museum: { name: "Museum Ullen Sentalu", lat: -7.61, lng: 110.4262, province: "DI Yogyakarta" },
    origin: "Jawa Tengah",
    difficulty: "intermediate",
    requiredXP: 100,
    careerRole: "Music Archivist",
    learningObjective: "Explain gamelan's role in Javanese court ceremonies"
  }
];

export default artifactsData;
