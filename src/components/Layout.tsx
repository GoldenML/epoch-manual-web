import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { categories, getCategoryCount, totalCommands } from "@/data";
import { useAppStore } from "@/store/useAppStore";
import CategoryIcon from "./CategoryIcon";
import SearchDialog from "./SearchDialog";

const STAR = (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
    <path d="m12 3.8 2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.8-5.1 2.8 1-5.7-4.1-4 5.7-.8z" />
  </svg>
);

export default function Layout() {
  const openSearch = useAppStore((state) => state.openSearch);
  const favorites = useAppStore((state) => state.favorites);
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isInput =
        event.target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName);

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openSearch();
      } else if (event.key === "/" && !isInput) {
        event.preventDefault();
        openSearch();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openSearch]);

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-inner">
          <button
            type="button"
            className="menu-btn"
            onClick={() => setNavOpen((prev) => !prev)}
            aria-label="打开导航"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          <NavLink to="/" className="brand">
            <span className="brand-mark">&gt;_</span>
            <span className="brand-text">
              命令手册
              <em>CmdBook</em>
            </span>
          </NavLink>

          <button type="button" className="search-trigger" onClick={() => openSearch()}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m16.5 16.5 4 4" />
            </svg>
            <span className="search-trigger-text">搜索命令、参数或场景</span>
            <kbd>Ctrl K</kbd>
          </button>

          <div className="top-actions">
            <NavLink to="/favorites" className="icon-link" title="我的收藏">
              {STAR}
              {favorites.length ? <span className="icon-badge">{favorites.length}</span> : null}
            </NavLink>
            <button
              type="button"
              className="icon-link"
              onClick={toggleTheme}
              title={theme === "light" ? "切换到深色" : "切换到浅色"}
            >
              {theme === "light" ? (
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                  <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4 8.5 8.5 0 1 0 20 14.2z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                  <circle cx="12" cy="12" r="4.2" />
                  <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="app-body">
        <aside className={`sidebar${navOpen ? " is-open" : ""}`}>
          <nav className="sidebar-inner">
            <div className="nav-group">
              <NavLink to="/" end className="nav-item">
                <span className="nav-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M7 9h4M7 13h7M7 17h3" />
                  </svg>
                </span>
                <span className="nav-text">全部命令</span>
                <span className="nav-count">{totalCommands}</span>
              </NavLink>
              <NavLink to="/favorites" className="nav-item">
                <span className="nav-icon">{STAR}</span>
                <span className="nav-text">我的收藏</span>
                <span className="nav-count">{favorites.length}</span>
              </NavLink>
            </div>

            <p className="nav-label">命令分类</p>

            <div className="nav-group">
              {categories.map((cat) => (
                <NavLink key={cat.id} to={`/c/${cat.id}`} className="nav-item">
                  <span className="nav-icon" style={{ color: cat.color }}>
                    <CategoryIcon name={cat.icon} size={18} />
                  </span>
                  <span className="nav-text">{cat.name}</span>
                  <span className="nav-count">{getCategoryCount(cat)}</span>
                </NavLink>
              ))}
            </div>

            <div className="sidebar-foot">
              <p>共 {totalCommands} 条命令 · {categories.length} 个分类</p>
              <p className="sidebar-hint">按 <kbd>/</kbd> 或 <kbd>Ctrl K</kbd> 快速搜索</p>
            </div>
          </nav>
        </aside>

        {navOpen ? <div className="nav-mask" onClick={() => setNavOpen(false)} /> : null}

        <main className="main">
          <Outlet />
        </main>
      </div>

      <SearchDialog />
    </div>
  );
}
