---
id: geoprobe
short_title: GeoProbe
title: "GeoProbe: layer-wise probing of core geospatial concepts in large language models"
year: 2026
venue: International Journal of Geographical Information Science
type: Journal Article
status: Published
authors:
  - Bing Zhou
  - Junbo Wang
  - Yifan Yang
  - Lei Zou
  - Yuhao Kang
  - Xiao Huang
themes:
  - GeoAI
  - Large Language Models
  - Geospatial Foundation Models
  - Explainable GeoAI
methods:
  - Layer-wise Probing
  - Linear and MLP Probes
  - Prompt-Level Comparison
  - Geographic Train-Test Split
  - Model Scaling Analysis
links:
  - label: PDF
    url: ./publications/2026-geoprobe-layer-wise-probing-geospatial-llms-ijgis.pdf
  - label: DOI
    url: https://doi.org/10.1080/13658816.2026.2756583
  - label: Code and Data
    url: https://doi.org/10.6084/m9.figshare.33085250
connections:
  - target: responsible-geoai
    label: shares the Bing Zhou and Lei Zou collaboration and asks what GeoAI models actually know before they are trusted
  - target: geolocator
    label: moves from what a multimodal model infers about places to where place knowledge sits inside language models
  - target: hyperlocal-disaster
    label: cites the pre-trained vision backbones of this work and turns the backbone-choice question to language models
  - target: ai-systems-human-judgment
    label: separates what a model encodes from what it says, a precondition for judging when its outputs deserve trust
role: collaborative output
position:
  x: 270
  y: 205
color: "#6c7bd9"
radius: 28
---

## One-Sentence Takeaway

Probing every layer of 20 open-weight language models shows that four core geospatial concepts are only partially and unevenly readable from their hidden states, with most of the signal sitting in the first 10% to 40% of depth rather than at the final layer.

## Research Problem

Geospatial benchmarks for large language models score end-to-end answers, which mixes geographic knowledge with fluency, prompt sensitivity, and hallucination. They show whether a task was completed but not whether, or where, established GIScience concepts are represented inside the model.

## Core Question

To what extent do model embeddings encode signals for core geospatial concepts, and how does that vary across layers, prompt levels, model families, and parameter scales?

## Summary

GeoProbe trains linear and multi-layer perceptron probes on the frozen hidden states of every layer of 20 models (BERT-large, Llama-3.x, and Qwen-2/3, from 0.5B to 72B parameters) under three prompt levels. The probes target distance decay (a gravity index), local spatial autocorrelation (local Moran's I of income), hierarchical containment (city-in-state), and topological relations (DE-9IM predicates). Recoverability rises with prompt complexity and generally with model size; Llama beats Qwen at matched scale on most tasks, and BERT-large stays best on topology and on containment under naive and simple prompts.

## Method Snapshot

Each prompt passes through the model once, and one hidden-state vector per layer is reduced by PCA and fed to the probes; no text is generated. Labels come from known operators rather than human annotation. A Strict geographic split keeps test counties out of every training prompt so that recovery cannot come from memorized place facts. Paired statistical comparisons cover prompt level, family, scale, and instruction tuning.

## Data and Study Area

United States. About 400,000 county pairs over 1,900 counties with a gravity index from ACS populations and great-circle distance (validated against county-to-county migration flows); about 28,000 cities with local Moran's I of ACS 2016-2020 median household income; about 64,000 Census Gazetteer place-state pairs, including ambiguous names such as Springfield; and about 7,800 WKT geometry pairs from the Ji et al. (2025) topology benchmark.

## Key Contributions

- The first layer-wise probing framework built around concept-defined GIScience targets rather than place-fact recall.
- A depth map of where each concept becomes readable: gravity and topology by 20%-40% of depth, containment by 25%-75%, and local autocorrelation at mid-depth.
- Practical guidance for GeoAI: extract mid-layer rather than final-layer representations, use a 7-8B Llama as a cost-effective default, and treat prompts that state the task and output rule as a substantive intervention.

## Results Snapshot

Moving from simple to complex prompts added 0.072 R² on gravity, 0.097 R² on local Moran's I, and 0.184 balanced accuracy on containment. Under complex prompts a 7-8B Llama came within 0.01 R² on gravity and 0.08 balanced accuracy on containment of the 70B model. Spatial dependence was the least recoverable concept, which the authors read partly as missing neighbor inputs and partly as a relational-composition deficit.

## How This Connects to My Other Work

My disaster work picks vision and language backbones and asks them to reason about places. GeoProbe gives that choice an inside view: which layer to read, which family to trust for which kind of spatial relation, and where a model's place knowledge stops. I contributed data curation, investigation, validation, and review.

## Impact

The paper argues that geospatially competent foundation models need architectures and training signals aimed at relational geographic structure, such as graph attention over neighborhoods or coordinate-keyed embeddings, and not only larger corpora. It also opens an explainable-GeoAI entry point: find the layer where a concept is most recoverable and intervene there.

## Keywords

GeoAI, large language models, probing classifiers, representation learning, geographic information science.

## Public Links

- PDF: ../../publications/2026-geoprobe-layer-wise-probing-geospatial-llms-ijgis.pdf
- DOI: https://doi.org/10.1080/13658816.2026.2756583
- Code and data: https://doi.org/10.6084/m9.figshare.33085250

## Citation

Zhou, B., Wang, J., Yang, Y., Zou, L., Kang, Y., & Huang, X. (2026). GeoProbe: layer-wise probing of core geospatial concepts in large language models. International Journal of Geographical Information Science. https://doi.org/10.1080/13658816.2026.2756583

## Chinese Summary

这篇发表在 International Journal of Geographical Information Science 的合作论文提出 GeoProbe，一个按层探测大语言模型内部地理概念的框架。作者在 20 个开源模型（BERT-large、Llama-3.x、Qwen-2/3，参数量 0.5B 到 72B）每一层冻结的隐藏状态上训练线性和 MLP 探针，测试四个核心地理概念：距离衰减（引力指数）、局部空间自相关（收入的局部 Moran's I）、层级包含关系（城市是否属于某州）和拓扑关系（DE-9IM 谓词），并比较三种提示层级。结果显示，这些概念只能被部分、不均衡地读出；解码器模型中大部分地理信号位于前 10% 到 40% 的层，而不是最后一层；提示越完整、模型越大，可读性通常越高；同等规模下 Llama 在多数任务上优于 Qwen，而 BERT-large 在拓扑关系上始终最好。空间依赖最难读出，说明地理基础模型需要显式建模空间关系的结构，而不只是更大的语料。杨一帆为第三作者，参与数据整理、调查、验证和修改。
