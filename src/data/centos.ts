import type { CmdGroup } from "@/types/command";

const centos: CmdGroup[] = [
  {
    title: "包管理：yum / dnf",
    items: [
      {
        name: "yum install",
        desc: "安装软件包（CentOS 7 及以前用 yum，8+ 用 dnf，命令基本通用）",
        examples: [
          { code: "yum install -y nginx", note: "-y 自动确认" },
          { code: "dnf install -y gcc make", note: "CentOS 8/9 推荐 dnf" },
          { code: "yum localinstall -y ./pkg.rpm", note: "安装本地 rpm 并解决依赖" },
        ],
        options: [
          { flag: "-y", desc: "自动回答 yes" },
          { flag: "--nogpgcheck", desc: "跳过 GPG 校验（内网包常用）" },
        ],
        danger: true,
        tags: ["安装", "yum", "dnf"],
      },
      {
        name: "yum update",
        desc: "升级系统或指定软件包",
        examples: [
          { code: "yum update -y", note: "升级全部（生产慎用）" },
          { code: "yum update -y nginx", note: "只升级某个包" },
          { code: "yum check-update", note: "检查可升级项" },
        ],
        danger: true,
        tip: "生产环境全量 update 可能升级内核与关键库，建议先做快照。",
        tags: ["升级", "update"],
      },
      {
        name: "yum remove / search / info",
        desc: "卸载、搜索、查看包信息",
        examples: [
          { code: "yum remove -y nginx" },
          { code: "yum search nginx" },
          { code: "yum info nginx" },
          { code: "yum provides \"*/ifconfig\"", note: "查找命令属于哪个包" },
          { code: "yum list installed | grep nginx" },
        ],
        tags: ["卸载", "查询", "provides"],
      },
      {
        name: "yum clean / repolist",
        desc: "清理缓存与查看仓库",
        examples: [
          { code: "yum clean all && yum makecache", note: "清缓存并重建，解决元数据异常" },
          { code: "yum repolist all", note: "查看所有仓库及启用状态" },
          { code: "yum-config-manager --add-repo https://xxx/centos.repo", note: "添加第三方源" },
          { code: "yum-config-manager --disable epel", note: "禁用某个源" },
        ],
        tags: ["源", "缓存", "repo"],
      },
      {
        name: "rpm",
        desc: "直接操作 rpm 包，不解决依赖",
        examples: [
          { code: "rpm -qa | grep nginx", note: "列出已安装" },
          { code: "rpm -ivh pkg.rpm", note: "安装" },
          { code: "rpm -Uvh pkg.rpm", note: "升级" },
          { code: "rpm -e nginx", note: "卸载" },
          { code: "rpm -ql nginx", note: "查看包安装了哪些文件" },
          { code: "rpm -qf /usr/sbin/nginx", note: "查文件属于哪个包" },
        ],
        options: [
          { flag: "-qa", desc: "列出所有已安装包" },
          { flag: "-ql", desc: "列出包内文件" },
          { flag: "-qf", desc: "反查文件所属包" },
          { flag: "--nodeps", desc: "忽略依赖（慎用）" },
        ],
        tags: ["rpm", "包", "依赖"],
      },
    ],
  },
  {
    title: "服务管理：systemctl",
    items: [
      {
        name: "systemctl 常用操作",
        desc: "管理 systemd 服务的启停与开机自启",
        examples: [
          { code: "systemctl start nginx" },
          { code: "systemctl stop nginx" },
          { code: "systemctl restart nginx" },
          { code: "systemctl reload nginx", note: "重载配置不中断连接（服务支持时）" },
          { code: "systemctl status nginx --no-pager -l", note: "查看状态与最近日志" },
          { code: "systemctl enable --now nginx", note: "设开机自启并立即启动" },
          { code: "systemctl disable nginx", note: "取消开机自启" },
        ],
        tags: ["服务", "systemctl", "开机自启"],
      },
      {
        name: "systemctl 查询",
        desc: "列出与筛选服务单元",
        examples: [
          { code: "systemctl list-units --type=service --state=running", note: "正在运行的服务" },
          { code: "systemctl list-unit-files | grep enabled", note: "所有开机自启项" },
          { code: "systemctl list-units --failed", note: "启动失败的服务" },
          { code: "systemctl cat nginx", note: "查看 unit 文件内容" },
          { code: "systemctl show nginx -p MainPID", note: "查看某个属性" },
        ],
        tags: ["查询", "服务", "unit"],
      },
      {
        name: "systemctl daemon-reload",
        desc: "修改 unit 文件后重新加载配置",
        examples: [
          { code: "systemctl daemon-reload" },
          { code: "systemctl edit --full myapp.service", note: "编辑 unit 文件" },
          { code: "systemctl reset-failed myapp", note: "清除失败计数，解决启动频率限制" },
        ],
        tip: "改了 /etc/systemd/system/*.service 后必须 daemon-reload，否则改动不生效。",
        tags: ["重载", "unit", "自定义服务"],
      },
      {
        name: "journalctl",
        desc: "查看 systemd 日志",
        examples: [
          { code: "journalctl -u nginx -n 100 --no-pager", note: "某服务最近 100 行" },
          { code: "journalctl -u nginx -f", note: "实时跟踪" },
          { code: "journalctl -u nginx --since \"1 hour ago\"", note: "按时间过滤" },
          { code: "journalctl -xe", note: "查看最近的错误与提示" },
          { code: "journalctl --disk-usage", note: "日志占用空间" },
          { code: "journalctl --vacuum-time=7d", note: "只保留 7 天日志" },
        ],
        options: [
          { flag: "-u", desc: "指定服务" },
          { flag: "-f", desc: "跟随输出" },
          { flag: "-p err", desc: "按级别过滤" },
          { flag: "--since / --until", desc: "时间范围" },
        ],
        tags: ["日志", "journalctl", "排查"],
      },
      {
        name: "hostnamectl / timedatectl",
        desc: "主机名与时区时间管理",
        examples: [
          { code: "hostnamectl set-hostname web-01" },
          { code: "timedatectl", note: "查看时间与时区" },
          { code: "timedatectl set-timezone Asia/Shanghai" },
          { code: "timedatectl set-ntp true", note: "开启时间同步" },
        ],
        tags: ["主机名", "时区", "时间"],
      },
    ],
  },
  {
    title: "防火墙：firewalld",
    items: [
      {
        name: "firewall-cmd 开放端口",
        desc: "管理 firewalld 端口与规则",
        examples: [
          { code: "firewall-cmd --add-port=8080/tcp --permanent", note: "--permanent 写入配置" },
          { code: "firewall-cmd --reload", note: "重载使配置生效" },
          { code: "firewall-cmd --add-service=http --permanent" },
          { code: "firewall-cmd --remove-port=8080/tcp --permanent" },
          { code: "firewall-cmd --list-all", note: "查看当前区域所有规则" },
          { code: "firewall-cmd --list-ports", note: "只看已开放端口" },
        ],
        options: [
          { flag: "--permanent", desc: "持久化，不加则重启失效" },
          { flag: "--reload", desc: "重新加载规则" },
          { flag: "--zone=public", desc: "指定区域" },
        ],
        tip: "忘了 --permanent 的规则在 reload 后会丢失；两条命令要一起执行。",
        tags: ["防火墙", "端口", "firewalld"],
      },
      {
        name: "firewall-cmd 端口转发",
        desc: "把外部端口映射到内网服务",
        examples: [
          { code: "firewall-cmd --add-forward-port=port=80:proto=tcp:toport=8080 --permanent" },
          { code: "firewall-cmd --add-masquerade --permanent", note: "开启地址伪装，转发前需启用" },
          { code: "firewall-cmd --reload" },
        ],
        tags: ["转发", "端口映射"],
      },
      {
        name: "systemctl 管理防火墙",
        desc: "停止或禁用 firewalld（内网或有云安全组时常见做法）",
        examples: [
          { code: "systemctl stop firewalld" },
          { code: "systemctl disable firewalld" },
          { code: "systemctl status firewalld" },
        ],
        danger: true,
        tip: "关掉防火墙前确认已有云厂商安全组或其他防护，否则服务会直接暴露公网。",
        tags: ["防火墙", "关闭", "危险"],
      },
    ],
  },
  {
    title: "SELinux",
    items: [
      {
        name: "getenforce / setenforce",
        desc: "查看与临时切换 SELinux 模式",
        examples: [
          { code: "getenforce", note: "Enforcing / Permissive / Disabled" },
          { code: "setenforce 0", note: "临时切到宽容模式（重启复原）" },
          { code: "sestatus", note: "查看详细状态" },
        ],
        tip: "服务莫名 403、连不上端口时，先 setenforce 0 验证是否为 SELinux 导致。",
        tags: ["SELinux", "排查", "403"],
      },
      {
        name: "永久关闭 SELinux",
        desc: "修改配置文件重启生效",
        examples: [
          { code: "sed -i 's/^SELINUX=enforcing/SELINUX=disabled/' /etc/selinux/config" },
          { code: "reboot", note: "必须重启才生效" },
        ],
        danger: true,
        tags: ["SELinux", "关闭"],
      },
      {
        name: "semanage / restorecon",
        desc: "管理 SELinux 上下文与端口标签",
        examples: [
          { code: "semanage port -a -t http_port_t -p tcp 8080", note: "允许 nginx 监听 8080" },
          { code: "semanage fcontext -a -t httpd_sys_content_t \"/data/www(/.*)?\"" },
          { code: "restorecon -Rv /data/www", note: "应用正确的文件上下文" },
          { code: "ls -Z /data/www", note: "查看文件上下文" },
        ],
        tags: ["SELinux", "端口", "上下文"],
      },
    ],
  },
  {
    title: "网络配置",
    items: [
      {
        name: "nmcli",
        desc: "NetworkManager 命令行，CentOS 7+ 配置网络的标准方式",
        examples: [
          { code: "nmcli device status", note: "查看网卡状态" },
          { code: "nmcli connection show", note: "查看连接配置" },
          { code: "nmcli con mod eth0 ipv4.addresses 192.168.1.10/24 ipv4.gateway 192.168.1.1 ipv4.dns 8.8.8.8 ipv4.method manual" },
          { code: "nmcli con up eth0", note: "应用配置" },
          { code: "nmcli con mod eth0 ipv4.dns \"8.8.8.8 114.114.114.114\"" },
        ],
        tags: ["网络", "IP", "nmcli"],
      },
      {
        name: "ip",
        desc: "查看与配置网卡、路由",
        examples: [
          { code: "ip addr", note: "查看所有网卡与 IP" },
          { code: "ip route", note: "查看路由表" },
          { code: "ip -s link", note: "查看收发统计" },
          { code: "ip neigh", note: "ARP 表" },
        ],
        tip: "ip 命令的修改都是临时的，重启失效；持久化请用 nmcli 或配置文件。",
        tags: ["网络", "ip", "路由"],
      },
      {
        name: "hostnamectl / hosts",
        desc: "主机名与本地域名解析",
        examples: [
          { code: "hostnamectl set-hostname api-01" },
          { code: "cat /etc/hosts" },
          { code: "echo \"10.0.0.5 db.local\" >> /etc/hosts" },
        ],
        tags: ["主机名", "hosts", "解析"],
      },
    ],
  },
];

export default centos;
