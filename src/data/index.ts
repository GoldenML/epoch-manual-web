import type { Category, FlatCommand } from "@/types/command";
import git from "./git";
import linux from "./linux";
import centos from "./centos";
import ubuntu from "./ubuntu";
import nvm from "./nvm";
import docker from "./docker";
import nginx from "./nginx";
import ssh from "./ssh";
import net from "./net";
import vim from "./vim";
import db from "./db";
import windows from "./windows";

export const categories: Category[] = [
  {
    id: "git",
    name: "Git",
    en: "Version Control",
    desc: "分支、提交、回滚、远程协作，日常开发最高频的一套命令。",
    icon: "git",
    color: "#e24329",
    groups: git,
  },
  {
    id: "linux",
    name: "Linux 通用",
    en: "Linux Basics",
    desc: "文件、文本、权限、进程、压缩、定时任务，发行版无关的基础功。",
    icon: "linux",
    color: "#0f766e",
    groups: linux,
  },
  {
    id: "centos",
    name: "CentOS / RHEL",
    en: "Red Hat Family",
    desc: "yum/dnf、systemctl、firewalld、SELinux，红帽系的运维日常。",
    icon: "centos",
    color: "#932279",
    groups: centos,
  },
  {
    id: "ubuntu",
    name: "Ubuntu / Debian",
    en: "Debian Family",
    desc: "apt、dpkg、ufw、netplan，Debian 系的包管理与网络配置。",
    icon: "ubuntu",
    color: "#e95420",
    groups: ubuntu,
  },
  {
    id: "nvm",
    name: "nvm / Node",
    en: "Node Toolchain",
    desc: "Node 版本切换、npm / pnpm / yarn 镜像与依赖管理。",
    icon: "node",
    color: "#4b9c3a",
    groups: nvm,
  },
  {
    id: "docker",
    name: "Docker",
    en: "Containers",
    desc: "容器与镜像、网络卷、Compose 编排和磁盘清理。",
    icon: "docker",
    color: "#2496ed",
    groups: docker,
  },
  {
    id: "nginx",
    name: "Nginx",
    en: "Web Server",
    desc: "反向代理、HTTPS、静态站点、负载均衡与 502 排查。",
    icon: "nginx",
    color: "#00873c",
    groups: nginx,
  },
  {
    id: "ssh",
    name: "SSH / 传输",
    en: "Remote Access",
    desc: "免密登录、隧道转发、scp 与 rsync 部署同步。",
    icon: "ssh",
    color: "#7c3aed",
    groups: ssh,
  },
  {
    id: "net",
    name: "网络诊断",
    en: "Networking",
    desc: "curl、ss、dig、tcpdump，把「连不上」拆成具体原因。",
    icon: "net",
    color: "#0891b2",
    groups: net,
  },
  {
    id: "db",
    name: "MySQL / Redis",
    en: "Databases",
    desc: "连接查询、权限、备份恢复，以及 Redis 的读写与排查。",
    icon: "db",
    color: "#b45309",
    groups: db,
  },
  {
    id: "vim",
    name: "Vim",
    en: "Editor",
    desc: "服务器上改配置的最小可用技能：模式、跳转、替换、批量编辑。",
    icon: "vim",
    color: "#019733",
    groups: vim,
  },
  {
    id: "windows",
    name: "Windows / PS",
    en: "PowerShell",
    desc: "查端口占用、进程服务、winget 与 WSL，本机开发常用。",
    icon: "windows",
    color: "#0078d4",
    groups: windows,
  },
];

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");

const buildFlatCommands = (): FlatCommand[] => {
  const used = new Map<string, number>();
  const result: FlatCommand[] = [];

  categories.forEach((cat) => {
    cat.groups.forEach((group) => {
      group.items.forEach((item) => {
        const base = `${cat.id}-${slugify(item.name)}`;
        const count = used.get(base) ?? 0;
        used.set(base, count + 1);
        result.push({
          ...item,
          id: count === 0 ? base : `${base}-${count + 1}`,
          categoryId: cat.id,
          categoryName: cat.name,
          groupTitle: group.title,
        });
      });
    });
  });

  return result;
};

export const flatCommands = buildFlatCommands();

export const totalCommands = flatCommands.length;

export const getCategory = (id?: string) => categories.find((c) => c.id === id);

export const getCategoryCount = (cat: Category) =>
  cat.groups.reduce((sum, g) => sum + g.items.length, 0);

/** 按分组返回展平后的命令（带 id），供分类页渲染 */
export const getCategoryGroups = (categoryId: string) => {
  const groups: { title: string; items: FlatCommand[] }[] = [];

  flatCommands
    .filter((item) => item.categoryId === categoryId)
    .forEach((item) => {
      let group = groups.find((g) => g.title === item.groupTitle);
      if (!group) {
        group = { title: item.groupTitle, items: [] };
        groups.push(group);
      }
      group.items.push(item);
    });

  return groups;
};

/** 首页推荐：每个分类挑一个最常用的命令 */
export const popularCommands = categories
  .map((cat) => flatCommands.find((c) => c.categoryId === cat.id))
  .filter((item): item is FlatCommand => Boolean(item));
