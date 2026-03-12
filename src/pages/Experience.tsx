import { useState } from "react";

interface Experience {
  title: string;
  organization: string;
  period: string;
  description: string;
  type: string;
  link?: string;
  isPhotoCard?: boolean;
  photos?: string[];
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
  const [currentPage, setCurrentPage] = useState<Record<number, number>>({});
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const PHOTOS_PER_PAGE = 12;

  const getCurrentPage = (index: number) => currentPage[index] || 1;

  const setCurrentPageForCard = (index: number, page: number) => {
    setCurrentPage((prev) => ({ ...prev, [index]: page }));
  };

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

          // 照片卡片渲染
          if (exp.isPhotoCard && exp.photos && exp.photos.length > 0) {
            const photos = exp.photos;
            const isExpanded = expandedCards.has(index);
            const totalPages = Math.ceil(photos.length / PHOTOS_PER_PAGE);
            const page = getCurrentPage(index);

            // 展开前显示4张，展开后分页显示
            let displayPhotos;
            if (!isExpanded) {
              displayPhotos = photos.slice(0, 4);
            } else {
              const startIdx = (page - 1) * PHOTOS_PER_PAGE;
              const endIdx = startIdx + PHOTOS_PER_PAGE;
              displayPhotos = photos.slice(startIdx, endIdx);
            }

            return (
              <div
                key={index}
                className={`experience-card photo-card ${isExpanded ? "expanded" : ""}`}
              >
                <div className="experience-period">{exp.period}</div>
                <div className="experience-content">
                  <h3>{exp.title}</h3>
                  <p className="experience-org">{exp.organization}</p>
                  <div className="photo-grid">
                    {displayPhotos.map((photo, photoIndex) => (
                      <div
                        key={photoIndex}
                        className="photo-item"
                        onClick={() => setLightboxImage(photo)}
                      >
                        <img
                          src={photo}
                          alt={`照片 ${isExpanded ? (page - 1) * PHOTOS_PER_PAGE + photoIndex + 1 : photoIndex + 1}`}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                  {isExpanded && totalPages > 1 && (
                    <div className="pagination">
                      <button
                        className="page-btn"
                        onClick={() => setCurrentPageForCard(index, page - 1)}
                        disabled={page === 1}
                      >
                        ← 上一页
                      </button>
                      <span className="page-info">
                        {page} / {totalPages}
                      </span>
                      <button
                        className="page-btn"
                        onClick={() => setCurrentPageForCard(index, page + 1)}
                        disabled={page === totalPages}
                      >
                        下一页 →
                      </button>
                    </div>
                  )}
                  <button
                    className="expand-btn"
                    onClick={(e) => toggleExpand(index, e)}
                  >
                    {isExpanded
                      ? "收起 ▲"
                      : `展开查看全部 ${photos.length} 张照片 ▼`}
                  </button>
                </div>
              </div>
            );
          }

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
      {lightboxImage && (
        <div className="lightbox" onClick={() => setLightboxImage(null)}>
          <span className="lightbox-close">&times;</span>
          <img src={lightboxImage} alt="查看大图" />
        </div>
      )}
    </section>
  );
}
