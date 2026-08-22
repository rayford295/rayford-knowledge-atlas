---
id: vgi-spatial-bias
short_title: VGI Spatial Bias
title: "Detecting and Correcting Spatial Bias in Volunteered Geographic Information Using Remote Sensing"
year: 2026
venue: "I-GUIDE Summer School 2026 project; notebook and dataset published as I-GUIDE knowledge elements"
type: Working Paper
status: In Progress
authors:
  - Yifan Yang
themes:
  - Volunteered Geographic Information
  - Data Quality and Bias
  - LiDAR Point Clouds
  - Spatial Equity
methods:
  - DGCNN Point-Cloud Segmentation
  - LiDAR and NAIP Fusion
  - Completeness and Recency Metrics
  - Learned Fix Scoring
  - Cross-Region Generalization Test
links:
  - label: Repository
    url: https://github.com/rayford295/vgi-spatial-bias
  - label: Project Site
    url: https://rayford295.github.io/vgi-spatial-bias/
  - label: I-GUIDE Notebook
    url: https://platform.i-guide.io/notebooks/43edf307-c6af-4d1f-948b-260a0092a2c0
connections:
  - target: arcgis-sam-tree-segmentation
    label: shares method lineage with remote-sensing object extraction as a mapping reference
  - target: freight-crash-spatial-inequities
    label: shares the spatial-inequity framing, applied to data quality rather than crash outcomes
  - target: geolocator
    label: contrasts with geo-privacy risk by asking where public geodata is instead too thin
  - target: spatial-intelligence-public-infrastructure
    label: answers whether a volunteered map can be trusted as public infrastructure everywhere
role: first-author or lead-position output
repository:
  name: rayford295/vgi-spatial-bias
  url: https://github.com/rayford295/vgi-spatial-bias
  preview: End-to-end reproducible pipeline that detects, quantifies, and corrects OSM spatial bias against LiDAR and NAIP.
  language: Jupyter Notebook
  stars: 0
  forks: 0
  commits: 0
position:
  x: 250
  y: 620
color: "#9a7b4f"
radius: 30
---

## One-Sentence Takeaway

OpenStreetMap quality tracks where contributors live rather than where mapping is needed, and remote sensing can see those gaps years before the community fills them.

## Research Problem

Volunteered geographic information is treated as a uniform basemap, but it is not uniform. It is highly accurate where many people map and stale where few do. Any downstream analysis that assumes even coverage -- routing, accessibility, exposure modeling, emergency response -- silently inherits that unevenness as a spatial bias in its own results. The bias is rarely measured because measuring it requires an independent reference of comparable resolution.

## Core Question

Can multimodal remote sensing serve as that independent reference -- detecting where VGI is incomplete, quantifying the pattern at state scale, and proposing corrections that the mapping community itself would later validate?

## Summary

The project builds an end-to-end reproducible pipeline in three movements. It **detects** omissions by comparing OSM against a LiDAR-and-imagery reference; it **quantifies** the resulting bias across all 102 Illinois counties along an urban-to-rural gradient; and it **corrects** by machine-proposing fixes and scoring them, then validating those proposals against what the OSM community actually mapped in the intervening years. Two study regions anchor the method: a 2 by 2 km UIUC campus tile with fully classified QL1 LiDAR, and a Colorado Springs tile with sparser ground-only LiDAR used as an unretuned generalization test.

## Method Snapshot

Stage 1 builds the remote-sensing reference from a merged USGS 3DEP point cloud: classical extraction of ground/DTM, building instances, and individual trees, plus DGCNN semantic segmentation of ASPRS classes. Stage 2 adds a NAIP optical check for land cover and a LiDAR-fused paved layer. Stage 3 compares OSM 2019 against that reference to produce building-omission and road-support bias maps. Stage 4 validates by asking whether OSM 2026 later confirmed the 2019 detections. Stage 5 scales the metrics statewide with Census covariates. Stage 6 proposes, scores, and prioritizes fixes. Stage 7 repeats stages 1 through 4 on the second region with no retuning. Everything runs unmodified from a single pre-executed notebook on the I-GUIDE JupyterHub.

## Data and Study Area

USGS 3DEP LiDAR (QL1, roughly 20 points per square metre and fully classified on the campus tile; roughly 5 points per square metre and ground-only in Colorado Springs), NAIP RGBN imagery, OSM snapshots from 2019 and 2026, and Census covariates. Spatial extent runs from two 2 by 2 km tiles up to all 102 Illinois counties.

## Key Contributions

- A temporal validation design that avoids the usual circularity of VGI quality work: detections made against 2019 OSM are scored by what the community independently mapped by 2026, so the reference is not the same map being evaluated.
- Separation of geometric from attribute quality, showing these fail in completely different patterns.
- A statewide bias characterization that ties data quality to contributor density rather than to need.
- A generalization test on deliberately weaker LiDAR in a different state, with no retuning.

## Results Snapshot

Building completeness on the campus tile is 58.3% by count and 79.4% by area, dropping below 0.3 on the residential strip; Colorado Springs is thinner still at 29.1% by count. Of the 2019 gaps detected by remote sensing, 64% were filled by the community by 2026 -- the sensing saw them years early. Roads show a clean split: pavement support runs 91 to 99.6%, but only 3.3% of statewide road segments carry a maxspeed tag, so geometry is fine while attributes are not. Edit recency correlates with population density at rho = 0.70, and downstate counties remain frozen at their 2008 TIGER import. Correction works and hybrids win: proposal median IoU is 0.68 and a learned scorer reaches precision@50 of 0.84 against a 0.65 base rate. The method transfers -- 74.8% of Colorado Springs detections were community-confirmed on ground-only LiDAR -- and the winning correction method flips with label volume, where 821 labels are enough for a U-Net to beat rule-based geometry at 0.769 IoU and for a GBM scorer to hit AUC 0.985.

## How This Connects to My Other Work

This is the data-quality foundation under several other branches. Disaster exposure and damage work leans on OSM building footprints and road networks; this project measures how much that trust is warranted and where it is not. It shares the spatial-inequity framing of the freight-crash work, moved one layer down from outcomes to the data those outcomes are computed from. It is also the inverse of the GeoLocator question: rather than asking where public geodata reveals too much, it asks where public geodata is too thin to support the analyses built on it.

## Impact

An I-GUIDE Summer School 2026 project, published as an I-GUIDE notebook knowledge element with linked datasets so the full pipeline runs unmodified on the I-GUIDE platform. The practical takeaway for anyone using OSM as a basemap is that completeness and recency should be treated as spatially varying covariates, not constants.

## Keywords

Volunteered geographic information, OpenStreetMap, spatial bias, LiDAR, DGCNN, data completeness, spatial equity, reproducibility.

## Public Links

- Repository: https://github.com/rayford295/vgi-spatial-bias
- Project site: https://rayford295.github.io/vgi-spatial-bias/
- I-GUIDE notebook: https://platform.i-guide.io/notebooks/43edf307-c6af-4d1f-948b-260a0092a2c0

## Citation

Yang, Y. (2026). Detecting and Correcting Spatial Bias in Volunteered Geographic Information Using Remote Sensing. I-GUIDE Summer School 2026 project. https://github.com/rayford295/vgi-spatial-bias

## Chinese Summary

志愿地理信息（VGI，比如 OpenStreetMap）常被当作均质底图使用，但它并不均质：人多的地方精确，人少的地方陈旧。任何假设覆盖均匀的下游分析——路径规划、可达性、暴露度建模、应急响应——都会把这种不均匀当成自己的空间偏差继承下来。这个项目用多模态遥感（LiDAR + 航空影像）做独立参照，完成检测、量化、纠正三步。方法上的关键设计是**时间验证**：用 2019 年 OSM 做检测，再用 2026 年 OSM 来打分，避免了 VGI 质量研究常见的"拿被评估的地图当参照"的循环论证。主要发现：校园样区建筑完整度按数量 58.3%、按面积 79.4%，住宅带低于 0.3；遥感检出的 2019 年缺口有 64% 到 2026 年被社区补上了，说明遥感能提前数年看到；道路是几何没问题但属性很差（铺装支持度 91–99.6%，而全州只有 3.3% 路段标了限速）；编辑时效性与人口密度相关系数 ρ=0.70，州南部许多县还停在 2008 年 TIGER 导入状态——也就是说，数据质量跟着贡献者走，而不是跟着需求走。纠正环节提案中位 IoU 0.68，学习型打分器 precision@50 达 0.84（基线 0.65）。换到 Colorado Springs、用更差的仅地面 LiDAR、不做任何重新调参，仍有 74.8% 检出被社区确认。
