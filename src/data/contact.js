import { FiMail } from 'react-icons/fi'
import { SiGithub, SiItchdotio } from 'react-icons/si'
import { GrLinkedin } from "react-icons/gr";
import { ImBehance2 } from "react-icons/im";

export const contactInfo = [
  {
    label: 'Email',
    value: 'nome@email.com',
    href: 'mailto:nome@email.com',
    icon: FiMail,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/nomecognome',
    href: 'https://linkedin.com/in/nomecognome',
    icon: GrLinkedin,
  },
  {
    label: 'GitHub',
    value: 'github.com/nomecognome',
    href: 'https://github.com/nomecognome',
    icon: SiGithub,
  },
  {
    label: 'itch.io',
    value: 'nomecognome.itch.io',
    href: 'https://nomecognome.itch.io',
    icon: SiItchdotio,
  },
  {
    label: 'Behance',
    value: 'behance.net/nomecognome',
    href: 'https://behance.net/nomecognome',
    icon: ImBehance2,
  },
]

export const cvUrl = '/cv.pdf'