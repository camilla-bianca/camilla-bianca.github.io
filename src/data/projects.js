// Projects ordered from the oldest to the newest

// engine: 'unity' | 'unreal'
// origin: 'company' | 'personal' | 'course'
// hero.type: 'image' | 'video' | 'embed' | 'youtube'

export const projects = [
  {
    slug: 'curse-of-the-crimson-stag',
    title: 'Curse of the Crimson Stag',
    engine: 'unreal',
    origin: 'company',
    role: 'Gameplay Programmer',
    company: 'One-O-One Games',
    companyUrl: 'https://www.oneoonegames.com/',
    stack: 'C++ · Unreal',
    duration: '2 anni',
    team: '10+ persone',
    description: 'Curse of the Crimson Stag è un thriller incentrato sulla trama in cui esplori il labile confine tra eventi soprannaturali e tragedie del passato. Scopri il motivo per cui il lussuoso Whiteroot Hotel è stato abbandonato. I miti locali parlano di uno spirito collerico chiamato il Cervo Cremisi...',
    externalLink: { label: 'Guarda su Steam', url: 'https://store.steampowered.com/app/4669670/Curse_of_the_Crimson_Stag/' },
    hero: { type: 'image', src: '/images/projects/curse-of-the-crimson-stag/gallery-1.jpg' },
    cover: '/images/projects/curse-of-the-crimson-stag/gallery-1.jpg',
    preview: '/videos/video-hero.mp4',
    gallery: [
      '/images/projects/curse-of-the-crimson-stag/gallery-1.jpg',
      '/images/projects/curse-of-the-crimson-stag/gallery-2.jpg',
      '/images/projects/curse-of-the-crimson-stag/gallery-3.jpg',
    ],
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
    hero: { type: 'video', src: '/videos/video-hero.mp4' },
    cover: '/images/projects/curse-of-the-crimson-stag/gallery-2.jpg',
    preview: '/videos/video-hero.mp4',
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
    hero: { type: 'embed', src: 'https://itch.io/embed-upload/5475631?color=232323', width: 960, height: 640, visibleHeight: 590  },
    cover: '/images/projects/curse-of-the-crimson-stag/gallery-3.jpg',
    preview: '/videos/video-hero.mp4',
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
    hero: { type: 'image', src: '/images/projects/curse-of-the-crimson-stag/gallery-1.jpg' },
    cover: '/images/projects/curse-of-the-crimson-stag/gallery-1.jpg',
    preview: '/videos/video-hero.mp4',
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
    hero: { type: 'youtube', videoId: 'CgECediqz7U' },
    cover: '/images/projects/curse-of-the-crimson-stag/gallery-2.jpg',
    preview: '/videos/video-hero.mp4',
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