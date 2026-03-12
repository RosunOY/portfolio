import { useState } from "react";

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
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const toggleExpand = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const getPreviewText = (description: string, isExpanded: boolean) => {
    const lines = description.split("\n");
    if (isExpanded || lines.length <= 2) {
      return description;
    }
    // Show first 2 lines when collapsed
    return lines.slice(0, 2).join("\n") + "\n...";
  };

  return (
    <section className="experience">
      <h2>个人经历</h2>
      <p className="experience-subtitle">自强不息，持之以恒</p>
      <div className="experience-timeline">
        {experiences.map((exp, index) => {
          const isExpanded = expandedCards.has(index);
          const hasMoreContent = exp.description.split("\n").length > 2;

          return (
            <div
              key={index}
              className={`experience-card ${isExpanded ? "expanded" : ""}`}
              onClick={() => onCardClick(exp.type)}
            >
              <div className="experience-period">{exp.period}</div>
              <div className="experience-content">
                <h3>{exp.title}</h3>
                <p className="experience-org">{exp.organization}</p>
                <p
                  className="experience-desc"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {getPreviewText(exp.description, isExpanded)}
                </p>
                {hasMoreContent && (
                  <button
                    className="expand-btn"
                    onClick={(e) => toggleExpand(index, e)}
                  >
                    {isExpanded ? "收起 ▲" : "展开 ▼"}
                  </button>
                )}
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
          );
        })}
      </div>
    </section>
  );
}
