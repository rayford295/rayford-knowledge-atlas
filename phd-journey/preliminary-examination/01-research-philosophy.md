# 01 — Research Philosophy

My dissertation builds toward *responsible cross-view GeoAI for disaster damage assessment*. The two anchoring keywords are **disaster resilience** and **GeoAI**, and the guiding conviction is that a disaster model is only as valuable as its ability to be trusted and used. Beyond accuracy, the work should be interpretable, fair, and trustworthy.

## The arc across studies

The dissertation is a sequence of case studies that move from perception toward responsible decision support:

- **Bi-temporal street-view assessment.** Pairing pre- and post-disaster street view lifts damage classification from roughly 66% to 77%, showing that change, not a single snapshot, carries the signal.
- **DamageArbiter.** A disagreement-driven arbitration framework that combines a Vision Transformer with CLIP through a lightweight logistic-regression meta-classifier, reaching about 75.85% accuracy and a Matthews correlation coefficient near 0.62 using only inference-time, label-free features. Post-hoc confidence calibration (temperature scaling) then cuts the image model's overconfident errors from over 70% to about 51% without changing accuracy.
- **RAPID multi-agent reasoning.** A multi-agent pipeline that reaches around 0.92 on disaster-type recognition.
- **Satellite-to-street generation.** Cross-view generation that surfaces a key lesson: visual realism does not guarantee damage fidelity.
- **Conflict-aware cross-view evaluation.** Treating disagreement between views as information to be governed, not noise to be averaged away.
- **Immersive 3D decision support (planned).** The delivery-and-feedback layer that closes the loop.

## Why "responsible" is the through-line

Each study contributes accuracy, but the binding theme is governance. A confident error in disaster assessment is not a benign mistake: it can divert relief away from the people who need it most. That is why uncertainty, overconfidence, conflict between views, and the legibility of the system to the people it observes recur as first-class concerns rather than afterthoughts.

The honest version of this philosophy also names its weakest point. Fairness is the least developed of the three responsibility dimensions in my current work, and I treat that as an open obligation rather than a solved property. The dissertation exhibits aspects of interpretability, fairness, and trustworthiness; it does not claim to have solved them.
