# 03 — Core Contribution

Among the candidate framings of a single central contribution, a new theory of Autonomous GeoAI, a reusable system architecture, a set of disaster-assessment methods, or an empirical evaluation of responsible GeoAI, my choice, for now, is the **empirical evaluation of responsible GeoAI**.

I deliberately do not claim a new theory of Autonomous GeoAI. As I argue under [key concepts](./02-key-concepts.md), automation, autonomy, and self-evolution remain contested, and it would be premature to anchor the dissertation on a formal definition of any of them.

## The recurring question

Across the six case studies, the surface differences in data, models, and tasks are real, but what binds them into one line of inquiry is neither a model nor a pipeline. It is a recurring scientific question: **in high-stakes disaster settings, accuracy alone is not enough, so how do we measure, reveal, and correct the unreliability of our models, so that disaster geospatial intelligence becomes worthy of trust?**

A way I like to put it: I see myself as a geographer acting as a scientist who is teaching an AI to understand geographic knowledge centered on disaster resilience, and asking whether the AI can learn that knowledge as a human would, apply it, and ultimately come to exceed human performance on these tasks.

## Five transferable principles

My contribution is to answer that question with rigorous empirical evidence, and to distill from it a set of transferable principles for responsible GeoAI:

1. **Accuracy is insufficient.** Overconfidence must be quantified and reported alongside accuracy (Case 2: more than 70% of the image-only model's errors are overconfident).
2. **Overconfidence is correctable.** Post-hoc calibration fixes it without sacrificing accuracy (Case 2: temperature scaling reduces it to about 51%).
3. **Cross-view fusion is conditional.** Its benefit must be assessed with spatial-leakage control and conflict-aware evaluation, or it will be overestimated (Case 5).
4. **Realism is not fidelity.** Generative cross-view imagery must be evaluated by damage fidelity, not visual realism alone (Case 4).
5. **Reasoning must be auditable.** Multi-agent reasoning is trustworthy only when its intermediate states are traceable (Case 3).

These are empirical findings and stated goals that transcend any single method or architecture. Together they form an evidence base for building and evaluating disaster GeoAI responsibly, which is the most scientific and most transferable part of my work.
