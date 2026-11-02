import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page">
      <div className="empty-state not-found">
        <p className="not-found-code">404</p>
        <h3>这条命令不存在</h3>
        <p>页面可能被删掉了，或者链接里的分类名写错了。</p>
        <div className="not-found-actions">
          <Link to="/" className="btn-primary">
            回到首页
          </Link>
        </div>
      </div>
    </div>
  );
}
