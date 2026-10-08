---
id: crossviewgate
short_title: CrossViewGate
title: "Trust the View That Sees the Target: Mining Cross-View Conflicts for Reliability-Gated Disaster Damage Assessment"
year: 2026
venue: "GeoSearch '26: 5th ACM SIGSPATIAL International Workshop on Searching and Mining Large Collections of Geospatial Data, Riverside, CA, USA (lightning talk)"
type: Conference Paper
status: Accepted
authors:
  - Yifan Yang
themes:
  - Disaster Damage Assessment
  - Cross-View Imagery
  - Wildfire Risk
  - Reliability Estimation
methods:
  - Cross-View Fusion
  - Conflict-Case Mining
  - Visibility-Conditioned Reliability Gating
  - Temperature Calibration
  - Field-of-View Intervention
links:
  - label: PDF
    url: ./publications/2026-trust-the-view-cross-view-conflicts-geosearch.pdf
  - label: DOI
    url: https://doi.org/10.1145/3849732.3857333
  - label: Repository
    url: https://github.com/rayford295/CrossViewGate
  - label: Conference
    url: https://sigspatial2026.sigspatial.org/
connections:
  - target: hyperlocal-disaster
    label: extends street-view damage assessment by asking when the street view should be trusted
  - target: damagearbiter
    label: shares method lineage with arbitration over disagreeing damage signals
  - target: rapid
    label: supplies a per-building rule for which view an agentic pipeline should believe
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
  preview: Conflict-case mining and a visibility-conditioned reliability gate for satellite and street-view damage assessment.
  language: Python
  stars: 0
position:
  x: 480
  y: 95
color: "#d96832"
radius: 32
---

## One-Sentence Takeaway

When satellite and street-view models disagree about a damaged building, the right move is not to fuse them symmetrically but to trust the view that actually sees the target.

## Research Problem

Cross-view damage assessment usually fuses overhead and ground-level imagery symmetrically and reports a gain in average accuracy. That average hides where fusion matters: most buildings look the same from both views, and the informative records are the conflict cases, where independently trained single-view models disagree because one sensor is blind (a facade gutted under an intact-looking roof, or trees hiding a destroyed roof from the road).

## Core Question

On conflict cases, how much information do fusion methods leave unused, can a per-building decision about which view to trust recover it, and is that decision causally driven by whether the ground image sees the building?

## Summary

The paper mines conflict cases from three paired street/overhead collections: CAL FIRE inspection photographs from the 2025 Eaton wildfire, and 360-degree street-view panoramas from Hurricanes Ian and Milton, each matched to very-high-resolution overhead tiles. Conflicts make up 9.6–33.2% of the test data. On them, an oracle that picks the correct single view would add 0.367–0.475 conflict accuracy over the better single view, and still 0.19–0.32 over the best evaluated fusion method. A linear reliability gate over building-visibility features, calibrated confidences, and the disagreement itself recovers part of that headroom where ground photographs are aimed at the building, a controlled field-of-view experiment supports building-oriented framing as a driver of when fusion pays, and the spatial density of conflicts, computed without labels, correlates with tile-level wildfire damage.

## Method Snapshot

Four models per dataset (street-only, remote-only, concatenation, and an end-to-end cross-view fusion head) on ResNet-18 backbones, five seeds. The conflict subset is every sample where the two single-view predictions differ. Each view gets a validation-fitted temperature, so all training-free baselines run on calibrated probabilities. The gate takes eleven z-scored features: four building-visibility features from a frozen SegFormer-B0 (building pixel ratio, centered-crop ratio, their difference, centroid distance) and seven prediction features (per-view confidence and entropy, confidence gap, Jensen-Shannon divergence, disagreement flag), and outputs softmax weights over the street, remote, and fusion probabilities. The field-of-view intervention crops each panorama to a 90-degree window aimed either at the building mask's mean azimuth or at a random azimuth, holding size and projection fixed.

## Data and Study Area

Eaton wildfire, Altadena, CA (property-centric DINS photographs; 6.5k/1,966/1,984 train/val/test pairs, split by property and tile). Hurricane Ian, Sanibel Island, FL (CVIAN pairing from CVDisaster; 3,248/573/300 pairs). Hurricane Milton, Florida (1,740/307/254 pairs). An audit found 299 of 300 Ian test samples share a Mapillary sequence with training data, so a repaired spatial-block protocol is also reported; macro-F1 drops 0.05–0.10 under it for every model.

## Key Contributions

- Conflict cases as the unit of analysis, with an oracle single-view gap and a gap-closure metric that measure how much arbitration between existing predictors could still gain.
- A readable linear reliability gate that beats both end-to-end fusion and calibrated probability averaging on property-centric wildfire photographs, with the highest oracle-gap closure of any method.
- A controlled field-of-view intervention that supports building-oriented framing of the street view as a driver of when fusion pays.
- Conflict density as a label-free spatial damage indicator, distinct from model uncertainty.

## Results Snapshot

On Eaton conflicts the gate reaches 0.768 accuracy, +0.072 over end-to-end fusion (p < 1e-4) and +0.051 over calibrated averaging (95% CI [+0.026, +0.077], p = 0.0001), an oracle-gap closure of 0.59 (calibrated averaging 0.52, end-to-end fusion 0.45). A two-expert gate that can only reweight street and remote reaches 0.734, so the headline gain combines visibility-based weighting and the added fusion expert. On the panoramic hurricane data, where street views rarely show a building prominently (mean building pixel ratio 0.027 on Ian vs. 0.119 on Eaton), the gate is statistically indistinguishable from end-to-end fusion. Building-centered cropping raises the conflict gain of fusion from 0.064 to 0.109 on Ian and from 0.067 to 0.149 on Milton, while random crops of the same geometry do not (0.042 and 0.055). Tile-level conflict density correlates with Eaton damage at Spearman r = 0.615 (nominal p = 0.001, 25 tiles; damage is spatially autocorrelated, Moran's I = 0.27), while predictive entropy anti-correlates (r = -0.37 to -0.52). The two-expert gate's coefficients read as one rule: trust the street view when it is confident and the building is centered in the frame.

## How This Connects to My Other Work

This node began as the FireBridge placeholder in the wildfire branch and is now the published form of that line. It sits between the street-view damage work (hyperlocal assessment, DisasterVLP) and the multi-view systems (RAPID, RAPIDMap, DamageArbiter): those systems combine views, and this paper supplies the per-building rule for which view to believe. It also studies the same 2025 LA wildfire that the tri-environmental cost paper measures at regional scale.

## Impact

The paper turns "does cross-view fusion help?" into "which view should be trusted, where, and why?". For practitioners it gives a cheap rule that pays where ground evidence is aimed at the building and costs nothing where it is not, and a label-free conflict map that can flag damaged areas in a new collection before any labels exist.

## Keywords

Cross-view fusion, street-view imagery, satellite imagery, disaster damage assessment, reliability estimation, GeoAI.

## Public Links

- PDF: ../../publications/2026-trust-the-view-cross-view-conflicts-geosearch.pdf
- DOI: https://doi.org/10.1145/3849732.3857333 (assigned in the camera-ready; resolves once the SIGSPATIAL '26 workshop proceedings appear in the ACM Digital Library in November 2026)
- Repository: https://github.com/rayford295/CrossViewGate
- Conference: https://sigspatial2026.sigspatial.org/

## Citation

Yang, Y. (2026). Trust the View That Sees the Target: Mining Cross-View Conflicts for Reliability-Gated Disaster Damage Assessment. In The 5th ACM SIGSPATIAL International Workshop on Searching and Mining Large Collections of Geospatial Data (GeoSearch '26), November 03-06, 2026, Riverside, CA, USA. ACM, New York, NY, USA, 4 pages. https://doi.org/10.1145/3849732.3857333

## Chinese Summary

这篇 GeoSearch '26 短论文（闪电报告）把跨视角灾损评估中的"冲突样本"——两个独立训练的单视角模型（卫星与街景）判断不一致的建筑——作为分析单元。数据来自 2025 年 Eaton 山火的 CAL FIRE 现场勘查照片，以及飓风 Ian、Milton 的 360° 街景全景，均与高分辨率俯视影像配对，冲突样本占测试集的 9.6–33.2%。在冲突样本上，"每次都选对单一视角"的 oracle 比更好的单视角模型高出 0.367–0.475 的冲突准确率，比最好的融合方法仍高 0.19–0.32，说明融合方法没有用好"何时信哪个视角"这一信息。论文提出一个基于建筑可见性、校准置信度和分歧特征的线性可靠性门控：在以建筑为中心拍摄的山火勘查照片上，它比端到端融合高 +0.072、比校准概率平均高 +0.051（冲突准确率），在全景街景数据上则与端到端融合无显著差异。视场角干预实验显示：把全景裁向建筑会提高融合在冲突样本上的收益（Ian 0.064→0.109，Milton 0.067→0.149），而同尺寸的随机裁剪不会，支持"街景是否对准建筑"是融合是否有用的驱动因素。此外，冲突样本的空间密度无需标签即可与瓦片级灾损相关（Spearman r = 0.615，25 个瓦片）。一句话：信那个真正看到目标的视角。该节点原为 FireBridge 占位节点，现升级为正式发表版本。
