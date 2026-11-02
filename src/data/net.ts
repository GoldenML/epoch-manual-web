import type { CmdGroup } from "@/types/command";

const net: CmdGroup[] = [
  {
    title: "连通性测试",
    items: [
      {
        name: "ping",
        desc: "测试网络可达性与延迟",
        examples: [
          { code: "ping -c 4 example.com", note: "发 4 个包后结束" },
          { code: "ping -i 0.2 -c 20 192.168.1.1", note: "间隔 0.2 秒快速探测" },
          { code: "ping -s 1472 -M do host", note: "探测 MTU（不分片发送）" },
        ],
        options: [
          { flag: "-c <N>", desc: "次数" },
          { flag: "-i", desc: "间隔秒数" },
          { flag: "-W", desc: "超时时间" },
        ],
        tip: "ping 不通不代表服务不通，很多主机禁 ICMP，直接用 curl/nc 测端口更准。",
        tags: ["连通", "延迟", "ping"],
      },
      {
        name: "curl",
        desc: "HTTP 请求调试的万能工具",
        examples: [
          { code: "curl -I https://example.com", note: "只看响应头" },
          { code: "curl -v https://api.example.com/health", note: "输出完整请求过程，排查连接问题" },
          { code: "curl -X POST -H \"Content-Type: application/json\" -d '{\"name\":\"a\"}' https://api.example.com/users" },
          { code: "curl -o file.zip -L https://example.com/file.zip", note: "-L 跟随重定向" },
          { code: "curl --resolve api.example.com:443:1.2.3.4 https://api.example.com", note: "指定 IP 绕过 DNS 测试" },
          { code: "curl -w \"%{http_code} %{time_total}s\\n\" -o /dev/null -s https://example.com", note: "只看状态码和耗时" },
          { code: "curl -k https://self-signed.example.com", note: "忽略证书校验（仅测试）" },
          { code: "curl ifconfig.me", note: "查看公网出口 IP" },
        ],
        options: [
          { flag: "-I", desc: "只取响应头" },
          { flag: "-X", desc: "指定方法" },
          { flag: "-H", desc: "请求头" },
          { flag: "-d", desc: "请求体" },
          { flag: "-L", desc: "跟随重定向" },
          { flag: "-o", desc: "输出到文件" },
          { flag: "-s", desc: "静默模式" },
          { flag: "--resolve", desc: "强制指定域名对应 IP" },
        ],
        tags: ["http", "接口", "curl", "调试"],
      },
      {
        name: "wget",
        desc: "下载文件，支持断点续传",
        examples: [
          { code: "wget https://example.com/file.tar.gz" },
          { code: "wget -c https://example.com/big.iso", note: "断点续传" },
          { code: "wget -O out.zip https://example.com/dl?id=1", note: "指定输出文件名" },
          { code: "wget -r -np -k https://example.com/docs/", note: "递归下载站点（注意别滥用）" },
        ],
        tags: ["下载", "wget", "断点续传"],
      },
      {
        name: "nc / telnet",
        desc: "测试端口是否可达",
        examples: [
          { code: "nc -zv 10.0.0.5 3306", note: "测试 TCP 端口" },
          { code: "nc -zvu 10.0.0.5 53", note: "测试 UDP 端口" },
          { code: "nc -l 9000", note: "本机监听 9000，可用于联调" },
          { code: "telnet 10.0.0.5 6379", note: "telnet 未安装时可用 nc" },
        ],
        tags: ["端口", "nc", "连通"],
      },
    ],
  },
  {
    title: "端口与 DNS",
    items: [
      {
        name: "ss",
        desc: "查看套接字与监听端口（替代 netstat）",
        examples: [
          { code: "ss -tunlp", note: "所有 TCP/UDP 监听端口及进程" },
          { code: "ss -tnp | grep 8080", note: "查看某端口的连接" },
          { code: "ss -s", note: "连接数统计" },
          { code: "ss -tn state established | wc -l", note: "已建立连接数" },
        ],
        options: [
          { flag: "-t", desc: "TCP" },
          { flag: "-u", desc: "UDP" },
          { flag: "-n", desc: "不解析服务名" },
          { flag: "-l", desc: "只显示监听" },
          { flag: "-p", desc: "显示进程（需 root）" },
        ],
        tags: ["端口", "ss", "netstat"],
      },
      {
        name: "netstat",
        desc: "老系统的端口与连接查看",
        examples: [
          { code: "netstat -anp | grep 80" },
          { code: "netstat -tunlp" },
          { code: "netstat -an | awk '/^tcp/ {print $6}' | sort | uniq -c", note: "按 TCP 状态统计" },
        ],
        tip: "新系统可能未安装：yum install net-tools / apt install net-tools。",
        tags: ["端口", "netstat"],
      },
      {
        name: "dig / nslookup",
        desc: "DNS 解析查询",
        examples: [
          { code: "dig example.com +short", note: "只返回 A 记录" },
          { code: "dig example.com MX" },
          { code: "dig @8.8.8.8 example.com", note: "指定 DNS 服务器" },
          { code: "dig +trace example.com", note: "追踪完整解析链路" },
          { code: "nslookup example.com" },
        ],
        tags: ["dns", "解析", "dig"],
      },
      {
        name: "traceroute / mtr",
        desc: "路由追踪，定位哪一跳出问题",
        examples: [
          { code: "traceroute example.com" },
          { code: "traceroute -T -p 443 example.com", note: "TCP 模式，穿透 ICMP 封锁" },
          { code: "mtr -rw example.com", note: "持续探测并统计各跳丢包" },
        ],
        tags: ["路由", "traceroute", "丢包"],
      },
      {
        name: "ip / ifconfig",
        desc: "网卡与路由信息",
        examples: [
          { code: "ip addr show" },
          { code: "ip route get 8.8.8.8", note: "查看走哪条路由" },
          { code: "ip link set eth0 up", note: "启用网卡" },
          { code: "ifconfig eth0", note: "老命令，需 net-tools" },
        ],
        tags: ["网卡", "路由", "ip"],
      },
    ],
  },
  {
    title: "抓包与流量",
    items: [
      {
        name: "tcpdump",
        desc: "命令行抓包分析",
        examples: [
          { code: "tcpdump -i any -nn port 80", note: "抓 80 端口流量" },
          { code: "tcpdump -i eth0 -nn -A port 8080 -c 50", note: "抓 50 个包并以 ASCII 显示内容" },
          { code: "tcpdump -i any -nn host 10.0.0.5 and port 3306 -w db.pcap", note: "保存为 pcap 用 Wireshark 分析" },
          { code: "tcpdump -i any -nn 'tcp[tcpflags] & tcp-syn != 0'", note: "只看 SYN 包" },
        ],
        options: [
          { flag: "-i any", desc: "所有网卡" },
          { flag: "-nn", desc: "不解析域名和端口名" },
          { flag: "-A", desc: "ASCII 显示内容" },
          { flag: "-w", desc: "写入文件" },
          { flag: "-c", desc: "抓包数量" },
        ],
        tags: ["抓包", "tcpdump", "pcap"],
      },
      {
        name: "带宽与流量统计",
        desc: "查看网卡实时速率",
        examples: [
          { code: "iftop -i eth0", note: "按连接查看实时流量（需安装）" },
          { code: "nethogs", note: "按进程查看带宽占用" },
          { code: "sar -n DEV 1 5", note: "网卡吞吐历史" },
          { code: "cat /proc/net/dev", note: "累计收发字节" },
        ],
        tags: ["带宽", "流量", "iftop"],
      },
    ],
  },
];

export default net;
