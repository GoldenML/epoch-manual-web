import { useEffect, useMemo, useRef } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { categories, getCategory, getCategoryCount, getCategoryGroups } from "@/data";
import CategoryIcon from "@/components/CategoryIcon";
import CommandCard from "@/components/CommandCard";
import NotFound from "./NotFound";

export default function Category() {
  const { categoryId } = useParams();
  const location = useLocation();
  const category = getCategory(categoryId);
  const groups = useMemo(() => (category ? getCategoryGroups(category.id) : []), [category]);
  const timerRef = useRef<number | undefined>(undefined);

  const index = categories.findIndex((cat) => cat.id === categoryId);
  const prev = index > 0 ? categories[index - 1] : undefined;
  const next = index >= 0 && index < categories.length - 1 ? categories[index + 1] : undefined;

  useEffect(() => {
    window.clearTimeout(timerRef.current);

    if (!category) return;

    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const id = decodeURIComponent(location.hash.slice(1));
    timerRef.current = window.setTimeout(() => {
      const element = document.getElementById(id);
      if (!element) return;
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      element.classList.add("is-target");
      window.setTimeout(() => element.classList.remove("is-target"), 2400);
    }, 60);

    return () => window.clearTimeout(timerRef.current);
  }, [location.hash, location.key, category]);

  if (!category) {
    return <NotFound />;
  }

  return (
    <div className="page">
      <header className="cat-header">
        <div className="cat-header-main">
          <span
            className="cat-icon cat-icon-lg"
            style={{ color: category.color, background: `${category.color}14` }}
          >
            <CategoryIcon name={category.icon} size={26} />
          </span>
          <div>
            <div className="cat-header-title">
              <h1>{category.name}</h1>
              <span className="cat-en">{category.en}</span>
            </div>
            <p className="cat-header-desc">{category.desc}</p>
          </div>
        </div>
        <span className="cat-header-count">{getCategoryCount(category)} 条命令</span>
      </header>

      <nav className="group-nav">
        {groups.map((group, groupIndex) => (
          <button
            key={group.title}
            type="button"
            onClick={() => {
              const element = document.getElementById(`${category.id}-group-${groupIndex}`);
              if (!element) return;
              window.scrollTo({ top: element.offsetTop - 108, behavior: "smooth" });
            }}
          >
            {group.title}
            <span>{group.items.length}</span>
          </button>
        ))}
      </nav>

      {groups.map((group, groupIndex) => (
        <section
          className="cmd-group"
          key={group.title}
          id={`${category.id}-group-${groupIndex}`}
        >
          <h2 className="group-title">
            {group.title}
            <span className="group-line" />
            <span className="group-count">{group.items.length}</span>
          </h2>
          <div className="cmd-list">
            {group.items.map((item) => (
              <CommandCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}

      <footer className="cat-foot">
        {prev ? (
          <NavLink to={`/c/${prev.id}`} className="page-link">
            <span>← 上一个</span>
            <strong>{prev.name}</strong>
          </NavLink>
        ) : (
          <span />
        )}
        {next ? (
          <NavLink to={`/c/${next.id}`} className="page-link page-link-right">
            <span>下一个 →</span>
            <strong>{next.name}</strong>
          </NavLink>
        ) : (
          <Link to="/" className="page-link page-link-right">
            <span>回到</span>
            <strong>全部命令</strong>
          </Link>
        )}
      </footer>
    </div>
  );
}
