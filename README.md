# 介绍

Vue3 ElementPlus Admin 是一个精心打造的后台管理系统模板，基于 Vue3、Vite、TypeScript、Element Plus 等主流技术构建。

## 技术栈

- **Vue 3.5+**: Composition API 配合 `<script setup>`
- **Vite 7**: 快速的构建工具
- **TypeScript 5.9+**: 类型安全的代码
- **Element Plus 2.13+**: UI 组件库
- **Pinia 3.0+**: 状态管理
- **Vue Router 4.6+**: 路由
- **UnoCSS**: 原子化 CSS 引擎
- **Sass**: CSS 预处理器
- **Axios**: HTTP 客户端
- **Vitest**: 单元测试
- **ESLint**: 代码检查

## 项目结构

```
src/
├── common/          # 共享工具、组件、资产、组合式函数
├── http/           # Axios 配置
├── layouts/        # 布局组件（侧边栏、头部、面包屑等）
├── pages/          # 页面模块（登录、仪表盘、演示、错误页面）
├── pinia/          # Pinia 状态管理
├── plugins/        # 插件注册
├── router/        # 路由配置和守卫
├── App.vue         # 根组件
└── main.ts        # 入口文件
```

## 推荐环境

- Node.js 20.19+ 或 22.12+
- npm（包管理器）

## 使用方法

<details>
<summary>安装依赖</summary>

```bash
npm i
```

</details>

<details>
<summary>本地开发</summary>

```bash
npm run dev
```

</details>

<details>
<summary>构建</summary>

```bash
# 构建预发布版本
npm run build:staging

# 构建生产版本
npm run build
```

</details>

<details>
<summary>预览</summary>

```bash
npm run preview
```

</details>

<details>
<summary>代码检查</summary>

```bash
# 代码检查和修复
npm run lint

# 运行测试
npm run test
```

</details>

## 功能特点

- **用户管理**：登录、退出演示
- **权限管理**：页面级（动态路由）、按钮级（指令和函数）、路由守卫
- **多环境**：开发、预发布、生产
- **多主题**：常规、深蓝、海洋蓝
- **多布局**：左侧边栏、顶部、混合
- **仪表盘**：不同用户展示不同仪表盘
- **错误页面**：403、404
- **移动端兼容**：响应式布局
- **其他功能**：SVG 精灵图、动态侧边栏/面包屑、标签页、全屏、组合式函数

## 提交规范

```
feat:     新功能
fix:      Bug 修复
perf:     性能优化
refactor: 代码重构
docs:     文档
types:    类型相关
test:     单元测试
ci:       CI/CD 工作流
revert:   回滚
chore:    杂项（依赖、配置）
```
