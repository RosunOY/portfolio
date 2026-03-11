interface Project {
  name: string;
  description: string;
  tech: string[];
  highlight?: string;
  category?: "game" | "ai" | "design" | "web";
  url?: string;
  githubUrl?: string;
  cover?: string;
}

interface ProjectsProps {
  projects: Project[];
  filter: string;
  onFilterChange: (filter: string) => void;
}

export default function Projects({
  projects,
  filter,
  onFilterChange,
}: ProjectsProps) {
  const filters = [
    { id: "all", label: "全部" },
    { id: "game", label: "游戏项目" },
    { id: "ai", label: "AI应用" },
    { id: "design", label: "游戏策划" },
  ];

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="projects">
      <h2>项目经历</h2>
      <p className="projects-subtitle">
        从游戏开发到 AI 应用，这里是我近年来的技术探索
      </p>
      <div className="filter-bar">
        {filters.map((f) => (
          <button
            key={f.id}
            className={`filter-btn ${filter === f.id ? "active" : ""}`}
            onClick={() => onFilterChange(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="project-list">
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            className={`project-card ${project.cover ? "has-cover" : ""}`}
          >
            {project.cover && (
              <div className="project-cover">
                <img src={project.cover} alt={project.name} />
              </div>
            )}
            <div className="project-content">
              <div className="project-header">
                <h3>{project.name}</h3>
                {project.highlight && (
                  <span className="highlight">{project.highlight}</span>
                )}
              </div>
              <p className="project-desc">{project.description}</p>
              <div className="project-tech">
                {project.tech.map((t, i) => (
                  <span key={i} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="project-actions">
                {project.category === "design" ? (
                  <div className="project-wechat-tip">
                    <img
                      src="/portfolio/wechat-qrcode.jpg"
                      alt="微信公众号二维码"
                      className="project-wechat-qrcode"
                    />
                    <span>扫码关注公众号查看更多内容</span>
                  </div>
                ) : (
                  <>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-btn project-btn-play"
                      >
                        <img
                          src="/portfolio/休闲娱乐.png"
                          alt="游玩"
                          className="project-btn-icon"
                        />{" "}
                        游玩
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-btn project-btn-github"
                      >
                        <img
                          src="/portfolio/GitHub图标.png"
                          alt="GitHub"
                          className="project-btn-icon"
                        />{" "}
                        详情
                      </a>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
