import type { FlatCommand } from "@/types/command";
import { useAppStore } from "@/store/useAppStore";
import CopyButton from "./CopyButton";

interface CommandCardProps {
  item: FlatCommand;
  showCategory?: boolean;
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    >
      <path d="m12 3.8 2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.8-5.1 2.8 1-5.7-4.1-4 5.7-.8z" />
    </svg>
  );
}

export default function CommandCard({ item, showCategory }: CommandCardProps) {
  const favorite = useAppStore((state) => state.favorites.includes(item.id));
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);

  return (
    <article className={`cmd-card${item.danger ? " is-danger" : ""}`} id={item.id}>
      <div className="cmd-head">
        <div className="cmd-title">
          <code className="cmd-name">{item.name}</code>
          {item.danger ? <span className="badge badge-danger">危险</span> : null}
          {showCategory ? <span className="badge badge-ghost">{item.categoryName}</span> : null}
        </div>
        <button
          type="button"
          className={`star-btn${favorite ? " is-active" : ""}`}
          onClick={() => toggleFavorite(item.id)}
          title={favorite ? "取消收藏" : "收藏"}
          aria-label={favorite ? "取消收藏" : "收藏"}
        >
          <StarIcon filled={favorite} />
        </button>
      </div>

      <p className="cmd-desc">{item.desc}</p>

      <div className="cmd-examples">
        {item.examples.map((example, index) => (
          <div className="example" key={`${item.id}-${index}`}>
            <div className="example-code">
              <pre>
                <code>{example.code}</code>
              </pre>
              <CopyButton text={example.code} />
            </div>
            {example.note ? <p className="example-note">{example.note}</p> : null}
          </div>
        ))}
      </div>

      {item.options?.length ? (
        <div className="cmd-options">
          {item.options.map((option) => (
            <div className="opt-row" key={option.flag}>
              <code className="opt-flag">{option.flag}</code>
              <span className="opt-desc">{option.desc}</span>
            </div>
          ))}
        </div>
      ) : null}

      {item.tip ? (
        <p className="cmd-tip">
          <span className="tip-label">提示</span>
          {item.tip}
        </p>
      ) : null}

      {item.tags?.length ? (
        <div className="cmd-tags">
          {item.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
