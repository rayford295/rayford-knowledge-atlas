---
id: hyperlocal-disaster
short_title: Hyperlocal Disaster
title: Hyperlocal Disaster Damage Assessment Using Bi-temporal Street-View Imagery and Pre-trained Vision Models
year: 2025
venue: Computers, Environment and Urban Systems
type: Journal Article
status: Published
authors:
  - Yifan Yang
  - Lei Zou
  - Bing Zhou
  - Daoyang Li
  - Binin Lin
  - Joynal Abedin
  - Mengyang Yang
themes:
  - Disaster Assessment
  - Spatial Intelligence
methods:
  - Street-View Imagery
  - Bi-temporal Analysis
  - Pre-trained Vision Models
links:
  - label: PDF
    url: ./publications/2025-hyperlocal-disaster-damage-assessment.pdf
  - label: Paper
    url: https://www.sciencedirect.com/science/article/pii/S0198971525000311
  - label: DOI
    url: https://doi.org/10.1016/j.compenvurbsys.2025.102335
  - label: Code
    url: https://github.com/rayford295/Bi-Temporal-StreetView
  - label: Dataset
    url: https://doi.org/10.6084/m9.figshare.28801208.v2
  - label: Hugging Face
    url: https://huggingface.co/datasets/Rayford295/BiTemporal-StreetView-Damage
connections:
  - target: disastervlp
    label: moves from vision-only damage estimation to visual-language understanding
  - target: damagearbiter
    label: becomes a precursor for arbitration-based multimodal assessment
  - target: satellite-to-street
    label: creates the street-view demand that motivates satellite-to-street generation
repository:
  name: Bi-Temporal-StreetView
  url: https://github.com/rayford295/Bi-Temporal-StreetView
  preview: https://opengraph.githubassets.com/rayford-geograph/rayford295/Bi-Temporal-StreetView
  language: Python
  stars: 7
  forks: 2
  commits: 44
position:
  x: 370
  y: 300
color: "#157bc0"
radius: 38
---

## Summary

Builds a hyperlocal disaster assessment pipeline from paired pre- and post-event street-view imagery using pre-trained vision models.

## Repository Snapshot

The companion repository includes code, images, study-area materials, the paper PDF, and AAG presentation slides. Its README describes a dual-channel bi-temporal street-view framework using Swin Transformer and ConvNeXt backbones.

## Method Snapshot

The workflow follows paired image normalization, feature extraction, dual-channel fusion, damage severity classification, and Grad-CAM interpretation. The repository reports that bi-temporal fusion improves accuracy from 66.14 percent for post-only imagery to 77.11 percent.

## Data and Study Area

The repository focuses on Horseshoe Beach, Florida after Hurricane Milton and documents 2,249 labeled pre- and post-disaster street-view image pairs with georeferenced damage severity annotations.

## Recognition

The repository notes presentation at the AAG Annual Meeting 2025 GISS Specialty Group Paper Competition, Honorable Mention session.

## Impact

This work anchors the disaster-assessment branch of the graph and introduces a practical street-view centered task that later papers refine with richer multimodal reasoning.

## Chinese Summary

这个作品是你灾害街景研究线的基础节点。它证明灾前街景上下文能够提高灾后损伤分类的准确率，也为后续 DisasterVLP 和 DamageArbiter 提供了数据、任务和方法基础。
