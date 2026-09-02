import { SiUnity, SiUnrealengine, SiGit, SiGithub, SiRider } from 'react-icons/si'
import { DiVisualstudio } from "react-icons/di";
import { PiFileCSharp, PiFileCpp, PiKanbanDuotone } from "react-icons/pi";
import { FaProjectDiagram } from "react-icons/fa";
import { skillCategories } from '../data/skills'
import { useInView } from '../hooks/useInView'
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

function SkillTag({ item, index }) {
  const [ref, isVisible] = useInView()
  const Icon = iconMap[item.icon]

  return (
    <span
      ref={ref}
      className={`skill-tag fade-in-section ${isVisible ? 'is-visible' : ''}`}
      style={{ '--stagger-index': index % 6 }}
    >
      <span className="skill-icon-badge">
        <Icon size={item.size || 20} />
      </span>
      {item.label}
    </span>
  )
}

function SkillsSection() {
  return (
    <div className="skills">
      {/* <span className="skills-title">Competenze</span> */}
      {skillCategories.map((group) => (
        <div className="skills-group" key={group.category}>
          {/* <div className="skills-category">{group.category.toUpperCase()}</div> */}
          <div className="skills-tags">
            {group.items.map((item, i) => (
              <SkillTag item={item} index={i} key={item.label} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkillsSection


// import { SiUnity, SiUnrealengine, SiGit, SiGithub, SiRider } from 'react-icons/si'
// import { DiVisualstudio } from "react-icons/di";
// import { PiFileCSharp, PiFileCpp, PiKanbanDuotone } from "react-icons/pi";
// import { FaProjectDiagram } from "react-icons/fa";
// import { skillCategories } from '../data/skills'
// import { useInView } from '../hooks/useInView'
// import './SkillsSection.css'

// const iconMap = {
//   csharp: PiFileCSharp,
//   cpp: PiFileCpp,
//   unity: SiUnity,
//   unreal: SiUnrealengine,
//   git: SiGit,
//   github: SiGithub,
//   visualstudio: DiVisualstudio,
//   rider: SiRider,
//   kanban: PiKanbanDuotone,
//   blueprint: FaProjectDiagram
// }

// function SkillGroup({ group, index }) {
//   const [ref, isVisible] = useInView()

//   return (
//     <div
//       ref={ref}
//       className={`skills-group fade-in-section ${isVisible ? 'is-visible' : ''}`}
//       style={{ '--stagger-index': index }}
//     >
//       {/* <div className="skills-category">{group.category.toUpperCase()}</div> */}
//       <div className="skills-tags">
//         {group.items.map((item) => {
//           const Icon = iconMap[item.icon]
//           return (
//             <span className="skill-tag" key={item.label}>
//               <span className="skill-icon-badge">
//                 <Icon size={item.size || 20} />
//               </span>
//               {item.label}
//             </span>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// function SkillsSection() {
//   return (
//     <div className="skills">
//       {/* <span className="skills-title">Competenze</span> */}
//       {skillCategories.map((group, i) => (
//         <SkillGroup group={group} index={i} key={group.category} />
//       ))}
//     </div>
//   )
// }

// export default SkillsSection