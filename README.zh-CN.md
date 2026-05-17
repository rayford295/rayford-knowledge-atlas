# Rayford Knowledge Atlas

[一键打开网站](https://rayford295.github.io/GeoGraph/) | [做一个自己的版本](https://rayford295.github.io/GeoGraph/fork.html) | [Google Scholar](https://scholar.google.com/citations?user=B-fiSHwAAAAJ) | [打开学术主页](https://rayford295.github.io/) | [English README](./README.md)

Rayford Knowledge Atlas 是我的公开“输入-输出”知识图谱。它把我的阅读输入和研究输出放在同一个系统里，让论文、书章、合作论文、Google Scholar 记录、GitHub 仓库、方法、概念和长期问题可以互相连接。

这个仓库的核心判断很简单：我的论文数量不可能比我读过的书更多。论文是我写向世界的输出，阅读是世界写进我判断力的输入。

<p align="center">
  <a href="https://rayford295.github.io/GeoGraph/">
    <img src="./assets/rayford-geograph-preview.gif" alt="Rayford Knowledge Atlas 网站动态预览" width="920">
  </a>
</p>

## 这是什么

- 一个面向公众开放的 GeoAI、GIScience、阅读和创业思考知识图谱。
- 一个输入-输出图谱：微信读书里的书籍节点连接到长期问题，长期问题再连接到论文和 Scholar 输出。
- 一个由 markdown 维护的结构化知识库，适合人和 agent 一起持续更新。
- 一个每周自动更新的 Google Scholar 公开快照，其中包含合作论文和非一作论文。
- 一个公开安全的阅读层：只保存书名、作者、笔记数量、主题和个人综合框架，不公开原始划线和私密想法。

## 一键入口

- 网站地址：[rayford295.github.io/GeoGraph](https://rayford295.github.io/GeoGraph/)
- Fork 指南：[rayford295.github.io/GeoGraph/fork.html](https://rayford295.github.io/GeoGraph/fork.html)
- GitHub 仓库：[github.com/rayford295/GeoGraph](https://github.com/rayford295/GeoGraph)
- Google Scholar：[scholar.google.com/citations?user=B-fiSHwAAAAJ](https://scholar.google.com/citations?user=B-fiSHwAAAAJ)
- 主站地址：[rayford295.github.io](https://rayford295.github.io/)

## 前端体验

- 第一屏就是交互式知识星图。
- 支持关键词搜索、主题筛选、节点卡片，以及 `Network`、`Timeline`、`Flow` 三种视图。
- `Flow` 视图把阅读输入、桥接问题和研究输出分开摆放。
- 点击节点后，右侧 inspector 会展示来源、主题、方法或阅读视角、链接、指标和图谱关系。
- Scholar 自动节点让合作论文和非一作论文也能进入输出层，而不是只展示手工写过的项目页。

## 知识库结构

- `wiki/papers/`：精修过的研究输出页面。
- `wiki/readings/`：公开安全的微信读书阅读输入页面。
- `wiki/questions/`：把阅读和论文连接起来的长期问题。
- `wiki/concepts/`：可复用概念页面。
- `wiki/comparisons/`：跨论文、跨来源的综合叙事。
- `raw/papers/`：论文和仓库的原始记录。
- `raw/scholar/google-scholar.json`：最新 Google Scholar 公开 profile 快照。
- `raw/weread/public-reading-index.json`：公开安全的微信读书元数据、笔记数量和阅读图谱种子。
- `scripts/build-map.js`：把论文、阅读、问题和 Scholar 记录编译成 `data.js`。
- `scripts/fetch-scholar.js`：刷新 Google Scholar 公开指标。
- `scripts/fetch-weread.js`：通过 `WEREAD_API_KEY` 刷新公开安全的阅读节点。

## 当前输出层

- 手工精修的论文/项目节点：ArcGIS Text SAM、GeoLocator、Hyperlocal Disaster Damage Assessment、DisasterVLP、DamageArbiter、Satellite-to-Street。
- Google Scholar 节点：来自公开 Scholar profile 的合作论文和非一作论文。

## 当前输入层

第一版微信读书种子导入了笔记量最高的一批公开安全阅读节点，覆盖组织压力、人物传记、AI 未来、创业判断、公共表达和社会想象等主题。原始划线和私密想法不会进入公开仓库。

## 本地更新流程

```bash
npm run scholar:update
npm run weread:update
npm run build
```

修改 `wiki/papers/`、`wiki/readings/` 或 `wiki/questions/` 后运行 `npm run build`。只有在本地已经配置 `WEREAD_API_KEY` 时才运行 `npm run weread:update`。

## 隐私和版权边界

这个仓库是公开的。因此阅读层只提交元数据、数量、主题和我自己的综合框架，不提交微信读书原始划线、私密想法或长篇版权摘录。

## 做一个自己的版本

这个仓库仍然可以作为模板 fork。先打开 [Make Your Own 页面](https://rayford295.github.io/GeoGraph/fork.html)，再看 [docs/FORK_GUIDE.md](./docs/FORK_GUIDE.md)。
