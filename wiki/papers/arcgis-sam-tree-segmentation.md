---
id: arcgis-sam-tree-segmentation
short_title: ArcGIS Text SAM
title: Object Detection and Segmentation of Trees using Text SAM in ArcGIS Online
year: 2025
venue: Security First: Geospatial Workflows for a Safe and Equitable World
type: Book Chapter
status: Published
authors:
  - Yifan Yang
  - Dominic Borrelli
themes:
  - Applied GeoAI Tooling
  - Computer Vision Segmentation
  - Spatial Intelligence
  - Urban Greening
methods:
  - ArcGIS Online Notebooks
  - Text SAM
  - Segment Anything Model
  - Aerial Imagery
  - ArcGIS API for Python
  - Vectorized Tree Polygons
links:
  - label: PDF
    url: ./publications/2025-object-detection-segmentation-trees-text-sam-arcgis.pdf
  - label: Book
    url: https://www.esri.com/en-us/esri-press/browse/security-first-geospatial-workflows-for-a-safe-and-equitable-world
  - label: Chapter
    url: https://www.researchgate.net/publication/396514864_Object_detection_and_segmentation_of_trees_using_Text_SAM_in_ArcGIS_Online
  - label: Code
    url: https://github.com/rayford295/ArcGIS-SAM-TreeSegmentation
connections:
  - target: geolocator
    label: shares the broader spatial intelligence goal of grounding AI outputs in geographic context
  - target: satellite-to-street
    label: connects overhead or aerial imagery with downstream ground-level environmental interpretation
  - target: hyperlocal-disaster
    label: extends the portfolio from damage-oriented visual analysis to urban environmental feature extraction
repository:
  name: ArcGIS-SAM-TreeSegmentation
  url: https://github.com/rayford295/ArcGIS-SAM-TreeSegmentation
  preview: https://opengraph.githubassets.com/rayford-geograph/rayford295/ArcGIS-SAM-TreeSegmentation
  language: Python
  stars: 1
  forks: 0
  commits: 4
position:
  x: 430
  y: 535
color: "#2f8f6f"
radius: 35
---

## One-Sentence Takeaway

This book chapter turns Text SAM into a reproducible ArcGIS Online workflow for detecting and segmenting trees from high-resolution aerial imagery.

## Research Problem

Urban greening analysis often needs tree-level spatial features, but producing usable tree polygons from aerial imagery can be slow when workflows depend on manual digitization or specialized local deep learning environments.

## Core Question

How can a GIS user use Text SAM inside ArcGIS Online to detect tree objects, segment them into polygons, and move the outputs into standard spatial analysis workflows?

## Summary

Presents a step-by-step GeoAI workflow for tree object detection and segmentation from high-resolution aerial imagery using Text SAM in ArcGIS Online Notebooks and the ArcGIS API for Python. The workflow produces vectorized tree polygons that can be opened in ArcGIS Online Map Viewer or analyzed further in ArcGIS Pro.

## Method Snapshot

The workflow starts from high-resolution aerial imagery, publishes it as an imagery layer in ArcGIS Online, runs a GPU-enabled ArcGIS Online Notebook, applies Text SAM with a natural-language prompt such as `tree`, and exports detected tree polygons for spatial analysis.

## Data and Study Area

The companion repository describes a workflow built around aerial imagery, with the chapter example tied to Estella Public School in New South Wales, Australia.

## Key Contributions

- Demonstrates how foundation segmentation models can be used in a practical ArcGIS Online workflow.
- Converts tree detections into vector polygons, which makes the outputs useful for GIS analysis rather than only image interpretation.
- Connects prompt-based computer vision with urban greening, environmental exposure, and spatial decision support.
- Provides a reproducible teaching and workflow resource through the public GitHub repository.

## Main Outputs

- `detectedTrees` feature layer containing tree polygons.
- ArcGIS Online Map Viewer visualization.
- ArcGIS Pro-ready vector features for canopy coverage, density, proximity, and equity-oriented environmental analysis.

## How This Connects to My Other Work

This chapter broadens the research map from publication-centered GeoAI models to deployable GIS workflows. It connects to `GeoLocator` through spatially grounded AI, to `Satellite-to-Street` through overhead imagery and environmental interpretation, and to the disaster assessment papers through the shared theme of turning visual AI outputs into actionable geospatial evidence.

## Limitations and Next Steps

Segmentation quality depends on image resolution, scene complexity, text prompt design, model thresholds, and post-processing choices. A next step would be to benchmark this workflow across neighborhoods, seasons, and canopy structures, then compare Text SAM outputs with manual tree inventories or local government canopy datasets.

## Impact

This chapter is important because it turns GeoAI from an abstract model capability into a teachable, reproducible ArcGIS workflow. It gives the research portfolio a practical GIS education and urban greening branch while staying connected to the larger theme of spatial intelligence.

## Keywords

Text SAM, Segment Anything Model, ArcGIS Online, aerial imagery, tree segmentation, urban greening, GeoAI workflow, spatial intelligence, vector polygons.

## Public Links

- Book page: https://www.esri.com/en-us/esri-press/browse/security-first-geospatial-workflows-for-a-safe-and-equitable-world
- Chapter page: https://www.researchgate.net/publication/396514864_Object_detection_and_segmentation_of_trees_using_Text_SAM_in_ArcGIS_Online
- Code repository: https://github.com/rayford295/ArcGIS-SAM-TreeSegmentation

## Citation

Yang, Yifan, and Dominic Borrelli. 2025. "Object detection and segmentation of trees using Text SAM in ArcGIS Online." In Darren Martin Ruddell and Diana Ter-Ghazaryan (eds.), *Security First: Geospatial Workflows for a Safe and Equitable World*. Esri Press. Chapter 7.

## Chinese Summary

本书章展示了如何在 ArcGIS Online 中使用 Text SAM 对高分辨率航空影像中的树木进行目标检测与分割，并将结果转为可在 ArcGIS Online 和 ArcGIS Pro 中继续分析的树木多边形。它把基础视觉模型和实际 GIS 工作流连接起来，适合用于城市绿化评估、树冠覆盖分析、空间公平性分析和 GeoAI 教学。
