# Rayford Knowledge Atlas 下一阶段执行计划

> 给 Hermes：按顺序执行，不要同时大改所有页面。每完成一个阶段就本地验证、提交、推送，再进入下一阶段。

## 目标

把 Rayford Knowledge Atlas 从“已经很强的知识原型”升级成“更直接、更好看、更像公开知识作品的网站与仓库系统”。

## 总体判断

当前项目最有价值的不是继续堆更多节点，而是把已有内容变成更清晰的公共体验。下一阶段应同时推进四条线：

1. 首页叙事和视觉层级
2. 页面结构与移动端体验
3. 数据构建与验证可靠性
4. 知识资产前台化

## 阶段拆分

### Phase 1：首页体验降噪与舞台化

目标：让第一次访问的人先被吸引，再理解，再探索。

应优先完成：

- 让首页默认突出 graph 舞台，而不是三栏同时抢焦点
- 让 inspector 改成默认弱化，交互后再强化
- 让左侧 rail 支持折叠或收起
- 把 guided trails 做成更像“展览入口”而不是普通按钮
- 让标题区更像 hero，而不是控制台标题

主要文件：

- `index.html`
- `styles.css`
- `script.js`

预期结果：

- 中间图谱更大
- 第一屏更安静
- 首访者知道从哪里开始
- trail 变成真正的 narrative entry points

### Phase 2：仓库工程稳固化

目标：把内容驱动系统从“能跑”升级成“可靠”。

应完成：

- 给 `package.json` 增加正式 `verify` 命令
- 新增 `scripts/verify-atlas.js`
- 检查重复 id、断裂 connections、缺失必填字段
- 为 `scripts/build-map.js` 后续引入正式 frontmatter 解析做准备

主要文件：

- `package.json`
- `scripts/build-map.js`
- `scripts/verify-atlas.js`（新建）
- `docs/OPERATIONS.md`

预期结果：

- 本地和 CI 都能执行一致的完整校验
- atlas 数据问题不再依赖肉眼发现

### Phase 3：Readings / Advisor / Papers 三页性格化

目标：让分页面不只是“分开”，而是“各自成立”。

应完成：

- `readings.html` 更像公共阅读书房
- `advisor.html` 更像判断工作台
- `papers.html` 更像研究作品墙
- 三页共享系统，但有不同 accent 和节奏

主要文件：

- `readings.html`
- `advisor.html`
- `papers.html`
- `styles.css`
- 可能拆出分页面样式文件

预期结果：

- 每页都有清晰气质
- 不再所有页面都是“同一种卡片系统”
- 读者更容易记住各页用途

### Phase 4：知识资产前台化

目标：把仓库里已经存在但前台感知较弱的资产做成站点亮点。

应完成：

- 前台展示 `wiki/maps/`
- 前台展示 `wiki/comparisons/`
- 前台展示 `wiki/concepts/`
- 增加 current questions / featured synthesis / atlas journal 入口

主要文件：

- 新页面或新 section
- `wiki/` 中相关内容索引
- `index.html`
- `script.js`

预期结果：

- 网站不只是一张图和几张列表页
- 更像一座数字知识展馆

## 执行顺序建议

### Step 1
先完成 Phase 1 的首页改造，并立刻上线。

原因：

- 这是对外感知变化最大的部分
- 能最快提升“精彩、直接、美观”的效果
- 不需要先做重型工程迁移

### Step 2
补齐 verify 流程。

原因：

- 后面继续改页面和内容时，验证能力会越来越重要
- 这能避免 atlas 结构在扩张中悄悄变脆

### Step 3
再处理三个分页面的视觉与内容节奏。

### Step 4
最后再做更深层的数据架构升级，比如：

- `data.js` -> `data.json`
- frontmatter 正式解析
- 更长期的静态站模板化改造

## 当前建议立即落地的第一批任务

1. 新增首页 hero 辅助文案与精选叙事卡
2. 默认弱化右侧 inspector
3. 给左侧 rail 增加折叠能力
4. 增强 trail 卡片视觉权重
5. 减少首页第一屏边框噪声与控制器噪声
6. 增加正式 `npm run verify`

## 提交策略

建议每个阶段单独提交：

- `feat: redesign atlas homepage focus and trail entry`
- `feat: add atlas verification script and npm verify`
- `feat: restyle readings advisor and papers pages`
- `feat: surface maps concepts and comparisons`

## 验证策略

每个阶段至少执行：

```bash
npm run build
npm run verify
```

如果改动首页或分页，还要本地打开：

- `index.html`
- `readings.html`
- `advisor.html`
- `papers.html`

重点检查：

- 无 broken connection
- 首页首屏是否更清晰
- trail 是否更像入口而不是普通按钮
- 小屏布局是否仍可用
- detail panel 是否仍然能稳定展示

## 现在就开始的动作

从 Phase 1 开始。
