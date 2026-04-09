# 管理后台前端 (frontend-admin)

数据可视化管理后台，基于 Vue 3 + Vite + Arco Design + ECharts 构建。

## 技术栈

- Vue 3.4 + Composition API
- Vite 5.1
- TypeScript 5.3
- Arco Design Vue 2.57
- ECharts 5.5
- Vue Router 4.3
- Pinia 2.1

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 目录结构

```
src/
├── components/      # 公共组件
├── layouts/         # 布局组件
├── views/           # 页面视图
├── router/          # 路由配置
├── stores/          # 状态管理
├── assets/          # 静态资源
├── App.vue          # 根组件
└── main.ts          # 入口文件
```

## 功能模块

- 数据洞察仪表盘
- 图表报表展示
- 数据搜索过滤
- 响应式布局适配
