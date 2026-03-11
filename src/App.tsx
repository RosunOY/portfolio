import { useState, useEffect } from "react";
import "./styles/main.css";
import { Nav, Footer, ParticleTrail } from "./components";
import { Home, Projects, Skills, Experience } from "./pages";

// Project data
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

// Skills data
interface Skill {
  category: string;
  items: string[];
  isDesign?: boolean;
  qrcode?: string;
  wechatName?: string;
}

const skills: Skill[] = [
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

// Experience data
interface Experience {
  title: string;
  organization: string;
  period: string;
  description: string;
  type: string;
  link?: string;
}

const experiences: Experience[] = [
  {
    title: "教育经历",
    organization: "湖南农业大学",
    period: "2023.09 - 2027.06",
    description: "本科 - 计算机科学与技术专业",
    type: "education",
    link: "https://www.chsi.com.cn/xlcx/bg.do?vcode=AYQXUHUQG7ZYWXKW&trnd=13700210680470819701683983712773&srcid=archive",
  },
  {
    title: "校园经历",
    organization: "湖南农业大学",
    period: "2023 - 至今",
    description: "班级副班长（兼就业创业委员）、蝰蛇网络安全实验室负责人",
    type: "education",
  },
  {
    title: "游戏开发",
    organization: "个人项目",
    period: "2025 - 至今",
    description: "开发多款AI游戏，包括生态回响、人类曙光、拯救人类等",
    type: "game",
  },
  {
    title: "全栈开发",
    organization: "技术实践",
    period: "2023 - 至今",
    description:
      "React / Vite / Vue3 / Node.js / Express / TypeScript / Python / Java / Spring Boot / Docker / Git / C/C++ / Hadoop / Linux",
    type: "web",
  },
  {
    title: "游戏策划",
    organization: "公众号运营",
    period: "2024 - 至今",
    description: "运营微信公众号「为有源头游戏来」，分享游戏设计理念",
    type: "design",
  },
];

function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [filter, setFilter] = useState<string>("all");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "projects":
        return (
          <Projects
            projects={projects}
            filter={filter}
            onFilterChange={setFilter}
          />
        );
      case "skills":
        return <Skills skills={skills} />;
      case "experience":
        return (
          <Experience
            experiences={experiences}
            onCardClick={(type) => {
              if (type === "education") {
                setActiveTab("home");
              } else if (type === "game") {
                setActiveTab("projects");
                setFilter("game");
              } else if (type === "design") {
                setActiveTab("projects");
                setFilter("design");
              } else if (type === "web") {
                setActiveTab("projects");
                setFilter("all");
              } else {
                setActiveTab("projects");
                setFilter("all");
              }
            }}
          />
        );
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <ParticleTrail />
      <Nav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        scrolled={scrolled}
      />
      <main className="main">{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;
