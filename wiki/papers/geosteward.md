---
id: geosteward
short_title: GeoSteward
title: "GeoSteward: An Accountable GeoAI Risk Analyst for Location-Based Resilience Understanding"
year: 2026
venue: "OASIS @ ACM SIGSPATIAL 2026, Track A: Disaster Resilience and Vulnerability Analysis"
type: Working Paper
status: In Progress
authors:
  - Yifan Yang
  - Lei Zou
themes:
  - Accountable GeoAI
  - Disaster Resilience
  - Agent Harness Engineering
  - Responsible GeoAI
methods:
  - Geospatial Harness Engineering
  - Executable Spatial Validity Checks
  - Append-Only Provenance
  - Declarative Claim and Distribution Policy
  - Progressive Web App Delivery
links:
  - label: Live System
    url: https://rayford295.github.io/GeoSteward/
  - label: App
    url: https://rayford295.github.io/GeoSteward/app/
  - label: Workshop
    url: https://sigspatial2026.sigspatial.org/
connections:
  - target: responsible-geoai
    label: extends the STEP governance framework into an enforcing runtime layer
  - target: rapid
    label: opens a new branch from the multi-agent pipeline toward accountability rather than capability
  - target: damagearbiter
    label: informs the treatment of disagreeing evidence as something to declare, not resolve silently
  - target: spatial-intelligence-public-infrastructure
    label: answers how a spatial-intelligence service states the limits of its own competence
  - target: ai-systems-human-judgment
    label: answers when an agent's output is allowed to support a real decision
role: first-author or lead-position output
repository:
  name: rayford295/GeoSteward
  url: https://rayford295.github.io/GeoSteward/
  preview: Accountable GeoAI risk analyst; PWA plus a Steward Harness enforcing outcome, process, and institutional validity.
  language: Python
  stars: 0
  forks: 0
  commits: 0
position:
  x: 380
  y: 110
color: "#00a5b5"
radius: 30
---

## One-Sentence Takeaway

Most agent submissions demonstrate autonomy; GeoSteward demonstrates accountability, by putting a risk-analyst agent inside a harness that refuses uncitable claims and states where its competence ends.

## Research Problem

Autonomous GIS agents can already run a spatial pipeline end to end. What they cannot yet do is tell you when their output should be believed. An agent that silently extrapolates tile-level evidence into a parcel-level claim, or answers confidently about a location it has never evaluated, is more dangerous than one that fails loudly, because the failure is invisible at exactly the moment a decision depends on it.

## Core Question

What technical layer has to sit around a GeoAI agent for its claims to be accountable rather than merely fluent, and can that layer be enforced at runtime instead of promised in a policy document?

## Summary

GeoSteward is an AI-powered WebGIS and installable smartphone app that answers what hazards threaten a place, how exposed and vulnerable it is, and what the evidence actually supports. Its distinguishing feature is the Steward Harness: a runtime layer enforcing three validity conditions during operation. Competence is deliberately scoped by place -- hazard monitoring is nationwide, while exposure, vulnerability, and damage analysis exist only inside three deep-case study areas, and the app says so rather than extrapolating. An address outside those areas is told it is outside the evaluated areas; an address the app cannot resolve is told that, instead of being guessed at.

## Method Snapshot

The Steward Harness enforces validity at three layers. **Outcome**: executable spatial checks including CRS assertions, multiscale raster-by-vector join integrity, sanity bounds, and mandatory uncertainty fields. **Process**: append-only provenance for every artifact, fail-closed stages, and clickable lineage from any map layer back to timestamped source snapshots. **Institutional**: two declarative policy planes in a single file, where the claim plane scopes what the agent may assert by role, evidence tier, resolution, and geographic authority, and the distribution plane scopes what a build may publish by artifact resolution cap and audience, verified in CI so a violation fails the deploy. Every factual sentence must cite an artifact ID; sentences that cannot be cited are refused rather than softened, with a closed set of exemptions covering questions, general safety advice, and statements about what the answer cannot say.

## Data and Study Area

A Tier-1 nationwide watch layer refreshed hourly from USGS, NWS, NHC, and NIFC, with per-source failures declared rather than hidden. Three deep-case areas carry tile-level exposure, social vulnerability, and cross-view evidence: the 2025 Eaton Fire, Hurricane Milton in 2024, and Hurricane Ian in 2022.

## Key Contributions

- A working demonstration that accountability for a GeoAI agent can be a technical layer with enforcement points, not a set of aspirations in a paper.
- Conditional competence as a design principle: the system publishes the geographic boundary of what it can evaluate and refuses outside it.
- A two-plane policy design separating what may be _claimed_ from what may be _published_, after the first plane alone proved insufficient in practice.
- Refusal as the default for uncitable statements, with a closed exemption set, so an unanticipated phrasing costs a refusal rather than an uncited claim.

## How This Connects to My Other Work

GeoSteward is the accountability counterpart to RAPID. RAPID showed that a coordinated multi-agent pipeline can produce structured, decision-relevant disaster intelligence; GeoSteward asks what has to be true for anyone to act on such output. It also operationalizes Responsible GeoAI: where the STEP framework names security, trustworthiness, equity, and philanthropy as dimensions to reason about, the Steward Harness turns two of them into runtime checks that can fail a build.

## Impact

Being prepared as an entry for OASIS at ACM SIGSPATIAL 2026, Track A. The framing follows the autonomous-GIS-to-accountable-GeoAI-agents line on verifiable evaluation environments and geospatial harness engineering, and the repository keeps append-only history, including a preserved archive of the earlier Super Typhoon Bavi case study from its DisasterPilot phase.

## Keywords

Accountable GeoAI, agent harness, disaster resilience, social vulnerability, provenance, conditional competence, progressive web app.

## Public Links

- Live system: https://rayford295.github.io/GeoSteward/
- App: https://rayford295.github.io/GeoSteward/app/

## Citation

Yang, Y., & Zou, L. (2026). GeoSteward: An Accountable GeoAI Risk Analyst for Location-Based Resilience Understanding and Decision-Making. Work in progress, prepared for OASIS at ACM SIGSPATIAL 2026, Track A: Disaster Resilience and Vulnerability Analysis.

## Chinese Summary

GeoSteward 是一个 AI 驱动的 WebGIS 与可安装手机应用（PWA），回答三个问题：一个地方现在面临什么灾害威胁、暴露度和脆弱性如何、证据到底支持什么样的决策。它和大多数 agent 工作的区别在于侧重点——别人展示的是自主性（LLM 能自己跑通 GIS 流程），它展示的是**问责性**。核心是 Steward Harness：一个在运行时强制三层有效性的技术层。结果层做可执行的空间检查（CRS 断言、多尺度栅格×矢量连接完整性、边界合理性、强制不确定性字段）；过程层为每个产物做只追加溯源，阶段失败即关闭，任意图层都能点回带时间戳的源快照；制度层用一个文件里的两套声明式策略平面——claim 平面限定 agent 能断言什么（按角色、证据等级、分辨率、地理权限，瓦片级证据不得产出地块级结论），distribution 平面限定一次构建能发布什么，由 CI 校验、违规直接让部署失败。每一句事实陈述都必须引用一个 artifact ID，引用不了的句子是被**拒绝**而不是被措辞软化。能力范围按地点显式划界：灾害监测覆盖全美，但暴露度、脆弱性和损毁分析只存在于三个深度案例区（2025 Eaton 火灾、2024 飓风 Milton、2022 飓风 Ian），区外的地址会被明确告知"不在已评估范围内"，而不是被外推。这是投给 OASIS @ ACM SIGSPATIAL 2026 Track A 的工作。
