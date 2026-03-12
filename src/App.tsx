import { useState, useEffect, useRef } from "react";
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
  cover?: string;
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
    cover: "/portfolio/人类曙光.webp",
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
    cover: "/portfolio/拯救人类.webp",
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
    cover: "/portfolio/商道世家.svg",
  },
  {
    name: "真相游戏 (Truth Game)",
    description: "AI裁判社交推理游戏 - 融合鹅鸭杀身份博弈与真心话大冒险",
    tech: ["Node.js", "Express", "Socket.io", "AI对话系统"],
    highlight: "独立开发",
    category: "game",
    url: "https://github.com/RosunOY/Truth_game",
    githubUrl: "https://github.com/RosunOY/Truth_game",
    cover: "/portfolio/谎言校园.webp",
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
  {
    category: "编程语言",
    items: ["Python", "Java", "C/C++", "JavaScript", "TypeScript"],
  },
  {
    category: "开发工具",
    items: [
      "Git",
      "Maven",
      "Docker",
      "Linux",
      "Hadoop",
      "Claude Code",
      "Cursor",
      "Trae",
    ],
  },
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
  isPhotoCard?: boolean;
  photos?: string[];
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
    description:
      "班级副班长（兼就业创业委员）、蝰蛇网络安全实验室负责人\n副班长：协助班长处理班级事项，安排班干部组织学院活动，宣发创新创业类比赛和就业讲座，动员同学参加\n实验室负责人：组织招生、培训新生，组织200人校园网络安全大赛，负责线上下宣发答疑、现场纪律维护及评奖工作",
    type: "education",
  },
  {
    title: "兴趣爱好",
    organization: "个人喜好",
    period: "持续至今",
    description:
      "喜欢健身（1年+）、听音乐、看电影、看动漫（剑来、凡人修仙传、吞噬星空等国漫）、看小说、唱歌、玩游戏、vibe coding、写游戏策划案\n喜欢单依纯、张起灵\n🎮 最近常玩：逆战未来、永劫无间、瓦罗兰特、金铲铲之战、LOL、我的世界、森林之子、王者荣耀\n玩过游戏：口袋妖怪、星露谷物语、三角洲行动、云顶之弈、CF、战地风云5、黑神话悟空、洛克王国、拳皇系列、明日方舟、植物大战僵尸、美食大战老鼠、赛尔号、奥拉星、圆梦之星、红色警戒、侠盗飞车、球球大作战、火影忍者、QQ飞车、光遇、欢乐斗地主、开心消消乐、水果忍者、狼人杀、燕云十六声",
    type: "hobby",
  },
  {
    title: "生活日常",
    organization: "记录点滴",
    period: "2023 - 至今",
    description: "记录生活中的美好瞬间",
    type: "photos",
    isPhotoCard: true,
    photos: [
      "/portfolio/个人照片0.webp",
      "/portfolio/个人照片1.webp",
      "/portfolio/个人照片2.webp",
      "/portfolio/个人照片3.webp",
      "/portfolio/个人照片4.webp",
      "/portfolio/个人照片5.webp",
      "/portfolio/个人照片6.webp",
      "/portfolio/个人照片7.webp",
      "/portfolio/个人照片8.webp",
      "/portfolio/个人照片9.webp",
      "/portfolio/个人照片10.webp",
      "/portfolio/个人照片11.webp",
      "/portfolio/个人照片12.webp",
      "/portfolio/个人照片13.webp",
      "/portfolio/个人照片14.webp",
      "/portfolio/个人照片15.webp",
      "/portfolio/个人照片16.webp",
      "/portfolio/个人照片17.webp",
      "/portfolio/个人照片18.webp",
      "/portfolio/个人照片19.webp",
      "/portfolio/个人照片20.webp",
      "/portfolio/个人照片21.webp",
      "/portfolio/个人照片22.webp",
      "/portfolio/个人照片23.webp",
      "/portfolio/个人照片24.webp",
      "/portfolio/个人照片25.webp",
      "/portfolio/个人照片26.webp",
      "/portfolio/个人照片27.webp",
      "/portfolio/个人照片28.webp",
      "/portfolio/个人照片29.webp",
      "/portfolio/个人照片30.webp",
      "/portfolio/个人照片31.webp",
      "/portfolio/个人照片32.webp",
      "/portfolio/照片.webp",
    ],
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
      "Java / Python / C/C++ / TypeScript / React / Vite / Vue3 / Node.js / Express / Spring Boot / Docker / Git / Hadoop / Linux",
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
  const [isBgmPlaying, setIsBgmPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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
        return <Home onNavigate={(tab) => setActiveTab(tab)} />;
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
              } else if (type === "hobby") {
                // 兴趣爱好不跳转
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
      <audio ref={audioRef} src="/portfolio/bgm.mp4" loop playsInline />
      <button
        className={`bgm-toggle ${isBgmPlaying ? "playing" : ""}`}
        onClick={() => {
          if (audioRef.current) {
            if (isBgmPlaying) {
              audioRef.current.pause();
            } else {
              audioRef.current.play();
            }
            setIsBgmPlaying(!isBgmPlaying);
          }
        }}
      >
        {isBgmPlaying ? "🔊" : "🔇"}
      </button>
    </div>
  );
}

export default App;
