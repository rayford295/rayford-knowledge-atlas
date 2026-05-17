# Fork 指南：做一个你自己的 Knowledge Atlas

这个仓库可以 fork 成另一个研究者、实验室、课程或项目的个人“输入-输出”知识图谱。核心目标很简单：把阅读输入、桥接问题、研究输出和 Scholar 元数据放进同一个公开系统。

## 1. Fork 并改名

1. 打开 [Rayford Knowledge Atlas](https://github.com/rayford295/rayford-knowledge-atlas)。
2. 点击 `Fork`。
3. 把 fork 后的仓库改成你自己的名字，例如 `YourName-Knowledge-Atlas`。
4. 在 GitHub repository settings 里启用 GitHub Pages，来源选择 `main` branch root。

网站通常会发布到：

```text
https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/
```

## 2. 替换身份信息和链接

优先修改这些文件：

- `README.md`
- `README.zh-CN.md`
- `package.json`
- `index.html`
- `raw/scholar/google-scholar.json`
- `scripts/fetch-scholar.js`
- `.github/workflows/update-scholar.yml`

把 Rayford/Yifan 的网站、GitHub、Google Scholar、仓库名替换成你自己的。

## 3. 添加你的研究产出

模板文件在：

```text
wiki/papers/_template.md
```

复制成一个新文件，例如：

```text
wiki/papers/my-first-paper.md
```

然后填写：

- `id`
- `short_title`
- `title`
- `year`
- `venue`
- `type`
- `status`
- `authors`
- `themes`
- `methods`
- `links`
- `connections`
- `repository`
- `position`
- `color`
- `radius`

以 `_` 开头的文件会被构建脚本忽略，所以 `_template.md` 不会出现在图谱里。

## 4. 添加阅读输入和桥接问题

如果你希望图谱展示“什么塑造了你的研究”，而不只是展示“你产出了什么”，使用这些模板：

```text
wiki/readings/_template.md
wiki/questions/_template.md
```

阅读页面要保持公开安全。不要发布原始划线、私密想法或长篇版权摘录。只使用元数据、笔记数量、主题和你自己的综合理解。

## 5. 连接图谱

每个节点最好至少连接到另一个节点。关系标签可以写：

- `extends`
- `uses the same dataset as`
- `shares method lineage with`
- `contrasts with`
- `opens a new branch from`

好的图谱关系应该解释你的研究脉络，而不仅仅是论文引用关系。

## 6. 本地构建

运行：

```bash
npm run build
```

脚本会读取 `wiki/papers/*.md`、`wiki/readings/*.md`、`wiki/questions/*.md` 和 Scholar 快照，并生成 `data.js`。

## 7. 添加 Google Scholar

从你的 Google Scholar profile URL 里找到 user id：

```text
https://scholar.google.com/citations?user=YOUR_ID
```

然后修改：

- `scripts/fetch-scholar.js`
- `raw/scholar/google-scholar.json`
- `.github/workflows/update-scholar.yml`
- `index.html`
- `README.md`

再运行：

```bash
npm run scholar:update
```

## 8. 添加微信读书输入

如果要生成阅读输入节点，先在本地配置微信读书 API key：

```bash
export WEREAD_API_KEY=wrk-...
npm run weread:update
npm run build
```

提交前请检查自动生成的阅读页面。

## 9. 发布

提交并推送：

```bash
git add .
git commit -m "Customize my knowledge atlas"
git push
```

GitHub Pages 会自动部署网站。如果 Actions 已启用，Scholar 每周刷新也会自动运行。

## 自定义检查清单

- 替换所有个人链接。
- 替换 paper 页面。
- 替换或删除自动生成的 reading 页面。
- 添加能连接输入和输出的长期问题。
- 替换 raw source records。
- 更新 theme 和 method 标签。
- 调整 graph positions，避免节点重叠。
- 改成适合你领域或个人风格的颜色。
- 运行 `npm run build` 后检查 `data.js`。
- 打开 GitHub Pages，测试搜索、筛选和节点点击。
