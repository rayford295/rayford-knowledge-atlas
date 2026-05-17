---
id: geolocator
short_title: GeoLocator
title: GeoLocator: A Location-Integrated Large Multimodal Model for Inferring Geo-Privacy
year: 2024
venue: Applied Sciences
type: Journal Article
status: Published
authors:
  - Yifan Yang
  - Siqin Wang
  - Daoyang Li
  - Shuju Sun
  - Qingyang Wu
themes:
  - Geo-Privacy
  - Multimodal Learning
  - Spatial Intelligence
methods:
  - Large Multimodal Model
  - Geo-Privacy Inference
  - Location Integration
links:
  - label: PDF
    url: ./publications/2024-geolocator-location-integrated-lmm-geo-privacy.pdf
  - label: Paper
    url: https://www.mdpi.com/2076-3417/14/16/7091
  - label: DOI
    url: https://doi.org/10.3390/app14167091
  - label: Code
    url: https://github.com/rayford295/GeoLocator
  - label: Demo
    url: https://gpts-privacy.github.io/auto-demo/
connections:
  - target: disastervlp
    label: extends multimodal geographic reasoning into disaster understanding
  - target: hyperlocal-disaster
    label: precedes later work on location-aware street-view damage analysis
repository:
  name: GeoLocator
  url: https://github.com/rayford295/GeoLocator
  preview: https://opengraph.githubassets.com/rayford-geograph/rayford295/GeoLocator
  language: HTML
  stars: 1
  forks: 1
  commits: 22
position:
  x: 180
  y: 470
color: "#d7a13b"
radius: 34
---

## Summary

Introduces a location-integrated large multimodal model that reasons about geo-privacy signals and location inference from visual content.

## Repository Snapshot

The repository includes the paper PDF, demo assets, an interactive web page, package metadata, and project figures. Its README links a demo video, an interactive demo page, a Custom GPT implementation, an ArcGIS StoryMap, and supplementary project resources.

## Research Problem

Large multimodal models can infer sensitive geographic information from visual cues such as signage, vegetation, terrain, architecture, and surrounding scene context. This creates a geo-privacy risk when images are shared online.

## Demo and Public Interfaces

The repository presents GeoLocator as both a paper companion and an interactive demonstration system. It links a Custom GPT version for human-in-the-loop exploration and an ArcGIS StoryMap for narrative explanation of methodology and geospatial visualization.

## Key Contributions

- Designs a location-integrated large multimodal model for geo-privacy inference.
- Evaluates image and text inputs for location inference.
- Highlights privacy and OSINT risks in geospatial AI.
- Turns the paper into a public-facing demo and teaching resource.

## Impact

This paper established an early foundation for combining visual understanding with spatial reasoning, which later expands into disaster intelligence and multimodal geographic inference.

## Chinese Summary

这个作品是你研究图谱里“负责任 GeoAI”和“地理隐私”的核心入口。它展示多模态模型如何从图像和文本中推断地理位置，也提醒研究者和公众关注视觉内容中的地理隐私泄露风险。
