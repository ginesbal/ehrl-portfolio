'use client'

import { useState } from 'react'

export default function SkillsCreative() {
  const [activeCategory, setActiveCategory] = useState('frontend')

  const skillCategories = {
    frontend: {
      color: 'var(--onyx)',
      label: 'Frontend',
      skills: [
        { name: 'React', desc: 'Component architecture, hooks, context, performance optimization' },
        { name: 'Next.js', desc: 'SSR, routing, API routes, middleware' },
        { name: 'TypeScript', desc: 'Type safety, interfaces, generics' },
        { name: 'Tailwind CSS', desc: 'Utility-first styling, responsive design' }
      ]
    },
    backend: {
      color: 'var(--rose-taupe)',
      label: 'Backend',
      skills: [
        { name: 'Node.js', desc: 'RESTful APIs, authentication, database integration' },
        { name: 'PostgreSQL', desc: 'Complex queries, PostGIS extensions' },
        { name: 'Express', desc: 'API development, middleware' },
        { name: 'MongoDB', desc: 'NoSQL patterns, aggregations' }
      ]
    },
    tools: {
      color: 'var(--silver)',
      label: 'Tools',
      skills: [
        { name: 'Git & GitHub', desc: 'Version control, collaboration' },
        { name: 'Docker', desc: 'Containerization, deployment' },
        { name: 'AWS', desc: 'EC2, S3, RDS, Lambda' },
        { name: 'Figma', desc: 'UI/UX design, prototyping' }
      ]
    }
  }

  const additionalTech = {
    frontend: ['React Native', 'Expo', 'Framer Motion'],
    backend: ['PostGIS', 'Supabase', 'Firebase'],
    tools: ['Vercel', 'Postman', 'Android Studio', 'Jest']
  }

  const tabs = Object.keys(skillCategories)
  const activeColor = skillCategories[activeCategory].color

  const onKeyTabs = (e) => {
    const idx = tabs.indexOf(activeCategory)
    if (e.key === 'ArrowRight') setActiveCategory(tabs[(idx + 1) % tabs.length])
    if (e.key === 'ArrowLeft') setActiveCategory(tabs[(idx - 1 + tabs.length) % tabs.length])
  }

  return (
    <section id="skills" className="py-8 md:py-16 bg-bg-primary" style={{ '--cat': activeColor }}>
      <div className="container-custom">
        <div className="mb-5 lg:mb-16">
          <div className="flex items-start gap-3">
            <div className="w-1 h-10 lg:h-24 mt-0.5 bg-rose-taupe" />
            <div className="flex-1">
              <p className="text-[10px] tracking-[0.1em] uppercase mb-1.5 font-semibold text-rose-taupe">Technical Expertise</p>
              <h2 className="text-[26px] lg:text-[40px] font-bold text-text-primary leading-tight">Skills</h2>
            </div>
          </div>
        </div>

        <div className="md:hidden space-y-5">
          {Object.entries(skillCategories).map(([catKey, category]) => (
            <div key={catKey}>
              <div className="mb-2.5">
                <h3
                  className="text-[12px] font-bold uppercase tracking-widest mb-2"
                  style={{ color: category.color }}
                >
                  {category.label}
                </h3>
                <div className="h-[2px]" style={{ background: category.color }} />
              </div>

              <p className="text-[14px] text-text-primary leading-relaxed">
                {category.skills.map((skill, index) => (
                  <span key={skill.name}>
                    <span className="font-medium">{skill.name}</span>
                    {index < category.skills.length - 1 && <span className="mx-2 text-text-muted">•</span>}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>

        <div className="hidden md:block">
          <div className="mb-5">
            <div
              role="tablist"
              aria-label="Skill categories"
              onKeyDown={onKeyTabs}
              className="flex gap-8 relative"
            >
              {tabs.map((category) => {
                const isActive = activeCategory === category
                return (
                  <button
                    key={category}
                    role="tab"
                    id={`tab-${category}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${category}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveCategory(category)}
                    className={`pb-3 px-4 text-[14px] font-semibold tracking-wide rounded-t-lg transition-colors whitespace-nowrap min-h-[44px] flex items-center ${isActive ? 'text-text-primary' : 'text-text-muted hover:bg-bg-accent hover:text-text-primary'}`}
                    style={{ color: isActive ? activeColor : undefined }}
                  >
                    {skillCategories[category].label}
                  </button>
                )
              })}
            </div>
            <div className="h-[2px]" style={{ background: 'var(--cat)' }} />
          </div>

          <div
            role="tabpanel"
            id={`panel-${activeCategory}`}
            aria-labelledby={`tab-${activeCategory}`}
          >
            <div className="grid grid-cols-2 gap-4 mb-8">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="group relative transition-all duration-300 cursor-default"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div
                    className="h-full p-4 transition-all duration-300 hover:bg-bg-secondary"
                    style={{
                      borderLeft: `3px solid var(--border-light)`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderLeftColor = activeColor
                      e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderLeftColor = 'var(--border-light)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <h3 className="text-[16px] font-semibold mb-1.5 transition-colors text-text-primary">
                      {skill.name}
                    </h3>
                    <p className="text-[13px] leading-[1.5] text-text-secondary">
                      {skill.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mb-5">
            <div className="h-[1px] bg-border-light" />
            <div className="absolute left-0 top-0 h-[1px] w-24" style={{ background: 'var(--cat)' }} />
          </div>
        </div>

        <div>
          <div className="md:hidden mt-5">
            <div className="mb-2.5">
              <p className="text-[12px] font-bold uppercase tracking-widest text-text-muted mb-2">Also Work With</p>
              <div className="h-[2px] bg-border-light" />
            </div>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              {Object.values(additionalTech).flat().join(' • ')}
            </p>
          </div>

          <div className="hidden md:block">
            <div className="mb-6">
              <div className="flex items-start gap-4">
                <div className="w-1 h-6 bg-silver" />
                <div>
                  <p className="text-[13px] tracking-widest uppercase font-medium text-text-muted">Additional Technologies</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-5 mb-5">
              {Object.keys(additionalTech).map((category) => (
                <div key={category}>
                  <div className="mb-3 pb-1.5" style={{ borderBottom: `2px solid ${skillCategories[category].color}` }}>
                    <h4 className="text-[13px] font-medium" style={{ color: skillCategories[category].color }}>
                      {skillCategories[category].label}
                    </h4>
                  </div>

                  <div className="space-y-1.5">
                    {additionalTech[category].map((tech) => (
                      <div key={tech} className="text-[13px] py-1 pl-4 transition-colors duration-200 relative text-text-secondary hover:text-text-primary">
                        <div className="absolute left-0 top-1/2 w-1.5 h-1.5 -translate-y-1/2 transition-colors duration-200 bg-border-light" />
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Currently expanding - Desktop only */}
            <div className="bg-bg-secondary relative">
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(to right, var(--rose-taupe), var(--rose-quartz), var(--silver))` }} />
              <div className="flex items-start gap-4 p-4 pl-0">
                <div className="w-1 h-14 bg-silver" />
                <div>
                  <p className="text-[13px] tracking-widest uppercase font-medium mb-1.5 text-rose-taupe">Currently Expanding</p>
                  <p className="text-[13px] leading-[1.5] max-w-3xl text-text-secondary">Three.js, Rust, OpenAI API integration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
