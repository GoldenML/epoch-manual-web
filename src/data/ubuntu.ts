import type { CmdGroup } from "@/types/command";

const ubuntu: CmdGroup[] = [
  {
    title: "包管理：apt",
    items: [
      {
        name: "apt update / upgrade",
        desc: "更新软件源索引并升级已安装的包",
        examples: [
          { code: "apt update", note: "刷新源索引（不升级任何包）" },
          { code: "apt upgrade -y", note: "升级已安装的包（不删包）" },
          { code: "apt full-upgrade -y", note: "允许为解决依赖而卸载包" },
          { code: "apt list --upgradable", note: "查看可升级列表" },
        ],
        danger: true,
        tags: ["更新", "升级", "apt"],
      },
      {
        name: "apt install",
        desc: "安装软件包",
        examples: [
          { code: "apt install -y nginx" },
          { code: "apt install -y --no-install-recommends curl", note: "不装推荐依赖，镜像更小" },
          { code: "apt install -y ./app.deb", note: "安装本地 deb（自动解决依赖）" },
          { code: "apt install -y nginx=1.24.0-1", note: "安装指定版本" },
        ],
        options: [
          { flag: "-y", desc: "自动确认" },
          { flag: "--no-install-recommends", desc: "不安装推荐包" },
          { flag: "--reinstall", desc: "重装" },
        ],
        tags: ["安装", "apt"],
      },
      {
        name: "apt remove / purge",
        desc: "卸载软件包",
        examples: [
          { code: "apt remove -y nginx", note: "卸载但保留配置文件" },
          { code: "apt purge -y nginx", note: "连配置文件一起删除" },
          { code: "apt autoremove -y", note: "清理不再需要的依赖" },
          { code: "apt clean", note: "清理 /var/cache/apt 缓存" },
        ],
        danger: true,
        tags: ["卸载", "purge", "清理"],
      },
      {
        name: "apt search / show",
        desc: "搜索与查看包信息",
        examples: [
          { code: "apt search nginx" },
          { code: "apt show nginx", note: "版本、依赖、描述" },
          { code: "apt list --installed | grep nginx" },
          { code: "dpkg -S /usr/sbin/nginx", note: "查文件属于哪个包" },
          { code: "apt-cache policy nginx", note: "查看可用版本与来源" },
        ],
        tags: ["搜索", "查询", "dpkg"],
      },
      {
        name: "add-apt-repository",
        desc: "添加第三方 APT 源",
        examples: [
          { code: "apt install -y software-properties-common" },
          { code: "add-apt-repository -y ppa:ondrej/php" },
          { code: "add-apt-repository --remove ppa:ondrej/php", note: "移除源" },
          { code: "add-apt-repository -y \"deb [arch=amd64] https://download.docker.com/linux/ubuntu jammy stable\"" },
        ],
        tags: ["源", "ppa", "仓库"],
      },
      {
        name: "dpkg",
        desc: "底层 deb 包操作",
        examples: [
          { code: "dpkg -i app.deb", note: "安装（不解决依赖，缺依赖用 apt -f install 修复）" },
          { code: "apt install -f", note: "修复依赖" },
          { code: "dpkg -l | grep nginx", note: "列出已安装" },
          { code: "dpkg -L nginx", note: "包安装了哪些文件" },
          { code: "dpkg -r nginx", note: "卸载" },
        ],
        tags: ["deb", "dpkg", "依赖"],
      },
      {
        name: "update-alternatives",
        desc: "管理同一命令的多版本（如 python、java）",
        examples: [
          { code: "update-alternatives --config java", note: "交互切换默认版本" },
          { code: "update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.11 1" },
          { code: "update-alternatives --list java" },
        ],
        tags: ["多版本", "切换", "java"],
      },
    ],
  },
  {
    title: "防火墙：ufw",
    items: [
      {
        name: "ufw 基本操作",
        desc: "Ubuntu 默认的简化防火墙",
        examples: [
          { code: "ufw status verbose", note: "查看状态与规则" },
          { code: "ufw allow 22/tcp", note: "开放 SSH（务必先放行再启用）" },
          { code: "ufw allow 80,443/tcp", note: "开放多个端口" },
          { code: "ufw allow from 10.0.0.0/8 to any port 3306", note: "只允许内网访问数据库" },
          { code: "ufw delete allow 8080/tcp", note: "删除规则" },
          { code: "ufw enable / disable", note: "启用 / 关闭" },
        ],
        danger: true,
        tip: "远程服务器启用 ufw 前一定要先 allow 22/tcp，否则会把自己关在门外。",
        tags: ["防火墙", "ufw", "端口"],
      },
      {
        name: "ufw 规则管理",
        desc: "查看编号并删除规则",
        examples: [
          { code: "ufw status numbered", note: "带编号显示" },
          { code: "ufw delete 3", note: "按编号删除" },
          { code: "ufw reset", note: "重置所有规则（会断开连接）" },
        ],
        tags: ["规则", "删除"],
      },
    ],
  },
  {
    title: "网络：netplan",
    items: [
      {
        name: "netplan 配置静态 IP",
        desc: "Ubuntu 17.10+ 的网络配置方式（YAML）",
        examples: [
          { code: "ls /etc/netplan/", note: "查看配置文件" },
          {
            code: "network:\n  version: 2\n  ethernets:\n    ens33:\n      dhcp4: false\n      addresses: [192.168.1.10/24]\n      routes:\n        - to: default\n          via: 192.168.1.1\n      nameservers:\n        addresses: [8.8.8.8, 114.114.114.114]",
            note: "写入 /etc/netplan/01-netcfg.yaml",
          },
          { code: "netplan try", note: "试运行，60 秒内无确认自动回滚（远程操作更安全）" },
          { code: "netplan apply", note: "应用配置" },
        ],
        danger: true,
        tip: "YAML 缩进必须用空格，不能用 Tab；改错会导致网络中断，远程操作前先开 netplan try。",
        tags: ["网络", "静态IP", "netplan"],
      },
      {
        name: "netplan 恢复 DHCP",
        desc: "改回自动获取",
        examples: [
          { code: "network:\n  version: 2\n  ethernets:\n    ens33:\n      dhcp4: true", note: "写入配置文件后 netplan apply" },
          { code: "dhclient -r && dhclient", note: "手动重新获取 IP" },
        ],
        tags: ["DHCP", "网络"],
      },
    ],
  },
  {
    title: "Snap 与其他",
    items: [
      {
        name: "snap",
        desc: "Ubuntu 的沙箱化软件包管理",
        examples: [
          { code: "snap list", note: "已安装的 snap" },
          { code: "snap install code --classic", note: "安装（部分软件需要 classic 权限）" },
          { code: "snap refresh", note: "更新全部" },
          { code: "snap remove code" },
          { code: "snap services", note: "查看 snap 服务状态" },
        ],
        tags: ["snap", "安装"],
      },
      {
        name: "systemctl（Ubuntu）",
        desc: "服务管理与 CentOS 一致",
        examples: [
          { code: "systemctl restart nginx" },
          { code: "systemctl enable --now nginx" },
          { code: "systemctl status nginx" },
          { code: "systemctl list-units --failed" },
        ],
        tags: ["服务", "systemctl"],
      },
      {
        name: "日志与时间",
        desc: "Ubuntu 的日志位置与时间同步",
        examples: [
          { code: "journalctl -u nginx -f", note: "systemd 日志" },
          { code: "tail -f /var/log/syslog", note: "系统日志（Debian 系为 syslog）" },
          { code: "timedatectl set-timezone Asia/Shanghai" },
          { code: "apt install -y chrony && systemctl enable --now chrony", note: "时间同步" },
        ],
        tags: ["日志", "时间", "syslog"],
      },
      {
        name: "locale / 中文环境",
        desc: "解决中文乱码与语言环境",
        examples: [
          { code: "locale", note: "查看当前语言环境" },
          { code: "locale-gen zh_CN.UTF-8", note: "生成中文语言包" },
          { code: "update-locale LANG=zh_CN.UTF-8", note: "设为默认语言" },
          { code: "dpkg-reconfigure locales", note: "交互式配置" },
        ],
        tags: ["中文", "乱码", "locale"],
      },
    ],
  },
];

export default ubuntu;
