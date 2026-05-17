# Hermes 评审：Rayford Knowledge Atlas 优化建议

这份文档记录了一次 Hermes 对 Rayford Knowledge Atlas 当前网站和仓库的产品与体验评审。目标不是改变项目的精神气质，而是让这个已经很有想法的系统更容易被第一次访问的人看懂、更容易被分享，也更容易形成持续探索。

## 现在已经做得很好的部分

- 项目有非常鲜明的核心判断：输入塑造输出。
- 图谱式首页有很强的辨识度和记忆点。
- 仓库结构清晰，已经不像一个普通项目仓库，更像一个公开知识系统。
- 阅读层、问题层、输出层之间已经形成了有说服力的思想结构。
- Scholar 同步和 WeRead 同步让这个 atlas 有“活的系统”的感觉，而不是静态作品集。

## 核心判断

这个项目下一步最值得优化的，不是审美，而是首访清晰度。

现在一个技术背景较强的访客花一点时间是能看懂的，但第一次进入的人依然很可能会问：

- 我现在看到的到底是什么？
- 我应该从哪里开始点？
- 哪些节点最重要？
- 为什么有些节点是手工精修的，有些是 Scholar 自动生成的？

所以最优先的三件事是：

1. 提高 onboarding 能力
2. 降低第一屏的信息密度
3. 把图谱从“酷的交互界面”升级成“有导览路径的叙事产品”

## Priority 0：最值得先做的修改

### 1. 给第一次访问的人一句导览语

建议在 graph 标题下面直接补一句极短的话，例如：

> Start with a reading input, a bridge question, or a research output to see how they connect.

或者写成中文气质更强的一句。

作用很简单：给第一次进来的人一个明确动作，而不是让他先猜交互逻辑。

### 2. 给三层结构补一个小 legend

需要明确解释三类节点分别是什么：

- Inputs
- Questions
- Outputs

一个紧凑的颜色说明或一行结构说明，会立刻降低理解门槛。

### 3. 把两个 `All` 筛选器改名

现在界面里有两个 `All`：

- 一个属于 layer filter
- 一个属于 theme filter

这会制造不必要的瞬间困惑。建议改成：

- `All Layers`
- `All Themes`

这是一个非常小，但回报很高的 UX 修正。

### 4. 把 raw JSON 入口换成面向人的页面

当前 WeRead 卡片直接链接到 raw JSON。对开发者这没问题，但对普通访客会显得很“仓库内部”。建议改成：

- 一个阅读层页面
- 或一个格式化的 HTML 页面
- 或一个 modal / inspector 风格的阅读摘要页

同样的原则也适用于其他偏工程化入口：对公开访客来说，优先给“可读页面”，而不是原始数据文件。

### 5. 左侧默认先展示“精选视图”，不要一上来把控制器全给满

当前左栏第一屏同时承载了：

- 总体统计
- Scholar 卡片
- WeRead 卡片
- fork 入口
- layer filter
- theme filter
- 节点列表

功能上都合理，但首访负担偏大。建议默认改成：

- 顶部总览
- layer 筛选
- 少量高频 theme
- 少量 featured nodes
- 其余内容通过 `More` 折叠展开

这样不会损失能力，但会显著降低第一屏压迫感。

## Priority 1：产品层升级方向

### 6. 增加 guided trails，把 atlas 变成可走的认知路径

这个项目最强的部分，其实不是 graph 本身，而是“阅读 -> 问题 -> 输出”的转化逻辑。建议把这种结构直接产品化，给出几条 curated trails，例如：

- Biography -> Judgment -> Founder questions
- Geo-privacy -> GeoLocator -> Public infrastructure
- Disaster evidence -> DisasterVLP -> DamageArbiter

这样访客看到的就不只是一个节点集合，而是一套思考路径。

### 7. 更明显地区分手工精修输出和 Scholar 自动输出

Scholar nodes 很有价值，因为它防止 atlas 退化成单纯的一作展示页。但它们不应该和手工精修页面争夺同样的视觉权重。建议：

- 手工精修输出使用更强的视觉层级
- Scholar 自动节点使用更轻样式
- 或者增加切换：`Curated outputs only` / `All outputs`

### 8. 移动端不要只做堆叠，建议做成标签页结构

现在的小屏适配是可用的，但还不是最顺手的。更推荐的移动端信息架构是：

- Graph
- Node List
- Detail

这样用户不会在一个很长的纵向页面里来回跳。

### 9. 给节点、主题、模式增加可分享 deep links

如果选中某个 node、theme 或 mode 时 URL 能同步更新，那么这个 atlas 会更容易：

- 分享具体节点
- 回到某次浏览状态
- 发送一条有主题的探索路径给别人

### 10. 把首页 manifesto 再向前推一步

README 里最有力量的一句话，其实值得直接放到首页更醒目的位置：

> Outputs show what I write into the world. Inputs show what I let the world write into me.

这句本身就是项目的精神锚点。

## Priority 2：技术与体验打磨

### 11. 补齐社交分享元信息

建议增加：

- `og:title`
- `og:description`
- `og:image`
- `twitter:card`
- canonical URL

这样项目在被分享到社交平台、Slack 或其他地方时会更完整。

### 12. 后续可以考虑把图谱数据从 `data.js` 调整为 `data.json`

当前做法可以工作，但如果未来节点越来越多，把内容和渲染逻辑分开会更利于扩展和维护。

### 13. 搜索加轻量 debounce，并为图谱增长提前准备

当前节点数量下性能没有问题，但随着 atlas 增长，搜索、过滤和列表展示都可以更渐进式一些。

### 14. 交互控件补足可访问性语义

例如：

- `aria-pressed`
- `aria-selected`
- 更明确的 focus 状态

这些都是小修，但能提升整体完成度。

### 15. 在 inspector 里加入“继续探索相关节点”的快捷动作

现在用户打开一个节点后，下一步还需要自己重新找。可以考虑直接提供 next related node 一类的跳转入口，让探索链更顺。

## 建议的实施顺序

如果只想先做一小轮高回报优化，建议顺序如下：

1. 加 onboarding 文字和 legend
2. 把两个 `All` 改名
3. 把 raw JSON 入口改成人类可读页面
4. 把左侧默认状态改成精选视图
5. 加入 guided trails
6. 优化移动端导航
7. 增加 deep links 和社交分享 metadata

## 总结

Rayford Knowledge Atlas 已经不只是一个项目页面，而是一个很有思想的公开知识产品。下一步最值得做的，不是继续堆更多信息，而是把已有的信息组织成更清晰的公共体验。

一句话总结就是：

- 保留项目的思想锋芒
- 降低第一次访问时的理解成本
- 增加导览路径，让访客不是只看到一个图，而是真正走进这套知识结构里
