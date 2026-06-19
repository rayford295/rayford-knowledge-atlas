# 05 — Scholarly Influences

Three researchers outside my home department work closely in my direction, guided by my two anchoring keywords, **disaster resilience** and **GeoAI**. I read them for methods, but also for how they frame the relationship between data, place, and responsibility, and I position my own work by how it differs from each.

## Dr. Yingjie Hu (University at Buffalo)

A leading figure in GeoAI, focused on extracting and structuring geographic information from unstructured data and on shaping the field's direction. He has used geo-knowledge-guided GPT models to extract location descriptions from disaster-related social media (Hu et al., 2023), mined urban areas of interest from geotagged photos (Hu et al., 2015), and co-authored a field-defining reflection on the advances and limitations of GeoAI (Hu et al., 2024). The throughline is turning text and metadata into geographic knowledge and articulating GeoAI as a discipline.

**How my work differs.** His disaster work emphasizes textual and social-media signals and the geographic location of events; mine emphasizes human-scale visual evidence, such as street-view and cross-view imagery, and the specific damage observed and its severity. More importantly, I try to operationalize the "responsible GeoAI" his 2024 reflection advocates: I treat reliability as a core objective (overconfidence diagnosis and post-hoc calibration in Case 2) and build conflict-aware evaluation and auditable workflows (Cases 3 and 5), rather than focusing on information extraction or agenda-setting alone.

- Hu, Y., Mai, G., Cundy, C., et al. (2023). Geo-knowledge-guided GPT models improve the extraction of location descriptions from disaster-related social media messages. *IJGIS*, 37(11), 2289-2318.
- Hu, Y., Goodchild, M., Zhu, A. X., et al. (2024). A five-year milestone: reflections on advances and limitations in GeoAI research. *Annals of GIS*, 30(1), 1-14.
- Hu, Y., Gao, S., Janowicz, K., et al. (2015). Extracting and understanding urban areas of interest using geotagged photos. *CEUS*, 54, 240-254.

## Dr. Hao Li (National University of Singapore)

Trained in Germany and now at NUS. His research centers on cross-view geolocalization and disaster mapping, combining street-view with satellite and very-high-resolution (VHR) imagery: probabilistic cross-view geolocalization for disaster response (Li et al., 2025), cross-view geolocalization and damage mapping for Hurricane Ian (Li et al., 2025, ISPRS), and vision-foundation-model transfer for rapid post-earthquake building damage mapping (Li et al., 2026). His emphasis is geometry-based image localization and foundation-model-driven, remote-sensing-anchored damage mapping.

**How my work differs.** His work is closely related to mine; our research groups overlap and our papers frequently cite one another, but our emphases differ. He optimizes localization accuracy and satellite-based damage mapping, whereas I optimize responsible, human-scale damage inference from the street-view perspective. My Cases 4 and 5 enter the cross-view space he occupies, but from a critical and generative angle: Case 4 synthesizes street-level views from satellite imagery and asks whether realistic rendering faithfully reflects damage detail, and Case 5 uses conflict-aware evaluation to show that cross-view fusion helps only under specific observation conditions, and that its benefit can be overestimated by spatial leakage. Where his cross-view work tends to assume fusion is beneficial, mine quantifies the conditions under which fusion fails.

- Li, H., Deuser, F., Yin, W., et al. (2025). Towards Generative Location Awareness for Disaster Response: A Probabilistic Cross-view Geolocalization Approach. *arXiv:2512.20056*.
- Li, H., Zou, L., Yin, W., et al. (2026). Smart Transfer: Leveraging Vision Foundation Model for Rapid Building Damage Mapping with Post-Earthquake VHR Imagery. *arXiv:2604.02627*.
- Li, H., Deuser, F., Yin, W., et al. (2025). Cross-view geolocalization and disaster mapping with street-view and VHR satellite imagery: A case study of Hurricane Ian. *ISPRS J. of P&RS*, 220, 841-854.

## Dr. Zihui Ma (Emory University)

An emerging scholar with a civil-engineering background, currently a postdoc at Emory University under Dr. Xiao Huang. She works in disaster informatics, combining social media and crowdsourced data with NLP and multimodal pipelines: public response to wildfires with socio-spatial SIR models and NLP (Ma et al., 2025), a multimodal, multilingual, multidimensional pipeline for crowdsourced earthquake damage evaluation (Ma et al., 2025), and adaptive cross-city learning for disaster sentiment analysis (Ma et al., 2026). Her emphasis is the human and social dimension of disasters and the damage signals harvested from crowdsourced data.

**How my work differs.** Her work emphasizes crowdsourced, social, and text-based data, foregrounding sentiment, public behavior, and cross-city transfer of social signals. Mine assesses physical and structural damage from systematically collected street-view and satellite imagery; its core challenges are visual reliability, disagreement between models, and cross-view fidelity, rather than social sentiment. My multi-agent pipeline (Case 3) resembles her multidimensional crowdsourcing pipeline in spirit, but it coordinates perception, restoration, recognition, and reasoning over imagery through mechanisms that include audit trails, rather than aggregating crowdsourced reports.

- Ma, Z., Chen, Y., Yu, R., et al. (2026). Bridging the Urban Divide: Adaptive Cross-City Learning for Disaster Sentiment Understanding. *arXiv:2602.14352*.
- Ma, Z., Li, L., Li, J., et al. (2025). A Multimodal, Multilingual, and Multidimensional Pipeline for Fine-grained Crowdsourcing Earthquake Damage Evaluation. *arXiv:2506.03360*.
- Ma, Z., Hu, G., Lin, T. S., et al. (2025). Analyzing public response to wildfires: A socio-spatial study using SIR models and NLP techniques. *CEUS*, 121, 102333.

## Why these three

Together they cover the three edges my dissertation connects: place-grounded reasoning from unstructured data (Hu), cross-view and foundation-model methods (Li), and the human and social dimension of disaster (Ma). Reading across them is part of why I treat disaster GeoAI as a system that must be reliable and must reach people, not only as a model that must score well.
