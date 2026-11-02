# 命令手册 · CmdBook

基于 Vite + React 19 + TypeScript 的命令行速查手册，收录 Git、Linux、CentOS、Ubuntu、nvm/Node、Docker、Nginx、SSH、网络诊断、MySQL/Redis、Vim、Windows/PowerShell 等 12 个方向共 200+ 条常用命令。

## 功能

- **分类浏览**：左侧分类导航，分类页内按场景分组，顶部粘性分组锚点
- **全局搜索**：`Ctrl K` / `/` 唤起，支持命令名、说明、标签、场景关键词模糊匹配，键盘上下键 + Enter 直达
- **一键复制**：每条示例命令悬停出现复制按钮
- **收藏**：星标收藏，保存在 localStorage
- **深浅色主题**：右上角切换，跟随持久化
- **危险标记**：删除 / 强制覆盖类命令带红色标识和踩坑提示

## 目录结构

```
src/
├── data/            # 命令数据（按分类一个文件）
│   ├── git.ts  linux.ts  centos.ts  ubuntu.ts  nvm.ts
│   ├── docker.ts  nginx.ts  ssh.ts  net.ts  vim.ts  db.ts  windows.ts
│   └── index.ts     # 分类元信息 + 展平搜索索引
├── components/      # Layout / SearchDialog / CommandCard / CategoryIcon ...
├── pages/           # Home / Category / Favorites / NotFound
├── store/           # zustand：收藏、主题、搜索面板状态
└── types/           # CommandItem / Category 类型定义
```

## 如何新增命令或分类

1. **加命令**：在 `src/data/<分类>.ts` 对应分组的 `items` 里追加一条：

```ts
{
  name: "命令名",
  desc: "一句话说明",
  examples: [{ code: "命令 示例", note: "示例说明（可选）" }],
  options: [{ flag: "-r", desc: "参数说明" }], // 可选
  tags: ["检索词"],
  danger: true,  // 危险操作时
  tip: "踩坑提示", // 可选
}
```

2. **加分类**：在 `src/data/index.ts` 的 `categories` 里注册（id、名称、图标、颜色），并新建数据文件导出 `CmdGroup[]`。

命令 id 由 `分类id-命令名` 自动生成，无需手写。

## 开发

```bash
pnpm install
pnpm dev      # 本地开发
pnpm build    # 类型检查 + 生产构建
```
