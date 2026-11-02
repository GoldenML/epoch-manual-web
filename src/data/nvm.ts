import type { CmdGroup } from "@/types/command";

const nvm: CmdGroup[] = [
  {
    title: "nvm 安装",
    items: [
      {
        name: "安装 nvm",
        desc: "用官方脚本安装 Node 版本管理器",
        examples: [
          { code: "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash" },
          { code: 'export NVM_DIR="$HOME/.nvm"\n[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"', note: "脚本一般会自动写入 ~/.bashrc，若没有则手动追加" },
          { code: "source ~/.bashrc", note: "让 nvm 命令生效" },
          { code: "nvm -v", note: "验证安装" },
        ],
        tip: "国内网络下载失败时，先设置镜像：export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node",
        tags: ["安装", "nvm", "node"],
      },
      {
        name: "卸载 nvm",
        desc: "彻底移除 nvm 及已安装的 Node",
        examples: [
          { code: "rm -rf ~/.nvm" },
          { code: "sed -i '/NVM_DIR/d' ~/.bashrc", note: "删除 bashrc 中的相关配置" },
        ],
        danger: true,
        tags: ["卸载", "nvm"],
      },
    ],
  },
  {
    title: "nvm 版本管理",
    items: [
      {
        name: "nvm install",
        desc: "安装指定版本的 Node",
        examples: [
          { code: "nvm install --lts", note: "安装最新 LTS" },
          { code: "nvm install 20", note: "安装 Node 20 的最新小版本" },
          { code: "nvm install 18.20.4", note: "安装精确版本" },
          { code: "nvm install node", note: "安装最新版（Current）" },
        ],
        tags: ["安装", "node版本", "LTS"],
      },
      {
        name: "nvm use",
        desc: "切换当前 shell 使用的 Node 版本",
        examples: [
          { code: "nvm use 20" },
          { code: "nvm use --lts" },
          { code: "nvm use system", note: "切回系统自带 Node" },
        ],
        tags: ["切换", "版本"],
      },
      {
        name: "nvm ls / ls-remote",
        desc: "查看本地与远程可用版本",
        examples: [
          { code: "nvm ls", note: "本地已安装版本" },
          { code: "nvm ls-remote --lts", note: "远程所有 LTS 版本" },
          { code: "nvm current", note: "当前版本" },
          { code: "nvm which 20", note: "某版本 node 的可执行路径" },
        ],
        tags: ["查看", "版本列表"],
      },
      {
        name: "nvm alias",
        desc: "设置默认版本与别名",
        examples: [
          { code: "nvm alias default 20", note: "新开终端默认用 20" },
          { code: "nvm alias my-app 18.20.4" },
          { code: "nvm unalias my-app" },
        ],
        tip: "只 nvm use 不设 default，新开窗口会回到默认版本。",
        tags: ["默认版本", "alias"],
      },
      {
        name: "nvm uninstall",
        desc: "卸载某个 Node 版本",
        examples: [
          { code: "nvm uninstall 16" },
          { code: "nvm uninstall --lts" },
        ],
        tags: ["卸载", "版本"],
      },
      {
        name: "项目级版本锁定",
        desc: "用 .nvmrc 固定项目 Node 版本",
        examples: [
          { code: "echo \"20\" > .nvmrc", note: "在项目根目录创建" },
          { code: "nvm use", note: "自动读取 .nvmrc" },
          { code: "nvm install", note: "自动安装 .nvmrc 指定版本" },
        ],
        tags: [".nvmrc", "团队协作", "版本锁定"],
      },
    ],
  },
  {
    title: "npm",
    items: [
      {
        name: "npm 镜像与配置",
        desc: "切换源、查看配置",
        examples: [
          { code: "npm config set registry https://registry.npmmirror.com" },
          { code: "npm config get registry" },
          { code: "npm config list" },
          { code: "npm config delete registry", note: "恢复官方源" },
        ],
        tip: "项目级配置写在 .npmrc，团队统一源更方便。",
        tags: ["镜像", "registry", "npm"],
      },
      {
        name: "npm install",
        desc: "安装依赖",
        examples: [
          { code: "npm install", note: "按 package.json 安装" },
          { code: "npm install axios", note: "装为生产依赖" },
          { code: "npm install -D vite", note: "装为开发依赖" },
          { code: "npm install -g pnpm", note: "全局安装" },
          { code: "npm ci", note: "按 lock 文件精确安装，CI 环境用" },
        ],
        options: [
          { flag: "-D / --save-dev", desc: "开发依赖" },
          { flag: "-g", desc: "全局安装" },
          { flag: "--legacy-peer-deps", desc: "忽略 peer 依赖冲突" },
          { flag: "--force", desc: "强制重装（慎用）" },
        ],
        tags: ["安装", "依赖", "npm"],
      },
      {
        name: "npm run / scripts",
        desc: "执行 package.json 中的脚本",
        examples: [
          { code: "npm run dev" },
          { code: "npm run build -- --mode production", note: "-- 之后的参数透传给脚本" },
          { code: "npm run" , note: "列出所有可用脚本" },
        ],
        tags: ["脚本", "run", "build"],
      },
      {
        name: "npm 查询与维护",
        desc: "查看过时依赖、清理缓存",
        examples: [
          { code: "npm ls --depth=0", note: "查看顶层依赖" },
          { code: "npm outdated", note: "列出可升级的依赖" },
          { code: "npm update", note: "按 semver 规则升级" },
          { code: "npm cache clean --force", note: "清理缓存（安装异常时用）" },
          { code: "npm view react version", note: "查看包的最新版本" },
          { code: "npm ls -g --depth=0", note: "查看全局安装的包" },
        ],
        tags: ["升级", "缓存", "依赖"],
      },
      {
        name: "npm 登录与发布",
        desc: "发布自己的包",
        examples: [
          { code: "npm login" },
          { code: "npm publish", note: "发布当前包" },
          { code: "npm publish --access public", note: "发布 scoped 公共包" },
          { code: "npm version patch", note: "版本号 +1 并打 git tag" },
          { code: "npm unpublish pkg@1.0.0 --force", note: "72 小时内可撤回" },
        ],
        danger: true,
        tags: ["发布", "publish", "版本"],
      },
    ],
  },
  {
    title: "pnpm / yarn",
    items: [
      {
        name: "pnpm 常用",
        desc: "更快、省磁盘的包管理器",
        examples: [
          { code: "npm install -g pnpm", note: "安装" },
          { code: "corepack enable", note: "Node 16.13+ 可用 corepack 管理包管理器版本" },
          { code: "pnpm install" },
          { code: "pnpm add axios" },
          { code: "pnpm add -D typescript" },
          { code: "pnpm remove axios" },
          { code: "pnpm dlx create-vite my-app", note: "不安装直接执行" },
          { code: "pnpm store prune", note: "清理全局存储" },
        ],
        options: [
          { flag: "-D", desc: "开发依赖" },
          { flag: "-w", desc: "在 workspace 根安装" },
          { flag: "--filter", desc: "对指定子包执行" },
        ],
        tags: ["pnpm", "包管理"],
      },
      {
        name: "yarn 常用",
        desc: "经典 Yarn 1.x 与 Berry",
        examples: [
          { code: "yarn" , note: "安装依赖" },
          { code: "yarn add axios" },
          { code: "yarn add -D vite" },
          { code: "yarn remove axios" },
          { code: "yarn global add serve" },
          { code: "yarn why axios", note: "查看为什么安装了该依赖" },
        ],
        tags: ["yarn", "包管理"],
      },
      {
        name: "npx",
        desc: "执行本地或远程的 CLI",
        examples: [
          { code: "npx create-react-app my-app" },
          { code: "npx vite --version" },
          { code: "npx --no-install tsc -v", note: "只用本地已安装的" },
        ],
        tags: ["npx", "cli"],
      },
    ],
  },
];

export default nvm;
