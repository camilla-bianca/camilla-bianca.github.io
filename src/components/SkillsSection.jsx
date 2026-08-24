import { SiUnity, SiUnrealengine, SiGit, SiGithub, SiRider } from 'react-icons/si'
import { DiVisualstudio } from "react-icons/di";
import { PiFileCSharp, PiFileCpp, PiKanbanDuotone } from "react-icons/pi";
import { FaProjectDiagram } from "react-icons/fa";
import { skillCategories } from '../data/skills'
import './SkillsSection.css'

const iconMap = {
  csharp: PiFileCSharp,
  cpp: PiFileCpp,
  unity: SiUnity,
  unreal: SiUnrealengine,
  git: SiGit,
  github: SiGithub,
  visualstudio: DiVisualstudio,
  rider: SiRider,
  kanban: PiKanbanDuotone,
  blueprint: FaProjectDiagram
}

function SkillsSection() {
  return (
    <div className="skills">
      {/* <span className="skills-title">Competenze</span> */}
      {skillCategories.map((group) => (
        <div className="skills-group" key={group.category}>
          {/* <div className="skills-category">{group.category.toUpperCase()}</div> */}
          <div className="skills-tags">
            {group.items.map((item) => {
              const Icon = iconMap[item.icon]
              return (
                <span className="skill-tag" key={item.label}>
                  <span className="skill-icon-badge">
                    <Icon size={item.size || 20} />
                  </span>
                  {item.label}
                </span>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkillsSection