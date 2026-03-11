import { useState, useEffect, useRef } from "react";
import "./App.css";

// Particle Trail Effect Component
function ParticleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let mouseX = 0;
    let mouseY = 0;
    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 3 + 1;
        this.life = 1;
        const colors = ["#60a5fa", "#a78bfa", "#f472b6", "#34d399", "#fbbf24"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.015;
        this.size *= 0.98;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Create particles on mouse move
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(mouseX, mouseY));
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles = particles.filter((p) => p.life > 0);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}

interface Project {
  name: string;
  description: string;
  tech: string[];
  highlight?: string;
  category?: "game" | "ai" | "design" | "web";
  url?: string;
  githubUrl?: string;
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
    githubUrl: "https://github.com/RosunOY/echoes-of-ecology",
  },
  {
    name: "人类曙光 (Dawn of Humanity)",
    description:
      "赛博朋克风格横版动作RPG - 13个关卡、连招技能系统、AI敌人、RPG成长元素",
    tech: ["Canvas", "Vanilla JavaScript", "Web Audio API", "LocalStorage"],
    highlight: "在线试玩",
    category: "game",
    url: "https://dawn-of-humanity-game.vercel.app/",
    githubUrl: "https://github.com/RosunOY/Dawn_of_humanity_game",
  },
  {
    name: "拯救人类 (Save Human)",
    description:
      "逆向塔防策略游戏 - 指挥进攻部队突破AI防线，Gemini AI实时决策防御",
    tech: ["JavaScript", "Canvas", "Gemini API"],
    highlight: "在线试玩",
    category: "game",
    url: "https://save-human.vercel.app/",
    githubUrl: "https://github.com/RosunOY/Save_human",
  },
  {
    name: "商道世家",
    description:
      "AI商业模拟经营游戏 - 15种商业设施、20+员工职业、9级营地升级体系",
    tech: ["React", "Vite", "Google Gemini API"],
    highlight: "在线试玩",
    category: "game",
    url: "https://manage-game-lime.vercel.app/",
    githubUrl: "https://github.com/RosunOY/manage_game",
  },
  {
    name: "真相游戏 (Truth Game)",
    description: "AI裁判社交推理游戏 - 融合鹅鸭杀身份博弈与真心话大冒险",
    tech: ["Node.js", "Express", "Socket.io", "AI对话系统"],
    highlight: "独立开发",
    category: "game",
    url: "https://github.com/RosunOY/Truth_game",
    githubUrl: "https://github.com/RosunOY/Truth_game",
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
    githubUrl: "https://github.com/RosunOY/SmartPestos",
  },
  {
    name: "为有源头游戏来",
    description: "公众号文章合集 - 游戏系统设计、玩法分析、行业思考",
    tech: ["游戏策划", "系统设计", "玩法分析", "行业思考"],
    highlight: "公众号文章",
    category: "design",
    url: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzg2NzExNjY0Mw==#wechat_redirect",
    githubUrl: "https://gitee.com/ouyangzhisheng",
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
  {
    category: "游戏策划",
    items: ["游戏系统设计", "数值体系搭建", "玩法原型设计", "玩家体验优化"],
    isDesign: true,
    qrcode: "/portfolio/wechat-qrcode.jpg",
    wechatName: "为有源头游戏来",
  },
];

function App() {
  const [activeTab, setActiveTab] = useState<"home" | "projects" | "skills">(
    "home",
  );
  const [filter, setFilter] = useState<"all" | "game" | "ai" | "design">("all");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="app">
      <ParticleTrail />
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-content">
          <div className="logo">志胜</div>
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
                <img src="/portfolio/照片.png" alt="欧阳志胜" />
              </div>
              <h1>
                <span className="name-text">欧阳志胜</span>
              </h1>
              <div className="hero-info-grid">
                <div className="hero-info-item">
                  <span className="hero-info-icon">📍</span>
                  <span>湖南永州</span>
                </div>
                <div className="hero-info-item">
                  <span className="hero-info-icon">🎂</span>
                  <span>2004.09.17</span>
                </div>
                <div className="hero-info-item">
                  <span className="hero-info-icon">🎓</span>
                  <span>2023.09 – 2027.06</span>
                </div>
              </div>
              <div className="hero-badge">
                <span></span>
                湖南农业大学 · 计算机科学与技术
              </div>
              <p className="title">博学之，审问之，慎思之，明辨之，笃行之</p>
              <div className="hero-contact">
                <a href="mailto:2742760385@qq.com" className="contact-item">
                  <span className="icon">✉</span> 2742760385@qq.com
                </a>
                <span className="contact-item">
                  <span className="icon">📱</span> 19174654127
                </span>
                <a
                  href="https://github.com/RosunOY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-item"
                >
                  <span className="icon">🐙</span> GitHub
                </a>
                <a
                  href="https://gitee.com/ouyangzhisheng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-item"
                >
                  <span className="icon">🐱</span> Gitee
                </a>
              </div>
              <div className="hero-tags">
                <span className="tag">AI游戏开发</span>
                <span className="tag">LLM</span>
                <span className="tag">游戏策划</span>
                <span className="tag">全栈工程师</span>
                <span className="tag">探索 AI 与游戏的无限可能</span>
              </div>
            </div>
            <div className="scroll-indicator">
              <div className="mouse"></div>
              <span>向下滚动</span>
            </div>
          </section>
        )}

        {activeTab === "projects" && (
          <section className="projects">
            <h2>项目经历</h2>
            <p className="projects-subtitle">
              从游戏开发到 AI 应用，这里是我近年来的技术探索
            </p>
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
              <button
                className={`filter-btn ${filter === "design" ? "active" : ""}`}
                onClick={() => setFilter("design")}
              >
                游戏策划
              </button>
            </div>
            <div className="project-list">
              {filteredProjects.map((project, index) => (
                <div key={index} className="project-card">
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
                            🎮 游玩
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-btn project-btn-github"
                          >
                            📂 详情
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "skills" && (
          <section className="skills">
            <h2>专业技能</h2>
            <p className="skills-subtitle">自强不息，持之以恒</p>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className={`skill-card ${skill.isDesign ? "skill-card-wechat" : ""}`}
                >
                  <h3>{skill.category}</h3>
                  {skill.isDesign ? (
                    <div className="wechat-content">
                      <div className="design-items">
                        {skill.items.map((item, i) => (
                          <span key={i} className="skill-item">
                            {item}
                          </span>
                        ))}
                      </div>
                      <div className="wechat-promo">
                        <img
                          src={skill.qrcode}
                          alt="微信公众号二维码"
                          className="wechat-qrcode"
                        />
                        <p className="wechat-name">{skill.wechatName}</p>
                        <p className="wechat-hint">
                          更多文章信息可关注微信公众号查看
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="skill-items">
                      {skill.items.map((item, i) => (
                        <span key={i} className="skill-item">
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="footer-wechat">
          <img
            src="/portfolio/wechat-qrcode.jpg"
            alt="微信公众号二维码"
            className="footer-wechat-qrcode"
          />
          <div className="footer-wechat-info">
            <p className="footer-wechat-name">微信公众号</p>
            <p className="footer-wechat-title">为有源头游戏来</p>
          </div>
        </div>
        <p>© 2026 欧阳志胜 · 个人网站</p>
      </footer>
    </div>
  );
}

export default App;
