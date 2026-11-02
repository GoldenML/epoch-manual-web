import type { CmdGroup } from "@/types/command";

const db: CmdGroup[] = [
  {
    title: "MySQL 连接与查询",
    items: [
      {
        name: "mysql 登录",
        desc: "连接数据库",
        examples: [
          { code: "mysql -uroot -p", note: "本机登录，回车后输入密码" },
          { code: "mysql -h 10.0.0.5 -P 3306 -uapp -p dbname", note: "远程登录并指定库" },
          { code: "mysql -uroot -p123456 -e \"show databases;\"", note: "直接执行 SQL 后退出（注意密码会进 history）" },
        ],
        options: [
          { flag: "-h", desc: "主机" },
          { flag: "-P", desc: "端口" },
          { flag: "-u", desc: "用户" },
          { flag: "-p", desc: "密码（与值之间不能有空格）" },
          { flag: "-e", desc: "执行 SQL" },
        ],
        tags: ["mysql", "登录", "连接"],
      },
      {
        name: "库表查看",
        desc: "常用元数据查询",
        examples: [
          { code: "show databases;" },
          { code: "use mydb;" },
          { code: "show tables;" },
          { code: "desc users;", note: "查看表结构" },
          { code: "show create table users\\G", note: "查看建表语句，\\G 竖排显示" },
          { code: "show table status like 'users';", note: "表大小、行数" },
        ],
        tags: ["库", "表", "结构"],
      },
      {
        name: "查询与更新",
        desc: "常用 DML",
        examples: [
          { code: "select * from users limit 10;" },
          { code: "select id, name from users where status = 1 order by id desc limit 20;" },
          { code: "update users set status = 0 where id = 1;" },
          { code: "insert into users (name, email) values ('a', 'a@x.com');" },
          { code: "delete from logs where created_at < '2026-01-01';" },
        ],
        danger: true,
        tip: "update/delete 前先用同样的 where 跑一遍 select 确认影响范围，并带上 limit。",
        tags: ["查询", "更新", "dml"],
      },
      {
        name: "表结构变更",
        desc: "加字段、加索引",
        examples: [
          { code: "alter table users add column phone varchar(20) default null;" },
          { code: "alter table users add index idx_email (email);" },
          { code: "alter table users modify column name varchar(100) not null;" },
          { code: "alter table users drop column phone;" },
        ],
        danger: true,
        tip: "大表 alter 会锁表，生产建议用 gh-ost / pt-online-schema-change。",
        tags: ["建表", "索引", "alter"],
      },
      {
        name: "用户与权限",
        desc: "创建账号、授权",
        examples: [
          { code: "create user 'app'@'10.0.0.%' identified by 'StrongPass!';" },
          { code: "grant select, insert, update on mydb.* to 'app'@'10.0.0.%';" },
          { code: "flush privileges;" },
          { code: "show grants for 'app'@'10.0.0.%';" },
          { code: "revoke all on mydb.* from 'app'@'10.0.0.%';" },
        ],
        tags: ["授权", "用户", "grant"],
      },
      {
        name: "性能排查",
        desc: "看进程、慢查询、执行计划",
        examples: [
          { code: "show processlist;", note: "当前连接与正在执行的 SQL" },
          { code: "show full processlist;" },
          { code: "explain select * from users where email = 'a@x.com';", note: "看是否走索引" },
          { code: "show variables like 'slow_query%';" },
          { code: "show engine innodb status\\G", note: "锁等待、死锁信息" },
          { code: "kill 12345;", note: "杀掉卡住的连接" },
        ],
        tags: ["性能", "慢查询", "explain", "锁"],
      },
    ],
  },
  {
    title: "MySQL 备份与恢复",
    items: [
      {
        name: "mysqldump",
        desc: "逻辑备份",
        examples: [
          { code: "mysqldump -uroot -p --single-transaction --quick mydb > mydb.sql", note: "InnoDB 一致性备份" },
          { code: "mysqldump -uroot -p --all-databases > all.sql" },
          { code: "mysqldump -uroot -p --single-transaction mydb users orders > part.sql", note: "只备份指定表" },
          { code: "mysqldump -uroot -p --no-data mydb > schema.sql", note: "只导结构" },
          { code: "mysqldump -uroot -p mydb | gzip > mydb.sql.gz", note: "压缩备份" },
        ],
        options: [
          { flag: "--single-transaction", desc: "不锁表的一致性快照" },
          { flag: "--no-data", desc: "只导结构" },
          { flag: "--databases", desc: "导出时包含建库语句" },
        ],
        tags: ["备份", "mysqldump", "导出"],
      },
      {
        name: "导入恢复",
        desc: "执行 SQL 文件",
        examples: [
          { code: "mysql -uroot -p mydb < mydb.sql" },
          { code: "gunzip < mydb.sql.gz | mysql -uroot -p mydb" },
          { code: "source /data/backup/mydb.sql", note: "在 mysql 客户端内执行" },
        ],
        danger: true,
        tip: "导入前确认目标库为空或已备份，SQL 里可能有 drop table。",
        tags: ["恢复", "导入"],
      },
      {
        name: "导入导出 CSV",
        desc: "与表格工具交换数据",
        examples: [
          { code: "select * from users into outfile '/tmp/users.csv' fields terminated by ',' optionally enclosed by '\"' lines terminated by '\\n';", note: "需 secure_file_priv 允许" },
          { code: "load data infile '/tmp/users.csv' into table users fields terminated by ',' ignore 1 lines;" },
          { code: "mysql -uroot -p -e \"select * from mydb.users\" --batch > users.tsv", note: "客户端侧导出，不受 secure_file_priv 限制" },
        ],
        tags: ["csv", "导入导出", "数据迁移"],
      },
    ],
  },
  {
    title: "Redis",
    items: [
      {
        name: "redis-cli 连接",
        desc: "连接与基本探测",
        examples: [
          { code: "redis-cli -h 127.0.0.1 -p 6379 -a password", note: "-a 会警告密码暴露在命令行" },
          { code: "redis-cli ping", note: "返回 PONG 表示正常" },
          { code: "redis-cli -n 1", note: "连接 1 号库" },
          { code: "redis-cli --scan --pattern 'user:*' | head", note: "安全遍历 key（生产禁用 keys *）" },
        ],
        tags: ["redis", "连接", "ping"],
      },
      {
        name: "基础读写",
        desc: "string / hash / list / set",
        examples: [
          { code: "set user:1:name \"tom\" EX 3600", note: "设置并 1 小时过期" },
          { code: "get user:1:name" },
          { code: "ttl user:1:name", note: "剩余过期时间，-1 表示永久" },
          { code: "hset user:1 name tom age 20 && hgetall user:1" },
          { code: "lpush queue job1 && lrange queue 0 -1" },
          { code: "sadd tags a b c && smembers tags" },
          { code: "del user:1:name" },
        ],
        tags: ["读写", "hash", "list", "set"],
      },
      {
        name: "状态与排查",
        desc: "内存、key 数量、慢查询",
        examples: [
          { code: "info memory", note: "内存使用情况" },
          { code: "info stats", note: "命中率、连接数" },
          { code: "dbsize", note: "当前库 key 数量" },
          { code: "slowlog get 10", note: "最近 10 条慢命令" },
          { code: "client list", note: "客户端连接列表" },
          { code: "memory usage user:1:name", note: "某个 key 占用" },
        ],
        tags: ["内存", "监控", "慢查询"],
      },
      {
        name: "持久化与危险命令",
        desc: "备份与清库",
        examples: [
          { code: "bgsave", note: "后台生成 RDB 快照" },
          { code: "config get dir", note: "RDB 文件目录" },
          { code: "config rewrite", note: "把运行时配置写回文件" },
          { code: "flushdb", note: "清空当前库" },
          { code: "flushall", note: "清空所有库" },
          { code: "keys *", note: "阻塞式遍历，生产禁用" },
        ],
        danger: true,
        tip: "flushall、keys *、monitor 在生产环境都可能造成事故，操作前确认实例与库号。",
        tags: ["备份", "flushall", "危险"],
      },
    ],
  },
];

export default db;
