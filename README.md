# 数据管理平台

基于 Vue 3 + Vite + Arco Design Pro + ECharts 构建的数据可视化管理后台。

## How to Run

```bash
# 使用 Docker Compose 启动（推荐）
docker-compose up --build -d

# 停止服务
docker-compose down

# 查看日志
docker-compose logs -f
```

本地开发：

```bash
cd frontend-admin
npm install
npm run dev
```

## Services

| 服务 | 端口 | 说明 |
|------|------|------|
| frontend-admin | 8081 | 管理后台前端 |

## 测试账号

| 角色 | 账号 | 密码 |
|------|------|------|
| 管理员 | admin | admin123 |

## 访问地址

- 管理后台: http://localhost:8081

## 题目内容

构建一个 Vue3 + Vite + ArcoDesignPro + ECharts 的前端项目，实现数据可视化管理后台。

---

## 项目介绍

### 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Arco Design Vue** - 字节跳动企业级设计系统
- **ECharts** - 数据可视化图表库
- **Vue Router** - 官方路由管理器
- **Pinia** - 状态管理库
- **TypeScript** - 类型安全

### 功能特性

- 📊 数据洞察仪表盘
- 📈 多维度图表展示
- 🔍 数据搜索过滤
- 📱 响应式布局（支持大屏、平板、移动端）
- 🎨 现代化 UI 设计

### 项目结构

```
├── frontend-admin/          # 管理后台前端
│   ├── src/
│   │   ├── components/      # 公共组件
│   │   ├── layouts/         # 布局组件
│   │   ├── views/           # 页面视图
│   │   ├── router/          # 路由配置
│   │   ├── stores/          # 状态管理
│   │   └── main.ts          # 入口文件
│   ├── Dockerfile           # Docker 构建文件
│   └── nginx.conf           # Nginx 配置
├── docker-compose.yml       # Docker Compose 配置
├── .gitignore              # Git 忽略文件
└── README.md               # 项目说明
```
