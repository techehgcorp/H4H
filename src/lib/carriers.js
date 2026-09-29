// src/lib/carriers.js
// Partner self-enrollment sites shown on agent profiles.
//
// Each agent's personal link lives in the Agents sheet (the column named in
// `column`). An empty cell hides that card for that agent.
//
// To add a carrier later:
//   1. Add a column to the Agents sheet, e.g. ncdUrl
//   2. Read it in src/lib/agents.js (see the `carriers:` block)
//   3. Put the logo in public/assets/img/partners/
//   4. Add an entry below, plus its description in dictionaries/agents.js
//      (under `carriers`) for every language

export const CARRIERS = [
  {
    id: "healthSherpa",
    column: "healthSherpaUrl",
    name: "HealthSherpa",
    logo: "/assets/img/partners/healthsherpa.png",
  },
  {
    id: "oneShare",
    column: "oneShareUrl",
    name: "OneShare Health",
    logo: "/assets/img/partners/oneshare-logo.svg",
  },
  {
    id: "ameritasDental",
    column: "ameritasDentalUrl",
    name: "Ameritas Dental",
    logo: "/assets/img/partners/ameritas-logo.png",
  },
];

// The carriers this agent actually has a link for, in the order above.
export function getAgentCarriers(agent) {
  return CARRIERS.filter((carrier) => agent.carriers?.[carrier.id]).map((carrier) => ({
    ...carrier,
    url: agent.carriers[carrier.id],
  }));
}
