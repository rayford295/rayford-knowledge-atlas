# Proposal Defense — Speaker Script (English)

Yifan Yang · Second proposal defense, 11.13.2026 (online) · one section per slide; the same text is stored in each slide's Notes pane.


## Slide 1 — Yifan Yang, Ph.D. Student, Department of Geography

Good afternoon, committee members, and thank you for being here. My name is Yifan Yang, and today I will present my dissertation proposal, "Advancing GeoAI for Disaster Resilience: From Damage Assessment to Insightful Decision Support."
The subtitle is the arc of this talk. I started from a narrow, well-defined task, assessing damage from images, and I am building toward GeoAI that supports decisions across the whole disaster resilience cycle. The quote at the bottom is my own one-line motto for the dissertation: seeing, describing, and governing disasters, with the real world rather than the screen as the stage for intelligence.


## Slide 2 — Outline

Here is the roadmap. I will first explain why disaster resilience is a geographic question and why image-based damage assessment is the entry point. I will then define GeoAI and the three families of AI models I work with, which lead to three current challenges.
Those challenges motivate a three-stage conceptual framework and three objectives. Most of the talk walks through the case studies: five completed and two ongoing in the main part, with additional cases in the backup slides. I will close with my publications and awards, the research schedule, and your questions.


## Slide 3 — Background

Let me start with why disaster resilience is a geographical question. I will make four points.
First, resilience is rooted in space. Cutter and colleagues' place-based model argues that resilience is shaped by local hazard exposure, social vulnerability, and human-environment interactions.
The figure, from the same paper, shows why a place-based framing is needed: the global environmental change community and the hazards community draw the relationships among vulnerability, resilience, and adaptive capacity differently, as you see in panels A to F. The DROP model reconciles them by anchoring all three concepts at a specific place.


## Slide 4 — Background

Second, resilience is diverse across the globe. This map shows the 14 disaster events in the BRIGHT dataset by Chen and colleagues.
They span five continents and seven disaster types: earthquakes, floods, hurricanes, volcanic eruptions, wildfires, explosions, and armed conflict, both natural and man-made. The same severity of building damage looks very different in Morocco, Maui, and Noto. So a method that works in one place cannot be assumed to work everywhere, and that will come back as Challenge 2.


## Slide 5 — Background

Third, disaster resilience is a geographic inquiry. Beyond asking what happened, we ask where it happened, how severe it was, who was affected, and how to allocate limited resources.
Goodchild and Glennon showed this with the 2009 Santa Barbara wildfires: the volunteered map on the screen answered these spatial questions faster than official channels. Every one of these questions is spatial, and that is exactly where GeoAI can contribute.


## Slide 6 — Background

Fourth, resilience is a cycle in time. The National Academies define resilience as the ability to prepare for, absorb, recover from, and adapt to adverse events.
In practice this unfolds as preparedness, response, recovery, and mitigation, as the ring in the figure shows. Each phase depends on timely, place-specific information, and that information need is what my dissertation addresses. I enter the cycle at one particular task, which is the next slide.


## Slide 7 — Background

That task is damage assessment, because assessment is the hinge between response and recovery. It tells responders where to go first, lets agencies verify eligibility and release aid, and gives planners a baseline for rebuilding.
FEMA's Damage Assessment Operations Manual formalizes the workflow you see on the left: acquire imagery, classify damage severity, generate reports, and map impacts rapidly so that resources can be allocated. The photographs on the right show what this looks like in the field. My case studies target these same four steps.


## Slide 8 — Background

Imagery is the primary evidence for assessment, and I use two complementary views.
Overhead remote sensing, from satellites and aircraft, offers wide coverage and roof-level damage signals; benchmarks like xBD made this a mainstream computer-vision problem. Ground-level street-view imagery sees what overhead sensors miss: facades, debris, and flooding at individual structures, although its coverage is sparse.
The left panel shows Hurricane Ian assessed from aerial imagery; the right shows street-view assessment after Hurricane Michael. Notice that the two views can disagree for the same building. Each view has blind spots, and combining them is a recurring theme in my cases.


## Slide 9 — Background

So we have rich imagery from above and from the ground. But having the data is not the same as understanding it.
Three things break manual interpretation. Volume: after a single hurricane there can be tens of thousands of buildings to assess. Speed: responders need answers within days, not weeks. Complexity: as you just saw, different views can even disagree with each other.
Human interpretation simply cannot keep up. What we need is AI that does not only see images, but understands where they are and how places relate to one another. That is GeoAI.


## Slide 10 — Background

Following Janowicz and colleagues, GeoAI refers to spatially explicit AI methods that use geographic data and spatial context to create intelligent geographic information, knowledge, and services.
The key phrase is spatially explicit: location, neighborhood, and scale are part of the model, not just metadata attached afterwards. In this dissertation, GeoAI is the bridge between the geographic questions I raised and the image data used for assessment.


## Slide 11 — Background

Talking about GeoAI requires being precise about what kind of AI we mean, so I organize the models I use into three families.
Discriminative models answer closed questions, such as whether a building is damaged and how severely. They are accurate on the task they were trained for, but they need labels for every event and they stay confident even when they are wrong.
Generative models, especially foundation and vision-language models, answer open questions, such as why a location is severely damaged and what responders should do. They generalize zero-shot across hazards and regions, but they are usually less accurate than tuned classifiers and can hallucinate.
Agentic AI is a large language model plus tools plus context. It can combine the first two families, call GIS tools and live data so that answers rest on computed evidence rather than memory, and extend beyond damage assessment to the whole resilience cycle.


## Slide 12 — Background — one-sentence summary

Let me compress the background into one sentence. This dissertation advances GeoAI along three evolving model families, discriminative, generative, and agentic, to move from damage assessment toward insightful decision support across the whole disaster resilience cycle.
The diagram shows the inputs at the bottom, satellite imagery, street-view imagery, pre-event data, and environmental and socio-demographic data, flowing through the three families at the top and back into the four phases of the resilience cycle.


## Slide 13 — Current Challenges

Each model family comes with a challenge, and each challenge becomes a question.
Challenge one: discriminative assessment is not yet accurate or reliable enough. Most models see only one post-event view and discard the pre-disaster baseline, and fine-tuned models stay confident when wrong. The question is how to see better.
Challenge two: specialized models do not generalize across events. A classifier trained on one hurricane transfers poorly to another hazard or region, and collecting new labels is too slow for response. The question is how to respond faster.
Challenge three: assessment alone does not close the resilience loop. A label or a map is not a decision; preparedness, response, and recovery all need actionable and accountable guidance. The question is how to prepare and deliver better.


## Slide 14 — Conceptual Framework

The conceptual framework maps the three challenges on the left onto three stages of evolving GeoAI in the middle, and each stage produces an insight on the right.
Stage one uses discriminative models to restore the pre-disaster baseline and arbitrate among models, so we see better; this yields cases one and two. Stage two uses generative models for zero-shot understanding across views, regions, and hazards without event-specific training, so we respond faster; this yields cases three to five. Stage three uses agentic AI to anticipate, inspect, and communicate place-based impacts with accountability, so we prepare and deliver better; this yields cases six and seven.


## Slide 15 — Objectives

The three objectives follow directly from the challenges.
Objective one addresses challenge one: improve accuracy and reliability by fusing different views and arbitrating among multiple models, realized in cases one and two.
Objective two addresses challenge two: enable zero-shot assessment that transfers across hazards and regions without new labels or retraining, realized in cases three to five.
Objective three addresses challenge three: build accountable agentic GeoAI that turns assessment into evidence-backed action before, during, and after disasters, realized in cases six and seven.
With that structure in place, let me walk through the stages.


## Slide 16 — STAGE 1  ·  OBJECTIVE 1

Stage one: see better. The challenge is that discriminative assessment is not yet accurate or reliable enough.
Two cases address it. Case one, published in Computers, Environment and Urban Systems in 2025, adds the pre-disaster street-view baseline so that the model can see actual change. Case two, DamageArbiter, now under review at Natural Hazards, tackles overconfidence by arbitrating among image, text, and multimodal models.


## Slide 17 — Research questions: 

Case one asks two questions. First, can pre-disaster street-view imagery help us classify disaster damage more accurately? Second, how can we integrate pre- and post-disaster street-view imagery to enable rapid, hyperlocal damage assessment?
The panoramas show the same locations before and after Hurricane Milton. The red boxes highlight changes that become obvious only when both views are available, which is the intuition behind the whole case.


## Slide 18 — Case 1: Hyperlocal disaster damage assessment using bi-temporal street-view imagery and pre-trained vision models (study area and dataset)

This slide shows the study area and the dataset. We collected panoramic street-view imagery along the road network in Florida before and after Hurricane Milton, and annotated damage at three levels: mild, moderate, and severe.
The bar chart shows the class distribution. It is imbalanced, which is a realistic condition that any operational model has to handle. The image rows at the bottom show example pre- and post-event pairs for each severity level.


## Slide 19 — Case 1: Hyperlocal disaster damage assessment using bi-temporal street-view imagery and pre-trained vision models

We compared three settings. Post-only classifies post-event images into three severity levels, which is how most existing models work. The second setting mixes pre- and post-event images in one pool and adds a fourth "no damage" class. The third, paired setting extracts features from the pre- and post-event images of the same location and fuses them before classification.
The question is whether explicitly pairing the two views helps the model see real change rather than scene context.


## Slide 20 — Case 1: Hyperlocal disaster damage assessment using bi-temporal street-view imagery and pre-trained vision models

Methodologically, we compared single-channel baselines, which see only the post-event image, with several dual-channel architectures that take both images together: six-channel early fusion, cross-attention between Swin Transformer branches, feature-fusion ConvNeXt, and a Siamese ConvNeXt that computes feature differences.
All models use pre-trained vision backbones, so the design question is how to inject the pre-disaster baseline, not how to train from scratch.


## Slide 21 — Case 1: Hyperlocal disaster damage assessment using bi-temporal street-view imagery and pre-trained vision models

Here are the results as two charts. The top chart is overall accuracy for all seven models. The single-view Swin baseline reaches 66 percent; the dual-channel feature-fusion ConvNeXt reaches 77 percent, an eleven-point gain, and every dual-channel model beats its single-view counterpart.
The bottom chart breaks accuracy down by severity class. The gains are largest where they matter most: the baseline Swin recognizes only 39 percent of mild cases, while the dual models lift mild and severe accuracy substantially.
The Grad-CAM maps on the left show why: the dual-channel model attends to real pre-to-post changes, such as missing roofs and debris, rather than background context. This is the evidence that the pre-disaster baseline helps us see better.


## Slide 22 — Case 1: Hyperlocal disaster damage assessment using bi-temporal street-view imagery and pre-trained vision models (Published, CEUS 2025)

This work was published in Computers, Environment and Urban Systems in 2025. It was also featured by Mosaic, the company whose camera imagery we used, as an example of how Texas A&M is pioneering street-level damage assessment after Hurricane Milton.
Case one improves accuracy. The next case asks about reliability.


## Slide 23 — Case 2: DamageArbiter: A Multimodal Arbitration Framework for Disaster Damage Assessment from Street-View Imagery (Under Review, Natural Hazards)

Case two starts from a reliability problem: accuracy alone is not enough for disaster response.
Here is a concrete example. A fine-tuned vision transformer looks at this post-hurricane street view and predicts mild with 70 percent confidence. The actual label is severe. The model was not only wrong, it was confidently wrong; the gap between its top probability and the probability it gave the true class is 60 percent.
Overconfident wrong predictions are dangerous because they can send crews to the wrong places and mislead prioritization. DamageArbiter is designed to reduce overconfidence, not just the error rate.


## Slide 24 — Case 2: DamageArbiter: A Multimodal Arbitration Framework for 

Case two has two research questions. First, how reliable are image-only, text-only, and image-text models for street-view damage assessment? Second, can LLM-generated image descriptions support reliable assessment when human annotations are limited?
The panels show the three severity classes together with LLM-generated descriptions of each scene. These descriptions give us a text modality that is cheap to produce and surprisingly informative.


## Slide 25 — Case 2: DamageArbiter: A Multimodal Arbitration Framework for Disaster Damage Assessment from Street-View Imagery

The reliability analysis works like this. We train image-only, text-only, and multimodal models, collect their misclassified samples, and group the errors by confidence.
High-confidence errors, at or above 0.40, are the overconfident errors we most want to eliminate. Medium-confidence errors, between 0.10 and 0.40, are transitional cases. Low-confidence errors, below 0.10, are genuinely ambiguous. Separating them tells us where arbitration can help.


## Slide 26 — Case 2: DamageArbiter: A Multimodal Arbitration Framework for 

This is the DamageArbiter framework. Panels a to c are the three single pipelines: an image-only CLIP vision encoder, a text-only CLIP text encoder on LLM-generated descriptions, and a multimodal CLIP model that matches image and text features in a joint embedding space. Each ends in the same three-class classification.
Panel d is the arbitration. A fine-tuned ViT and the CLIP image-text model each make a prediction. When they agree, we accept the shared answer directly. When they disagree, a lightweight logistic-regression meta-classifier decides which model to trust, using both models' confidence profiles. The arbiter is deliberately small, so it adds almost no cost and stays interpretable.


## Slide 27 — Case 2: DamageArbiter: A Multimodal Arbitration Framework for Disaster Damage Assessment from Street-View Imagery

Panel a compares classification metrics for ViT, CLIP, and DamageArbiter. The arbitrated system reaches about 75.8 percent accuracy with a Matthews correlation coefficient of 0.62, above either single model.
One caveat on panel a: the score axis starts at 0.55, so the visual gaps are magnified; the real differences are about two to three points of accuracy and five points of MCC.
Panel b is the part I care most about: the confidence-based error profile. For the fine-tuned ViT, 71 percent of its errors are overconfident. For DamageArbiter, only 16 percent are; most of its remaining errors sit in the medium-confidence band. CLIP alone has no overconfident errors, but it is also the least accurate model. The arbitrated system keeps CLIP's caution and ViT's accuracy, and the errors it still makes are the ones a human reviewer would be asked to look at.


## Slide 28 — Case 2: DamageArbiter: A Multimodal Arbitration Framework for Disaster Damage Assessment from Street-View Imagery

Mapped along the road network, DamageArbiter's predictions on the right closely follow the ground-truth severity on the left, including the severe cluster near the coast and the moderate corridors inland.
This matters operationally: the map a responder would receive from the arbitrated model is nearly the one they would get from a full manual survey.


## Slide 29 — Case 2: DamageArbiter: A Multimodal Arbitration Framework for Disaster Damage Assessment from Street-View Imagery  (Under Review, Natural Hazards)

DamageArbiter won second place in the 2026 AAG GIS Specialty Group Student Honors Paper Competition. The manuscript is under review at Natural Hazards, and a preprint is available on arXiv.
Together, cases one and two complete stage one: we see better by restoring the pre-disaster baseline and by arbitrating among models. But both cases still require labels for the specific event, which brings us to stage two.


## Slide 30 — STAGE 2  ·  OBJECTIVE 2

Stage two: respond faster. The challenge is that specialized models do not generalize across events.
Three cases address it. Case three, RAPID, accepted at ACM SIGSPATIAL 2026, is a zero-shot multi-agent pipeline across satellite and street views. Case four, Satellite-to-Street, accepted at IEEE IGARSS 2026, synthesizes post-disaster street views from satellite imagery. Case five is a book chapter, under review at CRC Press, that positions generative AI across the resilience cycle.
Given the time, I will focus on case three today; cases four and five, and a related cross-view study accepted at the GeoSearch workshop, are in the backup slides.


## Slide 31 — Case 3: 

RAPID stands for a Reproducible multi-Agent Pipeline for Interpretable Disaster damage assessment.
The research question is whether one zero-shot pipeline can support four things at once: cross-view assessment from satellite and street-view imagery, different regions and hazards, here hurricanes in Florida and wildfires in California, rapid reasoning without any training, and interpretable damage reports instead of bare labels.


## Slide 32 — Case 3: RAPID: A Reproducible Multi-Agent Pipeline for Interpretable Disaster Damage Assessment from Satellite and Street-View Imagery

Before the method, here are the data. Panel a maps the events: Marshall, California, Florida, and Hawaii in the United States, Haiti, Morocco, Libya, Turkey, and Noto in Japan. The main hazards are earthquakes, floods, hurricanes, and wildfires, and the web-sourced subset adds ice storms, drought, and tropical cyclones.
Panel b gives key statistics: four datasets, roughly 1,100 images in total, with hazard coverage and severity distributions.
Panel c describes them. Dataset A pairs post-disaster street-view and remote-sensing images from CVDisaster. Dataset B is bi-temporal street-view pairs from the BiTemporal StreetView Damage dataset. Dataset C is pre- and post-event satellite pairs from BRIGHT with pixel-level damage masks. Dataset D is post-disaster street-view images, including geo-referenced wildfire inspections and web-sourced scenes without location. This mix is what lets us test generalization across views and hazards.


## Slide 33 — Case 3: RAPID: A Reproducible Multi-Agent Pipeline for Interpretable Disaster Damage Assessment from Satellite and Street-View Imagery

The pipeline has three stages. Stage one prepares remote-sensing and street-view imagery from the datasets you just saw.
Stage two is the multi-agent framework. A Disaster Perception Agent detects the disaster type and image quality. An Image Restoration Agent enhances degraded images. A Damage Recognition Agent classifies severity. And a Disaster Reasoning Agent produces structured reasoning and recommendations.
Stage three validates the models and generates a structured disaster report, evaluated by both models and human reviewers. Every agent is a prompted foundation model, so nothing is trained on the target event.


## Slide 34 — Case 3: RAPID: A Reproducible Multi-Agent Pipeline for Interpretable Disaster Damage Assessment from Satellite and Street-View Imagery

The Image Restoration Agent matters because post-disaster imagery is often degraded by rain, haze, or low light, as the examples on the left show.
The chart reports image quality for each disaster and image type, with the original in gray and three restoration options in color. Baseline and planner-based restoration improve quality in every row, and the planner-based option is the most consistent, for example from 0.51 to 0.62 on one hurricane set and from 0.71 to 0.80 for the earthquake set. Gemini image-only enhancement is strong for hurricanes but actually lowers quality for wildfire, ice storm, and drought, which is why the agent chooses the restoration route per image instead of applying one tool everywhere. The recognition agent therefore receives cleaner inputs.


## Slide 35 — Case 3: RAPID: A Reproducible Multi-Agent Pipeline for Interpretable Disaster Damage Assessment from Satellite and Street-View Imagery

For damage recognition, we benchmarked five vision-language models zero-shot across three datasets. The left chart is accuracy, higher is better. The right chart is Normalized Cumulative Severity Error, or NCSE, lower is better; it penalizes a prediction by how far it is from the true severity, so a mild-versus-severe mistake costs more than a mild-versus-moderate one.
No single model wins everywhere: Gemini 3 Pro leads on dataset A, ChatGPT-5.1 on dataset B, and Gemini 2.5 Pro on dataset C2. The confusion matrices below show that most errors fall between adjacent severity levels rather than between mild and severe, which is the acceptable failure mode for triage.


## Slide 36 — Case 3: RAPID: A Reproducible Multi-Agent Pipeline for Interpretable Disaster Damage Assessment from Satellite and Street-View Imagery

This slide shows what interpretability looks like in practice. For a paired satellite and street-view input, three models agree on hurricane as the disaster type and severe as the damage level, with confidence of 0.85 or higher.
The Disaster Reasoning Agent then explains the assessment, naming the debris, fallen trees, and damaged buildings that you can see in the object-detection overlay, and produces a recovery and reconstruction suggestion. This is a report a responder could actually read.


## Slide 37 — Case 3: RAPID: A Reproducible Multi-Agent Pipeline for Interpretable Disaster Damage Assessment from Satellite and Street-View Imagery

We also evaluated the reasoning itself, not just the labels, with both an LLM judge and human raters on four dimensions: factuality, plausibility, completeness, and actionability.
Scores are high in both the post-event-only setting on top and the pre-and-post setting below, with the Gemini models slightly ahead, and the human and LLM ratings broadly agree. This gives a reproducible way to assess narrative outputs.


## Slide 38 — Case 3: RAPID: A Reproducible Multi-Agent Pipeline for Interpretable Disaster Damage Assessment from Satellite and Street-View Imagery (Accepted by ACM SIGSPATIAL)

RAPID has been accepted at ACM SIGSPATIAL 2026 in Riverside, California, as a full paper with my collaborators at Texas A&M and beyond.
That completes the main part of stage two. The pipeline answers the four questions I posed: it works across views, across regions and hazards, without training, and it produces reports rather than labels. What it does not yet do is turn those reports into decisions, which is stage three.


## Slide 39 — STAGE 3  ·  OBJECTIVE 3

Stage three: prepare and deliver better. The challenge is that assessment alone does not close the resilience loop.
Two ongoing cases address it. Case six, Seeing Damage Before It Happens, moves assessment forward in time into the preparedness phase. Case seven, RAY, builds an accountable multi-agent GeoAI system that delivers place-based disaster intelligence to the public and to decision-makers.


## Slide 40 — Case 6: Seeing Disaster Damage Before It Happens: Predicting and Visualizing Street-Level Impacts from Multimodal Pre-Event Information  (Ongoing)

Case six asks whether we can anticipate post-disaster street-level damage from pre-disaster multimodal data, Earth-observation embeddings, and hazard forecasts.
The framework has three parts. Predict: estimate severity probabilities for each street location, with leakage-audited cross-validation grouped by street segment. Generate: produce a visual scenario of the expected damage with an instruction-tuned diffusion model trained on Milton image pairs. Integrate: combine predictions and scenarios into risk maps for inspection planning, benchmarked against FEMA flood zones.
The study areas are Hurricane Milton 2024 at Horseshoe Beach and Hurricane Ian 2022 in Lee County, which also lets us test transfer across events.


## Slide 41 — Case 7: RAY: Resilience Assistant for You

Case seven is RAY, the Resilience Assistant for You. The research question is how a GeoAI agent can analyze disasters on its own, yet have every answer authorized, evidence-faithful, and reproducible, enforced by the system rather than promised by the model.
The architecture has a data plane, an agent plane, and a presentation plane, wrapped by a Steward Harness with four gates: a policy check before any model call, grounded analysis, a citation check after it, and audit and replay. Every claim carries evidence lineage, and the system refuses to answer when evidence is insufficient. It is delivered through a WebGIS and mobile console for planners and residents.


## Slide 42 — Case 7: RAY: Resilience Assistant for You

Rather than describe the interface, let me show it. This is a three-minute demo of RAY: a resident asks a question about their neighborhood, the policy check runs before any model call, the agent grounds its analysis in the spatial data, and every sentence in the answer cites an artifact that can be inspected.
If time is short, the link and the QR code are on the slide, and I can also play it during the questions.


## Slide 43 — Publications and Awards

Briefly, my record so far. Eight first-authored publications during the Ph.D.: the CEUS article, the Natural Hazards manuscript under review, five peer-reviewed conference papers at ACM SIGSPATIAL, the GeoSearch workshop, IGARSS, CaGIS, and ICC, and one chapter under review. I also have fourteen co-authored publications, including eight journal articles.
I have received fifteen honors, including second place in the AAG GISSG paper competition and the ICC 2025 Best Student Paper Award. The QR code links to the Autonomous GeoAI for Science community site.


## Slide 44 — Research Schedule

On the schedule: cases one through five are complete. Case six is about 20 percent done and case seven about 40 percent, both in progress this fall.
I completed the preliminary exam in spring 2026, and the proposal defense is today. Dissertation writing runs through spring 2027, with the final defense and graduation planned for summer 2027.


## Slide 45 — Q&A  Welcome any comments/questions

Thank you for your attention. To summarize in one line: discriminative models help us see better, generative models help us respond faster, and agentic systems help us prepare and deliver better.
I welcome your comments and questions, and I would especially value your guidance on the two ongoing cases.


## Slide 46 — Case 4: Satellite-to-Street: Synthesizing Post-Disaster Views from Satellite Imagery 

Backup for case four. Satellite-to-Street flips the problem: when street-level imagery is missing after a disaster, can we synthesize it from satellite imagery?
Three research questions: can generative vision models synthesize realistic post-disaster street views from satellite imagery; do explicit disaster semantics, extracted by a vision-language model, improve fidelity; and how can we evaluate cross-view synthesis beyond pixel metrics?
The framework compares a conditional GAN, Stable Diffusion with ControlNet, a VLM-guided variant, and a mixture of experts gated by severity.


## Slide 47 — Case 4: Satellite-to-Street: Synthesizing Post-Disaster Views from Satellite Imagery 

Backup for case four: qualitative results.
Pix2Pix produces blurry but structurally aligned views. Stable Diffusion with ControlNet produces visually plausible scenes, and adding Gemini-extracted semantics increases disaster realism. The mixture of experts strikes the best balance. From mild to severe, the synthesized views become progressively more damaged, which is what the generation should encode.


## Slide 48 — Case 4: Satellite-to-Street: Synthesizing Post-Disaster Views from Satellite Imagery 

Backup for case four: quantitative results.
The four small charts on the left are perceptual image-quality metrics. Pix2Pix scores best on SSIM, PSNR, and LPIPS because it stays pixel-aligned, while ControlNet has the best FID, that is, the most realistic distribution.
The chart on the right is downstream severity consistency, measured by classifying the synthesized images: ControlNet comes closest to the ground-truth imagery, while the mixture of experts is the most balanced across severity levels.
Three takeaways: single-model approaches cannot yet balance visual plausibility with strict structural alignment; high perceptual realism does not mean high semantic accuracy, so evaluation must be structure-aware; and trustworthiness, not fidelity alone, should be the target for disaster generation.


## Slide 49 — Case 4: Satellite-to-Street: Synthesizing Post-Disaster Views from Satellite Imagery 

Backup for case four. This paper was accepted at IGARSS 2026, the IEEE International Geoscience and Remote Sensing Symposium, and appears in the proceedings with Lei Zou and Wendy Jepson as co-authors.


## Slide 50 — Case 5: Generative AI for Disaster Resilience

Backup for case five. This is a chapter under review for the CRC Press volume "Geography in the Age of Generative AI."
It reviews how generative AI can serve each phase of the resilience cycle, mitigation, preparedness, response, and recovery, and distills a three-stage pipeline from my own work: selective image restoration, GenAI-assisted damage recognition, and reasoning and decision support. This chapter consolidates stage two into a reusable framework for the community.


## Slide 51 — Case 8: When Satellite and Street Views Disagree: Cross-View Complementarity 

Backup. This is an additional stage-two study, accepted at the fifth ACM SIGSPATIAL GeoSearch workshop in 2026. It asks what happens when satellite and street views disagree about the same building, and shows that the two views are complementary rather than redundant: the view that actually sees the damaged element should be trusted. It is a direct extension of the cross-view theme in cases three and four.
