import type { CmdGroup } from "@/types/command";

const linux: CmdGroup[] = [
  {
    title: "文件与目录",
    items: [
      {
        name: "ls",
        desc: "列出目录内容",
        examples: [
          { code: "ls -lah", note: "含隐藏文件、人类可读大小" },
          { code: "ls -lt", note: "按修改时间倒序" },
          { code: "ls -lhS | head -10", note: "找出最大的 10 个文件" },
        ],
        options: [
          { flag: "-l", desc: "长格式（权限、属主、大小、时间）" },
          { flag: "-a", desc: "显示隐藏文件" },
          { flag: "-h", desc: "大小人类可读（K/M/G）" },
          { flag: "-t", desc: "按修改时间排序" },
          { flag: "-R", desc: "递归列出子目录" },
        ],
        tags: ["查看", "目录", "列表"],
      },
      {
        name: "cd / pwd",
        desc: "切换目录与显示当前路径",
        examples: [
          { code: "cd /var/log" },
          { code: "cd ~", note: "回到家目录" },
          { code: "cd -", note: "回到上一个目录" },
          { code: "cd ..", note: "上级目录" },
          { code: "pwd", note: "打印当前绝对路径" },
        ],
        tags: ["目录", "切换", "路径"],
      },
      {
        name: "mkdir",
        desc: "创建目录",
        examples: [
          { code: "mkdir mydir" },
          { code: "mkdir -p /data/app/logs", note: "递归创建多级目录，已存在不报错" },
          { code: 'mkdir -p dir/{a,b,c}', note: "批量创建同级目录" },
        ],
        options: [
          { flag: "-p", desc: "递归创建父目录" },
          { flag: "-m 755", desc: "同时指定权限" },
        ],
        tags: ["新建", "目录"],
      },
      {
        name: "cp",
        desc: "复制文件或目录",
        examples: [
          { code: "cp a.txt b.txt" },
          { code: "cp -r src/ backup/", note: "递归复制目录" },
          { code: "cp -a /data/ /backup/", note: "保留权限、时间、链接等属性" },
          { code: "cp -i a.txt b.txt", note: "覆盖前询问" },
        ],
        options: [
          { flag: "-r / -R", desc: "递归复制目录" },
          { flag: "-a", desc: "归档模式，保留全部属性" },
          { flag: "-i", desc: "覆盖前提示" },
          { flag: "-u", desc: "只复制比目标新的文件" },
        ],
        tags: ["复制", "copy"],
      },
      {
        name: "mv",
        desc: "移动或重命名文件",
        examples: [
          { code: "mv old.txt new.txt", note: "重命名" },
          { code: "mv *.log /var/log/archive/", note: "移动多个文件" },
          { code: "mv -i a.txt b.txt", note: "覆盖前确认" },
        ],
        tags: ["移动", "重命名"],
      },
      {
        name: "rm",
        desc: "删除文件或目录（不可恢复）",
        examples: [
          { code: "rm file.txt" },
          { code: "rm -rf node_modules", note: "递归强制删除目录" },
          { code: "rm -i *.log", note: "逐个确认删除" },
        ],
        options: [
          { flag: "-r", desc: "递归删除目录" },
          { flag: "-f", desc: "强制，不提示" },
          { flag: "-i", desc: "删除前询问" },
        ],
        danger: true,
        tip: "永远不要执行 rm -rf / 或带空变量的 rm -rf $DIR/。删除前可用 ls 同参数先确认匹配范围。",
        tags: ["删除", "rm", "危险"],
      },
      {
        name: "find",
        desc: "按条件查找文件并执行操作",
        examples: [
          { code: "find /var/log -name \"*.log\"", note: "按名称查找" },
          { code: "find . -type f -size +100M", note: "找出大于 100M 的文件" },
          { code: "find . -name \"*.log\" -mtime +7 -delete", note: "删除 7 天前的日志" },
          { code: "find . -name \"*.js\" -exec grep -l \"TODO\" {} \\;", note: "对结果执行命令" },
          { code: "find . -type f -newermt \"2026-01-01\"", note: "按时间查找" },
        ],
        options: [
          { flag: "-type f/d", desc: "文件 / 目录" },
          { flag: "-name", desc: "按名称匹配（区分大小写）" },
          { flag: "-iname", desc: "忽略大小写" },
          { flag: "-size +100M", desc: "按大小" },
          { flag: "-mtime +7", desc: "按修改天数" },
          { flag: "-exec ... \\;", desc: "对每个结果执行命令" },
        ],
        tags: ["查找", "find", "批量"],
      },
      {
        name: "ln",
        desc: "创建软链接或硬链接",
        examples: [
          { code: "ln -s /opt/app/current /opt/app/v1.2.0", note: "创建软链接（推荐用绝对路径）" },
          { code: "ln -sfn /opt/app/v1.3.0 /opt/app/current", note: "更新软链接指向" },
          { code: "ln file.txt hard.txt", note: "创建硬链接" },
        ],
        options: [
          { flag: "-s", desc: "软链接（符号链接）" },
          { flag: "-f", desc: "强制覆盖已存在的链接" },
          { flag: "-n", desc: "把链接本身当普通文件处理" },
        ],
        tags: ["链接", "软链", "symlink"],
      },
      {
        name: "stat / touch",
        desc: "查看文件元信息 / 修改时间戳",
        examples: [
          { code: "stat file.txt", note: "查看大小、权限、访问/修改时间" },
          { code: "touch new.txt", note: "创建空文件" },
          { code: "touch -d \"2026-01-01 10:00\" file.txt", note: "修改时间戳" },
        ],
        tags: ["元信息", "时间戳"],
      },
    ],
  },
  {
    title: "文本查看与处理",
    items: [
      {
        name: "cat / less",
        desc: "查看文件内容",
        examples: [
          { code: "cat file.txt" },
          { code: "cat -n file.txt", note: "带行号" },
          { code: "less /var/log/syslog", note: "分页查看大文件，q 退出，/ 搜索" },
        ],
        tags: ["查看", "文本"],
      },
      {
        name: "head / tail",
        desc: "查看文件头尾，实时跟踪日志",
        examples: [
          { code: "head -n 20 file.log" },
          { code: "tail -n 100 file.log", note: "最后 100 行" },
          { code: "tail -f /var/log/nginx/access.log", note: "实时跟踪新增内容" },
          { code: "tail -f app.log | grep -i error", note: "只看错误日志" },
        ],
        options: [
          { flag: "-n <N>", desc: "行数" },
          { flag: "-f", desc: "跟随文件增长" },
          { flag: "-F", desc: "文件被切割/重建后仍能跟随（日志轮转场景用这个）" },
        ],
        tags: ["日志", "tail", "实时"],
      },
      {
        name: "grep",
        desc: "按正则搜索文本内容",
        examples: [
          { code: "grep -rn \"TODO\" src/", note: "递归搜索并显示行号" },
          { code: "grep -i \"error\" app.log", note: "忽略大小写" },
          { code: "grep -v \"^#\" nginx.conf", note: "排除注释行" },
          { code: "grep -C 3 \"Exception\" app.log", note: "显示匹配行前后 3 行" },
          { code: "grep -c \"500\" access.log", note: "统计匹配行数" },
        ],
        options: [
          { flag: "-r", desc: "递归目录" },
          { flag: "-n", desc: "显示行号" },
          { flag: "-i", desc: "忽略大小写" },
          { flag: "-v", desc: "反向匹配" },
          { flag: "-C <N>", desc: "上下文行数" },
          { flag: "-E", desc: "使用扩展正则" },
        ],
        tags: ["搜索", "grep", "过滤"],
      },
      {
        name: "sed",
        desc: "流式文本替换与编辑",
        examples: [
          { code: "sed -n '10,20p' file.txt", note: "打印 10-20 行" },
          { code: "sed -i 's/old/new/g' config.txt", note: "原地全局替换" },
          { code: "sed -i.bak 's/8080/9090/g' nginx.conf", note: "替换并保留 .bak 备份" },
          { code: "sed -i '/^$/d' file.txt", note: "删除空行" },
        ],
        options: [
          { flag: "-i", desc: "直接修改文件" },
          { flag: "-n", desc: "不自动打印，配合 p 使用" },
          { flag: "s/a/b/g", desc: "替换全部匹配" },
        ],
        danger: true,
        tip: "Linux 的 sed -i 与 macOS 不同，macOS 需要 sed -i '' 's/a/b/g'。",
        tags: ["替换", "sed", "编辑"],
      },
      {
        name: "awk",
        desc: "按列处理文本，适合提取日志字段",
        examples: [
          { code: "awk '{print $1, $4}' access.log", note: "打印第 1、4 列" },
          { code: "awk -F: '{print $1}' /etc/passwd", note: "指定分隔符" },
          { code: "awk '$9 == 500 {print $7}' access.log | sort | uniq -c", note: "统计 500 错误的 URL" },
          { code: "awk '{sum+=$1} END {print sum}' nums.txt", note: "求和" },
        ],
        options: [
          { flag: "-F", desc: "指定分隔符" },
          { flag: "-v", desc: "传入变量" },
        ],
        tags: ["列处理", "awk", "统计"],
      },
      {
        name: "sort / uniq / wc",
        desc: "排序、去重、统计",
        examples: [
          { code: "sort file.txt | uniq -c | sort -rn | head -10", note: "出现频率 Top10" },
          { code: "sort -t. -k3,3n ip.txt", note: "按第三段数字排序" },
          { code: "wc -l file.txt", note: "行数" },
          { code: "cat *.log | wc -l", note: "统计总行数" },
        ],
        tags: ["排序", "去重", "统计"],
      },
      {
        name: "cut / tr / tee",
        desc: "截取列、字符转换、分流输出",
        examples: [
          { code: "cut -d: -f1 /etc/passwd", note: "取第一列" },
          { code: "echo \"abc\" | tr 'a-z' 'A-Z'", note: "转大写" },
          { code: "cat app.log | tee -a backup.log | grep ERROR", note: "同时输出到文件与终端" },
        ],
        tags: ["截取", "管道", "tee"],
      },
      {
        name: "diff",
        desc: "比较两个文件或目录的差异",
        examples: [
          { code: "diff -u a.conf b.conf", note: "统一格式输出，可当补丁" },
          { code: "diff -r dir1 dir2", note: "递归比较目录" },
          { code: "diff -y --suppress-common-lines a b", note: "并排显示差异" },
        ],
        tags: ["对比", "diff", "配置"],
      },
    ],
  },
  {
    title: "权限与用户",
    items: [
      {
        name: "chmod",
        desc: "修改文件权限",
        examples: [
          { code: "chmod 755 run.sh", note: "属主可读写执行，其他可读执行" },
          { code: "chmod +x deploy.sh", note: "添加执行权限" },
          { code: "chmod -R 644 /var/www/html", note: "递归设置文件权限" },
          { code: "chmod u+w,g-w file.txt", note: "符号模式：属主加写、组去写" },
        ],
        options: [
          { flag: "755", desc: "rwxr-xr-x，目录/脚本常用" },
          { flag: "644", desc: "rw-r--r--，普通文件常用" },
          { flag: "600", desc: "rw-------，私钥必须" },
        ],
        tags: ["权限", "chmod", "755"],
      },
      {
        name: "chown / chgrp",
        desc: "修改文件属主与属组",
        examples: [
          { code: "chown nginx:nginx index.html" },
          { code: "chown -R www:www /data/wwwroot", note: "递归修改" },
          { code: "chgrp dev report.txt" },
        ],
        options: [
          { flag: "-R", desc: "递归" },
          { flag: "-h", desc: "只改软链接本身" },
        ],
        tags: ["属主", "chown", "用户组"],
      },
      {
        name: "useradd / passwd",
        desc: "创建用户、设置密码",
        examples: [
          { code: "useradd -m -s /bin/bash deploy", note: "创建用户并生成家目录" },
          { code: "passwd deploy", note: "设置密码" },
          { code: "usermod -aG docker deploy", note: "追加到 docker 组（需重新登录生效）" },
          { code: "userdel -r olduser", note: "删除用户及其家目录" },
        ],
        options: [
          { flag: "-m", desc: "创建家目录" },
          { flag: "-s", desc: "指定登录 shell" },
          { flag: "-aG", desc: "追加附加组" },
        ],
        tags: ["用户", "useradd", "密码"],
      },
      {
        name: "id / groups / whoami",
        desc: "查看当前用户与所属组",
        examples: [
          { code: "id" },
          { code: "groups deploy" },
          { code: "whoami" },
          { code: "who", note: "当前登录的所有用户" },
        ],
        tags: ["用户", "身份", "组"],
      },
      {
        name: "sudo / su",
        desc: "以其他用户（默认 root）身份执行命令",
        examples: [
          { code: "sudo systemctl restart nginx" },
          { code: "sudo -i", note: "切换到 root 交互 shell" },
          { code: "su - deploy", note: "切换到 deploy 用户并加载其环境" },
          { code: "sudo -u www data/script.sh", note: "以 www 用户执行" },
        ],
        danger: true,
        tags: ["提权", "sudo", "root"],
      },
      {
        name: "umask",
        desc: "查看或设置新建文件的默认权限掩码",
        examples: [
          { code: "umask", note: "常见输出 0022" },
          { code: "umask 027", note: "新文件 640，新目录 750" },
        ],
        tags: ["默认权限", "umask"],
      },
    ],
  },
  {
    title: "进程与资源",
    items: [
      {
        name: "ps",
        desc: "查看进程快照",
        examples: [
          { code: "ps aux | grep nginx" },
          { code: "ps -ef | grep java" },
          { code: "ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu | head", note: "按 CPU 占用排序" },
        ],
        options: [
          { flag: "aux", desc: "BSD 风格，显示全部进程" },
          { flag: "-ef", desc: "System V 风格，含父进程" },
          { flag: "--sort=-%cpu", desc: "按 CPU 排序" },
        ],
        tags: ["进程", "ps", "排查"],
      },
      {
        name: "top / htop",
        desc: "实时监控 CPU、内存和进程",
        examples: [
          { code: "top", note: "按 P 按 CPU 排序，M 按内存排序，q 退出" },
          { code: "top -b -n 1 | head -20", note: "批处理模式，适合脚本采集" },
          { code: "htop", note: "更友好的交互界面，需额外安装" },
        ],
        tags: ["监控", "top", "CPU"],
      },
      {
        name: "kill",
        desc: "向进程发送信号，常用于结束进程",
        examples: [
          { code: "kill 12345", note: "发送 TERM(15)，优雅退出" },
          { code: "kill -9 12345", note: "强制杀死，无法被捕获" },
          { code: "pkill -f \"node server.js\"", note: "按命令行匹配杀进程" },
          { code: "killall nginx", note: "按进程名杀死全部" },
        ],
        options: [
          { flag: "-15 (TERM)", desc: "默认，优雅终止" },
          { flag: "-9 (KILL)", desc: "强制终止" },
          { flag: "-1 (HUP)", desc: "重载配置" },
        ],
        danger: true,
        tip: "先用 kill 15 给进程收尾机会，等几秒不退再用 -9。",
        tags: ["杀进程", "kill", "信号"],
      },
      {
        name: "lsof",
        desc: "列出进程打开的文件与端口占用",
        examples: [
          { code: "lsof -i:8080", note: "谁占用了 8080 端口" },
          { code: "lsof -p 12345", note: "某进程打开了哪些文件" },
          { code: "lsof +D /data", note: "哪个进程在用这个目录" },
          { code: "lsof -u deploy", note: "某用户打开的文件" },
        ],
        tags: ["端口占用", "lsof", "文件句柄"],
      },
      {
        name: "free",
        desc: "查看内存使用情况",
        examples: [
          { code: "free -h" },
          { code: "free -h -s 2", note: "每 2 秒刷新" },
        ],
        tip: "关注 available 而不是 free，buff/cache 可被回收。",
        tags: ["内存", "free"],
      },
      {
        name: "df / du",
        desc: "查看磁盘空间与目录占用",
        examples: [
          { code: "df -h", note: "各分区使用率" },
          { code: "df -i", note: "inode 使用率（磁盘未满但写不进文件时查这个）" },
          { code: "du -sh /var/log", note: "目录总大小" },
          { code: "du -h --max-depth=1 / | sort -hr | head", note: "找出最占空间的目录" },
        ],
        options: [
          { flag: "-h", desc: "人类可读" },
          { flag: "-s", desc: "只显示总计" },
          { flag: "--max-depth=1", desc: "统计深度" },
        ],
        tags: ["磁盘", "df", "du", "空间"],
      },
      {
        name: "uptime / vmstat / iostat",
        desc: "系统负载与 IO 性能",
        examples: [
          { code: "uptime", note: "1/5/15 分钟平均负载" },
          { code: "vmstat 1 5", note: "每秒采样 5 次，看 r/b/si/so 列" },
          { code: "iostat -x 1", note: "磁盘 IO 详细指标" },
        ],
        tip: "负载值长期高于 CPU 核数，说明有大量进程排队。",
        tags: ["负载", "性能", "IO"],
      },
      {
        name: "nohup / &",
        desc: "让命令在后台运行并在退出终端后存活",
        examples: [
          { code: "nohup node server.js > app.log 2>&1 &" },
          { code: "disown -h %1", note: "让已在后台的任务忽略挂断信号" },
          { code: "jobs / fg %1 / bg %1", note: "查看、调回前台、转后台" },
        ],
        tags: ["后台", "nohup", "守护"],
      },
    ],
  },
  {
    title: "打包与压缩",
    items: [
      {
        name: "tar",
        desc: "打包与解包，Linux 下最常用",
        examples: [
          { code: "tar -czvf dist.tar.gz dist/", note: "打包并 gzip 压缩" },
          { code: "tar -xzvf dist.tar.gz", note: "解压到当前目录" },
          { code: "tar -xzvf dist.tar.gz -C /opt/", note: "解压到指定目录" },
          { code: "tar -tzvf dist.tar.gz", note: "只查看内容不解压" },
          { code: "tar -czvf logs.tar.gz --exclude='*.tmp' logs/", note: "排除某些文件" },
        ],
        options: [
          { flag: "-c", desc: "创建归档" },
          { flag: "-x", desc: "解压" },
          { flag: "-z", desc: "gzip 压缩" },
          { flag: "-j", desc: "bzip2 压缩" },
          { flag: "-v", desc: "显示过程" },
          { flag: "-f", desc: "指定文件名（必须紧跟文件名）" },
          { flag: "-C", desc: "指定解压目录" },
        ],
        tags: ["压缩", "tar", "打包"],
      },
      {
        name: "zip / unzip",
        desc: "跨平台压缩格式",
        examples: [
          { code: "zip -r site.zip site/", note: "递归压缩目录" },
          { code: "unzip site.zip -d /var/www/", note: "解压到指定目录" },
          { code: "unzip -l site.zip", note: "查看内容" },
        ],
        tags: ["zip", "压缩", "解压"],
      },
      {
        name: "gzip / xz",
        desc: "单文件压缩",
        examples: [
          { code: "gzip -k app.log", note: "压缩并保留原文件" },
          { code: "gzip -d app.log.gz", note: "解压" },
          { code: "xz -9 -k bigfile.sql", note: "最高压缩率" },
        ],
        tags: ["gzip", "压缩"],
      },
    ],
  },
  {
    title: "会话与环境",
    items: [
      {
        name: "tmux",
        desc: "终端复用，断线后任务继续跑",
        examples: [
          { code: "tmux new -s work", note: "创建名为 work 的会话" },
          { code: "tmux ls", note: "列出会话" },
          { code: "tmux attach -t work", note: "重新接入" },
          { code: "tmux kill-session -t work", note: "结束会话" },
        ],
        tip: "默认前缀键 Ctrl+b：d 分离、c 新建窗口、n/p 切窗口、% 竖分屏、\" 横分屏、[ 进入翻页模式。",
        tags: ["tmux", "会话", "分屏"],
      },
      {
        name: "export / source",
        desc: "设置环境变量与重新加载配置",
        examples: [
          { code: "export NODE_ENV=production" },
          { code: 'export PATH="$PATH:/usr/local/go/bin"', note: "追加 PATH" },
          { code: "source ~/.bashrc", note: "让配置立即生效（同 . ~/.bashrc）" },
          { code: "env | grep -i proxy", note: "查看当前环境变量" },
        ],
        tip: "写在 ~/.bashrc 只对当前用户生效；/etc/profile 对所有用户生效；/etc/environment 由 PAM 读取。",
        tags: ["环境变量", "export", "PATH"],
      },
      {
        name: "alias",
        desc: "设置命令别名",
        examples: [
          { code: 'alias ll="ls -alF"' },
          { code: "alias gs=\"git status -sb\"" },
          { code: "unalias ll", note: "取消别名" },
        ],
        tip: "永久生效需写入 ~/.bashrc 或 ~/.zshrc，然后 source。",
        tags: ["别名", "快捷"],
      },
      {
        name: "crontab",
        desc: "定时任务",
        examples: [
          { code: "crontab -l", note: "查看当前用户的任务" },
          { code: "crontab -e", note: "编辑任务" },
          { code: "0 3 * * * /opt/backup.sh >> /var/log/backup.log 2>&1", note: "每天 3 点执行并记录日志" },
          { code: "*/5 * * * * curl -s http://localhost/health", note: "每 5 分钟一次" },
        ],
        tip: "cron 环境变量极少，脚本里用绝对路径；记得重定向输出，否则报错会发邮件。",
        tags: ["定时", "cron", "任务"],
      },
      {
        name: "history",
        desc: "查看与复用历史命令",
        examples: [
          { code: "history | tail -20" },
          { code: "history | grep ssh", note: "搜索历史" },
          { code: "!1024", note: "执行第 1024 条" },
          { code: "!!", note: "重复上一条命令" },
          { code: "sudo !!", note: "用 sudo 重跑上一条" },
        ],
        tags: ["历史", "history"],
      },
    ],
  },
];

export default linux;
