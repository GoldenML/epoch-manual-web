import type { CmdGroup } from "@/types/command";

const ssh: CmdGroup[] = [
  {
    title: "连接与密钥",
    items: [
      {
        name: "ssh 登录",
        desc: "连接远程主机",
        examples: [
          { code: "ssh root@192.168.1.10" },
          { code: "ssh -p 2222 deploy@example.com", note: "指定端口" },
          { code: "ssh -i ~/.ssh/id_ed25519 deploy@example.com", note: "指定私钥" },
          { code: "ssh -v deploy@example.com", note: "输出调试信息，排查连接失败" },
        ],
        options: [
          { flag: "-p", desc: "端口" },
          { flag: "-i", desc: "私钥文件" },
          { flag: "-v", desc: "调试模式" },
          { flag: "-o StrictHostKeyChecking=no", desc: "首次连接不询问指纹（脚本用）" },
        ],
        tags: ["连接", "登录", "ssh"],
      },
      {
        name: "ssh-keygen",
        desc: "生成 SSH 密钥对",
        examples: [
          { code: 'ssh-keygen -t ed25519 -C "you@example.com"', note: "推荐 ed25519，更短更安全" },
          { code: "ssh-keygen -t rsa -b 4096 -C \"you@example.com\"", note: "兼容老系统时用 rsa 4096" },
          { code: "ssh-keygen -p -f ~/.ssh/id_ed25519", note: "修改私钥密码" },
          { code: "ssh-keygen -lf ~/.ssh/id_ed25519.pub", note: "查看指纹" },
        ],
        tip: "私钥权限必须是 600，.ssh 目录 700，否则 ssh 会拒绝使用。",
        tags: ["密钥", "keygen", "公钥"],
      },
      {
        name: "ssh-copy-id",
        desc: "把公钥上传到远程实现免密登录",
        examples: [
          { code: "ssh-copy-id deploy@192.168.1.10" },
          { code: "ssh-copy-id -i ~/.ssh/id_ed25519.pub -p 2222 deploy@host" },
          { code: "ssh deploy@host \"mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys\" < ~/.ssh/id_ed25519.pub", note: "无 ssh-copy-id 时手动追加" },
        ],
        tags: ["免密", "公钥", "免密码"],
      },
      {
        name: "~/.ssh/config",
        desc: "配置主机别名，简化登录",
        examples: [
          {
            code: "Host prod\n    HostName 47.100.1.20\n    User deploy\n    Port 2222\n    IdentityFile ~/.ssh/id_ed25519\n    ServerAliveInterval 60\n\nHost *\n    ServerAliveInterval 60\n    ServerAliveCountMax 3",
            note: "之后直接 ssh prod 即可",
          },
          { code: "chmod 600 ~/.ssh/config", note: "权限过宽会被忽略" },
        ],
        tags: ["别名", "config", "保持连接"],
      },
      {
        name: "authorized_keys 权限修复",
        desc: "免密登录失败的经典权限问题",
        examples: [
          { code: "chmod 700 ~/.ssh" },
          { code: "chmod 600 ~/.ssh/authorized_keys" },
          { code: "chown -R $USER:$USER ~/.ssh" },
          { code: "restorecon -Rv ~/.ssh", note: "CentOS 上 SELinux 上下文也要正确" },
        ],
        tip: "还有 sshd 配置：PubkeyAuthentication yes、AuthorizedKeysFile .ssh/authorized_keys。",
        tags: ["权限", "免密失败", "排查"],
      },
    ],
  },
  {
    title: "文件传输",
    items: [
      {
        name: "scp",
        desc: "基于 SSH 的简单文件复制",
        examples: [
          { code: "scp file.txt deploy@host:/data/", note: "上传" },
          { code: "scp -r dist/ deploy@host:/var/www/", note: "递归上传目录" },
          { code: "scp deploy@host:/var/log/app.log ./", note: "下载" },
          { code: "scp -P 2222 file.txt deploy@host:/data/", note: "大写 P 指定端口" },
        ],
        options: [
          { flag: "-r", desc: "递归目录" },
          { flag: "-P", desc: "端口（注意大写）" },
          { flag: "-C", desc: "传输时压缩" },
        ],
        tags: ["传输", "scp", "上传"],
      },
      {
        name: "rsync",
        desc: "增量同步，适合大量文件与部署",
        examples: [
          { code: "rsync -avz --progress dist/ deploy@host:/var/www/dist/", note: "常用组合：归档+详细+压缩" },
          { code: "rsync -avz --delete dist/ deploy@host:/var/www/dist/", note: "删除目标端多余文件，保持完全一致" },
          { code: "rsync -avz -e \"ssh -p 2222\" dist/ deploy@host:/data/", note: "指定 SSH 端口" },
          { code: "rsync -avz --exclude 'node_modules' --exclude '.git' ./ deploy@host:/app/", note: "排除目录" },
          { code: "rsync -avz --dry-run dist/ deploy@host:/data/", note: "演练，不实际传输" },
        ],
        options: [
          { flag: "-a", desc: "归档模式（保留权限时间）" },
          { flag: "-v", desc: "显示过程" },
          { flag: "-z", desc: "传输压缩" },
          { flag: "--delete", desc: "删除目标端多余文件" },
          { flag: "--dry-run", desc: "只演练" },
        ],
        danger: true,
        tip: "源路径末尾的 / 很关键：dist/ 表示同步目录内容，dist 表示同步目录本身。",
        tags: ["同步", "rsync", "部署"],
      },
      {
        name: "sftp / sz rz",
        desc: "交互式传输与小文件上传",
        examples: [
          { code: "sftp deploy@host", note: "进入后 put/get/ls/cd" },
          { code: "sz app.log", note: "把服务器文件下载到本地（需 lrzsz）" },
          { code: "rz", note: "上传本地文件到服务器" },
        ],
        tags: ["sftp", "上传下载", "lrzsz"],
      },
    ],
  },
  {
    title: "隧道与端口转发",
    items: [
      {
        name: "本地端口转发",
        desc: "把远程端口映射到本地",
        examples: [
          { code: "ssh -L 3307:127.0.0.1:3306 deploy@db-host", note: "本地 3307 转发到远程的 3306" },
          { code: "ssh -L 8080:internal-api:80 -N -f deploy@gateway", note: "通过跳板访问内网服务，-N 不执行命令，-f 后台" },
        ],
        tags: ["隧道", "转发", "跳板"],
      },
      {
        name: "远程端口转发",
        desc: "把本地服务暴露到远程",
        examples: [
          { code: "ssh -R 9000:127.0.0.1:3000 user@public-host", note: "公网主机 9000 → 本地 3000" },
          { code: "ssh -R 0:127.0.0.1:3000 user@public-host", note: "由服务端分配随机端口" },
        ],
        tip: "需要在服务端 sshd_config 中开启 GatewayPorts 才能对外网开放。",
        tags: ["内网穿透", "远程转发"],
      },
      {
        name: "动态代理",
        desc: "把 SSH 当 SOCKS5 代理用",
        examples: [
          { code: "ssh -D 1080 -N -f user@host", note: "本地 1080 提供 SOCKS5" },
        ],
        tags: ["代理", "socks5"],
      },
      {
        name: "跳板机",
        desc: "通过跳板连接内网主机",
        examples: [
          { code: "ssh -J jump@1.2.3.4 deploy@10.0.0.8", note: "OpenSSH 7.3+ 支持" },
          { code: "Host inner\n    HostName 10.0.0.8\n    User deploy\n    ProxyJump jump", note: "写进 config 更常用" },
        ],
        tags: ["跳板", "proxyjump", "内网"],
      },
    ],
  },
  {
    title: "服务端配置",
    items: [
      {
        name: "sshd_config 关键项",
        desc: "安全加固常用配置",
        examples: [
          { code: "Port 2222", note: "改默认端口，减少扫描" },
          { code: "PermitRootLogin no", note: "禁止 root 直接登录" },
          { code: "PasswordAuthentication no", note: "只允许密钥登录" },
          { code: "PubkeyAuthentication yes" },
          { code: "AllowUsers deploy", note: "白名单用户" },
          { code: "systemctl restart sshd", note: "改完先 nginx -t 同理：先 sshd -t 检查再重启" },
        ],
        danger: true,
        tip: "改 sshd 配置前保持一个已登录会话不要断开，验证新连接成功后再退出，否则可能锁死。",
        tags: ["sshd", "安全", "配置"],
      },
      {
        name: "端口占用与登录审计",
        desc: "排查谁在登录、连了什么",
        examples: [
          { code: "ss -tunlp | grep sshd" },
          { code: "last -n 20", note: "最近登录记录" },
          { code: "lastb -n 20", note: "失败登录记录" },
          { code: "w", note: "当前在线用户及其操作" },
          { code: "grep 'Failed password' /var/log/secure | tail", note: "CentOS 暴力破解记录" },
        ],
        tags: ["审计", "登录", "安全"],
      },
    ],
  },
];

export default ssh;
