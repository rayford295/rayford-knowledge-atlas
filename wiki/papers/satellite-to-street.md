---
id: satellite-to-street
short_title: Satellite-to-Street
title: Satellite-to-Street: Synthesizing Post-Disaster Views from Satellite Imagery via Generative Vision Models
year: 2026
venue: "IGARSS 2026: 2026 IEEE International Geoscience and Remote Sensing Symposium, Washington, DC, USA, pp. 1764-1768"
type: Conference Paper
status: Published
authors:
  - Yifan Yang
  - Lei Zou
  - Wendy Jepson
themes:
  - Generative Vision
  - Disaster Assessment
  - Spatial Intelligence
methods:
  - Generative Vision Models
  - Satellite Imagery
  - Street-Level Synthesis
links:
  - label: PDF
    url: ./publications/2026-satellite-to-street-post-disaster-views-igarss.pdf
  - label: DOI
    url: https://doi.org/10.1109/IGARSS60577.2026.11730816
  - label: IEEE Xplore
    url: https://ieeexplore.ieee.org/document/11730816
  - label: Code
    url: https://github.com/rayford295/Sat2Street-DisasterGen
connections:
  - target: hyperlocal-disaster
    label: responds to the need for street-view evidence where post-disaster imagery is sparse
  - target: damagearbiter
    label: complements assessment models by generating new post-event visual inputs
repository:
  name: Sat2Street-DisasterGen
  url: https://github.com/rayford295/Sat2Street-DisasterGen
  preview: https://opengraph.githubassets.com/rayford-geograph/rayford295/Sat2Street-DisasterGen
  language: Python
  stars: 1
  forks: 1
  commits: 106
position:
  x: 790
  y: 500
color: "#b97a16"
radius: 40
---

## Summary

Uses generative vision models to synthesize post-disaster street-level views from satellite imagery, bridging remote sensing and ground-level interpretation.

## Repository Snapshot

The companion repository includes figures, dataset references, training and test code, result samples, and evaluation folders for LLM-based and ResNet-based assessment. Its README frames the project as a cross-view generation benchmark for synthesizing post-disaster street views from satellite and remote-sensing inputs.

## Evaluated Methods

The repository compares Pix2Pix, Stable Diffusion 1.5 with ControlNet, ControlNet with VLM guidance, and a Disaster-MoE design. The README reports that SD 1.5 plus ControlNet achieves the strongest semantic consistency, with F1 around 0.71 under the reported classifier evaluation.

## Why the Repository Matters

The code structure makes this node more than a concept paper: it contains training, testing, sample results, and multiple evaluation paths. That turns the graph edge from satellite imagery to street-view disaster evidence into a reproducible research artifact.

## Support

The repository notes support from the Texas A&M University Environment and Sustainability Initiative through the Environment and Sustainability Graduate Fellow Award.

## Impact

This paper opens a new branch in the graph by moving from analysis to generation, which makes the broader research program feel forward-looking and distinctive.

## Public Links

- PDF: ../../publications/2026-satellite-to-street-post-disaster-views-igarss.pdf
- DOI: https://doi.org/10.1109/IGARSS60577.2026.11730816
- IEEE Xplore: https://ieeexplore.ieee.org/document/11730816 (added 2026-10-21)
- Repository: https://github.com/rayford295/Sat2Street-DisasterGen
- Preprint: https://arxiv.org/abs/2603.20697

## Citation

Y. Yang, L. Zou and W. Jepson, "Satellite-to-Street: Synthesizing Post-Disaster Views from Satellite Imagery via Generative Vision Models," *IGARSS 2026 - 2026 IEEE International Geoscience and Remote Sensing Symposium*, Washington, DC, USA, 2026, pp. 1764-1768, doi: 10.1109/IGARSS60577.2026.11730816.

## Chinese Summary

这个作品把你的灾害视觉研究从“识别损伤”推进到“生成灾后街景证据”。它比较了 GAN、扩散模型、VLM 引导和专家混合策略，是图谱中连接遥感影像、街景理解和生成式 GeoAI 的关键节点。
