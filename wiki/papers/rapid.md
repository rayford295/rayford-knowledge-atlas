---
id: rapid
short_title: RAPID
title: "RAPID: A Reproducible Multi-Agent Pipeline for Interpretable Disaster Damage Assessment from Satellite and Street-View Imagery"
year: 2026
venue: "SIGSPATIAL '26: 34th ACM International Conference on Advances in Geographic Information Systems (oral presentation)"
type: Conference Paper
status: Accepted
authors:
  - Yifan Yang
  - Wenjing Gong
  - Kai Zhang
  - Lei Zou
  - Zheng Tu
  - Heng Li
  - Zhenlong Li
  - Xinyue Ye
themes:
  - Disaster Damage Assessment
  - Multi-Agent Systems
  - Vision-Language Models
  - Cross-View Imagery
  - Zero-Shot Learning
methods:
  - Multi-Agent Task Decomposition
  - Zero-Shot Vision-Language Inference
  - Image Quality Restoration
  - Normalized Cross-Severity Error
  - LLM and Human Report Evaluation
links:
  - label: Repository
    url: https://github.com/rayford295/RAPID
  - label: arXiv
    url: https://arxiv.org/abs/2606.21819
  - label: Conference
    url: https://sigspatial2026.sigspatial.org/
connections:
  - target: hyperlocal-disaster
    label: uses the same dataset as the bi-temporal street-view benchmark
  - target: disastervlp
    label: extends single-model VLM damage perception into an autonomous multi-agent pipeline
  - target: damagearbiter
    label: shares method lineage with multimodal arbitration over disagreeing damage signals
  - target: satellite-to-street
    label: shares the cross-view satellite-and-street framing
  - target: human-evidence-disaster-ai
    label: answers what counts as citable evidence in an automated damage assessment
role: first-author or lead-position output
repository:
  name: rayford295/RAPID
  url: https://github.com/rayford295/RAPID
  preview: Four coordinated agents for perception, restoration, recognition, and reasoning over disaster imagery.
  language: Python
  stars: 0
  forks: 0
  commits: 0
position:
  x: 600
  y: 480
color: "#8ee06a"
radius: 38
---

## One-Sentence Takeaway

Four specialized agents coordinated through task decomposition can assess disaster damage across satellite and street-view imagery with no task-specific fine-tuning, and can explain the assessment well enough for a responder to act on it.

## Research Problem

Disaster damage assessment is dominated by supervised, task-specific models. They break down exactly where they are needed most: under domain shift between hazards and regions, on long-tailed severity distributions where catastrophic cases are rare, and across heterogeneous sources that mix overhead and ground-level views. Retraining per hazard and per sensor does not scale to the pace at which extreme events now arrive.

## Core Question

Can an autonomous multi-agent pipeline achieve multimodal disaster understanding across geospatial sources without task-specific fine-tuning, coordinate perception, restoration, recognition, and reasoning into structured interpretable output, and produce location-specific intelligence that is actually decision-relevant?

## Summary

RAPID decomposes damage assessment into four collaborating agents rather than treating it as one classification problem. A Disaster Perception Agent identifies hazard type and image modality zero-shot and plans the downstream workflow. An Image Restoration Agent diagnoses blur, haze, and low-light degradation and applies enhancement only when it measurably helps. A Damage Recognition Agent produces structured severity diagnoses across cross-view, bi-temporal, and wildfire settings. A Disaster Reasoning Agent synthesizes those structured outputs into causal explanations and recovery recommendations. The pipeline reaches 0.92 overall accuracy on multi-disaster type classification and up to 0.627 on cross-view severity prediction, entirely zero-shot.

## Method Snapshot

The Perception Agent splits into ModePerceiver (image mode plus hazard type), DisasterReasoner (natural-language scene explanation grounded in visual evidence), and TaskPlanner (agent orchestration). The Restoration Agent runs three competing branches -- a heuristic baseline, a model-guided planner, and image-only enhancement -- and accepts a branch only when a composite quality score Q, combining contrast, sharpness, and an NIQE proxy, clears the original by a preset margin. The Recognition Agent covers four tasks: paired RSI plus SVI hurricane prediction, pre/post bi-temporal change analysis, five-level wildfire classification, and object-level detection with instance segmentation. Severity error is measured with Normalized Cross-Severity Error, which divides absolute level distance by K-1 so that a two-level miss is penalized more than an adjacent one. The Reasoning Agent consumes structured JSON and applies templated chain-of-thought to produce FEMA-aligned recommendations, scored by both LLM judges and human experts on factual consistency, causal plausibility, completeness, and actionability.

## Data and Study Area

Three dataset families across California and Florida. Dataset A: 300 paired street-view and satellite hurricane images, 3 severity levels, from CVDisaster. Dataset B: 300 bi-temporal street-view hurricane images, 3 levels, from the bi-temporal benchmark. Dataset C1: 188 post-disaster street-view images spanning drought, earthquake, flood, ice storm, and wildfire, from the Incidents dataset. Dataset C2: 295 wildfire images at 5 severity levels from LA DINS.

## Key Contributions

- A four-agent decomposition that turns damage assessment from one opaque prediction into a sequence of inspectable, individually evaluable steps.
- Zero-shot operation across hazards, sensors, and severity schemes, with no task-specific fine-tuning anywhere in the pipeline.
- A restoration stage with an accept/reject gate, so enhancement is applied only when it demonstrably preserves disaster-relevant evidence rather than smoothing it away.
- NCSE as a severity-aware error metric, motivated by the finding that errors concentrate at adjacent levels where plain accuracy is uninformative.
- Report quality evaluated by both LLM judges and human experts, not by proxy metrics alone.

## Results Snapshot

Multi-disaster type classification reaches 0.92 overall accuracy with GPT-5-mini, ahead of GPT-5.1 at 0.88 and Gemini-2.5-flash at 0.86. Restoration improves quality scores across every disaster type and modality, with the winning branch varying by modality: the heuristic baseline is best on hurricane satellite imagery (0.62 to 0.73) while model-guided enhancement leads on street-view (0.75 to 0.79). Severity prediction has no single winner across datasets -- Gemini-3-Pro leads Dataset A at 0.627, GPT-5.1 leads Dataset B at 0.591, GPT-5-mini leads Dataset C at 0.573 -- which is itself a finding about model-task fit rather than a ranking. Errors cluster at adjacent severity levels throughout, which is what motivated NCSE.

## How This Connects to My Other Work

RAPID is the integration point for several earlier branches. Dataset B is the bi-temporal street-view benchmark from the hyperlocal damage assessment paper, so this work reuses that data under a completely different inference regime. DisasterVLP asked whether a vision-language model can perceive multidimensional damage at all; RAPID asks what has to surround such a model for its output to be trustworthy and actionable. DamageArbiter attacks the adjacent problem of reconciling disagreeing signals. The accountability layer explored in GeoSteward grows directly out of what this pipeline surfaced about unverified agent claims.

## Impact

Accepted at ACM SIGSPATIAL 2026 and selected for oral presentation. The extended abstract RAPIDMap was separately accepted at CaGIS 2026 (September 8-11, St. Louis) for oral presentation. The repository publishes prompts alongside code for every agent, which makes the pipeline reproducible in a way that fine-tuned checkpoints are not.

## Keywords

Disaster assessment, vision-language models, cross-view imagery, zero-shot learning, multi-agent pipeline, damage severity, interpretable GeoAI.

## Public Links

- Repository: https://github.com/rayford295/RAPID
- arXiv: https://arxiv.org/abs/2606.21819
- Conference: https://sigspatial2026.sigspatial.org/

## Citation

Yang, Y., Gong, W., Zhang, K., Zou, L., Tu, Z., Li, H., Li, Z., & Ye, X. (2026). RAPID: A Reproducible Multi-Agent Pipeline for Interpretable Disaster Damage Assessment from Satellite and Street-View Imagery. arXiv. https://arxiv.org/abs/2606.21819

## Chinese Summary

RAPID 把灾害损毁评估拆成四个协作智能体，而不是当成一个端到端的分类问题。感知智能体零样本判断灾害类型和影像模态并规划后续流程；图像修复智能体诊断模糊、雾霾、低光问题，并且只在复合质量分 Q 确实超过原图预设幅度时才接受增强结果——这个"接受/拒绝"门控是为了避免把灾害证据一起抹平；损毁识别智能体在跨视角、双时相、野火三类场景下输出结构化的严重度诊断；推理智能体再把这些结构化输出综合成因果解释和符合 FEMA 指南的恢复建议。全流程零样本，不做任何任务特定微调。多灾种类型分类总体准确率 0.92，跨视角严重度预测最高 0.627。误差集中在相邻等级，这也是论文提出 NCSE（按 K-1 归一化的跨等级误差）的原因——普通准确率在这种误差结构下信息量太低。论文已被 ACM SIGSPATIAL 2026 录用为口头报告，扩展摘要 RAPIDMap 另被 CaGIS 2026 录用为口头报告。
