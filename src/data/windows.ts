import type { CmdGroup } from "@/types/command";

const windows: CmdGroup[] = [
  {
    title: "PowerShell 基础",
    items: [
      {
        name: "Get-ChildItem",
        desc: "列出文件（dir / ls 的 PowerShell 版）",
        examples: [
          { code: "Get-ChildItem", note: "当前目录" },
          { code: "Get-ChildItem -Recurse -Filter *.log", note: "递归查找日志" },
          { code: "Get-ChildItem | Sort-Object Length -Descending | Select-Object -First 10", note: "最大的 10 个文件" },
          { code: "Get-ChildItem -Recurse | Measure-Object -Property Length -Sum", note: "统计目录总大小" },
        ],
        tags: ["文件", "目录", "powershell"],
      },
      {
        name: "Get-Content",
        desc: "读取文件内容与跟踪日志",
        examples: [
          { code: "Get-Content app.log -Tail 100 -Wait", note: "等价于 tail -f" },
          { code: "Get-Content app.log -TotalCount 20" },
          { code: "Select-String -Path *.log -Pattern \"ERROR\"", note: "等价于 grep" },
          { code: "Get-Content app.log | Select-String \"Exception\" -Context 2,2" },
        ],
        tags: ["日志", "grep", "tail"],
      },
      {
        name: "环境变量",
        desc: "查看与设置环境变量",
        examples: [
          { code: "$env:PATH", note: "读取" },
          { code: "$env:NODE_ENV = \"production\"", note: "当前会话临时设置" },
          { code: "[Environment]::SetEnvironmentVariable(\"NODE_ENV\", \"production\", \"User\")", note: "永久写入用户变量" },
          { code: "Get-ChildItem Env:", note: "列出全部" },
        ],
        tags: ["环境变量", "path"],
      },
      {
        name: "进程与服务",
        desc: "查看、启动、停止",
        examples: [
          { code: "Get-Process | Sort-Object CPU -Descending | Select-Object -First 10" },
          { code: "Stop-Process -Id 12345 -Force" },
          { code: "Stop-Process -Name node -Force", note: "按名称杀全部" },
          { code: "Get-Service | Where-Object Status -eq 'Running'" },
          { code: "Restart-Service -Name wuauserv" },
        ],
        tags: ["进程", "服务"],
      },
    ],
  },
  {
    title: "端口与网络",
    items: [
      {
        name: "查端口占用",
        desc: "Windows 下排查端口被谁占用",
        examples: [
          { code: "netstat -ano | findstr :8080", note: "最后一列是 PID" },
          { code: "Get-NetTCPConnection -LocalPort 8080", note: "PowerShell 版，含 OwningProcess" },
          { code: "Get-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess", note: "反查进程名" },
          { code: "taskkill /PID 12345 /F", note: "按 PID 强制结束" },
        ],
        tags: ["端口占用", "netstat", "taskkill"],
      },
      {
        name: "网络测试",
        desc: "连通性与 DNS",
        examples: [
          { code: "Test-NetConnection example.com -Port 443", note: "测试主机端口" },
          { code: "Test-Connection example.com -Count 4", note: "ping" },
          { code: "Resolve-DnsName example.com", note: "DNS 解析" },
          { code: "ipconfig /flushdns", note: "清 DNS 缓存" },
          { code: "ipconfig /all", note: "查看网卡与 DNS 配置" },
        ],
        tags: ["网络", "ping", "dns"],
      },
      {
        name: "防火墙",
        desc: "开放端口",
        examples: [
          { code: "New-NetFirewallRule -DisplayName \"Allow 8080\" -Direction Inbound -LocalPort 8080 -Protocol TCP -Action Allow" },
          { code: "Get-NetFirewallRule -DisplayName \"Allow 8080\"" },
          { code: "Remove-NetFirewallRule -DisplayName \"Allow 8080\"" },
        ],
        danger: true,
        tags: ["防火墙", "端口"],
      },
    ],
  },
  {
    title: "开发常用",
    items: [
      {
        name: "常用 CMD 命令",
        desc: "传统命令提示符下的操作",
        examples: [
          { code: "dir /a", note: "含隐藏文件" },
          { code: "cd /d D:\\workspace", note: "跨盘符切换" },
          { code: "cls", note: "清屏" },
          { code: "where node", note: "查找命令路径（类似 which）" },
          { code: "set | findstr PATH", note: "查看环境变量" },
          { code: "echo %CD%", note: "当前目录" },
        ],
        tags: ["cmd", "基础"],
      },
      {
        name: "winget",
        desc: "Windows 包管理器",
        examples: [
          { code: "winget search nodejs" },
          { code: "winget install OpenJS.NodeJS.LTS" },
          { code: "winget upgrade --all" },
          { code: "winget list" },
        ],
        tags: ["安装", "winget", "包管理"],
      },
      {
        name: "批处理小技巧",
        desc: "写 .bat 时常用",
        examples: [
          { code: "@echo off\nchcp 65001", note: "关闭回显并设置 UTF-8，避免中文乱码" },
          { code: "if not exist \"%1\" (echo 参数缺失 & exit /b 1)" },
          { code: "for /f \"delims=\" %%i in ('dir /b *.log') do echo %%i" },
          { code: "start \"\" http://localhost:5173", note: "打开浏览器" },
        ],
        tags: ["bat", "批处理", "乱码"],
      },
      {
        name: "WSL",
        desc: "在 Windows 里跑 Linux",
        examples: [
          { code: "wsl --list --verbose", note: "查看已安装发行版" },
          { code: "wsl --install -d Ubuntu-22.04" },
          { code: "wsl --set-default-version 2" },
          { code: "wsl --shutdown", note: "关闭所有 WSL 实例（释放内存）" },
          { code: "\\\\wsl$\\Ubuntu\\home", note: "资源管理器访问 WSL 文件" },
        ],
        tags: ["wsl", "linux", "子系统"],
      },
    ],
  },
];

export default windows;
