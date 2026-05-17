---
id: disastervlp
short_title: DisasterVLP
title: Perceiving Multidimensional Disaster Damages from Street-View Images Using Visual-Language Models
year: 2025
venue: International Cartographic Conference
type: Conference Paper
status: Published
authors:
  - Yifan Yang
  - Lei Zou
themes:
  - Disaster Assessment
  - Multimodal Learning
  - Spatial Intelligence
methods:
  - Visual-Language Models
  - Street-View Imagery
  - Damage Semantics
links:
  - label: PDF
    url: ./publications/2025-perceiving-multidimensional-disaster-damages-ica.pdf
  - label: Paper
    url: https://doi.org/10.5194/ica-abs-10-310-2025
  - label: DOI
    url: https://doi.org/10.5194/ica-abs-10-310-2025
  - label: Code
    url: https://github.com/rayford295/DisasterVLP
  - label: Dataset
    url: https://doi.org/10.6084/m9.figshare.28801208.v2
connections:
  - target: hyperlocal-disaster
    label: broadens the earlier street-view damage pipeline into semantic damage perception
  - target: damagearbiter
    label: provides the conceptual bridge to multimodal arbitration with CLIP-style reasoning
repository:
  name: DisasterVLP
  url: https://github.com/rayford295/DisasterVLP
  preview: https://opengraph.githubassets.com/rayford-geograph/rayford295/DisasterVLP
  language: Jupyter Notebook
  stars: 2
  forks: 3
  commits: 26
position:
  x: 560
  y: 390
color: "#4b9dd5"
radius: 36
---

## Summary

Explores multidimensional disaster damage understanding with visual-language models, moving beyond single-score damage classification.

## Repository Snapshot

The repository includes baseline experiments, Gemini-based components, framework figures, the published ICC abstract PDF, and dataset references. Its README describes DisasterVLP as a vision-language framework for bi-temporal street-view disaster perception, severity assessment, and descriptive caption generation.

## Framework Notes

The repository presents an overall structure plus phases for pseudo post-disaster generation and multimodal disaster perception. It also includes study-area figures and label result examples, which make it useful as both a paper companion and a visual explanation source.

## Conference and Recognition

This work was accepted for presentation at the 32nd International Cartographic Conference in Vancouver, Canada, and the repository notes a Best Student Paper Award at ICC 2025.

## Data Linkage

The project links to the Figshare dataset record for the multidimensional disaster damage work, which connects this node to the later DamageArbiter and Hyperlocal Disaster branches.

## Impact

This paper marks the shift from pure recognition to richer semantic interpretation, which directly informs later multimodal arbitration work.

## Chinese Summary

这个作品把灾害损伤识别扩展为“多维度灾害感知”：不仅判断损伤等级，还结合视觉语言模型生成描述性理解。它是后续 DamageArbiter 中多模态仲裁思路的重要前置节点。
