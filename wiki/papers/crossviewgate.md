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

The paper mines conflict cases from three paired street/overhead collections: CAL FIRE inspection photographs from the 2025 Eaton wildfire, and 360-degree street-view panoramas from Hurricanes Ian and Milton, each matched to very-high-resolution overhead tiles. Conflicts make up 10–33% of the data. On them, an oracle that trusts whichever existing view is correct beats every fusion method tested by 0.37–0.41 accuracy, and the gap survives longer training, calibration, and backbone changes. A linear reliability gate over building-visibility features, calibrated confidences, and the disagreement itself recovers part of that gap on the wildfire data, a field-of-view experiment shows target alignment is the causal variable, and the spatial density of conflicts turns out to be a label-free damage map.

## Method Snapshot

Four models per dataset (street-only, remote-only, concatenation, and an end-to-end cross-view fusion head) on ResNet-18 backbones, five seeds. The conflict subset is every sample where the two single-view predictions differ. Each view gets a validation-fitted temperature, so all training-free baselines run on calibrated probabilities. The gate takes eleven z-scored features: four building-visibility features from a frozen SegFormer-B0 (building pixel ratio, centered-crop ratio, their difference, centroid distance) and seven prediction features (per-view confidence and entropy, confidence gap, Jensen-Shannon divergence, disagreement flag), and outputs softmax weights over the street, remote, and fusion probabilities. The field-of-view intervention crops each panorama to a 90-degree window aimed either at the building mask's mean azimuth or at a random azimuth, holding size and projection fixed.

## Data and Study Area

Eaton wildfire, Altadena, CA (property-centric DINS photographs; 6.5k/1,966/1,984 train/val/test pairs, split by property and tile). Hurricane Ian, Sanibel Island, FL (CVIAN pairing from CVDisaster; 3,248/573/300 pairs). Hurricane Milton, Florida (1,740/307/254 pairs). An audit found 299 of 300 Ian test samples share a Mapillary sequence with training data, so a repaired spatial-block protocol is also reported; macro-F1 drops 0.05–0.10 under it for every model.

## Key Contributions

- Conflict cases as the unit of analysis, with an oracle single-view gap and a gap-closure metric that measure how much arbitration between existing predictors could still gain.
- A readable linear reliability gate that is the only method to significantly beat calibrated probability averaging on the wildfire data.
- A controlled field-of-view intervention that identifies target alignment of the street view as the causal variable behind when fusion pays.
- Conflict density as a label-free spatial damage signal, distinct from model uncertainty.

## Results Snapshot

On Eaton conflicts the gate reaches 0.768 accuracy, +0.072 over end-to-end fusion (p < 1e-4) and +0.051 over calibrated averaging (p = 0.0001), closing 52% of the oracle gap; no other method passes one half. On the panoramic hurricane data, where street views rarely see the target (mean building pixel ratio 0.027 on Ian vs. 0.119 on Eaton), the gate matches fusion instead. Building-centered cropping doubles the fusion closure on Milton (0.177 to 0.365) while random crops of the same size lower it. Tile-level conflict density correlates with Eaton damage at Spearman r = 0.615 (p = 0.001), while predictive entropy anti-correlates (r = -0.37 to -0.52). The gate's coefficients read as one rule: trust the street view when it is confident and actually looking at the building.

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

这篇 GeoSearch '26 短论文（闪电报告）把跨视角灾损评估中的"冲突样本"——两个独立训练的单视角模型（卫星与街景）判断不一致的建筑——作为分析单元。数据来自 2025 年 Eaton 山火的 CAL FIRE 现场勘查照片，以及飓风 Ian、Milton 的 360° 街景全景，均与高分辨率俯视影像配对，冲突样本占 10–33%。在冲突样本上，"每次都信对的那个视角"的 oracle 比所有融合方法高出 0.37–0.41 的准确率，说明融合方法没有用好"何时信哪个视角"这一信息。论文提出一个基于建筑可见性、校准置信度和分歧特征的线性可靠性门控：在山火数据上它是唯一显著超过校准概率平均的方法（冲突准确率 +0.051），在全景街景数据上则与融合持平。视场角干预实验表明：把全景裁向建筑会使融合收益翻倍，而同尺寸的随机裁剪不会，因此街景是否对准目标建筑才是因果变量。此外，冲突样本的空间密度可以在没有标签的情况下预测瓦片级灾损（Spearman r = 0.615）。一句话：信那个真正看到目标的视角。该节点原为 FireBridge 占位节点，现升级为正式发表版本。
