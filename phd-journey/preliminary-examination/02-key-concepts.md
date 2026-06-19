# 02 — Key Concepts

These are the working definitions I rely on. They are deliberately modest: I prefer to say what a system *exhibits aspects of* rather than what it *solves*.

## Automation, autonomy, and self-evolution

I separate three words that are often blurred together along one axis: **what is fixed and what changes.**

- **Automation** executes a fixed, predefined sequence of steps. The designer decides every step in advance, and behavior does not change with context or over time. It executes; it does not decide.
- **Autonomy** adds decision-making at run time. Given a high-level goal (for example, "assess the disaster damage shown in this image"), the system decides on its own how to reach it: which observations to gather, which models or agents to invoke, in what order, and when its own output is unreliable enough to stop or hand the case to a human. Its capabilities are fixed, but its decisions are adaptive. Autonomy is therefore not about running end-to-end on its own, but about deciding how to act and recognizing when it should not trust itself.
- **Self-evolution** goes further: the system changes itself over time, updating its models, knowledge, or capabilities from experience and feedback. It is closer to open-ended, organic growth, and it is the most powerful and least controllable of the three.

**Why autonomy is worth discussing now.** Autonomy becomes a meaningful question only because data and models have grown powerful enough to "self-start," to bootstrap a reasoning process from a goal and an input. When data and models are weak, we speak of fixed pipelines, not autonomy. A capable foundation model is the precondition.

**What a system must show to count as autonomous, not merely automated:** a foundation model as the reasoning engine; goal decomposition into ordered sub-tasks rather than a fixed script; the ability to act under uncertainty while reporting that uncertainty rather than hiding it; traceable, interpretable evidence behind its decisions; and human-in-the-loop review, so autonomy stays accountable.

In a high-stakes disaster context this ordering also tracks governability: automation is predictable but brittle; autonomy needs uncertainty-awareness and human oversight to remain accountable; self-evolution, because the system rewrites itself, makes audit trails and human governance indispensable. The honest framing is that I am a *system designer* pursuing bounded, responsible autonomy (the reliability-aware arbitration of Case 2, the auditable multi-agent workflow of Case 3), and I treat self-evolution as a speculative frontier rather than a claim.

## Interpretability, fairness, trustworthiness

These are three large words, and I am wary of the known pitfall of claiming to deliver them outright. The accurate statement is that my work, applying GeoAI to disaster damage assessment, can *exhibit aspects* of interpretability, fairness, and trustworthiness, rather than fully solving or defining them. I hold each to a concrete meaning and to concrete strategies in the system design.

**Interpretability** — the system presents, in a form humans can inspect and challenge, what evidence it used and why it reached its conclusion, as a stance against the black-box single label. Strategies: Grad-CAM showing whether the model focuses on genuine disaster-induced change (Case 1); transparent arbitration logic that makes explicit when the two models disagree, whether it trusts ViT or CLIP, and on what confidence basis (Case 2); traceable intermediate states across RAPID's perception, restoration, recognition, and reasoning agents (Case 3); and transparent error types, reporting overconfident and ambiguous errors, not only overall accuracy.

**Fairness** — the system should not show systematic performance disparities across regions, severity levels, or socioeconomic groups, lest it divert relief from the most vulnerable. Strategies: MCC and per-class metrics to attend to the small but critical "severe" class rather than an accuracy the majority class inflates (Case 2); conflict-aware evaluation with cross-city and cross-hazard testing to check over-reliance on the training region, while controlling spatial leakage so fairness is not overestimated (Case 5). Candidly, fairness is the least developed of the three: I have addressed it at the class and generalization levels, while auditing spatial fairness at the demographic and socioeconomic levels remains future work, not a completed claim.

**Trustworthiness** — outputs can be relied on because their reliability is known and bounded: the system knows when it is uncertain, does not make confident mistakes, and returns control to humans when appropriate. This is the strongest element of my work. Strategies: overconfidence diagnosis via Shannon entropy and the decision margin (Case 2); post-hoc temperature-scaling calibration that cuts overconfident errors from over 70% to about 51% without sacrificing accuracy (Case 2); disagreement-driven arbitration and conflict-aware evaluation to decide when to trust a prediction and when to abstain (Cases 2 and 5); and human-in-the-loop and abstention mechanisms that route low-confidence results to review rather than forcing an output.

**Transparency and accountability** are supported jointly: interpretability provides what is understandable, trustworthiness what is dependable, and fairness what is impartial, while audit trails and human-in-the-loop review turn them into what is accountable.

## Mutual visibility

A recurring governance idea. Immersive systems let people *see* a place, but I insist on the reverse question: can people see how the system perceived, generated, and judged the place they live in? The asymmetry runs two ways and matters in everyday technology:

- A vehicle's cameras may continuously collect large volumes of data about us, which raises real privacy concerns: the system sees us far more than we see it.
- An insurer may hold extensive data and price by region, while remaining opaque to the very people being priced.

In both cases the observer is unseen. A responsible system should be as legible to the people it observes as those people are to it. The more immersive the delivery becomes, the more interpretability and data governance must be built into the interface itself, not bolted on afterward.

## "System" and "high-stakes application"

- **System.** When I say "system," I do not mean a single model or a single framework. I mean the end-to-end responsible cross-view GeoAI framework across all four layers (observation, reasoning, evaluation-and-governance, delivery-and-feedback), including its governance and delivery mechanisms.
- **High-stakes application.** A disaster-decision setting in which errors carry serious and often irreversible consequences for human safety, resource allocation, or social equity, usually under time pressure. Examples include post-disaster triage and search-and-rescue prioritization, emergency resource allocation, infrastructure safety and evacuation routing, damage-based aid and insurance decisions, and public risk communication. In each, the cost of an error is far higher than in an ordinary classification task. Put starkly, vulnerable groups must not be harmed because of our own erroneous decisions.
