import { Link } from "react-router-dom";
import { flatCommands } from "@/data";
import { useAppStore } from "@/store/useAppStore";
import CommandCard from "@/components/CommandCard";

export default function Favorites() {
  const favorites = useAppStore((state) => state.favorites);
  const items = favorites
    .map((id) => flatCommands.find((item) => item.id === id))
    .filter((item) => item !== undefined);

  return (
    <div className="page">
      <header className="cat-header">
        <div className="cat-header-main">
          <span className="cat-icon cat-icon-lg" style={{ color: "#b45309", background: "#b4530914" }}>
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
              <path d="m12 3.8 2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.8-5.1 2.8 1-5.7-4.1-4 5.7-.8z" />
            </svg>
          </span>
          <div>
            <div className="cat-header-title">
              <h1>我的收藏</h1>
              <span className="cat-en">Favorites</span>
            </div>
            <p className="cat-header-desc">收藏保存在本地浏览器，换设备不会同步。</p>
          </div>
        </div>
        <span className="cat-header-count">{items.length} 条命令</span>
      </header>

      {items.length ? (
        <div className="cmd-list">
          {items.map((item) => (
            <CommandCard key={item!.id} item={item!} showCategory />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">
            <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
              <path d="m12 3.8 2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.8-5.1 2.8 1-5.7-4.1-4 5.7-.8z" />
            </svg>
          </div>
          <h3>还没有收藏任何命令</h3>
          <p>浏览命令时点击右上角的星标，常用的命令就会出现在这里。</p>
          <Link to="/" className="btn-primary">
            去逛逛
          </Link>
        </div>
      )}
    </div>
  );
}
