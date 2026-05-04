# Patroit

体育比赛成绩录入管理系统，基于 Next.js 构建的前端应用。

## 技术栈

- **Next.js 16** + **React 19** + **TypeScript 6**
- **Tailwind CSS 4** — 样式
- 对接后端 REST API 实现成绩查询与录入

## 功能

- 成绩录入表单（编号 + 成绩）
- 已录入成绩列表，带总分汇总
- 通过 URL 参数传递操作员、赛事、组别信息
- 录入信息本地持久化（localStorage），刷新不丢失

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build
npm start
```

## 环境变量

复制 `.env.example` 为 `.env` 并配置：

| 变量                      | 说明        |
| ------------------------- | ----------- |
| `NEXT_PUBLIC_API_ENDPOINT` | 后端 API 地址 |
| `NEXT_PUBLIC_ORG_NAME`    | 组织名称      |

## 使用方式

通过 URL 参数初始化：

```
?init=操作员姓名&event_id=1&athlete_type=成人组
```

参数首次加载后会自动存入 localStorage，后续无需重复传递。
