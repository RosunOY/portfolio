import { useState } from "react";
import "./App.css";

interface Project {
  name: string;
  description: string;
  tech: string[];
  highlight?: string;
  category?: "game" | "ai" | "web";
  url?: string;
}

const projects: Project[] = [
  {
    name: "生态回响 (Echoes of Ecology)",
    description:
      'AI语义演化沙盒游戏 - 概念卡牌引导文明演化，LLM作为"物理引擎"决定游戏结果',
    tech: ["Three.js", "Express", "Gemini API", "JavaScript"],
    highlight: "在线试玩",
    category: "game",
    url: "https://echoes-of-ecology.vercel.app/",
  },
  {
    name: "人类曙光 (Dawn of Humanity)",
    description:
      "赛博朋克风格横版动作RPG - 13个关卡、连招技能系统、AI敌人、RPG成长元素",
    tech: ["Canvas", "Vanilla JavaScript", "Web Audio API", "LocalStorage"],
    highlight: "在线试玩",
    category: "game",
    url: "https://dawn-of-humanity-game.vercel.app/",
  },
  {
    name: "拯救人类 (Save Human)",
    description:
      "逆向塔防策略游戏 - 指挥进攻部队突破AI防线，Gemini AI实时决策防御",
    tech: ["JavaScript", "Canvas", "Gemini API"],
    highlight: "AI对战",
    category: "game",
    url: "https://github.com/RosunOY/Save_human",
  },
  {
    name: "商道世家",
    description:
      "AI商业模拟经营游戏 - 15种商业设施、20+员工职业、9级营地升级体系",
    tech: ["React", "Vite", "Google Gemini API"],
    highlight: "独立开发",
    category: "game",
    url: "https://github.com/RosunOY/manage_game",
  },
  {
    name: "真相游戏 (Truth Game)",
    description: "AI裁判社交推理游戏 - 融合鹅鸭杀身份博弈与真心话大冒险",
    tech: ["Node.js", "Express", "AI对话系统"],
    highlight: "策划中",
    category: "game",
    url: "https://github.com/RosunOY/Truth_game",
  },
  {
    name: "智慧农业病虫害识别系统",
    description:
      "融合计算机视觉与大语言模型的农业智能决策系统，YOLOv8模型准确率>90%",
    tech: [
      "Python",
      "YOLOv8",
      "Gradio",
      "DeepSeek API",
      "Spring Boot",
      "MySQL",
    ],
    highlight: "AI应用",
    category: "ai",
  },
];

const skills = [
  {
    category: "游戏开发",
    items: ["Three.js", "React/Vue3", "Express", "Canvas", "Vanilla JS"],
  },
  {
    category: "AI技术",
    items: ["LLM API (Gemini/DeepSeek/GLM)", "YOLOv8", "PyTorch", "Gradio"],
  },
  { category: "编程语言", items: ["Python", "Java", "C/C++", "JavaScript"] },
  { category: "开发工具", items: ["Git", "Maven", "Docker", "Claude Code"] },
];

function App() {
  const [activeTab, setActiveTab] = useState<"home" | "projects" | "skills">(
    "home",
  );
  const [filter, setFilter] = useState<"all" | "game" | "ai">("all");

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-content">
          <div className="logo">OZY</div>
          <div className="nav-links">
            <button
              className={`nav-link ${activeTab === "home" ? "active" : ""}`}
              onClick={() => setActiveTab("home")}
            >
              首页
            </button>
            <button
              className={`nav-link ${activeTab === "projects" ? "active" : ""}`}
              onClick={() => setActiveTab("projects")}
            >
              项目
            </button>
            <button
              className={`nav-link ${activeTab === "skills" ? "active" : ""}`}
              onClick={() => setActiveTab("skills")}
            >
              技能
            </button>
          </div>
        </div>
      </nav>

      <main className="main">
        {activeTab === "home" && (
          <section className="hero">
            <div className="hero-content">
              <div className="avatar">
                <span>欧阳</span>
              </div>
              <h1>欧阳志胜</h1>
              <p className="title">AI游戏开发</p>
              <p className="subtitle">湖南农业大学 · 计算机科学与技术</p>
              <div className="contact">
                <a href="mailto:2742760385@qq.com" className="contact-item">
                  <span className="icon">✉</span> 2742760385@qq.com
                </a>
                <span className="contact-item">
                  <span className="icon">📱</span> 19174654127
                </span>
              </div>
              <div className="tags">
                <span className="tag">AI游戏开发</span>
                <span className="tag">Three.js</span>
                <span className="tag">LLM</span>
              </div>
            </div>
          </section>
        )}

        {activeTab === "projects" && (
          <section className="projects">
            <h2>项目经历</h2>
            <div className="filter-bar">
              <button
                className={`filter-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                全部
              </button>
              <button
                className={`filter-btn ${filter === "game" ? "active" : ""}`}
                onClick={() => setFilter("game")}
              >
                游戏项目
              </button>
              <button
                className={`filter-btn ${filter === "ai" ? "active" : ""}`}
                onClick={() => setFilter("ai")}
              >
                AI应用
              </button>
            </div>
            <div className="project-list">
              {filteredProjects.map((project, index) => (
                <a
                  key={index}
                  href={project.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card"
                >
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
                </a>
              ))}
            </div>
          </section>
        )}

        {activeTab === "skills" && (
          <section className="skills">
            <h2>专业技能</h2>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className="skill-card">
                  <h3>{skill.category}</h3>
                  <div className="skill-items">
                    {skill.items.map((item, i) => (
                      <span key={i} className="skill-item">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <p>© 2026 欧阳志胜 · AI游戏开发</p>
      </footer>
    </div>
  );
}

export default App;
