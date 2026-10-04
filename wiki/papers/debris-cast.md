---
id: debris-cast
short_title: Debris-Cast
title: "Debris-Cast: A Two-Stage Machine Learning Framework for Hurricane Debris Prediction Using Multi-Source Geospatial Data"
year: 2026
venue: International Journal of Disaster Risk Reduction
type: Journal Article
status: Accepted
authors:
  - Jooho Kim
  - Anish Shakya
  - Jacob Kelly
  - Yifan Yang
  - Selina Lee
  - Sam Brody
  - Ali Mostafavi
themes:
  - Disaster Recovery
  - Hurricane Debris Management
  - GeoAI
  - Spatial Grid Design
methods:
  - Two-Stage Classification and Regression
  - Random Forest
  - XGBoost
  - H3 Hexagonal Grids
  - Multi-Source Geospatial Features
links:
  - label: PDF
    url: ./publications/2026-debris-cast-hurricane-debris-prediction.pdf
  - label: DOI
    url: https://doi.org/10.1016/j.ijdrr.2026.106470
  - label: SSRN
    url: https://ssrn.com/abstract=7115288
connections:
  - target: hyperlocal-disaster
    label: moves from per-building damage to grid-level debris volume, the quantity recovery crews actually haul
  - target: rapidmap
    label: shares the Hurricane Milton event and the goal of map-ready outputs for responders
  - target: resilience-4d-urban-flood
    label: shares the hurricane and flood-exposure branch of disaster resilience work
  - target: human-evidence-disaster-ai
    label: grounds the model in operational debris-removal load tickets rather than image labels
role: collaborative output
position:
  x: 700
  y: 220
color: "#d96832"
radius: 30
---

## One-Sentence Takeaway

Hurricane debris volume can be estimated from open building, environmental, and hazard data with a two-stage machine-learning model, but the spatial grid you choose decides whether you get a better fit or finer detail.

## Research Problem

Debris removal is one of the most expensive and logistically demanding parts of hurricane recovery, often hundreds of millions of dollars per event. The tools agencies rely on, such as FEMA's HAZUS-MH, run on fixed empirical formulas, licensed software, and few predictors; against Hurricane Harvey landfill records the FEMA building formula overpredicted by roughly an order of magnitude. Those formulations cannot represent the nonlinear interactions among storm intensity, the built environment, vegetation, terrain, and flooding that generate debris.

## Core Question

Can a machine-learning framework built on multi-source public geospatial data estimate where hurricane debris is recorded and how much, and how do grid geometry and spatial resolution change that answer?

## Summary

Debris-Cast first classifies whether debris removal was recorded in a spatial unit, then estimates debris volume for the cells that have it, which handles the zero-inflated structure of debris records. Random Forest and XGBoost models are trained on operational debris-removal load tickets from Hurricanes Helene and Milton (2024) in Pinellas County, Florida, for construction and demolition (C&D), vegetative, and combined debris. The comparison covers four spatial units: H3 hexagonal grids at resolutions 8 and 9 and equivalent-area square grids.

## Method Snapshot

Predictors come from three domains in one framework: building inventories, environmental conditions (land cover, vegetation indices such as MSAVI, terrain), and hydrometeorological hazards (rainfall, wind, track, evacuation zones, observed flood extent). Stage one is a debris-presence classifier; stage two regresses volume on debris-present cells. The hazard inputs are observed or post-storm reconstructed, so the evaluation is a hindcast: it shows debris volume is predictable from these features, not that it can be forecast before landfall.

## Data and Study Area

Pinellas County, Florida, after Hurricanes Helene and Milton (2024). Labels are county and City of St. Petersburg load-ticket records (the county dataset alone has 18,278 records with load ID, date, GPS, and volume), aggregated to H3 resolution 8 and 9 hexagons and the matching square grids. Cities with incomplete records (Pinellas Park, Gulfport) are masked.

## Key Contributions

- A two-stage framework that jointly uses building, environmental, and hazard predictors from open data, reducing dependence on proprietary debris-estimation software.
- A controlled comparison of hexagonal and square grids at two resolutions, showing how spatial unit design shapes debris prediction.
- An explicit statement of scope: retrospective and screening capability, with pre-landfall forecasting and cross-event transfer left to validation on independent data.

## Results Snapshot

Classification is strongest at finer resolution: the best AUC is 93.9% for C&D debris with Random Forest at H3 resolution 9. Regression shows a scale tradeoff. Coarser grids give stronger fit and lower area-normalized error (R² up to 0.869 for vegetative debris), while finer grids give more spatial detail and lower raw per-cell MAE. Hexagonal and square grids perform comparably.

## How This Connects to My Other Work

Most of the disaster branch of the atlas asks how damaged a building is. This paper asks the downstream recovery question of how much material has to be hauled away and where, from the same hurricane season (Milton) used in RAPIDMap and CrossViewGate.

## Impact

Estimates at the grid level support contractor mobilization, temporary debris-management site planning, and budget allocation. Because the framework uses public data instead of licensed software, local agencies can run it themselves, and the grid comparison gives them a principled way to choose between coarse, reliable totals and fine, noisier maps.

## Keywords

Debris management, post-disaster management, debris estimation, machine learning, grid geometry, H3, Hurricane Helene, Hurricane Milton.

## Public Links

- PDF: ../../publications/2026-debris-cast-hurricane-debris-prediction.pdf (journal pre-proof)
- DOI: https://doi.org/10.1016/j.ijdrr.2026.106470
- SSRN preprint: https://ssrn.com/abstract=7115288

## Citation

Kim, J., Shakya, A., Kelly, J., Yang, Y., Lee, S., Brody, S., & Mostafavi, A. (2026). Debris-Cast: A Two-Stage Machine Learning Framework for Hurricane Debris Prediction Using Multi-Source Geospatial Data. International Journal of Disaster Risk Reduction, 106470. https://doi.org/10.1016/j.ijdrr.2026.106470

## Chinese Summary

这篇发表在 International Journal of Disaster Risk Reduction 的合作论文提出 Debris-Cast，一个用于飓风垃圾（debris）量估算的两阶段机器学习框架：先判断某个空间单元是否有垃圾清运记录，再对有记录的单元估算垃圾体积，以处理清运数据中大量为零的结构。研究使用 2024 年飓风 Helene 和 Milton 在佛罗里达州 Pinellas County 的清运记录（load tickets），结合建筑、环境（土地覆盖、植被指数、地形）和灾害（降雨、风、路径、疏散区、洪水范围）三类公开地理数据，用 Random Forest 和 XGBoost 分别估算建筑拆除垃圾、植被垃圾和总量，并比较 H3 六边形网格与等面积方形网格在两种分辨率下的表现。分类在细分辨率下最好（H3 9 级、建筑拆除垃圾 AUC 93.9%）；回归则呈现尺度取舍：粗网格拟合更好（植被垃圾 R² 最高 0.869），细网格空间细节更多、单元 MAE 更低；六边形与方形网格表现相近。论文明确说明这是回溯性（hindcast）评估，登陆前预报和跨事件迁移仍需独立数据验证。
