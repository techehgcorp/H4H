// src/dictionaries/agents.js
// Text for the "Find an Agent" pages, in all four site languages.
// Agent-specific text (bios, taglines...) lives in the Google Sheet instead.
//
// Placeholders like {name} and {count} are filled in by the page.

const en = {
  meta: {
    directoryTitle: "Find a Licensed Insurance Agent in Florida | Health 4 Haitians",
    directoryDescription:
      "Meet the licensed insurance agents of Health 4 Haitians. Get help in English, Haitian Creole, Spanish or French with health, Medicare, life, dental, vision and final expense coverage.",
  },
  directory: {
    title: "Find an Agent",
    intro:
      "Our licensed agents speak your language and understand your family. Choose an agent to see their profile, request a free quote, or call them directly.",
    breadcrumb: "Find an Agent",
    searchLabel: "Search by name",
    searchPlaceholder: "Type an agent's name",
    languageLabel: "Speaks",
    allLanguages: "All languages",
    resultsOne: "1 agent",
    resultsMany: "{count} agents",
    noResults: "No agents match your search. Try another name or language.",
    clearFilters: "Clear filters",
    unavailable:
      "Our agent directory is being updated. Please call our office and we'll connect you with an agent right away.",
    viewProfile: "View Profile",
    call: "Call",
    callAria: "Call {name}",
    photoAlt: "{name}, licensed insurance agent",
    ctaTitle: "Not sure who to talk to?",
    ctaText: "Call our office and we'll connect you with the right agent for your family.",
    ctaButton: "Book an Appointment",
  },
  products: {
    life: "Life",
    health: "Health",
    medicare: "Medicare",
    dental: "Dental",
    vision: "Vision",
    "final-expense": "Final Expense",
  },
  profile: {
    metaTitle: "{name}, Licensed Insurance Agent | Health 4 Haitians",
    metaDescription:
      "{name} is a licensed insurance agent with Health 4 Haitians. Get free help with health, Medicare, life, dental, vision and final expense coverage.",
    photoAlt: "{name}, licensed insurance agent with Health 4 Haitians",
    call: "Call {firstName}",
    email: "Email",
    emailAria: "Email {name}",
    coverageEyebrow: "Coverage options",
    coverageTitle: "How {firstName} can help your family",
    coverageIntro:
      "Choose the protection you need. {firstName} will compare plans with you and explain your options in plain language.",
    bestFor: "Best for:",
    enrollEyebrow: "Enroll online",
    enrollTitle: "Prefer to enroll yourself?",
    enrollIntro:
      "Use {firstName}'s secure links to our partner enrollment sites. {firstName} stays your agent and can help at any step.",
    opensNewTab: "(opens in a new tab)",
    aboutEyebrow: "About",
    aboutTitle: "Meet {firstName}",
    background: "Professional background",
    mission: "Mission",
    awards: "Honors & awards",
    atAGlance: "At a glance",
    location: "Location",
    licensedIn: "Licensed in",
    languages: "Languages",
    follow: "Follow {firstName}",
    faqEyebrow: "Questions",
    faqTitle: "Common questions",
    contactTitle: "Ready to talk with {firstName}?",
    contactText: "Call or email today for free, no-pressure help choosing the right coverage.",
    allAgents: "See all agents",
  },
  productInfo: {
    life: {
      name: "Life Insurance",
      text: "Protect your family's financial future if something happens to you.",
      bestFor: "Parents and couples",
    },
    health: {
      name: "Health Insurance",
      text: "Coverage for doctor visits, hospital care and prescriptions.",
      bestFor: "Individuals and families",
    },
    medicare: {
      name: "Medicare",
      text: "Advantage, Supplement and drug plans that fit your needs and budget.",
      bestFor: "Turning 65 or reviewing current coverage",
    },
    dental: {
      name: "Dental",
      text: "Cleanings, exams and common procedures to keep your smile healthy.",
      bestFor: "Preventive care and everyday dental needs",
    },
    vision: {
      name: "Vision",
      text: "Eye exams, glasses and contact lenses.",
      bestFor: "Routine exams, glasses and contacts",
    },
    "final-expense": {
      name: "Final Expense",
      text: "Help your loved ones cover funeral and end-of-life costs.",
      bestFor: "Seniors who want simple, affordable protection",
    },
  },
  carriers: {
    healthSherpa: "ACA Marketplace health plans",
    oneShare: "Health sharing plans",
    ameritasDental: "Dental plans",
  },
  faq: {
    life: {
      q: "Why do I need life insurance?",
      a: "Life insurance helps your family keep their lifestyle, pay off debts, cover funeral costs and replace your income if you pass away. It's the foundation of any solid financial protection plan.",
    },
    health: {
      q: "What does health insurance cover?",
      a: "Health insurance covers doctor visits, hospital stays, prescriptions, preventive care and specialist visits. The right plan keeps your out-of-pocket costs manageable and makes sure you get care when you need it most.",
    },
    medicare: {
      q: "When should I enroll in Medicare?",
      a: "Most people become eligible at 65. Your Initial Enrollment Period starts 3 months before the month you turn 65 and ends 3 months after it. Missing it can mean late-enrollment penalties, so we'll help you enroll on time.",
    },
    dental: {
      q: "Is dental insurance worth it?",
      a: "Dental problems left untreated become very expensive. A dental plan usually covers preventive care like cleanings and X-rays at little or no cost, and lowers the cost of fillings, crowns and other procedures.",
    },
    vision: {
      q: "What does vision insurance include?",
      a: "Vision plans cover yearly eye exams, prescription glasses or contact lenses, and discounts on LASIK. An eye exam can also catch early signs of diabetes and high blood pressure.",
    },
    "final-expense": {
      q: "What is final expense insurance?",
      a: "Final expense insurance is a small whole life policy (often $5,000 to $25,000) that covers funeral costs, medical bills and remaining debts. It protects your family from a financial burden at an already difficult time.",
    },
  },
};

const es = {
  meta: {
    directoryTitle: "Encuentre un Agente de Seguros con Licencia en Florida | Health 4 Haitians",
    directoryDescription:
      "Conozca a los agentes de seguros con licencia de Health 4 Haitians. Reciba ayuda en inglés, criollo haitiano, español o francés con seguros de salud, Medicare, vida, dental, visión y gastos finales.",
  },
  directory: {
    title: "Encuentre un Agente",
    intro:
      "Nuestros agentes con licencia hablan su idioma y entienden a su familia. Elija un agente para ver su perfil, solicitar una cotización gratis o llamarle directamente.",
    breadcrumb: "Encuentre un Agente",
    searchLabel: "Buscar por nombre",
    searchPlaceholder: "Escriba el nombre de un agente",
    languageLabel: "Habla",
    allLanguages: "Todos los idiomas",
    resultsOne: "1 agente",
    resultsMany: "{count} agentes",
    noResults: "Ningún agente coincide con su búsqueda. Pruebe otro nombre o idioma.",
    clearFilters: "Borrar filtros",
    unavailable:
      "Estamos actualizando nuestro directorio de agentes. Llame a nuestra oficina y le conectaremos con un agente de inmediato.",
    viewProfile: "Ver Perfil",
    call: "Llamar",
    callAria: "Llamar a {name}",
    photoAlt: "{name}, agente de seguros con licencia",
    ctaTitle: "¿No sabe con quién hablar?",
    ctaText: "Llame a nuestra oficina y le conectaremos con el agente adecuado para su familia.",
    ctaButton: "Reservar una Cita",
  },
  products: {
    life: "Vida",
    health: "Salud",
    medicare: "Medicare",
    dental: "Dental",
    vision: "Visión",
    "final-expense": "Gastos Finales",
  },
  profile: {
    metaTitle: "{name}, Agente de Seguros con Licencia | Health 4 Haitians",
    metaDescription:
      "{name} es agente de seguros con licencia de Health 4 Haitians. Reciba ayuda gratis con seguros de salud, Medicare, vida, dental, visión y gastos finales.",
    photoAlt: "{name}, agente de seguros con licencia de Health 4 Haitians",
    call: "Llamar a {firstName}",
    email: "Correo",
    emailAria: "Enviar un correo a {name}",
    coverageEyebrow: "Opciones de cobertura",
    coverageTitle: "Cómo {firstName} puede ayudar a su familia",
    coverageIntro:
      "Elija la protección que necesita. {firstName} comparará los planes con usted y le explicará sus opciones con palabras sencillas.",
    bestFor: "Ideal para:",
    enrollEyebrow: "Inscripción en línea",
    enrollTitle: "¿Prefiere inscribirse usted mismo?",
    enrollIntro:
      "Use los enlaces seguros de {firstName} a los sitios de inscripción de nuestros socios. {firstName} sigue siendo su agente y puede ayudarle en cualquier paso.",
    opensNewTab: "(se abre en una pestaña nueva)",
    aboutEyebrow: "Acerca de",
    aboutTitle: "Conozca a {firstName}",
    background: "Experiencia profesional",
    mission: "Misión",
    awards: "Reconocimientos y premios",
    atAGlance: "En resumen",
    location: "Ubicación",
    licensedIn: "Con licencia en",
    languages: "Idiomas",
    follow: "Siga a {firstName}",
    faqEyebrow: "Preguntas",
    faqTitle: "Preguntas frecuentes",
    contactTitle: "¿Listo para hablar con {firstName}?",
    contactText: "Llame o escriba hoy para recibir ayuda gratis y sin presión para elegir la cobertura adecuada.",
    allAgents: "Ver todos los agentes",
  },
  productInfo: {
    life: {
      name: "Seguro de Vida",
      text: "Proteja el futuro financiero de su familia si algo le sucede.",
      bestFor: "Padres y parejas",
    },
    health: {
      name: "Seguro de Salud",
      text: "Cobertura para consultas médicas, atención hospitalaria y medicamentos.",
      bestFor: "Personas y familias",
    },
    medicare: {
      name: "Medicare",
      text: "Planes Advantage, Suplementarios y de medicamentos que se ajustan a sus necesidades y presupuesto.",
      bestFor: "Quienes cumplen 65 años o revisan su cobertura",
    },
    dental: {
      name: "Dental",
      text: "Limpiezas, exámenes y procedimientos comunes para mantener su sonrisa sana.",
      bestFor: "Cuidado preventivo y necesidades dentales diarias",
    },
    vision: {
      name: "Visión",
      text: "Exámenes de la vista, anteojos y lentes de contacto.",
      bestFor: "Exámenes de rutina, anteojos y lentes de contacto",
    },
    "final-expense": {
      name: "Gastos Finales",
      text: "Ayude a sus seres queridos a cubrir los gastos funerarios y de fin de vida.",
      bestFor: "Personas mayores que buscan protección sencilla y económica",
    },
  },
  carriers: {
    healthSherpa: "Planes de salud del Mercado de Seguros (ACA)",
    oneShare: "Planes de gastos médicos compartidos",
    ameritasDental: "Planes dentales",
  },
  faq: {
    life: {
      q: "¿Por qué necesito un seguro de vida?",
      a: "El seguro de vida ayuda a su familia a mantener su estilo de vida, pagar deudas, cubrir los gastos funerarios y reemplazar sus ingresos si usted fallece. Es la base de cualquier plan de protección financiera.",
    },
    health: {
      q: "¿Qué cubre un seguro de salud?",
      a: "El seguro de salud cubre consultas médicas, estadías en el hospital, medicamentos recetados, atención preventiva y visitas a especialistas. El plan adecuado mantiene sus gastos de bolsillo bajo control y le asegura atención cuando más la necesita.",
    },
    medicare: {
      q: "¿Cuándo debo inscribirme en Medicare?",
      a: "La mayoría de las personas es elegible a los 65 años. Su Período de Inscripción Inicial empieza 3 meses antes del mes en que cumple 65 y termina 3 meses después. Si lo deja pasar, podría pagar multas por inscripción tardía; le ayudamos a inscribirse a tiempo.",
    },
    dental: {
      q: "¿Vale la pena un seguro dental?",
      a: "Los problemas dentales sin tratar se vuelven muy costosos. Un plan dental suele cubrir el cuidado preventivo, como limpiezas y radiografías, a bajo o ningún costo, y reduce el costo de empastes, coronas y otros procedimientos.",
    },
    vision: {
      q: "¿Qué incluye un seguro de visión?",
      a: "Los planes de visión cubren el examen anual de la vista, anteojos o lentes de contacto recetados y descuentos en cirugía LASIK. Un examen de la vista también puede detectar señales tempranas de diabetes y presión alta.",
    },
    "final-expense": {
      q: "¿Qué es un seguro de gastos finales?",
      a: "Es una póliza pequeña de vida entera (a menudo de $5,000 a $25,000) que cubre los gastos funerarios, las facturas médicas y las deudas pendientes. Protege a su familia de una carga financiera en un momento ya difícil.",
    },
  },
};

const fr = {
  meta: {
    directoryTitle: "Trouver un Agent d'Assurance Agréé en Floride | Health 4 Haitians",
    directoryDescription:
      "Découvrez les agents d'assurance agréés de Health 4 Haitians. Obtenez de l'aide en anglais, en créole haïtien, en espagnol ou en français pour l'assurance santé, Medicare, vie, dentaire, vision et frais funéraires.",
  },
  directory: {
    title: "Trouver un Agent",
    intro:
      "Nos agents agréés parlent votre langue et comprennent votre famille. Choisissez un agent pour consulter son profil, demander un devis gratuit ou l'appeler directement.",
    breadcrumb: "Trouver un Agent",
    searchLabel: "Rechercher par nom",
    searchPlaceholder: "Tapez le nom d'un agent",
    languageLabel: "Parle",
    allLanguages: "Toutes les langues",
    resultsOne: "1 agent",
    resultsMany: "{count} agents",
    noResults: "Aucun agent ne correspond à votre recherche. Essayez un autre nom ou une autre langue.",
    clearFilters: "Effacer les filtres",
    unavailable:
      "Notre annuaire d'agents est en cours de mise à jour. Appelez notre bureau et nous vous mettrons tout de suite en relation avec un agent.",
    viewProfile: "Voir le Profil",
    call: "Appeler",
    callAria: "Appeler {name}",
    photoAlt: "{name}, agent d'assurance agréé",
    ctaTitle: "Vous ne savez pas à qui vous adresser ?",
    ctaText: "Appelez notre bureau et nous vous orienterons vers l'agent qui convient à votre famille.",
    ctaButton: "Prendre Rendez-vous",
  },
  products: {
    life: "Vie",
    health: "Santé",
    medicare: "Medicare",
    dental: "Dentaire",
    vision: "Vision",
    "final-expense": "Frais Funéraires",
  },
  profile: {
    metaTitle: "{name}, Agent d'Assurance Agréé | Health 4 Haitians",
    metaDescription:
      "{name} est agent d'assurance agréé chez Health 4 Haitians. Obtenez une aide gratuite pour l'assurance santé, Medicare, vie, dentaire, vision et frais funéraires.",
    photoAlt: "{name}, agent d'assurance agréé chez Health 4 Haitians",
    call: "Appeler {firstName}",
    email: "E-mail",
    emailAria: "Envoyer un e-mail à {name}",
    coverageEyebrow: "Nos couvertures",
    coverageTitle: "Comment {firstName} peut aider votre famille",
    coverageIntro:
      "Choisissez la protection dont vous avez besoin. {firstName} compare les plans avec vous et vous explique vos options simplement.",
    bestFor: "Idéal pour :",
    enrollEyebrow: "Inscription en ligne",
    enrollTitle: "Vous préférez vous inscrire vous-même ?",
    enrollIntro:
      "Utilisez les liens sécurisés de {firstName} vers les sites d'inscription de nos partenaires. {firstName} reste votre agent et peut vous aider à chaque étape.",
    opensNewTab: "(s'ouvre dans un nouvel onglet)",
    aboutEyebrow: "À propos",
    aboutTitle: "Faites connaissance avec {firstName}",
    background: "Parcours professionnel",
    mission: "Mission",
    awards: "Distinctions et prix",
    atAGlance: "En bref",
    location: "Lieu",
    licensedIn: "Agréé en",
    languages: "Langues",
    follow: "Suivre {firstName}",
    faqEyebrow: "Questions",
    faqTitle: "Questions fréquentes",
    contactTitle: "Prêt à parler avec {firstName} ?",
    contactText: "Appelez ou écrivez dès aujourd'hui pour une aide gratuite et sans engagement dans le choix de votre couverture.",
    allAgents: "Voir tous les agents",
  },
  productInfo: {
    life: {
      name: "Assurance Vie",
      text: "Protégez l'avenir financier de votre famille s'il vous arrivait quelque chose.",
      bestFor: "Parents et couples",
    },
    health: {
      name: "Assurance Santé",
      text: "Couverture des consultations médicales, des soins hospitaliers et des médicaments.",
      bestFor: "Particuliers et familles",
    },
    medicare: {
      name: "Medicare",
      text: "Plans Advantage, complémentaires et médicaments adaptés à vos besoins et à votre budget.",
      bestFor: "Personnes qui approchent 65 ans ou revoient leur couverture",
    },
    dental: {
      name: "Dentaire",
      text: "Nettoyages, examens et soins courants pour garder un sourire en bonne santé.",
      bestFor: "Soins préventifs et besoins dentaires courants",
    },
    vision: {
      name: "Vision",
      text: "Examens de la vue, lunettes et lentilles de contact.",
      bestFor: "Examens de routine, lunettes et lentilles",
    },
    "final-expense": {
      name: "Frais Funéraires",
      text: "Aidez vos proches à couvrir les frais d'obsèques et de fin de vie.",
      bestFor: "Seniors qui veulent une protection simple et abordable",
    },
  },
  carriers: {
    healthSherpa: "Plans santé du Marketplace (ACA)",
    oneShare: "Plans de partage des frais de santé",
    ameritasDental: "Plans dentaires",
  },
  faq: {
    life: {
      q: "Pourquoi ai-je besoin d'une assurance vie ?",
      a: "L'assurance vie permet à votre famille de maintenir son niveau de vie, de rembourser les dettes, de couvrir les frais d'obsèques et de remplacer vos revenus en cas de décès. C'est la base de toute protection financière solide.",
    },
    health: {
      q: "Que couvre une assurance santé ?",
      a: "L'assurance santé couvre les consultations médicales, les séjours à l'hôpital, les médicaments sur ordonnance, les soins préventifs et les spécialistes. Le bon plan limite vos frais à votre charge et vous garantit des soins quand vous en avez le plus besoin.",
    },
    medicare: {
      q: "Quand dois-je m'inscrire à Medicare ?",
      a: "La plupart des personnes deviennent éligibles à 65 ans. Votre période d'inscription initiale commence 3 mois avant le mois de vos 65 ans et se termine 3 mois après. La manquer peut entraîner des pénalités de retard ; nous vous aidons à vous inscrire à temps.",
    },
    dental: {
      q: "Une assurance dentaire en vaut-elle la peine ?",
      a: "Les problèmes dentaires non traités coûtent très cher. Un plan dentaire couvre généralement les soins préventifs, comme les nettoyages et les radiographies, à faible coût ou gratuitement, et réduit le coût des plombages, couronnes et autres soins.",
    },
    vision: {
      q: "Que comprend une assurance vision ?",
      a: "Les plans vision couvrent l'examen de la vue annuel, les lunettes ou lentilles sur ordonnance et des réductions sur la chirurgie LASIK. Un examen de la vue peut aussi révéler des signes précoces de diabète ou d'hypertension.",
    },
    "final-expense": {
      q: "Qu'est-ce qu'une assurance frais funéraires ?",
      a: "C'est une petite police d'assurance vie entière (souvent de 5 000 $ à 25 000 $) qui couvre les frais d'obsèques, les factures médicales et les dettes restantes. Elle épargne à votre famille un fardeau financier dans un moment déjà difficile.",
    },
  },
};

const ht = {
  meta: {
    directoryTitle: "Jwenn yon Ajan Asirans Lisansye nan Florid | Health 4 Haitians",
    directoryDescription:
      "Rankontre ajan asirans lisansye Health 4 Haitians yo. Jwenn èd an Angle, Kreyòl, Panyòl oswa Fransè pou asirans sante, Medicare, lavi, dantè, vizyon ak depans final.",
  },
  directory: {
    title: "Jwenn yon Ajan",
    intro:
      "Ajan lisansye nou yo pale lang ou epi yo konprann fanmi ou. Chwazi yon ajan pou w wè pwofil li, mande yon kotasyon gratis, oswa rele l dirèkteman.",
    breadcrumb: "Jwenn yon Ajan",
    searchLabel: "Chèche pa non",
    searchPlaceholder: "Tape non yon ajan",
    languageLabel: "Pale",
    allLanguages: "Tout lang",
    resultsOne: "1 ajan",
    resultsMany: "{count} ajan",
    noResults: "Pa gen okenn ajan ki koresponn ak rechèch ou a. Eseye yon lòt non oswa yon lòt lang.",
    clearFilters: "Efase filt yo",
    unavailable:
      "N ap mete lis ajan nou yo ajou. Tanpri rele biwo nou epi n ap mete w an kontak ak yon ajan touswit.",
    viewProfile: "Wè Pwofil",
    call: "Rele",
    callAria: "Rele {name}",
    photoAlt: "{name}, ajan asirans lisansye",
    ctaTitle: "Ou pa konnen ak ki moun pou w pale?",
    ctaText: "Rele biwo nou epi n ap mete w an kontak ak ajan ki bon pou fanmi ou.",
    ctaButton: "Pran yon Randevou",
  },
  products: {
    life: "Lavi",
    health: "Sante",
    medicare: "Medicare",
    dental: "Dantè",
    vision: "Vizyon",
    "final-expense": "Depans Final",
  },
  profile: {
    metaTitle: "{name}, Ajan Asirans Lisansye | Health 4 Haitians",
    metaDescription:
      "{name} se yon ajan asirans lisansye nan Health 4 Haitians. Jwenn èd gratis pou asirans sante, Medicare, lavi, dantè, vizyon ak depans final.",
    photoAlt: "{name}, ajan asirans lisansye nan Health 4 Haitians",
    call: "Rele {firstName}",
    email: "Imèl",
    emailAria: "Voye yon imèl bay {name}",
    coverageEyebrow: "Opsyon kouvèti",
    coverageTitle: "Kijan {firstName} ka ede fanmi ou",
    coverageIntro:
      "Chwazi pwoteksyon ou bezwen an. {firstName} ap konpare plan yo avè w epi l ap eksplike w opsyon ou yo nan yon langaj ki senp.",
    bestFor: "Bon pou:",
    enrollEyebrow: "Enskripsyon sou entènèt",
    enrollTitle: "Ou pito enskri tèt ou?",
    enrollIntro:
      "Sèvi ak lyen sekirize {firstName} yo pou ale sou sit enskripsyon patnè nou yo. {firstName} rete ajan ou epi li ka ede w nan chak etap.",
    opensNewTab: "(li louvri nan yon nouvo onglè)",
    aboutEyebrow: "Konsènan",
    aboutTitle: "Fè konesans ak {firstName}",
    background: "Eksperyans pwofesyonèl",
    mission: "Misyon",
    awards: "Onè ak prim",
    atAGlance: "An rezime",
    location: "Kote",
    licensedIn: "Lisansye nan",
    languages: "Lang",
    follow: "Swiv {firstName}",
    faqEyebrow: "Kesyon",
    faqTitle: "Kesyon moun poze souvan",
    contactTitle: "Ou pare pou w pale ak {firstName}?",
    contactText: "Rele oswa ekri jodi a pou w jwenn èd gratis, san presyon, pou w chwazi bon kouvèti a.",
    allAgents: "Wè tout ajan yo",
  },
  productInfo: {
    life: {
      name: "Asirans Lavi",
      text: "Pwoteje avni finansye fanmi ou si yon bagay ta rive w.",
      bestFor: "Paran ak koup",
    },
    health: {
      name: "Asirans Sante",
      text: "Kouvèti pou vizit doktè, swen lopital ak medikaman.",
      bestFor: "Moun ak fanmi",
    },
    medicare: {
      name: "Medicare",
      text: "Plan Advantage, Siplemantè ak plan medikaman ki bon pou bezwen ak bidjè ou.",
      bestFor: "Moun k ap gen 65 an oswa k ap revize kouvèti yo",
    },
    dental: {
      name: "Dantè",
      text: "Netwayaj, egzamen ak tretman kouran pou kenbe souri ou an sante.",
      bestFor: "Swen prevantif ak bezwen dantè chak jou",
    },
    vision: {
      name: "Vizyon",
      text: "Egzamen je, linèt ak lantiy kontak.",
      bestFor: "Egzamen woutin, linèt ak lantiy",
    },
    "final-expense": {
      name: "Depans Final",
      text: "Ede moun ou renmen yo peye depans antèman ak fen lavi.",
      bestFor: "Granmoun ki vle yon pwoteksyon senp e abòdab",
    },
  },
  carriers: {
    healthSherpa: "Plan sante Marketplace (ACA)",
    oneShare: "Plan pataj depans sante",
    ameritasDental: "Plan dantè",
  },
  faq: {
    life: {
      q: "Poukisa mwen bezwen asirans lavi?",
      a: "Asirans lavi ede fanmi ou kontinye viv menm jan, peye dèt, kouvri depans antèman epi ranplase revni ou si ou ta mouri. Se fondasyon tout bon plan pwoteksyon finansye.",
    },
    health: {
      q: "Kisa asirans sante kouvri?",
      a: "Asirans sante kouvri vizit doktè, rete lopital, medikaman sou preskripsyon, swen prevantif ak vizit espesyalis. Bon plan an kenbe depans ki soti nan pòch ou ba epi li asire w jwenn swen lè ou pi bezwen l.",
    },
    medicare: {
      q: "Kilè pou m enskri nan Medicare?",
      a: "Pifò moun vin kalifye lè yo gen 65 an. Premye peryòd enskripsyon ou kòmanse 3 mwa anvan mwa ou fè 65 an epi li fini 3 mwa apre. Si ou rate l, ou ka peye penalite pou reta; n ap ede w enskri alè.",
    },
    dental: {
      q: "Èske asirans dantè vo lapenn?",
      a: "Pwoblèm dan ou pa trete vin koute trè chè. Yon plan dantè anjeneral kouvri swen prevantif tankou netwayaj ak radyografi pou ti kòb oswa gratis, epi li bese pri plonbaj, kouwòn ak lòt tretman.",
    },
    vision: {
      q: "Kisa asirans vizyon genyen?",
      a: "Plan vizyon kouvri egzamen je chak ane, linèt oswa lantiy kontak sou preskripsyon ak rabè sou operasyon LASIK. Yon egzamen je ka montre siy dyabèt oswa tansyon bonè tou.",
    },
    "final-expense": {
      q: "Kisa asirans depans final ye?",
      a: "Se yon ti polis asirans lavi antye (souvan ant $5,000 ak $25,000) ki kouvri depans antèman, bòdwo medikal ak dèt ki rete. Li pwoteje fanmi ou kont yon chay finansye nan yon moman ki deja difisil.",
    },
  },
};

const agentsDictionary = { en, es, fr, ht };

export default agentsDictionary;
