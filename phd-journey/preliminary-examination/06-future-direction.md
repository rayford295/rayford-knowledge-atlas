# 06 — Future Direction: Immersive Delivery

My research often grows out of my reading. I make a point of reading about the future and of watching the directions industry is moving in. Two pieces shaped my next study, and although both are marketing on the surface, placed back into my research philosophy they point to a stage researchers often overlook: **how spatio-temporal intelligence actually reaches people, is used by them, and is in turn calibrated by them.**

- **The "why" (customer engagement as competitiveness).** Engagement is not a by-product of satisfaction but a form of competitiveness in its own right. The more a system engages, the better it understands the real needs and behavior of those it serves, and the better the experience it can deliver. Personalized, continuous, omnichannel engagement compounds into relationships and retention.
- **The "how" (immersive 3D experiences).** Photorealistic 3D tiles, street view, aerial perspectives, and WebGL overlays turn a "place" from a flat basemap into a vehicle for storytelling, interaction, and immersion.

> These are practitioner and product signals, not peer-reviewed sources. I treat them as motivation, and I pair them with academic work on immersive geovisualization and digital twins for the formal argument.

## The last mile

My research can already produce reliable damage assessments, but those results are delivered mainly as 2D images, maps, tables, and text reports. These formats support assessment, yet they do not turn spatio-temporal intelligence into an experience that is inspectable, immersive, and capable of feedback. Even a highly accurate model cannot truly reach decision-makers and the public if its output stops inside a metrics table. The next study targets this **last mile**.

## Cross-View Splatter (planned)

Working title: **"Cross-View Splatter: Feed-Forward View Synthesis with Georeferenced Images."**

The idea is to use satellite, street-view, and other georeferenced images to synthesize coherent 3D scenes of disaster-affected areas through **feed-forward view synthesis** (a representation in the spirit of 3D Gaussian Splatting, rather than slow per-scene optimization). On top of the 3D scene I will overlay the responsible-GeoAI signals from earlier studies, including damage type, model uncertainty, evidence source, and model-generated explanations, so the immersive view is not only photorealistic but also interpretable and trustworthy. This continues the **mutual visibility** idea: the user can see the place, and can also see how the system perceived, generated, and judged it. The more immersive the presentation, the more interpretability and data governance must live inside the interface itself.

### Research questions

1. Can georeferenced cross-view images effectively support 3D scene representation for disaster assessment?
2. How can synthesized 3D scenes preserve specific visual evidence of damage, not merely visual realism?
3. Compared with 2D image or map interfaces, can immersive inspection improve the communication of disaster information and the quality of user feedback?

### Role and significance

Cross-View Splatter completes the **delivery-and-feedback layer** of the four-layer framework. It turns the uncertainty and evidence quantified in earlier studies into information a user can see inside an immersive scene. For the disaster-resilience through-line, this is the natural home of public communication and decision support: placing post-disaster damage and risk scenarios into interactive, photorealistic 3D and street-view scenes is itself the presentation layer of disaster perception, and it is what lets "seeing disaster in order to help govern disaster" land in genuinely public-facing settings.

In one sentence: the value of this study lies not only in improving the accuracy of the model, but in delivering spatial intelligence in a form that is immersive, interactive, and open to feedback, so that the system perceives the real world and people in the real world can put the system to use. This is exactly the vision that drives me to push beyond the boundary of the screen and let the real world become the stage on which intelligence performs.

### Honest scope

This is the most forward-looking and least mature part of the dissertation. It inherits the central lesson of the satellite-to-street study: realism does not guarantee damage fidelity. The principal risk is that a synthesized 3D scene looks convincing while distorting the true damage evidence. I therefore treat damage-fidelity and geometric-consistency evaluation, rather than visual realism alone, as the core scientific challenge of this study.
