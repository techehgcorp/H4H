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
};

const agentsDictionary = { en, es, fr, ht };

export default agentsDictionary;
