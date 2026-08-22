---
id: beacon
short_title: BEACON
title: "BEACON: Behavioral and Semantic Enrichment of AlphaEarth Embeddings through Tri-Modal Contrastive Learning"
year: 2026
venue: "SIGSPATIAL '26: 34th ACM International Conference on Advances in Geographic Information Systems, Riverside, CA, USA"
type: Conference Paper
status: Accepted
authors:
  - Hao Tian
  - Heng Cai
  - Yifan Yang
themes:
  - Geospatial Foundation Models
  - Urban Representation Learning
  - Human Mobility
  - Human-Centered Urban Analytics
methods:
  - Tri-Modal Contrastive Learning
  - InfoNCE Alignment
  - AlphaEarth Embeddings
  - POI Text Embeddings
  - Frozen Linear and MLP Probes
links:
  - label: PDF
    url: ./publications/2026-beacon-tri-modal-contrastive-alphaearth.pdf
  - label: DOI
    url: https://doi.org/10.1145/3841645.3843383
  - label: Conference
    url: https://sigspatial2026.sigspatial.org/
connections:
  - target: heat-stress-digital-twins
    label: shares method lineage with campus-scale urban representation learning
  - target: agentic-urban-digital-twins
    label: supplies human-contextualized embeddings for urban digital twin reasoning
  - target: damagearbiter
    label: contrasts with post-event damage inference by modeling steady-state urban function
  - target: spatial-intelligence-public-infrastructure
    label: asks whether foundation-model embeddings can carry human context as public infrastructure
role: collaborative output
position:
  x: 620
  y: 300
color: "#d45d9c"
radius: 32
---

## One-Sentence Takeaway

Aligning AlphaEarth embeddings with POI semantics and hourly visitation during training makes an image-only representation substantially better at predicting human outcomes, without losing its physical mapping ability.

## Research Problem

Geospatial foundation models are trained mainly on Earth-observation imagery, so their embeddings encode physical and spectral structure well but capture human activity and urban function only weakly. Visually similar places, such as a medical office, a retail center, and a school inside comparable built forms, can serve very different social and economic roles, which limits these embeddings for human-centered urban analytics.

## Core Question

Do image-derived embeddings capture the functional and behavioral organization of urban space, or primarily its physical morphology, and can semantic and behavioral supervision be injected without giving up an image-only deployment path?

## Summary

BEACON is a tri-modal contrastive learning framework that treats POIs as anchors and aligns three complementary views of urban space: physical context from AlphaEarth embeddings, semantic context from POI description text, and behavioral context from hourly POI visitation profiles. The alignment happens only during pretraining. At inference the model consumes AlphaEarth inputs alone, so no POI or mobility data is required at deployment time. Evaluated on nine downstream tasks in the Houston metropolitan area against six baselines, BEACON improves human-centered prediction markedly while leaving physical and environmental performance essentially intact.

## Method Snapshot

Each POI gets two AlphaEarth spatial views by average pooling a 9x9 local window and a 19x19 context window over the 64-dimensional 10 m embedding field. POI text is templated from sub-category, category, name, and NAICS code, then encoded with a pretrained text embedder. Mobility is a 184-dimensional profile concatenating a normalized hour-of-week vector, a monthly vector, and four descriptors (log total visits, hour-of-week Shannon entropy, weekday-weekend gap, monthly coefficient of variation). All four embeddings are projected into a shared L2-normalized latent space and aligned with a symmetric CLIP-style InfoNCE objective over four weighted terms (AE-text 0.35, AE-mobility 0.35, text-mobility 0.15, AE local-context 0.15), temperature 0.07. After pretraining the frozen AlphaEarth projector maps the full embedding field from 64 to 128 dimensions, and regional embeddings come from mean pooling over target spatial units.

## Data and Study Area

Houston-The Woodlands-Sugar Land Metropolitan Statistical Area, 2024. 160,944 POIs with complete mobility records were retained for representation learning, split 80/10/10. Nine downstream tasks span socioeconomic, health, activity, environmental, land-cover, and land-use prediction across block groups, tracts, raster pixels, and parcels, evaluated with frozen linear and single-hidden-layer MLP probes over five 70/10/20 splits.

## Key Contributions

- A lightweight tri-modal contrastive objective that adapts AlphaEarth with semantic and behavioral supervision while keeping the deployed representation image-only.
- A nine-task Houston benchmark against six baselines: raw coordinates, Space2Vec, SatCLIP, TESSERA, Clay v1.5, and AlphaEarth.
- Evidence that human-contextualized embeddings improve human-centered prediction while largely preserving physical mapping performance.

## Results Snapshot

Under a linear probe, relative to AlphaEarth, R2 rises from 0.431 to 0.614 for obesity prevalence (+43%), from 0.393 to 0.528 for poor mental health (+34%), and from 0.379 to 0.463 for median household income (+22%). Nighttime lights also improve (0.680 vs 0.663). Physical targets barely move: PM2.5 goes from 0.845 to 0.856 and land-surface temperature is essentially unchanged, with Clay strongest on those tasks. Classification splits cleanly along the same seam: AlphaEarth wins land cover (Macro-F1 0.584 vs 0.567), a physical construct, while BEACON wins functional land use (0.471 vs 0.456), a human-defined one. Ablations show AE-Mobility and AE-POI each beat AE-only on human targets, and the full tri-modal model is best on both groups. Retrieval and loss-component analysis indicate mobility is the strongest human-centered supervisory signal.

## How This Connects to My Other Work

This node sits upstream of the atlas's applied urban-analytics branches. Where the heat-stress digital twin and the agentic urban digital twin work reason over urban state, BEACON asks what the underlying representation should encode before any reasoning starts. It also sharpens a recurring theme across the disaster branches: physical appearance and human consequence are related but not interchangeable, so a representation tuned only on imagery will systematically undersample the human side.

## Impact

The paper supplies an argument the atlas needed in explicit form: physical appearance and urban function are distinct representational dimensions of geographic space. That reframes foundation-model adoption in GIScience from "which backbone is strongest" to "what kind of supervision does a human-centered task require," and it shows the enrichment can be paid for once at training time rather than at every inference.

## Keywords

Geospatial foundation models, multimodal learning, contrastive learning, human mobility, urban representation learning, AlphaEarth, POI semantics.

## Public Links

- PDF: ../../publications/2026-beacon-tri-modal-contrastive-alphaearth.pdf
- DOI: https://doi.org/10.1145/3841645.3843383 (assigned in the camera-ready; resolves once the SIGSPATIAL '26 proceedings appear in the ACM Digital Library in November 2026)
- Conference: https://sigspatial2026.sigspatial.org/

## Citation

Tian, H., Cai, H., & Yang, Y. (2026). BEACON: Behavioral and Semantic Enrichment of AlphaEarth Embeddings through Tri-Modal Contrastive Learning. In The 34th ACM International Conference on Advances in Geographic Information Systems (SIGSPATIAL '26), November 03-06, 2026, Riverside, CA, USA. ACM, New York, NY, USA, 4 pages. https://doi.org/10.1145/3841645.3843383

## Chinese Summary

这篇 SIGSPATIAL '26 短论文提出 BEACON，一个三模态对比学习框架。它以 POI 为锚点，把城市空间的三种互补视角对齐：来自 AlphaEarth 的物理表征、来自 POI 文本的语义表征，以及来自逐小时到访模式的人类行为表征。关键设计是对齐只发生在预训练阶段，部署时模型只需要影像侧输入，不依赖 POI 或移动数据。在休斯敦都会区 2024 年数据、九个下游任务、六个基线的评测中，线性探针下肥胖率 R2 相对 AlphaEarth 提升 43%，心理健康 34%，家庭收入中位数 22%，而地表温度、PM2.5 等物理环境任务基本持平。土地覆盖（物理构造）仍是 AlphaEarth 最好，功能性土地利用（人为定义构造）则是 BEACON 最好——这一对照干净地把物理结构和人类定义结构分开了。结论是：物理外观与城市功能是地理空间中两个不同的表征维度，给地理空间基础模型补上语义与行为监督，能显著扩展它在以人为中心的城市分析中的适用范围。
