import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { flatCommands, popularCommands, categories } from "@/data";
import { useAppStore } from "@/store/useAppStore";
import CategoryIcon from "./CategoryIcon";
import type { FlatCommand } from "@/types/command";

const searchIndex = flatCommands.map((item) => ({
  item,
  haystack: [item.name, item.desc, item.categoryName, item.groupTitle, ...(item.tags ?? [])]
    .join(" ")
    .toLowerCase(),
}));

const categoryMeta = new Map(
  categories.map((cat) => [cat.id, { icon: cat.icon, color: cat.color }]),
);

export default function SearchDialog() {
  const open = useAppStore((state) => state.searchOpen);
  const setOpen = useAppStore((state) => state.setSearchOpen);
  const favorites = useAppStore((state) => state.favorites);
  const searchSeed = useAppStore((state) => state.searchSeed);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return [];

    const words = keyword.split(/\s+/);

    return searchIndex
      .filter((entry) => words.every((word) => entry.haystack.includes(word)))
      .sort((a, b) => {
        const aName = a.item.name.toLowerCase().includes(keyword) ? 0 : 1;
        const bName = b.item.name.toLowerCase().includes(keyword) ? 0 : 1;
        return aName - bName;
      })
      .slice(0, 12)
      .map((entry) => entry.item);
  }, [query]);

  const suggest: FlatCommand[] = useMemo(() => {
    if (query.trim()) return results;
    const favItems = favorites
      .map((id) => flatCommands.find((item) => item.id === id))
      .filter((item): item is FlatCommand => Boolean(item));
    return favItems.length ? favItems.slice(0, 6) : popularCommands.slice(0, 8);
  }, [query, results, favorites]);

  const list = query.trim() ? results : suggest;

  useEffect(() => {
    if (!open) return;
    setQuery(searchSeed);
    setActive(0);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 30);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, searchSeed]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  const go = (item?: FlatCommand) => {
    if (!item) return;
    setOpen(false);
    navigate(`/c/${item.categoryId}#${item.id}`);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setOpen(false);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((prev) => (prev + 1) % Math.max(list.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((prev) => (prev - 1 + list.length) % Math.max(list.length, 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      go(list[active]);
    }
  };

  return (
    <div className="search-overlay" onMouseDown={() => setOpen(false)}>
      <div
        className="search-panel"
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="search-input-row">
          <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m16.5 16.5 4 4" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索命令、参数或场景，如 端口占用 / rebase / 502"
            spellCheck={false}
          />
          <kbd>Esc</kbd>
        </div>

        <div className="search-body" ref={listRef}>
          {!query.trim() ? (
            <p className="search-label">{favorites.length ? "我的收藏" : "热门命令"}</p>
          ) : results.length === 0 ? (
            <div className="search-empty">
              <p>没有找到「{query}」相关的命令</p>
              <span>试试更短的关键词，比如 ssh、端口、备份</span>
            </div>
          ) : (
            <p className="search-label">找到 {results.length} 条结果</p>
          )}

          {list.map((item, index) => (
            <button
              type="button"
              key={item.id}
              data-index={index}
              className={`search-item${index === active ? " is-active" : ""}`}
              onMouseEnter={() => setActive(index)}
              onClick={() => go(item)}
            >
              <span
                className="search-item-icon"
                style={{ color: categoryMeta.get(item.categoryId)?.color }}
              >
                <CategoryIcon name={categoryMeta.get(item.categoryId)?.icon ?? "linux"} size={18} />
              </span>
              <span className="search-item-main">
                <span className="search-item-name">{item.name}</span>
                <span className="search-item-desc">{item.desc}</span>
              </span>
              <span className="search-item-cat">{item.categoryName}</span>
            </button>
          ))}
        </div>

        <div className="search-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> 选择</span>
          <span><kbd>Enter</kbd> 打开</span>
          <span><kbd>Esc</kbd> 关闭</span>
        </div>
      </div>
    </div>
  );
}
