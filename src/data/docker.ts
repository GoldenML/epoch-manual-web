import type { CmdGroup } from "@/types/command";

const docker: CmdGroup[] = [
  {
    title: "容器生命周期",
    items: [
      {
        name: "docker run",
        desc: "从镜像创建并启动容器",
        examples: [
          { code: "docker run -d --name web -p 8080:80 nginx", note: "后台运行并映射端口" },
          { code: "docker run -it --rm ubuntu:22.04 bash", note: "交互式临时容器，退出即删" },
          { code: "docker run -d -v /data/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 mysql:8", note: "挂载目录并传环境变量" },
          { code: "docker run -d --restart=always --name app myapp:1.0", note: "开机/崩溃自动重启" },
        ],
        options: [
          { flag: "-d", desc: "后台运行" },
          { flag: "-it", desc: "交互式终端" },
          { flag: "-p 宿主:容器", desc: "端口映射" },
          { flag: "-v 宿主:容器", desc: "目录挂载" },
          { flag: "-e", desc: "环境变量" },
          { flag: "--restart=always", desc: "自动重启策略" },
          { flag: "--network", desc: "指定网络" },
          { flag: "--rm", desc: "退出后自动删除" },
        ],
        tags: ["运行", "run", "容器"],
      },
      {
        name: "docker ps",
        desc: "查看容器列表",
        examples: [
          { code: "docker ps", note: "运行中的容器" },
          { code: "docker ps -a", note: "含已停止" },
          { code: "docker ps -a --format \"table {{.Names}}\\t{{.Status}}\\t{{.Ports}}\"", note: "自定义输出格式" },
        ],
        options: [
          { flag: "-a", desc: "显示全部" },
          { flag: "-q", desc: "只输出 ID，便于批量操作" },
          { flag: "-s", desc: "显示占用磁盘大小" },
        ],
        tags: ["查看", "ps", "容器"],
      },
      {
        name: "docker start / stop / restart",
        desc: "启停已有容器",
        examples: [
          { code: "docker stop web" },
          { code: "docker start web" },
          { code: "docker restart web" },
          { code: "docker stop $(docker ps -q)", note: "停止所有运行中的容器" },
        ],
        tags: ["启停", "重启"],
      },
      {
        name: "docker exec",
        desc: "在运行中的容器内执行命令",
        examples: [
          { code: "docker exec -it web bash", note: "进入容器（精简镜像可能只有 sh）" },
          { code: "docker exec -it mysql mysql -uroot -p", note: "直接执行命令" },
          { code: "docker exec -u root -it web sh", note: "以指定用户进入" },
          { code: "docker exec web cat /etc/nginx/nginx.conf", note: "查看容器内文件" },
        ],
        tags: ["进入容器", "exec", "调试"],
      },
      {
        name: "docker rm",
        desc: "删除容器",
        examples: [
          { code: "docker rm web", note: "删除已停止的容器" },
          { code: "docker rm -f web", note: "强制删除运行中的" },
          { code: "docker rm $(docker ps -aq)", note: "删除所有容器" },
        ],
        danger: true,
        tip: "容器删除后其内部未挂载的数据全部丢失，确认数据已持久化。",
        tags: ["删除", "rm", "危险"],
      },
      {
        name: "docker logs",
        desc: "查看容器日志",
        examples: [
          { code: "docker logs -f --tail 100 web" },
          { code: "docker logs --since 30m web" },
          { code: "docker logs web 2>&1 | grep -i error" },
        ],
        options: [
          { flag: "-f", desc: "实时跟随" },
          { flag: "--tail 100", desc: "只看最后 100 行" },
          { flag: "--since", desc: "时间范围" },
        ],
        tags: ["日志", "logs", "排查"],
      },
      {
        name: "docker cp",
        desc: "容器与宿主机之间复制文件",
        examples: [
          { code: "docker cp web:/etc/nginx/nginx.conf ./nginx.conf", note: "从容器复制出来" },
          { code: "docker cp ./index.html web:/usr/share/nginx/html/", note: "复制进容器" },
        ],
        tags: ["复制", "文件"],
      },
    ],
  },
  {
    title: "镜像管理",
    items: [
      {
        name: "docker images / pull",
        desc: "查看与拉取镜像",
        examples: [
          { code: "docker images" },
          { code: "docker pull nginx:1.25-alpine" },
          { code: "docker image prune -f", note: "清理悬空镜像" },
          { code: "docker rmi nginx:1.24", note: "删除镜像" },
          { code: "docker rmi -f $(docker images -q)", note: "删除所有镜像" },
        ],
        tags: ["镜像", "拉取", "images"],
      },
      {
        name: "docker build",
        desc: "根据 Dockerfile 构建镜像",
        examples: [
          { code: "docker build -t myapp:1.0 ." },
          { code: "docker build -f Dockerfile.prod -t myapp:prod ." },
          { code: "docker build --no-cache -t myapp:1.0 .", note: "不使用缓存重新构建" },
          { code: "docker buildx build --platform linux/amd64,linux/arm64 -t myapp:1.0 --push .", note: "多架构构建并推送" },
        ],
        options: [
          { flag: "-t", desc: "镜像名:标签" },
          { flag: "-f", desc: "指定 Dockerfile" },
          { flag: "--no-cache", desc: "禁用构建缓存" },
          { flag: "--build-arg", desc: "传入构建参数" },
        ],
        tags: ["构建", "build", "Dockerfile"],
      },
      {
        name: "docker tag / push",
        desc: "打标签并推送到镜像仓库",
        examples: [
          { code: "docker tag myapp:1.0 registry.cn-hangzhou.aliyuncs.com/ns/myapp:1.0" },
          { code: "docker login registry.cn-hangzhou.aliyuncs.com" },
          { code: "docker push registry.cn-hangzhou.aliyuncs.com/ns/myapp:1.0" },
        ],
        tags: ["推送", "仓库", "tag"],
      },
      {
        name: "docker inspect",
        desc: "查看容器/镜像的详细配置",
        examples: [
          { code: "docker inspect web" },
          { code: "docker inspect -f '{{.State.Status}}' web", note: "只看运行状态" },
          { code: "docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' web", note: "查看容器 IP" },
          { code: "docker inspect -f '{{json .Mounts}}' web | jq", note: "查看挂载" },
        ],
        tags: ["详情", "inspect", "IP"],
      },
      {
        name: "docker stats / system df",
        desc: "资源占用与磁盘使用",
        examples: [
          { code: "docker stats --no-stream", note: "一次性输出各容器 CPU/内存" },
          { code: "docker system df", note: "镜像、容器、卷占用总览" },
          { code: "docker system df -v", note: "明细" },
        ],
        tags: ["资源", "监控", "磁盘"],
      },
      {
        name: "docker system prune",
        desc: "清理无用数据（镜像、容器、网络、构建缓存）",
        examples: [
          { code: "docker system prune -f", note: "清理停止的容器、悬空镜像、未使用网络" },
          { code: "docker system prune -a --volumes", note: "连未使用镜像与数据卷一起删" },
        ],
        danger: true,
        tip: "--volumes 会删除未被容器使用的数据卷，数据库数据可能丢失，执行前务必确认。",
        tags: ["清理", "prune", "危险"],
      },
    ],
  },
  {
    title: "网络与数据卷",
    items: [
      {
        name: "docker network",
        desc: "管理容器网络",
        examples: [
          { code: "docker network ls" },
          { code: "docker network create app-net" },
          { code: "docker run -d --network app-net --name api myapp" },
          { code: "docker network inspect app-net", note: "查看网段与已连接容器" },
          { code: "docker network connect app-net web", note: "把运行中的容器加入网络" },
        ],
        tip: "同一自定义网络内可直接用容器名互相访问，无需记 IP。",
        tags: ["网络", "network", "容器互联"],
      },
      {
        name: "docker volume",
        desc: "管理数据卷",
        examples: [
          { code: "docker volume ls" },
          { code: "docker volume create mysql-data" },
          { code: "docker run -d -v mysql-data:/var/lib/mysql mysql:8" },
          { code: "docker volume inspect mysql-data", note: "查看卷在宿主机的实际路径" },
          { code: "docker volume prune -f", note: "清理未使用卷" },
        ],
        danger: true,
        tags: ["数据卷", "volume", "持久化"],
      },
      {
        name: "docker compose",
        desc: "用 YAML 编排多容器应用（V2 命令为 docker compose）",
        examples: [
          { code: "docker compose up -d", note: "后台启动全部服务" },
          { code: "docker compose ps" },
          { code: "docker compose logs -f api", note: "跟踪某服务日志" },
          { code: "docker compose restart api" },
          { code: "docker compose exec api sh", note: "进容器" },
          { code: "docker compose down", note: "停止并删除容器/网络（保留卷）" },
          { code: "docker compose down -v", note: "同时删除数据卷" },
          { code: "docker compose up -d --build", note: "重新构建镜像并启动" },
        ],
        tags: ["compose", "编排", "多容器"],
      },
      {
        name: "compose 文件示例",
        desc: "常见的 web + db 编排模板",
        examples: [
          {
            code: "services:\n  api:\n    build: .\n    ports:\n      - \"3000:3000\"\n    environment:\n      - NODE_ENV=production\n    depends_on:\n      - db\n    restart: always\n  db:\n    image: mysql:8\n    environment:\n      MYSQL_ROOT_PASSWORD: 123456\n    volumes:\n      - db-data:/var/lib/mysql\nvolumes:\n  db-data:",
          },
        ],
        tags: ["yaml", "模板", "compose"],
      },
    ],
  },
];

export default docker;
