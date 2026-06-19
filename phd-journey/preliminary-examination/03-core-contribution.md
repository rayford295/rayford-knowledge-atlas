# 03 — Core Contribution

If the dissertation has to be reduced to a single scientific contribution, it is this:

> **A responsible cross-view GeoAI framework that turns disagreement between views into a governed, calibrated, and inspectable basis for disaster damage assessment.**

Most cross-view work treats multiple viewpoints as redundant sources to be fused for a single accuracy number. My contribution is to treat the **disagreement** between views as information in its own right, and then to govern it:

- **Arbitration instead of blind fusion.** When an image model and an image-text model disagree, a lightweight meta-classifier decides, case by case and using only inference-time features, which view to trust. This is bounded autonomy made explicit and auditable.
- **Calibration instead of raw confidence.** Post-hoc temperature scaling corrects overconfidence so that a stated probability is meaningful, without changing the predicted class. An overconfident error is a trust failure, and calibration is how the framework addresses it.
- **Conflict and uncertainty as first-class outputs.** The system reports not just a label but where the views conflicted and how certain it was, which is what makes downstream decisions inspectable.

The contribution is therefore methodological and ethical at once: a way of building disaster GeoAI in which the model's *disagreements and doubts* are surfaced and managed, rather than hidden inside an aggregate score. Accuracy is necessary, but the novel move is making the assessment trustworthy enough to act on.
