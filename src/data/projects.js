// Projects ordered from the oldest to the newest
// engine: 'unity' | 'unreal'
// origin: 'company' | 'personal' | 'course'

export const projects = [
  {
    slug: 'progetto-aziendale',
    title: 'Progetto aziendale',
    engine: 'unity',
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
    engine: 'unreal',
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
    engine: 'unity',
    origin: 'course',
    role: 'Gameplay Programmer',
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
    engine: 'unity',
    origin: 'game-jam',
    role: 'Gameplay Programmer',
    company: 'Nome della Jam',
    companyUrl: 'https://itch.io/jam/nome-jam',
    stack: 'C# · Unity',
    duration: '48 ore',
    team: '4 persone',
    description: 'Descrizione del progetto.',
    externalLink: { label: 'Guarda su itch.io', url: 'https://itch.io' },
    gallery: [1, 2, 3],
  },
  {
    slug: 'progetto-corso 2',
    title: 'Progetto Test 32',
    engine: 'unreal',
    origin: 'course',
    role: 'Gameplay Programmer',
    company: 'Nome del Corso',
    companyUrl: 'https://itch.io/jam/nome-jam',
    stack: 'C++ · Unreal',
    duration: '4 mesi',
    team: '6 persone',
    description: 'Descrizione del progetto.',
    externalLink: { label: 'Guarda su itch.io', url: 'https://itch.io' },
    gallery: [1, 2, 3, 4],
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

export const engineLabels = {
  unity: 'UNITY',
  unreal: 'UNREAL',
}