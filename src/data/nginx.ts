import type { CmdGroup } from "@/types/command";

const nginx: CmdGroup[] = [
  {
    title: "运维命令",
    items: [
      {
        name: "nginx -t",
        desc: "检查配置文件语法是否正确",
        examples: [
          { code: "nginx -t" },
          { code: "nginx -T", note: "打印完整生效配置（含 include）" },
          { code: "nginx -t -c /etc/nginx/nginx.conf", note: "检查指定配置文件" },
        ],
        tip: "每次改完配置先 nginx -t，通过再 reload，否则可能把服务改挂。",
        tags: ["配置检查", "nginx", "语法"],
      },
      {
        name: "nginx -s reload",
        desc: "平滑重载配置，不中断现有连接",
        examples: [
          { code: "nginx -s reload" },
          { code: "nginx -s stop", note: "快速停止" },
          { code: "nginx -s quit", note: "优雅停止，处理完请求再退出" },
          { code: "systemctl reload nginx", note: "systemd 管理时等价" },
        ],
        tags: ["重载", "reload", "生效"],
      },
      {
        name: "nginx -v / -V",
        desc: "查看版本与编译参数",
        examples: [
          { code: "nginx -v", note: "版本号" },
          { code: "nginx -V", note: "含编译模块与配置路径" },
          { code: "nginx -V 2>&1 | tr ' ' '\\n' | grep module", note: "查看已编译模块" },
        ],
        tags: ["版本", "模块"],
      },
      {
        name: "常用路径与日志",
        desc: "配置、站点、日志位置",
        examples: [
          { code: "ls /etc/nginx/conf.d/", note: "站点配置目录（CentOS）" },
          { code: "ls /etc/nginx/sites-enabled/", note: "Ubuntu 站点配置" },
          { code: "tail -f /var/log/nginx/error.log", note: "错误日志，排查 502/404 先看这里" },
          { code: "tail -f /var/log/nginx/access.log" },
          { code: "find / -name nginx.conf 2>/dev/null", note: "找不到配置时定位" },
        ],
        tags: ["路径", "日志", "排查"],
      },
    ],
  },
  {
    title: "常用配置片段",
    items: [
      {
        name: "静态站点 + history 路由",
        desc: "Vue/React 单页应用的标准配置",
        examples: [
          {
            code: "server {\n    listen 80;\n    server_name example.com;\n    root /var/www/dist;\n    index index.html;\n\n    location / {\n        try_files $uri $uri/ /index.html;\n    }\n}",
          },
        ],
        tip: "没有 try_files 时，刷新子路由会 404。",
        tags: ["静态", "SPA", "history", "404"],
      },
      {
        name: "反向代理",
        desc: "把请求转发到后端服务",
        examples: [
          {
            code: "location /api/ {\n    proxy_pass http://127.0.0.1:3000/;\n    proxy_set_header Host $host;\n    proxy_set_header X-Real-IP $remote_addr;\n    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n    proxy_set_header X-Forwarded-Proto $scheme;\n}",
          },
          {
            code: "location / {\n    proxy_pass http://127.0.0.1:8080;\n    proxy_read_timeout 300s;\n    proxy_connect_timeout 30s;\n}",
            note: "长连接/大文件场景调大超时",
          },
        ],
        tip: "proxy_pass 末尾带 / 会替换 location 前缀，不带则保留完整路径，配错很容易 404。",
        tags: ["代理", "proxy_pass", "502"],
      },
      {
        name: "WebSocket 代理",
        desc: "支持 ws 升级",
        examples: [
          {
            code: "location /ws/ {\n    proxy_pass http://127.0.0.1:3000;\n    proxy_http_version 1.1;\n    proxy_set_header Upgrade $http_upgrade;\n    proxy_set_header Connection \"upgrade\";\n    proxy_read_timeout 600s;\n}",
          },
        ],
        tags: ["websocket", "ws"],
      },
      {
        name: "HTTPS 配置",
        desc: "启用证书与 HTTP 跳转",
        examples: [
          {
            code: "server {\n    listen 80;\n    server_name example.com;\n    return 301 https://$host$request_uri;\n}\n\nserver {\n    listen 443 ssl http2;\n    server_name example.com;\n    ssl_certificate     /etc/nginx/ssl/fullchain.pem;\n    ssl_certificate_key /etc/nginx/ssl/privkey.pem;\n    ssl_protocols TLSv1.2 TLSv1.3;\n    ssl_session_cache shared:SSL:10m;\n    location / {\n        root /var/www/dist;\n        try_files $uri $uri/ /index.html;\n    }\n}",
          },
        ],
        tags: ["https", "证书", "ssl", "跳转"],
      },
      {
        name: "负载均衡",
        desc: "多台上游服务分流",
        examples: [
          {
            code: "upstream backend {\n    least_conn;\n    server 10.0.0.11:8080 weight=3;\n    server 10.0.0.12:8080;\n    server 10.0.0.13:8080 backup;\n    keepalive 32;\n}\n\nserver {\n    listen 80;\n    location / {\n        proxy_pass http://backend;\n    }\n}",
          },
        ],
        tags: ["负载均衡", "upstream"],
      },
      {
        name: "gzip 与缓存",
        desc: "开启压缩、静态资源缓存",
        examples: [
          {
            code: "gzip on;\ngzip_min_length 1k;\ngzip_comp_level 5;\ngzip_types text/plain text/css application/json application/javascript image/svg+xml;\n\ngzip_vary on;",
          },
          {
            code: "location ~* \\.(js|css|png|jpg|svg|woff2)$ {\n    expires 30d;\n    add_header Cache-Control \"public, immutable\";\n}",
          },
        ],
        tip: "index.html 不要设长缓存，否则前端发版后用户拿到旧入口。",
        tags: ["gzip", "缓存", "性能"],
      },
      {
        name: "访问控制与限流",
        desc: "IP 白名单、基础认证、请求限速",
        examples: [
          { code: "location /admin/ {\n    allow 10.0.0.0/8;\n    deny all;\n}" },
          { code: "location / {\n    auth_basic \"Restricted\";\n    auth_basic_user_file /etc/nginx/.htpasswd;\n}", note: "用 htpasswd -c /etc/nginx/.htpasswd user 生成" },
          { code: "limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;\n\nlocation /api/ {\n    limit_req zone=api burst=20 nodelay;\n}", note: "写在 http 块内" },
        ],
        tags: ["白名单", "认证", "限流"],
      },
      {
        name: "大文件上传",
        desc: "调整请求体大小限制",
        examples: [
          { code: "client_max_body_size 100m;", note: "写在 http/server/location 均可" },
          { code: "client_body_timeout 120s;" },
        ],
        tip: "上传报 413 Request Entity Too Large 就是这里没放开。",
        tags: ["上传", "413", "大文件"],
      },
    ],
  },
  {
    title: "故障排查",
    items: [
      {
        name: "502 Bad Gateway",
        desc: "上游服务不可达的排查顺序",
        examples: [
          { code: "tail -n 50 /var/log/nginx/error.log", note: "看 connect() failed 的具体地址" },
          { code: "ss -tunlp | grep 3000", note: "确认后端端口在监听" },
          { code: "curl -I http://127.0.0.1:3000", note: "本机直连后端" },
          { code: "getenforce", note: "CentOS 上 SELinux 拦截网络也是常见原因" },
        ],
        tags: ["502", "排查", "上游"],
      },
      {
        name: "端口与进程",
        desc: "确认 nginx 是否真的在跑",
        examples: [
          { code: "ps -ef | grep nginx" },
          { code: "ss -tunlp | grep -E '80|443'" },
          { code: "systemctl status nginx" },
          { code: "nginx -t", note: "配置错误会导致启动失败" },
        ],
        tags: ["端口", "进程", "启动失败"],
      },
    ],
  },
];

export default nginx;
