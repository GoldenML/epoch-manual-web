import type { CmdGroup } from "@/types/command";

const vim: CmdGroup[] = [
  {
    title: "模式与保存",
    items: [
      {
        name: "模式切换",
        desc: "Vim 的核心是模式，先搞清楚自己在哪个模式",
        examples: [
          { code: "i", note: "插入模式（光标前）" },
          { code: "a", note: "插入模式（光标后）" },
          { code: "o", note: "下方新起一行插入" },
          { code: "Esc", note: "回到普通模式" },
          { code: "v / V / Ctrl+v", note: "字符 / 行 / 块 可视模式" },
          { code: ":", note: "命令行模式" },
        ],
        tags: ["模式", "插入", "基础"],
      },
      {
        name: "保存与退出",
        desc: "最常用的几个命令",
        examples: [
          { code: ":w", note: "保存" },
          { code: ":q", note: "退出" },
          { code: ":wq", note: "保存并退出" },
          { code: ":x", note: "保存并退出（未修改则不写盘）" },
          { code: ":q!", note: "强制退出不保存" },
          { code: ":w !sudo tee %", note: "忘了 sudo 时用 root 权限写入" },
        ],
        tags: ["保存", "退出", "sudo"],
      },
      {
        name: "打开与多文件",
        desc: "文件与窗口操作",
        examples: [
          { code: "vim +42 app.log", note: "打开并跳到第 42 行" },
          { code: "vim +/keyword file", note: "打开并搜索关键字" },
          { code: ":e other.txt", note: "打开另一个文件" },
          { code: ":sp file / :vsp file", note: "水平 / 垂直分屏" },
          { code: "Ctrl+w w", note: "在分屏间切换" },
          { code: ":set nu", note: "显示行号（:set nonu 关闭）" },
        ],
        tags: ["打开", "分屏", "行号"],
      },
    ],
  },
  {
    title: "移动与编辑",
    items: [
      {
        name: "光标移动",
        desc: "普通模式下的高效移动",
        examples: [
          { code: "h j k l", note: "左 下 上 右" },
          { code: "w / b", note: "下一个 / 上一个单词" },
          { code: "0 / $", note: "行首 / 行尾" },
          { code: "gg / G", note: "文件首 / 文件尾" },
          { code: ":42 / 42G", note: "跳到第 42 行" },
          { code: "Ctrl+f / Ctrl+b", note: "翻页" },
          { code: "%", note: "跳到匹配的括号" },
        ],
        tags: ["移动", "跳转"],
      },
      {
        name: "删除与修改",
        desc: "常用编辑操作",
        examples: [
          { code: "x", note: "删除光标处字符" },
          { code: "dd", note: "删除整行" },
          { code: "3dd", note: "删除 3 行" },
          { code: "dw", note: "删除一个单词" },
          { code: "D", note: "删除到行尾" },
          { code: "cc", note: "清空整行并进入插入模式" },
          { code: "r / R", note: "替换一个字符 / 进入替换模式" },
        ],
        tags: ["删除", "修改"],
      },
      {
        name: "复制粘贴与撤销",
        desc: "寄存器与撤销",
        examples: [
          { code: "yy", note: "复制整行" },
          { code: "5yy", note: "复制 5 行" },
          { code: "p / P", note: "粘贴到下方 / 上方" },
          { code: "u", note: "撤销" },
          { code: "Ctrl+r", note: "重做" },
          { code: "\"+y / \"+p", note: "与系统剪贴板互通（需 +clipboard）" },
        ],
        tags: ["复制", "粘贴", "撤销"],
      },
      {
        name: "搜索与替换",
        desc: "查找与批量替换",
        examples: [
          { code: "/keyword", note: "向下搜索，n 下一个，N 上一个" },
          { code: ":noh", note: "取消搜索高亮" },
          { code: ":%s/old/new/g", note: "全文替换" },
          { code: ":%s/old/new/gc", note: "替换前逐个确认" },
          { code: ":10,20s/old/new/g", note: "只替换 10-20 行" },
        ],
        tags: ["搜索", "替换", "noh"],
      },
      {
        name: "块编辑",
        desc: "多行批量注释/修改",
        examples: [
          { code: "Ctrl+v 选中行 → I → 输入 // → Esc", note: "批量行首插入（注释）" },
          { code: "Ctrl+v 选中行 → d", note: "删除选中的块" },
          { code: "Shift+v 选中行 → >", note: "整块缩进" },
          { code: ":set paste", note: "粘贴代码不被自动缩进打乱（粘贴完 :set nopaste）" },
        ],
        tags: ["块编辑", "注释", "缩进"],
      },
      {
        name: "多行操作与宏",
        desc: "重复劳动自动化",
        examples: [
          { code: "qa ... q", note: "q 加寄存器名开始录制，再按 q 结束" },
          { code: "@a", note: "执行宏 a" },
          { code: "10@a", note: "重复执行 10 次" },
          { code: ":%normal A;", note: "给每行末尾加分号" },
        ],
        tags: ["宏", "批量", "normal"],
      },
    ],
  },
  {
    title: "配置与技巧",
    items: [
      {
        name: "~/.vimrc 常用配置",
        desc: "一份够用的基础配置",
        examples: [
          {
            code: "set number\nset relativenumber\nset tabstop=2\nset shiftwidth=2\nset expandtab\nset autoindent\nset ignorecase\nset smartcase\nset incsearch\nset cursorline\nset encoding=utf-8\nsyntax on",
          },
          { code: "vim ~/.vimrc", note: "编辑配置，保存后重新打开生效" },
        ],
        tags: ["配置", "vimrc", "缩进"],
      },
      {
        name: "常见坑",
        desc: "新手最容易卡住的地方",
        examples: [
          { code: "Ctrl+s", note: "终端里按了会假死，按 Ctrl+q 恢复" },
          { code: ":w !sudo tee %", note: "只读文件保存" },
          { code: ":set paste", note: "粘贴缩进乱掉" },
          { code: "ZZ", note: "普通模式下连按两次 Z 保存退出" },
        ],
        tags: ["坑", "假死", "粘贴"],
      },
      {
        name: "vim vs vi",
        desc: "服务器上的最小可用编辑器",
        examples: [
          { code: "vi file", note: "几乎所有发行版自带" },
          { code: "apt install -y vim / yum install -y vim", note: "安装完整版 vim" },
          { code: "update-alternatives --config editor", note: "设置系统默认编辑器" },
        ],
        tags: ["vi", "安装", "编辑器"],
      },
    ],
  },
];

export default vim;
