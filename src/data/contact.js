import { FiMail } from 'react-icons/fi'
import { SiGithub, SiItchdotio } from 'react-icons/si'
import { GrLinkedin } from "react-icons/gr";
import { ImBehance2 } from "react-icons/im";

export const contactInfo = [
  {
    label: 'Email',
    value: 'cam.bianca@outlook.com',
    href: 'mailto:cam.bianca@outlook.com',
    icon: FiMail,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/camilla-bianca',
    href: 'https://www.linkedin.com/in/camilla-bianca/',
    icon: GrLinkedin,
  },
  {
    label: 'GitHub',
    value: 'github.com/camilla-bianca',
    href: 'https://github.com/camilla-bianca',
    icon: SiGithub,
  },
  {
    label: 'itch',
    value: 'camilla-bianca.itch.io',
    href: 'https://camilla-bianca.itch.io/',
    icon: SiItchdotio,
  },
  {
    label: 'Behance',
    value: 'behance.net/camilla-bianca',
    href: 'https://www.behance.net/camilla-bianca',
    icon: ImBehance2,
  },
]

export const cvUrl = '/cv.pdf'