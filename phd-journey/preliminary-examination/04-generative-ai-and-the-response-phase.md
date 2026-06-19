# 04 — Generative AI and the Response Phase

The disaster-resilience lifecycle is commonly described in four phases: mitigation, preparedness, response, and recovery. It helps to be precise about where my work contributes, rather than claiming the whole lifecycle.

## Response: rapid, reliable damage assessment

My primary contribution is to the **response** phase, specifically rapid damage identification: assessing the severity and type of damage from street-view and satellite imagery within a short window after an event, and producing human-scale loss maps quickly.

- **Case 1** (bi-temporal street view) introduces a pre-disaster baseline and lifts validation accuracy from 66% to 77%.
- **Case 2** (DamageArbiter) is a multimodal arbitration framework reaching 0.7585 accuracy and 0.619 MCC.
- **Case 3** (RAPID) is a multi-agent system performing cross-hazard zero-shot recognition with 0.92 disaster-type classification.

Their value is to turn distributed visual observations into a rapid picture of the loss situation, supporting resource-allocation decisions in the immediate aftermath.

## Situational awareness and triage

My work does more than output labels; it reports their reliability. It quantifies overconfidence, exposes disagreement between models, and performs conflict-aware evaluation, so results can be used for triage: high-confidence predictions accepted automatically, low-confidence ones routed to human review. This avoids confident errors that would otherwise mislead triage and resource allocation in high-stakes settings, and focuses limited human review on uncertain areas.

## Recovery (planned)

My contribution also extends, in planned work, to the **recovery** phase: interpretable damage maps and reports to support recovery prioritization and continuous monitoring, plus an immersive 3D delivery layer for public communication and decision-maker feedback. This completes the "last mile," extending from assessment to communication and feedback so that recovery decisions are evidence-based and can be understood and improved by the public.

## Honest scope

I do not claim that generative AI resolves the response phase. It contributes a faster, more inspectable perception-and-assessment capability. Mitigation and preparedness sit largely outside my current studies.
