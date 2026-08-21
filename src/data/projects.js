// Projects ordered from the oldest to the newest
// status: 'shipped' | 'in-dev' | 'pre-prod'
// origin: 'company' | 'personal' | 'course'

export const projects = [
  {
    slug: 'progetto-aziendale',
    title: 'Progetto aziendale',
    status: 'shipped',
    origin: 'company',
    role: 'Gameplay Programmer',
    company: 'One-O-One Games',
    companyUrl: 'https://example.com',
    stack: 'C# · Unity',
    duration: '8 mesi',
    team: '6 persone',
    description: 'Descrizione del progetto.',
    externalLink: { label: 'Guarda su Steam', url: 'https://store.steampowered.com' },
    gallery: [1, 2, 3],
    },
  {
    slug: 'progetto-personale',
    title: 'Progetto personale',
    status: 'in-dev',
    origin: 'personal',
    role: 'Solo Developer',
    company: null,
    companyUrl: null,
    stack: 'C++ · Unreal',
    duration: 'In corso',
    team: 'Solo',
    description: 'Descrizione del progetto.',
    externalLink: { label: 'Guarda su itch.io', url: 'https://itch.io' },
    gallery: [1, 2, 3],
  },
  {
    slug: 'progetto-corso',
    title: 'Progetto corso',
    status: 'pre-prod',
    origin: 'course',
    role: 'Corso',
    company: 'Nome Corso',
    companyUrl: 'https://example.com',
    stack: 'C# · Unity',
    duration: '3 mesi',
    team: 'Solo',
    description: 'Descrizione del progetto.',
    externalLink: { label: 'Guarda su itch.io', url: 'https://itch.io' },
    gallery: [1, 2, 3],
  },
  {
    slug: 'game-jam-esempio',
    title: 'Game Jam',
    status: 'shipped',
    origin: 'game-jam',
    role: 'Game Jam',
    company: 'Nome della Jam',
    companyUrl: 'https://itch.io/jam/nome-jam',
    stack: 'C# · Unity',
    duration: '48 ore',
    team: '4 persone',
    description: 'Descrizione del progetto.',
    externalLink: { label: 'Guarda su itch.io', url: 'https://itch.io' },
    gallery: [1, 2, 3],
  },
]

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug) {
  const index = projects.findIndex((p) => p.slug === slug)
  return {
    previous: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  }
}