---
id: crossviewgate
short_title: CrossViewGate
title: "When Satellite and Street Views Disagree: Cross-View Complementarity in Disaster Damage Assessment"
year: 2026
venue: "GeoSearch '26: 5th ACM SIGSPATIAL International Workshop on Searching and Mining Large Collections of Geospatial Data, Riverside, CA, USA (lightning talk)"
type: Conference Paper
status: Accepted
authors:
  - Yifan Yang
  - Lei Zou
themes:
  - Disaster Damage Assessment
  - Cross-View Imagery
  - Wildfire Risk
  - Cross-View Complementarity
methods:
  - Cross-View Fusion
  - Conflict-Case Mining
  - Visibility-Conditioned Fusion Gating
  - Temperature Calibration
  - Field-of-View Intervention
links:
  - label: PDF
    url: ./publications/2026-when-satellite-and-street-views-disagree-geosearch.pdf
  - label: DOI
    url: https://doi.org/10.1145/3849732.3857333
  - label: Repository
    url: https://github.com/rayford295/CrossViewGate
  - label: Conference
    url: https://sigspatial2026.sigspatial.org/
connections:
  - target: hyperlocal-disaster
    label: extends street-view damage assessment by asking which view carries the evidence for a building
  - target: damagearbiter
    label: shares method lineage with arbitration over disagreeing damage signals
  - target: rapid
    label: supplies a per-building rule for how an agentic pipeline should weight the two views
  - target: satellite-to-street
    label: shares the cross-view satellite-and-street framing
  - target: tri-environmental-la-wildfire
    label: studies the same 2025 LA wildfire at building level
  - target: human-evidence-disaster-ai
    label: asks which image actually counts as evidence for a given building
role: first-author or lead-position output
repository:
  name: rayford295/CrossViewGate
  url: https://github.com/rayford295/CrossViewGate
  preview: Cross-view complementarity in disaster damage assessment, studied through the conflict cases where satellite and street-view models disagree.
  language: Python
  stars: 0
position:
  x: 480
  y: 95
color: "#d96832"
radius: 32
---

## One-Sentence Takeaway

Satellite and street views see different parts of a damaged building, and the cases where their models disagree show how much of that complementary evidence fusion actually uses, which view carries it, and where current methods fall short.

## Research Problem

Satellite imagery mainly shows roofs; ground-level imagery shows facades and debris that overhead sensors cannot fully detect. The views are complementary, and cross-view methods usually report that fusing them raises average accuracy. That average says little about whether the complementary evidence is used, because for most buildings the two views agree. The informative records are the conflict cases, where independently trained single-view models disagree: at least one view carries evidence the other lacks, whether damage is visible only from one side, vegetation hides the building, or the views are misaligned.

## Core Question

On conflict cases, how much complementary headroom do fusion methods leave, can a readable gate recover part of it from cues about whether the ground image shows the building, does aiming the ground view at the building change the value of fusion, and does the spatial density of conflicts track damage without labels?

## Summary

The paper mines conflict cases from three paired street/overhead collections: CAL FIRE inspection photographs from the 2025 Eaton wildfire, and 360-degree street-view panoramas from Hurricanes Ian and Milton, each matched to very-high-resolution overhead tiles. Conflicts make up 9.6–33.2% of the test data. On them, an oracle that picks the correct single view would add 0.367–0.475 conflict accuracy over the better single view, and still 0.19–0.32 over the best evaluated fusion method. A linear fusion gate over building-visibility features, calibrated confidences, and the disagreement itself recovers part of that headroom where ground photographs are aimed at the building, a controlled field-of-view experiment supports building-oriented framing as a driver of which view carries the evidence, and the spatial density of conflicts, computed without labels, correlates with tile-level wildfire damage. Conflict cases thus show how much complementary evidence fusion uses, which view carries it under each hazard and capture setting, and where current methods fall short.

## Method Snapshot

Four models per dataset (street-only, remote-only, concatenation, and an end-to-end cross-view fusion head) on ResNet-18 backbones, five seeds. The conflict subset is every sample where the two single-view predictions differ. Each view gets a validation-fitted temperature, so all training-free baselines run on calibrated probabilities. The gate takes eleven z-scored features: four building-visibility features from a frozen SegFormer-B0 (building pixel ratio, centered-crop ratio, their difference, centroid distance) and seven prediction features (per-view confidence and entropy, confidence gap, Jensen-Shannon divergence, disagreement flag), and outputs softmax weights over the street, remote, and fusion probabilities. The field-of-view intervention crops each panorama to a 90-degree window aimed either at the building mask's mean azimuth or at a random azimuth, holding size and projection fixed.

## Data and Study Area

Eaton wildfire, Altadena, CA (property-centric DINS photographs; 6.5k/1,966/1,984 train/val/test pairs, split by property and tile). Hurricane Ian, Sanibel Island, FL (CVIAN pairing from CVDisaster; 3,248/573/300 pairs). Hurricane Milton, Florida (1,740/307/254 pairs). An audit found 299 of 300 Ian test samples share a Mapillary sequence with training data, so a repaired spatial-block protocol is also reported; macro-F1 drops 0.05–0.10 under it for every model.

## Key Contributions

- Conflict cases as the diagnostic subset for cross-view complementarity, with an oracle single-view gap and a gap-closure metric that measure how much view-specific evidence fusion leaves unused.
- A readable linear fusion gate that beats both end-to-end fusion and calibrated probability averaging on property-centric wildfire photographs, with the highest oracle-gap closure of any method.
- A controlled field-of-view intervention that supports building-oriented framing of the street view as a driver of which view carries the evidence.
- Conflict density as a label-free spatial damage indicator, distinct from model uncertainty.

## Results Snapshot

On Eaton conflicts the gate reaches 0.768 accuracy, +0.072 over end-to-end fusion (p < 1e-4) and +0.051 over calibrated averaging (95% CI [+0.026, +0.077], p = 0.0001), an oracle-gap closure of 0.59 (calibrated averaging 0.52, end-to-end fusion 0.45). A two-expert gate that can only reweight street and remote reaches 0.734, so the headline gain combines visibility-based weighting and the added fusion expert. On the panoramic hurricane data, where street views rarely show a building prominently (mean building pixel ratio 0.027 on Ian vs. 0.119 on Eaton), the gate is statistically indistinguishable from end-to-end fusion. Building-centered cropping raises the conflict gain of fusion from 0.064 to 0.109 on Ian and from 0.067 to 0.149 on Milton, while random crops of the same geometry do not (0.042 and 0.055). Tile-level conflict density correlates with Eaton damage at Spearman r = 0.615 (nominal p = 0.001, 25 tiles; damage is spatially autocorrelated, Moran's I = 0.27), while predictive entropy anti-correlates (r = -0.37 to -0.52). The two-expert gate's coefficients read as one rule: weight the street view when it is confident and the building is centered in the frame.

## How This Connects to My Other Work

This node began as the FireBridge placeholder in the wildfire branch and is now the published form of that line. It sits between the street-view damage work (hyperlocal assessment, DisasterVLP) and the multi-view systems (RAPID, RAPIDMap, DamageArbiter): those systems combine views, and this paper measures how much complementary evidence such fusion uses and supplies a per-building rule for weighting the views. It also studies the same 2025 LA wildfire that the tri-environmental cost paper measures at regional scale.

## Impact

The paper turns "does cross-view fusion help?" into "which view carries the evidence, where, and why?". Which view that is depends on hazard and capture setting: on property-centric wildfire photographs visibility cues identify when the street view is decisive, while on panoramic hurricane imagery calibrated averaging or end-to-end fusion suffices and framing ground photographs on structures raises the value of fusion. Practitioners get a cheap, auditable gate and a label-free conflict map that can flag damaged areas in a new collection before any labels exist.

## Keywords

Cross-view complementarity, street-view imagery, satellite imagery, disaster damage assessment, cross-view fusion, GeoAI.

## Public Links

- PDF: ../../publications/2026-when-satellite-and-street-views-disagree-geosearch.pdf
- DOI: https://doi.org/10.1145/3849732.3857333 (assigned in the camera-ready; resolves once the SIGSPATIAL '26 workshop proceedings appear in the ACM Digital Library in November 2026)
- Repository: https://github.com/rayford295/CrossViewGate
- Conference: https://sigspatial2026.sigspatial.org/

## Citation

Yang, Y., & Zou, L. (2026). When Satellite and Street Views Disagree: Cross-View Complementarity in Disaster Damage Assessment. In The 5th ACM SIGSPATIAL International Workshop on Searching and Mining Large Collections of Geospatial Data (GeoSearch '26), November 03-06, 2026, Riverside, CA, USA. ACM, New York, NY, USA, 4 pages. https://doi.org/10.1145/3849732.3857333

## Chinese Summary

这篇 GeoSearch '26 短论文（闪电报告，与 Lei Zou 合作）的出发点是卫星影像与街景影像看到的是受损建筑的不同部分（屋顶 vs. 立面与废墟），二者互补；但平均准确率看不出融合方法是否真正用上了这些互补证据，因为多数建筑两个视角的判断本来就一致。论文把"冲突样本"——两个独立训练的单视角模型判断不一致的建筑——作为诊断子集。数据来自 2025 年 Eaton 山火的 CAL FIRE 现场勘查照片，以及飓风 Ian、Milton 的 360° 街景全景，均与高分辨率俯视影像配对，冲突样本占测试集的 9.6–33.2%。在冲突样本上，"每次都选对单一视角"的 oracle 比更好的单视角模型高出 0.367–0.475 的冲突准确率，比最好的融合方法仍高 0.19–0.32，说明现有融合方法留下了大量某一视角独有的证据没有用上。论文提出一个基于建筑可见性、校准置信度和分歧特征的线性融合门控：在以建筑为中心拍摄的山火勘查照片上，它比端到端融合高 +0.072、比校准概率平均高 +0.051（冲突准确率），在全景街景数据上则与端到端融合无显著差异。视场角干预实验显示：把全景裁向建筑会提高融合在冲突样本上的收益（Ian 0.064→0.109，Milton 0.067→0.149），而同尺寸的随机裁剪不会，支持"街景是否对准建筑"决定了哪个视角承载证据。此外，冲突样本的空间密度无需标签即可与瓦片级灾损相关（Spearman r = 0.615，25 个瓦片）。一句话：挖掘冲突样本，把"融合有没有用"变成"哪个视角承载证据、在哪里、为什么"。该节点原为 FireBridge 占位节点，现升级为正式发表版本；2026-10-12 按 Lei Zou 的意见改为互补框架并更名。
