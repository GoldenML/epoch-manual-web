export interface CmdExample {
  /** 命令示例（原样展示，可直接复制） */
  code: string;
  /** 该示例的说明 */
  note?: string;
}

export interface CmdOption {
  /** 参数，如 -r / --force */
  flag: string;
  desc: string;
}

export interface CommandItem {
  /** 命令名称，如 git commit */
  name: string;
  /** 一句话说明 */
  desc: string;
  /** 示例，第一个为主要用法 */
  examples: CmdExample[];
  /** 常用参数 */
  options?: CmdOption[];
  /** 检索标签 */
  tags?: string[];
  /** 危险操作（删除、覆盖、不可逆） */
  danger?: boolean;
  /** 补充提示 / 踩坑说明 */
  tip?: string;
}

export interface CmdGroup {
  /** 分组名，如「基础操作」 */
  title: string;
  items: CommandItem[];
}

export interface Category {
  /** 路由 id，如 git */
  id: string;
  /** 中文名 */
  name: string;
  /** 英文名 / 副标题 */
  en: string;
  /** 分类简介 */
  desc: string;
  /** 图标标识，对应 components/CategoryIcon */
  icon: string;
  /** 主题色 */
  color: string;
  groups: CmdGroup[];
}

/** 展平后的命令，用于搜索 */
export interface FlatCommand extends CommandItem {
  /** 唯一 id，形如 git-commit */
  id: string;
  categoryId: string;
  categoryName: string;
  groupTitle: string;
}
