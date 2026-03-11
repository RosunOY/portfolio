export default function Home() {
  return (
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
        </div>
        <div className="hero-badge">
          <span></span>
          湖南农业大学 · 计算机科学与技术
        </div>
        <div className="hero-education">
          <span className="hero-education-icon">🎓</span>
          <span>2023.09 – 2027.06 本科在读</span>
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
  );
}
