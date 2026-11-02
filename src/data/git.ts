import type { CmdGroup } from "@/types/command";

const git: CmdGroup[] = [
  {
    title: "配置与初始化",
    items: [
      {
        name: "git config",
        desc: "设置全局用户名和邮箱，提交记录的身份来源",
        examples: [
          {
            code: 'git config --global user.name "Your Name"\ngit config --global user.email "you@example.com"',
          },
          { code: "git config --global core.editor vim", note: "指定默认编辑器" },
          { code: "git config --list --show-origin", note: "查看所有配置及其来源文件" },
          { code: 'git config --global alias.st "status -sb"', note: "配置别名，之后可用 git st" },
        ],
        options: [
          { flag: "--global", desc: "写入用户级配置 ~/.gitconfig" },
          { flag: "--local", desc: "写入当前仓库 .git/config（默认）" },
          { flag: "--unset", desc: "删除某项配置" },
        ],
        tags: ["配置", "用户名", "邮箱", "alias"],
      },
      {
        name: "git init",
        desc: "在目录中初始化一个新的 Git 仓库",
        examples: [
          { code: "git init", note: "当前目录初始化" },
          { code: "git init my-project", note: "新建目录并初始化" },
          { code: "git init --bare repo.git", note: "创建裸仓库，常用作服务端中央仓库" },
        ],
        options: [
          { flag: "-b main", desc: "指定初始分支名（旧版本默认 master）" },
          { flag: "--bare", desc: "创建不带工作区的裸仓库" },
        ],
        tags: ["初始化", "仓库"],
      },
      {
        name: "git clone",
        desc: "克隆远程仓库到本地",
        examples: [
          { code: "git clone https://github.com/user/repo.git" },
          { code: "git clone -b dev --depth 1 https://github.com/user/repo.git", note: "只拉取 dev 分支最近一次提交，速度快" },
          { code: "git clone git@github.com:user/repo.git my-dir", note: "SSH 方式并指定本地目录名" },
        ],
        options: [
          { flag: "-b <branch>", desc: "指定要检出的分支" },
          { flag: "--depth 1", desc: "浅克隆，只取最近 1 次提交" },
          { flag: "--recursive", desc: "同时克隆子模块" },
        ],
        tags: ["克隆", "下载", "浅克隆"],
      },
    ],
  },
  {
    title: "日常提交",
    items: [
      {
        name: "git status",
        desc: "查看工作区和暂存区状态",
        examples: [
          { code: "git status" },
          { code: "git status -sb", note: "紧凑格式，显示分支和文件列表" },
        ],
        options: [
          { flag: "-s", desc: "简短输出" },
          { flag: "-b", desc: "同时显示分支信息" },
        ],
        tags: ["状态", "查看"],
      },
      {
        name: "git add",
        desc: "把改动加入暂存区，准备提交",
        examples: [
          { code: "git add src/App.tsx", note: "添加指定文件" },
          { code: "git add .", note: "添加当前目录所有改动（含新增文件）" },
          { code: "git add -A", note: "添加整个仓库的所有改动" },
          { code: "git add -p", note: "交互式逐块选择要暂存的代码，避免误提交" },
        ],
        options: [
          { flag: "-p", desc: "分块交互暂存" },
          { flag: "-u", desc: "只添加已跟踪文件的修改，不含新文件" },
        ],
        tags: ["暂存", "add"],
      },
      {
        name: "git commit",
        desc: "把暂存区内容提交为一条版本记录",
        examples: [
          { code: 'git commit -m "feat: 新增登录页"' },
          { code: "git commit -am \"fix: 修复空指针\"", note: "跳过 add，直接提交已跟踪文件的改动" },
          { code: 'git commit --amend -m "新的提交信息"', note: "修改上一条提交（仅限未推送）" },
          { code: 'git commit --allow-empty -m "chore: trigger ci"', note: "创建空提交，常用于触发流水线" },
        ],
        options: [
          { flag: "-m", desc: "直接指定提交信息" },
          { flag: "-a", desc: "自动暂存已跟踪文件" },
          { flag: "--amend", desc: "修补最后一次提交" },
          { flag: "--no-verify", desc: "跳过 husky 等钩子（慎用）" },
        ],
        tags: ["提交", "commit"],
      },
      {
        name: "git diff",
        desc: "查看改动内容的差异",
        examples: [
          { code: "git diff", note: "工作区 vs 暂存区" },
          { code: "git diff --staged", note: "暂存区 vs 最后一次提交" },
          { code: "git diff HEAD~1 HEAD -- src/", note: "比较两次提交之间某目录的差异" },
          { code: "git diff --stat", note: "只看哪些文件改了、增删多少行" },
        ],
        options: [
          { flag: "--staged", desc: "查看已暂存的改动（同 --cached）" },
          { flag: "--stat", desc: "统计摘要" },
          { flag: "-w", desc: "忽略空白字符差异" },
        ],
        tags: ["差异", "diff", "对比"],
      },
      {
        name: "git log",
        desc: "查看提交历史",
        examples: [
          { code: "git log --oneline --graph --all --decorate", note: "最常用的图形化历史" },
          { code: "git log -5 --oneline", note: "最近 5 条" },
          { code: "git log --author=\"zhang\" --since=\"2 weeks ago\"", note: "按作者和时间过滤" },
          { code: "git log -p src/main.ts", note: "查看某文件的每次改动内容" },
        ],
        options: [
          { flag: "--oneline", desc: "每条记录一行" },
          { flag: "--graph", desc: "显示分支合并图" },
          { flag: "--all", desc: "包含所有分支" },
          { flag: "-S\"keyword\"", desc: "搜索引入/删除该字符串的提交" },
        ],
        tags: ["历史", "日志", "log"],
      },
      {
        name: "git show",
        desc: "查看某次提交的详细信息与改动",
        examples: [
          { code: "git show HEAD" },
          { code: "git show a1b2c3d --stat" },
          { code: "git show HEAD:src/index.ts", note: "查看某次提交中该文件的内容" },
        ],
        tags: ["查看", "提交详情"],
      },
      {
        name: "git blame",
        desc: "逐行显示文件的最后修改人和提交",
        examples: [
          { code: "git blame src/utils.ts" },
          { code: "git blame -L 20,40 src/utils.ts", note: "只看 20-40 行" },
        ],
        options: [{ flag: "-L <start>,<end>", desc: "限定行范围" }],
        tags: ["追溯", "责任人", "blame"],
      },
    ],
  },
  {
    title: "分支管理",
    items: [
      {
        name: "git branch",
        desc: "列出、创建、删除分支",
        examples: [
          { code: "git branch", note: "本地分支列表" },
          { code: "git branch -a", note: "含远程分支" },
          { code: "git branch -d feature/login", note: "删除已合并分支" },
          { code: "git branch -D feature/login", note: "强制删除未合并分支", },
          { code: "git branch -m old-name new-name", note: "重命名分支" },
        ],
        options: [
          { flag: "-a", desc: "包含远程分支" },
          { flag: "-d / -D", desc: "删除（-D 强制）" },
          { flag: "-m", desc: "重命名" },
          { flag: "-vv", desc: "显示各分支对应远程及领先/落后数" },
        ],
        tags: ["分支", "branch"],
      },
      {
        name: "git switch",
        desc: "切换分支或创建并切换（推荐替代 checkout）",
        examples: [
          { code: "git switch main" },
          { code: "git switch -c feature/pay", note: "新建并切换" },
          { code: "git switch -c hotfix origin/main", note: "基于远程分支新建本地分支" },
          { code: "git switch -", note: "回到上一个分支" },
        ],
        options: [
          { flag: "-c", desc: "创建新分支并切换" },
          { flag: "-", desc: "切回上一个分支" },
        ],
        tags: ["切换", "分支", "switch"],
      },
      {
        name: "git merge",
        desc: "把其他分支合并进当前分支",
        examples: [
          { code: "git merge feature/pay" },
          { code: "git merge --no-ff feature/pay", note: "强制生成合并提交，保留分支拓扑" },
          { code: "git merge --abort", note: "冲突无法解决时放弃本次合并" },
        ],
        options: [
          { flag: "--no-ff", desc: "禁用快进合并" },
          { flag: "--squash", desc: "把对方所有提交压成一次未提交的改动" },
          { flag: "--abort", desc: "中止合并" },
        ],
        tags: ["合并", "merge", "冲突"],
      },
      {
        name: "git rebase",
        desc: "变基，把当前分支的提交移到目标分支之后，形成线性历史",
        examples: [
          { code: "git rebase main", note: "把当前分支接到 main 最新提交后面" },
          { code: "git rebase -i HEAD~3", note: "交互式整理最近 3 条提交（合并/改名/删除）" },
          { code: "git rebase --continue", note: "解决冲突后继续" },
          { code: "git rebase --abort", note: "放弃变基，回到原状" },
        ],
        options: [
          { flag: "-i", desc: "交互式变基" },
          { flag: "--continue", desc: "冲突解决后继续" },
          { flag: "--abort", desc: "中止并回滚" },
        ],
        danger: true,
        tip: "不要对已经推送到公共分支的提交做 rebase，会改写历史影响他人。",
        tags: ["变基", "rebase", "整理提交"],
      },
      {
        name: "git cherry-pick",
        desc: "把指定提交复制到当前分支",
        examples: [
          { code: "git cherry-pick a1b2c3d" },
          { code: "git cherry-pick a1b2c3d..e4f5g6h", note: "批量挑选一个区间" },
          { code: "git cherry-pick --abort", note: "放弃本次挑选" },
        ],
        tags: ["挑选", "热修复", "cherry-pick"],
      },
    ],
  },
  {
    title: "远程协作",
    items: [
      {
        name: "git remote",
        desc: "管理远程仓库地址",
        examples: [
          { code: "git remote -v", note: "查看所有远程地址" },
          { code: "git remote add origin git@github.com:user/repo.git" },
          { code: "git remote set-url origin git@github.com:user/new.git", note: "修改地址（如 https 换 ssh）" },
          { code: "git remote remove origin" },
        ],
        tags: ["远程", "remote", "origin"],
      },
      {
        name: "git fetch",
        desc: "拉取远程更新但不合并到工作区",
        examples: [
          { code: "git fetch" },
          { code: "git fetch --prune", note: "同时清理远程已删除的分支引用" },
          { code: "git fetch origin dev:dev", note: "拉取远程 dev 到本地 dev" },
        ],
        options: [
          { flag: "--prune", desc: "删除失效的远程跟踪分支" },
          { flag: "--all", desc: "拉取所有远程" },
        ],
        tags: ["拉取", "fetch", "同步"],
      },
      {
        name: "git pull",
        desc: "拉取远程更新并合并到当前分支",
        examples: [
          { code: "git pull" },
          { code: "git pull --rebase", note: "用变基代替合并，历史更干净（推荐）" },
        ],
        options: [
          { flag: "--rebase", desc: "以 rebase 方式整合" },
          { flag: "--ff-only", desc: "只允许快进，有分叉就报错" },
        ],
        tip: "设置默认行为：git config --global pull.rebase true",
        tags: ["拉取", "pull", "更新"],
      },
      {
        name: "git push",
        desc: "把本地提交推送到远程",
        examples: [
          { code: "git push -u origin main", note: "首次推送并建立跟踪关系" },
          { code: "git push", note: "之后直接推当前分支" },
          { code: "git push origin --delete feature/old", note: "删除远程分支" },
          { code: "git push --tags", note: "推送所有标签" },
        ],
        options: [
          { flag: "-u", desc: "设置上游分支" },
          { flag: "-f / --force-with-lease", desc: "强制推送，后者更安全" },
          { flag: "--delete", desc: "删除远程分支" },
        ],
        danger: true,
        tip: "优先用 --force-with-lease 而不是 -f：远程有新提交时会拒绝，避免覆盖他人代码。",
        tags: ["推送", "push", "强制推送"],
      },
    ],
  },
  {
    title: "撤销与回滚",
    items: [
      {
        name: "git restore",
        desc: "撤销工作区或暂存区的改动（推荐的现代写法）",
        examples: [
          { code: "git restore src/App.tsx", note: "丢弃工作区改动，回到暂存区版本" },
          { code: "git restore --staged src/App.tsx", note: "把文件移出暂存区，改动保留" },
          { code: "git restore --source=HEAD~1 src/App.tsx", note: "恢复到上一次提交的版本" },
          { code: "git restore .", note: "丢弃全部未暂存改动" },
        ],
        danger: true,
        tags: ["撤销", "还原", "restore"],
      },
      {
        name: "git reset",
        desc: "移动分支指针，回退提交记录",
        examples: [
          { code: "git reset --soft HEAD~1", note: "撤销最后一次提交，改动留在暂存区" },
          { code: "git reset HEAD~1", note: "撤销提交并取消暂存，改动留在工作区" },
          { code: "git reset --hard HEAD~1", note: "彻底回退，丢弃所有改动" },
          { code: "git reset --hard origin/main", note: "本地强行与远程一致" },
        ],
        options: [
          { flag: "--soft", desc: "只移动 HEAD，保留暂存" },
          { flag: "--mixed", desc: "默认，保留工作区改动" },
          { flag: "--hard", desc: "丢弃所有改动" },
        ],
        danger: true,
        tip: "误操作 --hard 后可用 git reflog 找到原提交再 reset 回去。",
        tags: ["回退", "reset", "撤销提交"],
      },
      {
        name: "git revert",
        desc: "生成一条反向提交来抵消某次提交（安全，不改历史）",
        examples: [
          { code: "git revert a1b2c3d" },
          { code: "git revert HEAD~3..HEAD", note: "撤销最近三次提交" },
          { code: "git revert -m 1 <merge-commit>", note: "撤销一次合并提交" },
        ],
        tags: ["反做", "revert", "安全回滚"],
      },
      {
        name: "git reflog",
        desc: "查看 HEAD 的移动记录，找回丢失的提交",
        examples: [
          { code: "git reflog" },
          { code: "git reset --hard HEAD@{3}", note: "回到 reflog 中的某个状态" },
        ],
        tip: "只要提交过，即使分支被删也能在 reflog 里找回来（默认保留 90 天）。",
        tags: ["找回", "reflog", "救命"],
      },
      {
        name: "git clean",
        desc: "删除未被跟踪的文件",
        examples: [
          { code: "git clean -n", note: "先预览要删什么" },
          { code: "git clean -fd", note: "删除未跟踪的文件和目录" },
          { code: "git clean -fdx", note: "连 .gitignore 忽略的文件一起删" },
        ],
        options: [
          { flag: "-n", desc: "只预览不删除" },
          { flag: "-f", desc: "强制执行" },
          { flag: "-d", desc: "包含目录" },
          { flag: "-x", desc: "包含被忽略的文件" },
        ],
        danger: true,
        tip: "删除不进回收站，务必先执行 git clean -n 确认。",
        tags: ["清理", "clean", "未跟踪"],
      },
    ],
  },
  {
    title: "暂存与标签",
    items: [
      {
        name: "git stash",
        desc: "临时保存未提交的改动，腾出干净工作区",
        examples: [
          { code: 'git stash push -m "临时保存"', note: "保存并加备注" },
          { code: "git stash list", note: "查看所有暂存记录" },
          { code: "git stash pop", note: "恢复最近一次并删除记录" },
          { code: "git stash apply stash@{1}", note: "恢复指定记录但保留" },
          { code: "git stash drop stash@{0}", note: "删除某条记录" },
          { code: "git stash -u", note: "连同未跟踪文件一起暂存" },
        ],
        options: [
          { flag: "-u", desc: "包含未跟踪文件" },
          { flag: "-m", desc: "添加备注" },
          { flag: "pop / apply", desc: "恢复并删除 / 恢复但保留" },
        ],
        tags: ["暂存", "stash", "切换分支"],
      },
      {
        name: "git tag",
        desc: "给提交打标签，通常用于版本发布",
        examples: [
          { code: "git tag", note: "列出所有标签" },
          { code: 'git tag -a v1.0.0 -m "首个正式版"', note: "创建附注标签" },
          { code: "git tag v1.0.1 a1b2c3d", note: "给指定提交打轻量标签" },
          { code: "git push origin v1.0.0", note: "推送单个标签" },
          { code: "git tag -d v1.0.0 && git push origin :refs/tags/v1.0.0", note: "删除本地和远程标签" },
        ],
        tags: ["标签", "tag", "版本", "release"],
      },
      {
        name: "git archive",
        desc: "把指定版本导出为压缩包，不含 .git",
        examples: [
          { code: "git archive --format=zip --output=release.zip v1.0.0" },
          { code: "git archive HEAD | tar -x -C /tmp/export" },
        ],
        tags: ["导出", "打包", "archive"],
      },
    ],
  },
  {
    title: "排查与进阶",
    items: [
      {
        name: "git bisect",
        desc: "二分查找引入 bug 的那次提交",
        examples: [
          { code: "git bisect start\ngit bisect bad\ngit bisect good v1.0.0", note: "标记当前有问题、某版本正常，Git 会自动切到中间提交" },
          { code: "git bisect good   # 或 git bisect bad", note: "逐个标记，直到定位" },
          { code: "git bisect reset", note: "结束并回到原分支" },
        ],
        tags: ["排查", "bisect", "二分"],
      },
      {
        name: "git shortlog",
        desc: "按作者统计提交数量",
        examples: [
          { code: "git shortlog -sn --all" },
          { code: "git shortlog -sn --since=\"1 month ago\"" },
        ],
        tags: ["统计", "贡献者"],
      },
      {
        name: "git worktree",
        desc: "同一仓库同时检出多个分支到不同目录",
        examples: [
          { code: "git worktree add ../hotfix hotfix/v1.0.1", note: "在上级目录新建工作区" },
          { code: "git worktree list" },
          { code: "git worktree remove ../hotfix" },
        ],
        tip: "改紧急 bug 又不想 stash 当前工作时非常有用。",
        tags: ["多工作区", "worktree"],
      },
      {
        name: "git fsck / gc",
        desc: "仓库体检与垃圾回收",
        examples: [
          { code: "git fsck --lost-found", note: "查找悬空对象，可用于找回提交" },
          { code: "git gc --prune=now", note: "压缩对象库、清理无用对象" },
          { code: "git count-objects -vH", note: "查看仓库占用体积" },
        ],
        tags: ["修复", "体积", "gc"],
      },
    ],
  },
];

export default git;
