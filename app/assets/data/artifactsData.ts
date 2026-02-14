// LOKANA - Career & Talent Platform Data
// FILTERED: Only Yogyakarta & Central Java cultural heritage
// Each artifact represents a skill validation challenge

const artifactsData = [
  {
    id: 1,
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
    difficulty: "beginner",
    requiredXP: 0, // Unlocked by default for all users
    careerRole: "Textile Curator",
    learningObjective: "Understand batik philosophy and royal symbolism",
  },
  {
    id: 2,
    name: "Keris Empu Gandring",
    type: "senjata",
    period: "Singhasari (1222-1292)",
    description:
      "Keris legendaris yang dikisahkan dalam cerita Ken Arok. Memiliki 13 luk dengan pamor berkualitas tinggi.",
    image: "https://placehold.co/400x400/2C5F4F/FFF?text=Keris+Gandring",
    museum: {
      name: "Museum Sonobudoyo",
      lat: -7.8023,
      lng: 110.3643,
      province: "DI Yogyakarta",
    },
    origin: "Jawa Tengah",
    difficulty: "intermediate",
    requiredXP: 50, // User must complete batik challenge first
    careerRole: "Weaponry Specialist",
    learningObjective: "Master keris metallurgy and historical narrative",
  },
  {
    id: 3,
    name: "Gamelan Jawa Kuno",
    type: "alat musik",
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
    difficulty: "intermediate",
    requiredXP: 100,
    careerRole: "Music Archivist",
    learningObjective: "Explain gamelan's role in Javanese court ceremonies",
  },
  {
    id: 4,
    name: "Topeng Panji Asmarabangun",
    type: "topeng",
    period: "Kesultanan Cirebon (Abad 16)",
    description:
      "Topeng kayu dengan ekspresi halus yang melambangkan kelembutan dan kebijaksanaan raja. Digunakan dalam tari topeng Cirebon.",
    image: "https://placehold.co/400x400/8D6E63/FFF?text=Topeng+Panji",
    museum: {
      name: "Museum Sonobudoyo",
      lat: -7.8023,
      lng: 110.3643,
      province: "DI Yogyakarta",
    },
    origin: "Jawa Tengah (adopted tradition)",
    difficulty: "advanced",
    requiredXP: 200,
    careerRole: "Performing Arts Historian",
    learningObjective: "Interpret topeng symbolism in Javanese dance drama",
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
      name: "Museum Sonobudoyo",
      lat: -7.8023,
      lng: 110.3643,
      province: "DI Yogyakarta",
    },
    origin: "Jawa Tengah",
    difficulty: "advanced",
    requiredXP: 300,
    careerRole: "Buddhist Art Specialist",
    learningObjective: "Analyze iconography of Prajnaparamita goddess",
  },
  {
    id: 6,
    name: "Batik Belanda 'Snow White'",
    type: "tekstil",
    period: "Kolonial Belanda (1840-1940)",
    description:
      "Batik unik karya pengrajin Indo-Eropa dengan motif dongeng Eropa (Putri Salju) namun menggunakan teknik canting tradisional Jawa.",
    image: "https://placehold.co/400x400/FFAB91/000?text=Batik+Belanda",
    museum: {
      name: "Museum Batik Danar Hadi",
      lat: -7.567,
      lng: 110.816,
      province: "Jawa Tengah",
    },
    origin: "Pekalongan, Jawa Tengah",
    difficulty: "expert",
    requiredXP: 500,
    careerRole: "Colonial Heritage Researcher",
    learningObjective: "Evaluate Indo-European fusion in batik techniques",
  },
];

export default artifactsData;
