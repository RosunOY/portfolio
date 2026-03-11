interface NavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  scrolled: boolean;
}

export default function Nav({ activeTab, onTabChange, scrolled }: NavProps) {
  const tabs = [
    { id: "home", label: "首页" },
    { id: "projects", label: "项目" },
    { id: "skills", label: "技能" },
    { id: "experience", label: "经历" },
  ];

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-content">
        <div className="logo">志胜</div>
        <div className="nav-links">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
