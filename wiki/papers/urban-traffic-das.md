---
id: urban-traffic-das
short_title: DAS Traffic Dynamics
title: "Monitoring urban traffic dynamics at high spatiotemporal resolution using distributed acoustic sensing and deep learning"
year: 2026
venue: Journal of Transport Geography, 138, 104901
type: Journal Article
status: Published
authors:
  - Hao Tian
  - Heng Cai
  - Xiaowei Chen
  - Yifan Yang
themes:
  - Human Mobility
  - Urban Sensing
  - Transportation Resilience
  - Event-Driven Dynamics
methods:
  - Distributed Acoustic Sensing
  - YOLOv8 Object Detection
  - Synthetic-Real Hybrid Training
  - PCA Trajectory Speed Estimation
  - Slant-Stacking Baseline
  - Congestion Intensity Index
  - Cluster Bootstrap
links:
  - label: PDF
    url: ./publications/2026-monitoring-urban-traffic-dynamics-das-jtrangeo.pdf
  - label: DOI
    url: https://doi.org/10.1016/j.jtrangeo.2026.104901
connections:
  - target: hospital-visitation-flows
    label: shares the Texas A&M collaboration on reading collective mobility from passive, privacy-preserving observations
  - target: freight-crash-spatial-inequities
    label: shares the Journal of Transport Geography venue and the question of how roadway function shapes uneven traffic outcomes
  - target: heat-stress-digital-twins
    label: turns the same Texas A&M campus into a sensing testbed, here for ground vibration instead of heat
  - target: beacon
    label: shares the Hao Tian collaboration on deep learning over unconventional geospatial signals
  - target: spatial-intelligence-public-infrastructure
    label: treats existing fiber-optic infrastructure as a public sensing asset for transportation planning
role: collaborative output
position:
  x: 880
  y: 560
color: "#2e8b9a"
radius: 28
---

## One-Sentence Takeaway

Existing underground fiber-optic cables, read with distributed acoustic sensing and a YOLO detector trained on synthetic-plus-real waterfall images, can serve as a continuous urban traffic observatory that shows how football gamedays and the Thanksgiving holiday reorganize traffic in different ways along different roads.

## Research Problem

Cameras, loop detectors, and GPS probe data give good traffic coverage under normal conditions but suffer from sparse sampling, privacy concerns, and outages during the disruptive events when situational awareness matters most. Distributed acoustic sensing (DAS) turns a fiber cable into thousands of virtual vibration sensors, but existing DAS traffic work stops at vehicle-level detection, relies on slow handcrafted signal processing, and rarely translates detections into system-level traffic states or event-scale analysis.

## Core Question

Can DAS combined with deep learning act as a continuous, efficient urban traffic observatory that reveals traffic volume, congestion, and event-driven change at meter-level and second-level resolution?

## Summary

The study uses a 23 km fiber on the Texas A&M University campus in College Station, recorded continuously through October and November 2023 (about 6.2 TB of strain-rate data). Raw waveforms are band-pass filtered (0.5-20 Hz), denoised, and cut into 180-second by 50-channel (about 200 m) space-time images in which vehicles appear as sloped lines. Three detectors (YOLOv8, YOLOv11, RT-DETR) are trained with a three-stage curriculum: synthetic pre-training, hybrid synthetic-plus-real fine-tuning, and real-only fine-tuning. Detected trajectories give vehicle counts and PCA-based apparent speeds, which are combined into a congestion intensity index and compared against matched non-event baselines with cluster bootstrap intervals.

## Method Snapshot

Labeled data: 1,700 manually annotated real images (900 train, 300 validation, 500 independent hold-out) and 4,000 synthetic images built by embedding simulated 20-70 mph trajectories into late-night noise panels. Apparent speed is the slope of the first principal component of each detection's high-energy pixels times the 4 m channel spacing. Congestion intensity is detected vehicles per window divided by mean apparent speed (plus a 0.1 mph stabilizer). Baselines are non-event days with matched weekday composition, screened against National Weather Service warnings and the academic calendar; 5,000 cluster bootstrap resamples give 95% intervals. A fourth-root slant-stacking pipeline serves as the signal-processing baseline.

## Data and Study Area

Texas A&M University campus and surrounding roadways, College Station, Texas. Silixa iDAS V2.5 interrogator, 10 m gauge length, 4 m channel spacing, 100 Hz sampling. Events analyzed: home football gamedays (representative case Texas A&M vs. South Carolina, October 28, 2023) and the Thanksgiving holiday, each compared against matched baseline Saturdays or Thursday-Sunday blocks.

## Key Contributions

- A deep learning-enabled DAS framework that goes from raw ground vibration to vehicle trajectories, traffic volume, apparent speed, and a system-level congestion indicator.
- A hybrid synthetic-real training strategy that lifts detection from below 0.35 mAP@0.5-0.95 (synthetic only) to about 0.77 while needing only 900 real training images.
- The first event-scale, corridor-wide reading of how distinct disruptive events reshape urban traffic rhythms and how unevenly that change lands across roadway segments.

## Results Snapshot

YOLOv8 and YOLOv11 reached mAP@0.5-0.95 of 0.768 on the hold-out set under hybrid training; RT-DETR was slightly lower. Against manual counts, the deep learning pipeline agreed better than slant stacking (r = 0.931, R² = 0.866, MAE = 0.608 versus r = 0.882, R² = 0.779, MAE = 0.798) and ran about 50 times faster (23 s versus 1,201 s for a 24-hour benchmark). Gameday congestion intensity rose 34.2% over baseline Saturdays (95% bootstrap interval 23.5%-46.3%), driven by a 29.2% volume increase, with multi-peaked surges before the 11:00 kickoff and a near doubling around 20:00. Thanksgiving congestion fell 49.9% (interval -52.4% to -48.5%) with a 50.2% volume drop and a flattened diurnal profile. Segment-level responses ranged from roughly +10% to +65% on gamedays and -20% to beyond -50% at Thanksgiving, with the F&B Road arterial toward Kyle Field most affected in both cases. Apparent speeds stayed near 45-50 mph throughout and were not independently validated.

## How This Connects to My Other Work

My own papers read disaster damage from imagery after the fact. This collaboration reads collective human activity from vibration in real time, and it shares the same engineering instinct: squeeze a usable signal out of infrastructure that already exists, verify it against a classical baseline, and say plainly what the derived index does and does not measure.

## Impact

For transportation and resilience planning, the paper argues that DAS should be seen as complementary observation infrastructure, especially where conventional sensors are sparse, unavailable, or disrupted. Its event signatures show that holidays and mass gatherings alter the timing and synchronization of mobility, not just its volume, which point-based sensors miss.

## Keywords

Distributed acoustic sensing (DAS), traffic dynamics, traffic monitoring, urban sensing, deep learning, event-driven mobility.

## Public Links

- PDF: ../../publications/2026-monitoring-urban-traffic-dynamics-das-jtrangeo.pdf
- DOI: https://doi.org/10.1016/j.jtrangeo.2026.104901

## Citation

Tian, H., Cai, H., Chen, X., & Yang, Y. (2026). Monitoring urban traffic dynamics at high spatiotemporal resolution using distributed acoustic sensing and deep learning. Journal of Transport Geography, 138, 104901. https://doi.org/10.1016/j.jtrangeo.2026.104901

## Chinese Summary

这篇发表在 Journal of Transport Geography 的合作论文把城市地下已有的光纤通信电缆变成一条连续的交通观测带。研究利用德州农工大学校园约 23 公里光纤上的分布式声学传感（DAS），在 2023 年 10–11 月连续记录约 6.2 TB 地面振动数据，经滤波、去噪后切成 180 秒 × 50 通道（约 200 米）的时空图像，车辆在图中表现为斜线轨迹。作者用“合成预训练 → 合成+真实混合微调 → 真实微调”三阶段策略训练 YOLOv8/YOLOv11/RT-DETR 检测器，只用 900 张人工标注图像就把 mAP@0.5–0.95 从 0.35 以下提升到约 0.77；检测出的轨迹再通过 PCA 估算表观车速，并组合成“拥堵强度”指标。与传统 4 次方根斜叠加方法相比，深度学习流程与人工计数的一致性更高（r = 0.931 对 0.882），速度快约 50 倍。事件分析显示：主场橄榄球比赛日拥堵强度较基线上升 34.2%，呈多峰到达、赛后约 20:00 近乎翻倍；感恩节假期则下降 49.9%，日变化曲线被整体压平。不同路段反应差异显著，通往 Kyle Field 的 F&B Road 主干道在两类事件中变化都最大。论文强调拥堵强度是相对指标而非物理密度，表观车速尚未经独立验证，事件分析刻画关联而非因果。杨一帆为第四作者，参与概念设计、方法和软件。
