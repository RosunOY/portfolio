interface Experience {
  title: string;
  organization: string;
  period: string;
  description: string;
  type: string;
  link?: string;
}

interface ExperienceProps {
  experiences: Experience[];
  onCardClick: (type: string) => void;
}

export default function Experience({
  experiences,
  onCardClick,
}: ExperienceProps) {
  return (
    <section className="experience">
      <h2>个人经历</h2>
      <p className="experience-subtitle">自强不息，持之以恒</p>
      <div className="experience-timeline">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="experience-card"
            onClick={() => onCardClick(exp.type)}
          >
            <div className="experience-period">{exp.period}</div>
            <div className="experience-content">
              <h3>{exp.title}</h3>
              <p className="experience-org">{exp.organization}</p>
              <p className="experience-desc" style={{ whiteSpace: "pre-line" }}>
                {exp.description}
              </p>
              {exp.link && (
                <a
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="experience-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  学信网验证 →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
