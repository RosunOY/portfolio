interface Skill {
  category: string;
  items: string[];
  isDesign?: boolean;
  qrcode?: string;
  wechatName?: string;
}

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  return (
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
  );
}
