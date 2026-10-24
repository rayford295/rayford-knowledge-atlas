---
id: hospital-visitation-flows
short_title: Hospital Visitation Flows
title: "Modeling Hospital Visitation Flows Through Distance-Attractiveness Tradeoffs: Integrating Human Mobility, Hospital Attributes, and Socioeconomic Context"
year: 2026
venue: Transactions in GIS
type: Journal Article
status: Published
authors:
  - Binbin Lin
  - Lei Zou
  - Hao Tian
  - Heng Cai
  - Yifan Yang
  - Bing Zhou
themes:
  - Human Mobility
  - Healthcare Access
  - Travel Behavior
  - Socioeconomic Heterogeneity
methods:
  - Heterogeneous Graph Neural Network
  - Deep Gravity
  - SHAP Interpretation
  - Controlled Scenario Analysis
  - Distance Decay
links:
  - label: PDF
    url: ./publications/2026-modeling-hospital-visitation-flows-tgis.pdf
  - label: DOI
    url: https://doi.org/10.1111/tgis.70432
connections:
  - target: freight-crash-spatial-inequities
    label: shares the question of how socioeconomic context reshapes mobility outcomes across a metropolitan area
  - target: heat-stress-digital-twins
    label: shares the Texas A&M GEAR Lab collaboration on deep spatiotemporal models for urban well-being
  - target: spatial-intelligence-public-infrastructure
    label: treats hospital choice as a spatial decision that public health planning can read from mobility data
role: collaborative output
position:
  x: 905
  y: 410
color: "#c0567a"
radius: 28
---

## One-Sentence Takeaway

Drive time dominates where people go for hospital care, but a hospital's rating starts to pull patients only beyond a distance threshold, and that threshold shifts with the community the trip starts from.

## Research Problem

Accessibility measures such as two-step floating catchment methods weight providers by travel-time zones, and utilization studies usually report average effects. Neither shows how travel cost, perceived hospital attractiveness, and neighborhood socioeconomic conditions jointly structure the hospitals people actually choose, or how those tradeoffs change with distance and community context.

## Core Question

How do drive time, hospital attributes, online reputation, and community characteristics jointly shape realized hospital destination choice, and does the distance at which hospital rating starts to matter vary across socioeconomic contexts?

## Summary

The study models realized hospital visitation as a destination-choice process within a competing origin-destination system. It integrates four years (2020-2023) of anonymized mobility data in Houston, hospital attributes, Google Maps ratings and review counts, and 2023 American Community Survey indicators including health-insurance coverage. Five predictive models are compared, and the best one is interpreted with SHAP values and controlled scenario simulations of distance-decay crossovers.

## Method Snapshot

All models predict visitation percentage from nine hospital attributes, 13 census block group (CBG) attributes, and raw drive time in minutes: Naive Regression, Gradient Boosting, Multi-Layer Perceptron, Deep Gravity, and a Heterogeneous Graph Neural Network (HGNN) with strict separation between training-edge message passing and held-out queries. Performance is measured with NRMSE, SMAPE, and Common Part of Commuters (CPC) over 10 repeated train-test splits at 10%, 20%, and 30% test proportions. Synthetic scenarios hold everything else fixed and vary one attribute (or rating by community type) to locate where predicted-visitation curves cross.

## Data and Study Area

Harris County, Houston, Texas. Advan Research mobility data (via Dewey Data) give 16,783 observed flows from 1,155 CBGs to 35 general acute care hospitals, 1,657,488 visits in 2020-2023, averaged across the four years. Hospital capacity and occupancy come from CovidCareMap; online visibility and ratings from Google Maps; community characteristics from the 2023 ACS.

## Key Contributions

- A hospital destination-choice framework that combines social-sensing data, hospital attributes, community characteristics, and observed mobility flows.
- A five-model comparison showing that hospital visitation carries both gravity-like origin-destination structure and extra relational information captured by a heterogeneous graph.
- Distance-dependent attribute effects and socioeconomic variation in the rating-drive time crossover, framed as model-implied area-level sensitivity rather than individual preference or causal effect.

## Results Snapshot

HGNN was best at every test proportion and on all three metrics (10% test: NRMSE 0.6081, SMAPE 56.08%, CPC 0.7530), followed by Deep Gravity, MLP, Gradient Boosting, and Naive Regression. Drive time was the dominant predictor. The higher-rated hospital became comparatively favored beyond about 12.78 minutes, while bed occupancy kept a stable relationship across distances. Communities with more residents over 65 and higher Asian population shares showed substantially earlier rating crossovers; the higher-White scenario crossed later.

## How This Connects to My Other Work

My own papers mostly study what a place looks like after a disaster. This collaboration studies how people move through the same kind of metropolitan space for an everyday, high-stakes need, and it shares the lab's habit of separating what a model predicts from what it can claim about behavior.

## Impact

For health planners, the results suggest that accessibility based on distance alone misses how reputation and community context redirect longer trips, and that one network-wide distance threshold does not describe every neighborhood.

## Keywords

Deep learning, distance decay, hospital choice, human mobility, socioeconomic heterogeneity, travel behavior.

## Public Links

- PDF: ../../publications/2026-modeling-hospital-visitation-flows-tgis.pdf (open access, CC BY)
- DOI: https://doi.org/10.1111/tgis.70432

## Citation

Lin, B., Zou, L., Tian, H., Cai, H., Yang, Y., & Zhou, B. (2026). Modeling Hospital Visitation Flows Through Distance-Attractiveness Tradeoffs: Integrating Human Mobility, Hospital Attributes, and Socioeconomic Context. Transactions in GIS, 30(7), e70432. https://doi.org/10.1111/tgis.70432

## Chinese Summary

这篇发表在 Transactions in GIS 的合作论文把医院就诊看作一个“目的地选择”过程，而不只是可达性的结果。研究整合休斯顿 2020–2023 年四年的匿名人流数据（1,155 个街区组到 35 家综合急症医院的 16,783 条 OD 流、约 166 万次到访）、医院属性、Google Maps 评分与评论数，以及 2023 年 ACS 社会经济指标（含医疗保险覆盖率），比较了五种预测模型。异质图神经网络（HGNN）在所有测试比例和三项指标上表现最好，Deep Gravity 次之。驾车时间是最主要的预测因子；情景模拟显示，大约超过 12.78 分钟车程后，评分更高的医院才开始更受青睐，而这个“交叉点”随社区特征变化：65 岁以上人口和亚裔比例较高的社区交叉点明显更早。论文强调这些是区域层面的模型推断，不代表个体偏好或因果效应。
