---
id: rapidmap
short_title: RAPIDMap
title: "RAPIDMap: Rapid Multi-Agent Pipeline for Interpretable Disaster Mapping from Satellite and Street-view Imagery"
year: 2026
venue: "CaGIS Conference 2026: Cartography and Geographic Information Society, September 8-11, 2026, St. Louis, MO, USA (Student Paper Competition, oral presentation)"
type: Conference Paper
status: Accepted
authors:
  - Yifan Yang
  - Lei Zou
themes:
  - Disaster Mapping
  - Multi-Agent Systems
  - Vision-Language Models
  - Cross-View Imagery
  - Zero-Shot Learning
methods:
  - Multi-Agent Task Decomposition
  - Zero-Shot Vision-Language Inference
  - Image Quality Restoration
  - Normalized Cross-Severity Error
  - Geo-Referenced Damage Mapping
links:
  - label: PDF
    url: ./publications/2026-rapidmap-cagis-multi-agent-disaster-mapping.pdf
  - label: Repository
    url: https://github.com/rayford295/RAPID
  - label: Conference
    url: https://cartogis.org/
connections:
  - target: rapid
    label: extends the four-agent pipeline by replacing the reasoning layer with a spatially explicit mapping agent
  - target: hyperlocal-disaster
    label: uses the same dataset as the bi-temporal street-view benchmark
  - target: disastervlp
    label: shares method lineage with single-model vision-language damage perception
role: first-author or lead-position output
repository:
  name: rayford295/RAPID
  url: https://github.com/rayford295/RAPID
  preview: Zero-shot agents that turn satellite and street-view imagery into a geo-referenced disaster map with per-location semantics.
  language: Python
  stars: 0
  forks: 0
  commits: 0
position:
  x: 690
  y: 545
color: "#5fc26a"
radius: 32
---

## One-Sentence Takeaway

A conventional damage WebGIS tells you where a building is broken; RAPIDMap asks whether zero-shot agents can attach the semantics -- what happened, how badly, how confident, and what to do next -- to every mapped location without any manual annotation.

## Research Problem

Operational damage maps such as the LA County wildfire viewer are built by inspecting each structure by hand, assigning a categorical status, geo-referencing it, and publishing it as a point layer. The result is spatially precise and semantically empty: it carries a severity label and nothing about the fine-grained extent or character of the damage, and it costs field inspections and multi-stage geospatial integration that a time-sensitive response cannot afford. The AI alternatives inherit their own limits -- fine-tuning demands annotated data, single-event training does not generalize, and single-modal observation discards the complementary value of overhead context and ground-level evidence.

## Core Question

Can zero-shot AI agents, orchestrated within an end-to-end mapping pipeline, produce rapid, accurate, and interpretable disaster maps across diverse geographic contexts and hazard types?

## Summary

RAPIDMap chains four zero-shot agents into a mapping pipeline. The Disaster Perception Agent recognizes data modality and hazard type from the input and emits structured task-planning signals. The Image Restoration Agent diagnoses degradation in street-view and remote-sensing imagery and applies constrained enhancement only where it preserves disaster-relevant evidence. The Damage Recognition Agent produces severity classifications, object-level indicators, and confidence scores across cross-view and cross-temporal settings without task-specific fine-tuning. The Disaster Mapping Agent then does the work the abstract is named for: geo-referencing, cross-view alignment between remote sensing and street view, and projection of the structured damage outputs into map-based visualizations and GIS-ready records. Disaster type classification reaches 0.86-0.92 overall accuracy across backbones, and the pipeline runs entirely zero-shot.

## Method Snapshot

Agents are instantiated over multiple backbones -- GPT-5.1, GPT-5.1-mini, Gemini-2.5-flash, Gemini-2.5-Pro, and Gemini-3-Pro -- so every stage is reported as a cross-model comparison rather than a single configuration; the mapping agent adds a reasoning and evaluation module powered by GPT-5.2 that produces the map-ready output and scores the map-level disaster information. Restoration is graded by a composite quality score Q = 0.4C + 0.4S - 0.2N over normalized contrast, sharpness, and an NIQE proxy, which makes "did enhancement help" a measurable question rather than a default step. Severity error uses Normalized Cross-Severity Error, weighting a misclassification by its distance from the true level and normalizing to [0, 1], so confusing distant severities is penalized more heavily than confusing adjacent ones. Report quality is scored on factual consistency, plausibility, information completeness, and actionability of recovery recommendations, by an LLM judge and by human evaluators in parallel.

## Data and Study Area

Four datasets selected for cross-view, bi-temporal, and multi-hazard coverage, across California and Florida. Dataset A: 300 paired street-view and satellite images of Hurricane Ian (2022), 3 severity levels, from CVDisaster. Dataset B: 300 bi-temporal street-view images of Hurricane Milton (2024), 3 levels, from the bi-temporal benchmark. Dataset C1: 188 post-disaster street-view images spanning drought (40), earthquake (36), flood (38), ice storm (44), and wildfire (30), from the Incidents dataset. Dataset C2: 295 post-disaster wildfire street-view images at 5 severity levels, from LA DINS.

## Key Contributions

- A mapping agent that closes the loop from image-level damage inference to a geo-referenced product, rather than stopping at a classification score.
- Zero-shot operation end to end, which removes the annotation bottleneck that keeps fine-tuned damage models out of the first days of a response.
- Cross-model reporting at every stage, which surfaces that no single backbone wins everywhere: model-task fit is itself the finding.
- A restoration stage with an explicit accept/reject criterion, so enhancement never silently smooths away the evidence it was meant to clarify.
- Per-location disaster intelligence -- hazard type, severity, recognized objects, confidence, and recovery recommendation -- as the map payload, which is what a conventional damage WebGIS does not carry.

## Results Snapshot

Disaster type classification over seven categories reaches 0.86-0.92 overall accuracy across the three backbones tested; earthquake imagery is the hardest class at F1 0.65-0.71, which is consistent with earthquake damage being visually ambiguous in ground-level views. Restoration gains are modality-dependent: on satellite imagery the baseline and planner-guided chains lead (Q 0.62 to 0.73 and 0.71) while the image-only Gemini branch does worse for lack of structural cues, and on street view that ordering reverses (0.75 to 0.79). On severity recognition the model with the highest accuracy also attains the lowest NCSE on all three datasets, so accuracy and severity-aware reliability move together here rather than trading off.

## How This Connects to My Other Work

RAPIDMap and RAPID are the two terminal layers of the same four-agent pipeline: RAPID ends in a Disaster Reasoning Agent that writes FEMA-aligned explanations, RAPIDMap ends in a Disaster Mapping Agent that writes coordinates. Read together they say that the structured output of a zero-shot damage pipeline is useful in two different registers -- as narrative for a responder and as a layer for a GIS -- and that the same upstream agents serve both. Dataset B is the bi-temporal benchmark built in the hyperlocal damage assessment paper, reused here under zero-shot inference instead of supervised fine-tuning. DisasterVLP asked whether a vision-language model can perceive multidimensional damage at all; RAPIDMap asks what has to be true for that perception to become a map.

## Impact

Accepted at CaGIS 2026 (September 8-11, St. Louis, MO) for the Student Paper Competition and selected for oral presentation. Supported by the National Academies of Sciences, Engineering, and Medicine Gulf Research Program (SCON-10000653, SCON-10001536) and the U.S. National Science Foundation (2318206).

## Keywords

Damage assessment, disaster mapping, large language models, multi-agent systems, remote sensing, street-view imagery.

## Public Links

- PDF: ../../publications/2026-rapidmap-cagis-multi-agent-disaster-mapping.pdf
- Repository: https://github.com/rayford295/RAPID (the abstract also ships in the repository's `CaGIS2026/` folder)
- Conference: https://cartogis.org/

No DOI has been issued: the CaGIS Student Paper Competition abstract is distributed through the conference rather than a DOI-registering proceedings, so the archived PDF is the citable copy.

## Citation

Yang, Y., & Zou, L. (2026). RAPIDMap: Rapid Multi-Agent Pipeline for Interpretable Disaster Mapping from Satellite and Street-view Imagery. CaGIS Conference 2026, September 8-11, 2026, St. Louis, MO, USA. Student Paper Competition, oral presentation.

## Chinese Summary

RAPIDMap 是 RAPID 管线在 CaGIS 2026 学生论文竞赛上的扩展摘要版本，区别不在长短，而在最后一层：RAPID 的第四个智能体做因果推理和 FEMA 恢复建议，RAPIDMap 的第四个智能体做制图——地理配准、遥感与街景的跨视角对齐、生成可直接进 GIS 的结构化产品。动机来自一个具体对照：洛杉矶县 2025 野火的 WebGIS 损毁图每栋建筑都靠人工勘察打标签，空间精度很高但语义近乎为零，而且要花掉应急响应最缺的时间。RAPIDMap 让地图的每个位置带上灾害类型、损毁等级、识别到的物体、置信度和恢复建议，且全流程零样本、不做任何微调。七类灾害识别总体准确率 0.86–0.92，地震最难（F1 0.65–0.71）；图像修复的最优策略随模态翻转——卫星影像上启发式基线和规划器链最好（Q 0.62→0.73/0.71），街景上纯图像模型反超（0.75→0.79）；严重度识别中准确率最高的模型在三个数据集上同时取得最低 NCSE。已被 CaGIS 2026 录用为口头报告。
