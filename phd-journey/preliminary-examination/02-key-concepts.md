# 02 — Key Concepts

These are the working definitions I rely on. They are deliberately modest: I prefer to say what a system *exhibits aspects of* rather than what it *solves*.

## Automation, autonomy, and self-evolution

I separate three words that are often blurred together.

- **Automation** is executing a fixed pipeline without human intervention. The steps are predetermined; the system simply runs them.
- **Autonomy** is the capacity to make context-dependent decisions within a task, for example the arbitrator choosing, case by case, whether to trust the image model or the image-text model when they disagree. Autonomy is bounded: it acts inside a scope a designer has defined.
- **Self-evolution** is the harder, more confusing idea: a system that improves its own behavior over time from feedback, rather than staying fixed after deployment. My current work shows autonomy in a bounded sense and only gestures toward self-evolution. I name it because the delivery-and-feedback layer is where a genuine feedback loop, and therefore the possibility of self-evolution, would have to live.

The honest framing is that I am a *system designer* making bounded autonomy decisions, not a builder of fully self-evolving agents.

## Interpretability, fairness, trustworthiness

These are three large words, and I am wary of the cost of using large words loosely in research. I hold them to concrete meanings:

- **Interpretability** — a user can see not only the prediction but the evidence and uncertainty behind it.
- **Fairness** — errors do not systematically fall on already-vulnerable groups. This is the dimension my work has developed least, and I say so plainly.
- **Trustworthiness** — confidence is calibrated, so a stated probability means what it says; an overconfident error is itself a failure of trust.

## Mutual visibility

A recurring governance idea. Immersive systems let people *see* a place, but I insist on the reverse question: can people see how the system perceived, generated, and judged the place they live in? The asymmetry runs two ways and matters in everyday technology:

- A vehicle's cameras may continuously collect large volumes of data about us, which raises real privacy concerns: the system sees us far more than we see it.
- An insurer may hold extensive data and price by region, while remaining opaque to the very people being priced.

In both cases the observer is unseen. A responsible system should be as legible to the people it observes as those people are to it. The more immersive the delivery becomes, the more interpretability and data governance must be built into the interface itself, not bolted on afterward.

## "System" and "high-stakes application"

- **System.** When I say "system," I do not mean a single model or a single framework. I mean the end-to-end responsible cross-view GeoAI framework across all four layers (observation, reasoning, evaluation-and-governance, delivery-and-feedback), including its governance and delivery mechanisms.
- **High-stakes application.** A disaster-decision setting in which errors carry serious and often irreversible consequences for human safety, resource allocation, or social equity, usually under time pressure. Examples include post-disaster triage and search-and-rescue prioritization, emergency resource allocation, infrastructure safety and evacuation routing, damage-based aid and insurance decisions, and public risk communication. In each, the cost of an error is far higher than in an ordinary classification task. Put starkly, vulnerable groups must not be harmed because of our own erroneous decisions.
