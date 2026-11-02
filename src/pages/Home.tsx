import { NavLink } from "react-router-dom";
import { categories, flatCommands, getCategoryCount, totalCommands } from "@/data";
import { useAppStore } from "@/store/useAppStore";
import CategoryIcon from "@/components/CategoryIcon";
import CommandCard from "@/components/CommandCard";

export default function Home() {
  const openSearch = useAppStore((state) => state.openSearch);
  const favorites = useAppStore((state) => state.favorites);

  const favoriteItems = favorites
    .map((id) => flatCommands.find((item) => item.id === id))
    .filter((item) => item !== undefined)
    .slice(0, 4);

  return (
    <div className="page">
      <section className="hero">
        <p className="eyebrow">COMMAND REFERENCE</p>
        <h1>命令行速查手册</h1>
        <p className="hero-sub">
          覆盖 Git、Linux、CentOS / Ubuntu、Node、Docker、Nginx、SSH 等 {categories.length} 个方向，
          {totalCommands} 条命令即查即用。点一下就能复制。
        </p>
        <button type="button" className="hero-search" onClick={() => openSearch()}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m16.5 16.5 4 4" />
          </svg>
          <span>搜索命令、参数或场景…</span>
          <kbd>Ctrl K</kbd>
        </button>
        <div className="hero-tags">
          {["git rebase", "端口占用", "502", "免密登录", "定时任务", "备份"].map((word) => (
            <button
              key={word}
              type="button"
              className="hero-tag"
              onClick={() => openSearch(word)}
            >
              {word}
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>按分类浏览</h2>
          <span className="section-meta">{categories.length} 个分类 · {totalCommands} 条命令</span>
        </div>
        <div className="cat-grid">
          {categories.map((cat) => (
            <NavLink key={cat.id} to={`/c/${cat.id}`} className="cat-card">
              <div className="cat-card-top">
                <span
                  className="cat-icon"
                  style={{ color: cat.color, background: `${cat.color}14` }}
                >
                  <CategoryIcon name={cat.icon} size={20} />
                </span>
                <span className="cat-count">{getCategoryCount(cat)}</span>
              </div>
              <h3 className="cat-name">{cat.name}</h3>
              <p className="cat-desc">{cat.desc}</p>
              <div className="cat-preview">
                {cat.groups[0].items.slice(0, 2).map((item) => (
                  <code key={item.name}>{item.name}</code>
                ))}
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      {favoriteItems.length ? (
        <section className="section">
          <div className="section-head">
            <h2>我的收藏</h2>
            <NavLink to="/favorites" className="section-link">
              查看全部 →
            </NavLink>
          </div>
          <div className="cmd-list">
            {favoriteItems.map((item) => (
              <CommandCard key={item.id} item={item!} showCategory />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
