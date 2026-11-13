# Proposal Defense — Speaker Script (English)

Yifan Yang · Second proposal defense, 11.13.2026 (online) · one section per slide; the same text is stored in each slide's Notes pane. 53 slides: 44 main (1–44), 1 backup divider (45), 8 backup (46–53).


## Slide 1 — Advancing GeoAI for Disaster Resilience: From Damage Assessment to Insightful Decision Support

Good afternoon, committee members! Thank you all for joining us once again via Zoom. And today I will present my dissertation proposal, "Advancing GeoAI for Disaster Resilience: From Damage Assessment to Insightful Decision Support."
The subtitle is the arc of this talk. I started from a narrow, well-defined task, assessing damage from images, and I am building toward GeoAI that supports decisions across the whole disaster resilience cycle.


## Slide 2 — Outline

Here is the roadmap. I will first explain why disaster resilience is a geographic question and why image-based damage assessment is the entry point. I will then define GeoAI and the three families of AI models I work with, which lead to three current challenges.
Those challenges motivate a three-stage conceptual framework, and each stage has its own objective and case studies. Most of the talk walks through those cases: three completed and two ongoing in the main part, with more completed cases in the backup slides. I will close with my publications and awards, the research schedule, and your questions.


## Slide 3 — Background Disaster resilience is a geographical question

Let me start with why disaster resilience is a geographical question. I will make four points.
First, resilience is rooted in space. resilience is shaped by local hazard exposure, social vulnerability, and human-environment interactions.
The figure, from the same paper, shows why a place-based framing is needed: the global environmental change community and the hazards community draw the relationships among vulnerability, resilience, and adaptive capacity differently, as you see in panels A to F. The DROP model reconciles them by anchoring all three concepts at a specific place.


## Slide 4 — Background Disaster resilience is a geographical question

Second, resilience is diverse across the globe. This map shows the 14 disaster events in the BRIGHT dataset by Chen and colleagues.
They span five continents and seven disaster types: earthquakes, floods, hurricanes, volcanic eruptions, wildfires, explosions, and armed conflict, both natural and man-made. The same severity of building damage looks very different in Morocco, Maui, and Noto. So a method that works in one place cannot be assumed to work everywhere, and that will come back as Challenge 2.


## Slide 5 — Background Disaster resilience is a geographical question

Third, disaster resilience is a geographic inquiry. Beyond asking what happened, we ask where it happened, how severe it was, who was affected, and how to allocate limited resources.
Goodchild and Glennon showed this with the 2009 Santa Barbara wildfires: the volunteered map on the screen answered these spatial questions faster than official channels. Every one of these questions is spatial, and that is exactly where GeoAI can contribute.


## Slide 6 — Background Disaster resilience is a geographical question

Fourth, resilience is a cycle in time. The National Academies define resilience as the ability to prepare for, absorb, recover from, and adapt to adverse events.
In practice this unfolds as preparedness, response, recovery, and mitigation, as the ring in the figure shows. Each phase depends on timely, place-specific information, and that information need is what my dissertation addresses. I enter the cycle at one particular task, which is the next slide.


## Slide 7 — Background Disaster assessment is a critical task for building resilience Core tasks: acquire imagery (remote sensing + street view) → classify severity → generate reports → map impacts rapidly (FEMA, 2016).

That task is damage assessment, because assessment is the hinge between response and recovery. It tells responders where to go first, lets agencies verify eligibility and release aid, and gives planners a baseline for rebuilding.
FEMA's Damage Assessment Operations Manual formalizes the workflow you see on the left: acquire imagery, classify damage severity, generate reports, and map impacts rapidly so that resources can be allocated. The photographs on the right show what this looks like in the field. My case studies target these same four steps.


## Slide 8 — Background Image data is central to disaster assessment: two complementary views

Imagery is the primary evidence for assessment, and I use two complementary views.
Overhead remote sensing, from satellites and aircraft, offers wide coverage and roof-level damage signals; benchmarks like xBD made this a mainstream computer-vision problem. Ground-level street-view imagery sees what overhead sensors miss: facades, debris, and flooding at individual structures, although its coverage is sparse.
The left panel shows Hurricane Ian assessed from aerial imagery; the right shows street-view assessment after Hurricane Michael. Notice that the two views can disagree for the same building. Each view has blind spots, and combining them is a recurring theme in my cases.


## Slide 9 — Background The bottleneck: imagery is abundant, interpretation is not

So we have rich imagery from above and from the ground. But having the data is not the same as understanding it.
Three things break manual interpretation. Volume: satellites capture a whole disaster zone within days, tile after tile, like this grid from Hurricane Ian. Every square is one image tile. But analysts only get to a few of them, the two in red; the grey ones are captured and never analyzed. Speed: interpretation still depends on human labels. For one small town, Horseshoe Beach, we labeled 2,556 before-and-after pairs by hand, one pair at a time, and responders need answers within days, not weeks. Complexity: on the right is one wildfire-burned building. From the street it is clearly destroyed, but from above it looks intact, so different views can even disagree with each other.
Human interpretation simply cannot keep up. What we need is AI that does not only see images, but understands where they are and how places relate to one another. That is GeoAI.


## Slide 10 — Background GeoAI for disaster resilience

Following Janowicz and colleagues, GeoAI refers to spatially explicit AI methods that use geographic data and spatial context to create intelligent geographic information, knowledge, and services.
The key phrase is spatially explicit: location, neighborhood, and scale are part of the model, not just metadata attached afterwards. In this dissertation, GeoAI is the bridge between the geographic questions I raised and the image data used for assessment.


## Slide 11 — Background Three families of AI models, three roles in GeoAI

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


## Slide 15 — STAGE 1 · OBJECTIVE 1 — See better

Stage one: see better. The challenge is that discriminative assessment is not yet accurate or reliable enough.
Two cases address it. Case one, published in Computers, Environment and Urban Systems in 2025, adds the pre-disaster street-view baseline so that the model can see actual change. Case two, DamageArbiter, now under review at Natural Hazards, tackles overconfidence by arbitrating among image, text, and multimodal models.


## Slide 16 — Case 1: Hyperlocal disaster damage assessment using bi-temporal street-view imagery and pre-trained vision models (Published, CEUS 2025)

Case one asks two questions. First, can pre-disaster street-view imagery help us classify disaster damage more accurately? Second, how can we integrate pre- and post-disaster street-view imagery to enable rapid, hyperlocal damage assessment?
The panoramas show the same locations before and after Hurricane Milton. The red boxes highlight changes that become obvious only when both views are available, which is the intuition behind the whole case.


## Slide 17 — Case 1: Hyperlocal disaster damage assessment using bi-temporal street-view imagery and pre-trained vision models (study area and dataset)

This slide shows the study area and the dataset. We collected panoramic street-view imagery along the road network in Florida before and after Hurricane Milton, and annotated damage at three levels: mild, moderate, and severe.
The bar chart shows the class distribution. It is imbalanced, which is a realistic condition that any operational model has to handle. The image rows at the bottom show example pre- and post-event pairs for each severity level.


## Slide 18 — Case 1: Hyperlocal disaster damage assessment using bi-temporal street-view imagery and pre-trained vision models

We compared three settings. Post-only classifies post-event images into three severity levels, which is how most existing models work. The second setting mixes pre- and post-event images in one pool and adds a fourth "no damage" class. The third, paired setting extracts features from the pre- and post-event images of the same location and fuses them before classification.
The question is whether explicitly pairing the two views helps the model see real change rather than scene context.
The paired setting, outlined in red, is the one I open up on the next slide.


## Slide 19 — Case 1: Hyperlocal disaster damage assessment using bi-temporal street-view imagery and pre-trained vision models

On the left is setting three from the previous slide, the paired pipeline. The right side opens up its three steps.
Step one: two pre-trained backbones, ConvNeXt or Swin Transformer, extract features from the pre-disaster and the post-disaster image of the same location. Step two is the feature fusion, where we compared seven designs: six-channel early fusion, cross-attention between the two branches, weighted feature fusion, and a Siamese ConvNeXt that computes feature differences. Step three is the classification into mild, moderate, and severe, with Grad-CAM to check where the model looks.
All models use pre-trained vision backbones, so the design question is how to inject the pre-disaster baseline, not how to train from scratch.


## Slide 20 — Case 1: Hyperlocal disaster damage assessment using bi-temporal street-view imagery and pre-trained vision models

Here are the results as two charts. The top chart is overall accuracy for all seven models. The single-view Swin baseline reaches 66 percent; the dual-channel feature-fusion ConvNeXt reaches 77 percent, an eleven-point gain, and every dual-channel model beats its single-view counterpart.
The bottom chart breaks accuracy down by severity class. The gains are largest where they matter most: the baseline Swin recognizes only 39 percent of mild cases, while the dual models lift mild and severe accuracy substantially.
The Grad-CAM maps on the left show why: the dual-channel model attends to real pre-to-post changes, such as missing roofs and debris, rather than background context. This is the evidence that the pre-disaster baseline helps us see better.


## Slide 21 — Case 1: Hyperlocal disaster damage assessment using bi-temporal street-view imagery and pre-trained vision models (Published, CEUS 2025)

This work was published in Computers, Environment and Urban Systems in 2025. It was also featured by Mosaic, the company whose camera imagery we used, as an example of how Texas A&M is pioneering street-level damage assessment after Hurricane Milton.
Case one improves accuracy. The next case asks about reliability.


## Slide 22 — Case 2: DamageArbiter: A Multimodal Arbitration Framework for Disaster Damage Assessment from Street-View Imagery (Under Review, Natural Hazards)

Case two is DamageArbiter, currently under review at Natural Hazards. Case one improved accuracy, but it still relied on images alone, and this slide shows why that is not good enough.
An image-only model, a fine-tuned vision transformer, looks at this post-hurricane street view and assigns 70 percent to mild, 20 to moderate and 10 to severe, so it predicts mild. The true label is severe. For every wrong prediction we compute a confidence gap C: the probability of the predicted class minus the probability the model gave to the true class. Here C is 0.70 minus 0.10, which is 0.60, and a gap of 0.40 or more counts as an overconfident error.
So the image-only model is not only wrong, it is confidently wrong. That is dangerous, because a confident answer looks trustworthy and can send crews to the wrong place.


## Slide 23 — Case 2: DamageArbiter: A Multimodal Arbitration Framework for Disaster Damage Assessment from Street-View Imagery

So images alone are not enough. Our idea is to add a second modality by turning each image into text.
A large language model describes each street view, and the description names the damage cues in words, highlighted in red: sagging power lines and defoliation for the mild scene, scattered wooden debris and loose utility lines for the moderate scene, extensive building debris and collapsed fragments for the severe scene. The text puts the attention on the damage evidence instead of the whole scene, and it is cheap to produce.
That leads to two research questions. First, beyond accuracy, how reliable are image-only, text-only, and image-text models? Second, can arbitration between models reduce overconfident errors while keeping accuracy?


## Slide 24 — Case 2: DamageArbiter: A Multimodal Arbitration Framework for Disaster Damage Assessment from Street-View Imagery

To answer the first question, the reliability analysis uses the confidence gap from the example. We train image-only, text-only, and multimodal models, collect their misclassified samples, and compute C for each error: the predicted-class probability minus the true-class probability.
Errors with C at or above 0.40 are overconfident; the earlier example, with C equal to 0.60, falls here. Errors between 0.10 and 0.40 are transitional cases. Errors at or below 0.10 are genuinely ambiguous, because the model was almost torn between the two classes. Separating them tells us where arbitration can help.


## Slide 25 — Case 2: DamageArbiter: A Multimodal Arbitration Framework for Disaster Damage Assessment from Street-View Imagery

This is the DamageArbiter method. Panels a to c are the three single pipelines: an image-only CLIP vision encoder, a text-only CLIP text encoder on the image descriptions, and a multimodal CLIP model that matches image and text features in a joint embedding space. Each ends in the same three-class output: mild, moderate, or severe.
Panel d, on the right, is the disagreement-driven arbitration. The ViT is a strong discriminator but prone to overconfidence; CLIP is more robust semantically but often ambiguous. Each makes a prediction. When they agree, we accept the shared answer directly. When they disagree, a lightweight logistic-regression meta-classifier decides which model to trust. Its inputs are label-free confidence and uncertainty measures, so it can run on new, unlabeled images. The base models stay untouched, so the arbiter adds almost no cost and stays interpretable.


## Slide 26 — Case 2: DamageArbiter: A Multimodal Arbitration Framework for Disaster Damage Assessment from Street-View Imagery

Panel a compares classification metrics for ViT, CLIP, and DamageArbiter. The arbitrated system reaches about 75.8 percent accuracy with a Matthews correlation coefficient of 0.62, above either single model.
One caveat on panel a: the score axis starts at 0.55, so the visual gaps are magnified; the real differences are about two to three points of accuracy and five points of MCC.
Panel b is the part I care most about: the confidence-based error profile. For the fine-tuned ViT, 71 percent of its errors are overconfident. For DamageArbiter, only 16 percent are; most of its remaining errors sit in the medium-confidence band. CLIP alone has no overconfident errors, but it is also the least accurate model. The arbitrated system keeps CLIP's caution and ViT's accuracy, and the errors it still makes are the ones a human reviewer would be asked to look at.


## Slide 27 — Case 2: DamageArbiter: A Multimodal Arbitration Framework for Disaster Damage Assessment from Street-View Imagery

Mapped along the road network, DamageArbiter's predictions on the right closely follow the ground-truth severity on the left, including the severe cluster near the coast and the moderate corridors inland.
This matters operationally: the map a responder would receive from the arbitrated model is nearly the one they would get from a full manual survey.


## Slide 28 — Case 2: DamageArbiter: A Multimodal Arbitration Framework for Disaster Damage Assessment from Street-View Imagery (Under Review, Natural Hazards)

DamageArbiter won second place in the 2026 AAG GIS Specialty Group Student Honors Paper Competition. The manuscript is under review at Natural Hazards, and a preprint is available on arXiv.
Together, cases one and two complete stage one: we see better by restoring the pre-disaster baseline and by arbitrating among models. But both cases still require labels for the specific event, which brings us to stage two.


## Slide 29 — STAGE 2 · OBJECTIVE 2 — Respond faster

Stage two: respond faster. The challenge is that specialized models do not generalize across events.
Three cases address it. Case three, RAPID, accepted at ACM SIGSPATIAL 2026, is a zero-shot multi-agent pipeline across satellite and street views. Case four, Satellite-to-Street, accepted at IEEE IGARSS 2026, synthesizes post-disaster street views from satellite imagery. Case five is a book chapter, under review at CRC Press, that positions generative AI across the resilience cycle.
Given the time, I will focus on case three today. Additional case three results, cases four and five, and case eight, a related cross-view study accepted at the GeoSearch workshop, are in the backup slides.


## Slide 30 — Case 3: RAPID: A Reproducible Multi-Agent Pipeline for Interpretable Disaster Damage Assessment from Satellite and Street-View Imagery (Accepted, ACM SIGSPATIAL 2026)

RAPID stands for a Reproducible multi-Agent Pipeline for Interpretable Disaster damage assessment.
The research question is whether one zero-shot pipeline can support four things at once: cross-view assessment from satellite and street-view imagery, different regions and hazards, here hurricanes in Florida and wildfires in California, rapid reasoning without any training, and interpretable damage reports instead of bare labels.


## Slide 31 — Case 3: RAPID: A Reproducible Multi-Agent Pipeline for Interpretable Disaster Damage Assessment from Satellite and Street-View Imagery

RAPID has three stages, and stage one is data preparation. Panel a maps the events: Marshall, California, Florida, and Hawaii in the United States, Haiti, Morocco, Libya, Turkey, and Noto in Japan. The main hazards are earthquakes, floods, hurricanes, and wildfires, and the web-sourced subset adds ice storms, drought, and tropical cyclones.
Panel b gives key statistics: four datasets, roughly 1,100 images in total, with hazard coverage and severity distributions.
Panel c describes them. Dataset A pairs post-disaster street-view and remote-sensing images from CVDisaster. Dataset B is bi-temporal street-view pairs from the BiTemporal StreetView Damage dataset. Dataset C is pre- and post-event satellite pairs from BRIGHT with pixel-level damage masks. Dataset D is post-disaster street-view images, including geo-referenced wildfire inspections and web-sourced scenes without location. This mix is what lets us test generalization across views and hazards.


## Slide 32 — Case 3: RAPID: A Reproducible Multi-Agent Pipeline for Interpretable Disaster Damage Assessment from Satellite and Street-View Imagery

So how does RAPID actually work? Stages two and three are the heart of it, and this is where most of my own work went.
First, I designed the workflow. Instead of asking one model to do everything, I split damage assessment into four steps, each with its own agent. The Disaster Perception Agent detects the disaster type and the kind of imagery, and initializes the task. The Image Restoration Agent enhances low-quality images. The Damage Recognition Agent identifies damaged objects and classifies severity from remote-sensing and street-view images. The Disaster Reasoning Agent turns that structured evidence into reasoning and a report.
Second, prompt engineering. Every agent is a prompted foundation model, and I wrote the zero-shot prompts for each one, so nothing is trained on the target event.
Third, I assembled the benchmark you just saw: four datasets and roughly 1,100 images across satellite and street view.
Fourth, stage three, the bottom row, is validation: I compared three foundation models, and the structured reports are checked by model-based consistency evaluation and by human reviewers.
The next four slides show one result per agent, in the same order.


## Slide 33 — Case 3: RAPID: A Reproducible Multi-Agent Pipeline for Interpretable Disaster Damage Assessment from Satellite and Street-View Imagery — Agent 1 of 4 · Perception (DPA)

Agent one is the Disaster Perception Agent. It identifies what kind of input it has, satellite, street view, or a pair, classifies one of six hazards, flags images that need restoration, and plans the route through the pipeline.
The chart shows the F1-score for each hazard and three models on the web-sourced multi-hazard set. Hazard recognition is the most reliable stage of the pipeline: the best model, GPT-5-mini, reaches 0.92 overall accuracy, and every model scores at least 0.91 on drought, flood, hurricane, and wildfire.
The weak spot is earthquake, where recall is only 0.50 to 0.58, which the paper attributes to visually ambiguous scenes. Ice storm also varies across models.


## Slide 34 — Case 3: RAPID: A Reproducible Multi-Agent Pipeline for Interpretable Disaster Damage Assessment from Satellite and Street-View Imagery — Agent 2 of 4 · Restoration (IRA)

Agent two is the Image Restoration Agent. Post-disaster imagery is often degraded by haze, glare, or low light, as the original images in the first column show. Street-view examples are on the left and satellite or aerial examples on the right.
For each image we show the original, a baseline restoration, and the best restored result, outlined in red. The best result here comes from the generative enhancement branch, which recovers exposure and texture the most. Because generative edits can also change details, the original image always stays available to the recognition agent and to human reviewers, and the agent picks the restoration route per image instead of applying one tool everywhere.
The image-quality scores for every hazard and image type are in the backup slides.


## Slide 35 — Case 3: RAPID: A Reproducible Multi-Agent Pipeline for Interpretable Disaster Damage Assessment from Satellite and Street-View Imagery — Agent 3 of 4 · Recognition (DRA)

Agent three is the Damage Recognition Agent. We benchmarked five vision-language models zero-shot across three datasets. The left chart is accuracy, higher is better. The right chart is Normalized Cumulative Severity Error, or NCSE, lower is better; it penalizes a prediction by how far it is from the true severity, so a mild-versus-severe mistake costs more than a mild-versus-moderate one.
No single model wins everywhere: Gemini 3 Pro leads on dataset A, ChatGPT-5.1 on dataset B, and Gemini 2.5 Pro on dataset D1, the wildfire inspections. The confusion matrices below show that most errors fall between adjacent severity levels rather than between mild and severe, which is the acceptable failure mode for triage.


## Slide 36 — Case 3: RAPID: A Reproducible Multi-Agent Pipeline for Interpretable Disaster Damage Assessment from Satellite and Street-View Imagery — Agent 4 of 4 · Reasoning (DReA)

Agent four is the Disaster Reasoning Agent, and this slide shows what interpretability looks like in practice. For a paired satellite and street-view input, three models agree on hurricane as the disaster type and severe as the damage level, with confidence of 0.85 or higher.
The Disaster Reasoning Agent then explains the assessment, naming the debris, fallen trees, and damaged buildings that you can see in the object-detection overlay, and produces a recovery and reconstruction suggestion. This is a report a responder could actually read.


## Slide 37 — Case 3: RAPID: A Reproducible Multi-Agent Pipeline for Interpretable Disaster Damage Assessment from Satellite and Street-View Imagery (Accepted, ACM SIGSPATIAL 2026)

RAPID has been accepted at ACM SIGSPATIAL 2026 in Riverside, California, as a full paper with my collaborators at Texas A&M and beyond.
That completes the main part of stage two. The pipeline answers the four questions I posed: it works across views, across regions and hazards, without training, and it produces reports rather than labels. What it does not yet do is turn those reports into decisions, which is stage three.


## Slide 38 — STAGE 3 · OBJECTIVE 3 — Prepare and deliver better

Stage three: prepare and deliver better. The challenge is that assessment alone does not close the resilience loop.
Two ongoing cases address it. Case six, Seeing Damage Before It Happens, moves assessment forward in time into the preparedness phase. Case seven, RAY, builds an accountable multi-agent GeoAI system that delivers place-based disaster intelligence to the public and to decision-makers.


## Slide 39 — Case 6: Seeing Disaster Damage Before It Happens: Predicting and Visualizing Street-Level Impacts from Multimodal Pre-Event Information (Ongoing)

Case six asks whether we can anticipate post-disaster street-level damage from pre-disaster multimodal data, Earth-observation embeddings, and hazard forecasts.
The framework has three parts. Predict: estimate severity probabilities for each street location, with leakage-audited cross-validation grouped by street segment. Generate: produce a visual scenario of the expected damage with an instruction-tuned diffusion model trained on Milton image pairs. Integrate: combine predictions and scenarios into risk maps for inspection planning, benchmarked against FEMA flood zones.
The study areas are Hurricane Milton 2024 at Horseshoe Beach and Hurricane Ian 2022 in Lee County, which also lets us test transfer across events.


## Slide 40 — Case 7: RAY: Resilience Assistant for You An Accountable GeoAI System for Place-Based Disaster Intelligence (Ongoing)

Case seven is RAY, the Resilience Assistant for You. The research question is how a GeoAI agent can analyze disasters on its own, yet have every answer authorized, evidence-faithful, and reproducible, enforced by the system rather than promised by the model.
The architecture has a data plane, an agent plane, and a presentation plane, wrapped by a Steward Harness with four gates: a policy check before any model call, grounded analysis, a citation check after it, and audit and replay. Every claim carries evidence lineage, and the system refuses to answer when evidence is insufficient. It is delivered through a WebGIS and mobile console for planners and residents.


## Slide 41 — Case 7: RAY: Resilience Assistant for You An Accountable GeoAI System for Place-Based Disaster Intelligence (Ongoing)

Rather than describe the interface, let me show it. This is a one-minute video of RAY: a resident asks a question about their neighborhood, the policy check runs before any model call, the agent grounds its analysis in the spatial data, and every sentence in the answer cites an artifact that can be inspected.
If time is short, the link and the QR code are on the slide, and I can also play it during the questions.


## Slide 42 — Publications and Awards

Briefly, my record so far. Eight first-authored publications during the Ph.D.: the CEUS article, the Natural Hazards manuscript under review, five peer-reviewed conference papers at ACM SIGSPATIAL, the GeoSearch workshop, IGARSS, CaGIS, and ICC, and one chapter under review. I also have fourteen co-authored publications, including eight journal articles.
I have received fifteen honors, including second place in the AAG GISSG paper competition and the ICC 2025 Best Student Paper Award. The QR code links to the Autonomous GeoAI for Science community site.


## Slide 43 — Research Schedule

On the schedule: cases one through five are complete. Case six is about 90 percent done and case seven about 65 percent, both in progress this fall.
I completed the preliminary exam in summer 2026, and the proposal defense is today. Dissertation writing runs through spring 2027, with the final defense and graduation planned for summer 2027.


## Slide 44 — Q&A

Thank you for your attention. To summarize in one line: discriminative models help us see better, generative models help us respond faster, and agentic systems help us prepare and deliver better.
I welcome your comments and questions, and I would especially value your guidance on the two ongoing cases.


## Slide 45 — BACKUP — Backup Slides

These are backup slides for questions. They hold more results for case three, namely the restoration quality scores and the reasoning evaluation, then cases four and five, and case eight, the cross-view study.


## Slide 46 (backup) — Case 3: RAPID: A Reproducible Multi-Agent Pipeline for Interpretable Disaster Damage Assessment from Satellite and Street-View Imagery

Backup for case three: restoration quality scores.
The Image Restoration Agent matters because post-disaster imagery is often degraded by rain, haze, or low light, as the examples on the left show.
The chart reports image quality for each disaster and image type, with the original in gray and three restoration options in color. Baseline and planner-based restoration improve quality in every row, and the planner-based option is the most consistent, for example from 0.51 to 0.62 on one hurricane set and from 0.71 to 0.80 for the earthquake set. Gemini image-only enhancement is strong for hurricanes but actually lowers quality for wildfire, ice storm, and drought, which is why the agent chooses the restoration route per image instead of applying one tool everywhere. The recognition agent therefore receives cleaner inputs.


## Slide 47 (backup) — Case 3: RAPID: A Reproducible Multi-Agent Pipeline for Interpretable Disaster Damage Assessment from Satellite and Street-View Imagery

Backup for case three: reasoning evaluation.
We also evaluated the reasoning itself, not just the labels, with both an LLM judge and human raters on four dimensions: factuality, plausibility, completeness, and actionability.
Scores are high in both the post-event-only setting on top and the pre-and-post setting below, with the Gemini models slightly ahead, and the human and LLM ratings broadly agree. This gives a reproducible way to assess narrative outputs.


## Slide 48 (backup) — Case 4: Satellite-to-Street: Synthesizing Post-Disaster Views from Satellite Imagery via Generative Vision Models (Accepted, IEEE IGARSS 2026)

Backup for case four. Satellite-to-Street flips the problem: when street-level imagery is missing after a disaster, can we synthesize it from satellite imagery?
Three research questions: can generative vision models synthesize realistic post-disaster street views from satellite imagery; do explicit disaster semantics, extracted by a vision-language model, improve fidelity; and how can we evaluate cross-view synthesis beyond pixel metrics?
The framework compares a conditional GAN, Stable Diffusion with ControlNet, a VLM-guided variant, and a mixture of experts gated by severity.


## Slide 49 (backup) — Case 4: Satellite-to-Street: Synthesizing Post-Disaster Views from Satellite Imagery via Generative Vision Models (Accepted, IEEE IGARSS 2026)

Backup for case four: qualitative results.
Pix2Pix produces blurry but structurally aligned views. Stable Diffusion with ControlNet produces visually plausible scenes, and adding Gemini-extracted semantics increases disaster realism. The mixture of experts strikes the best balance. From mild to severe, the synthesized views become progressively more damaged, which is what the generation should encode.


## Slide 50 (backup) — Case 4: Satellite-to-Street: Synthesizing Post-Disaster Views from Satellite Imagery via Generative Vision Models (Accepted, IEEE IGARSS 2026)

Backup for case four: quantitative results.
The four small charts on the left are perceptual image-quality metrics. Pix2Pix scores best on SSIM, PSNR, and LPIPS because it stays pixel-aligned, while ControlNet has the best FID, that is, the most realistic distribution.
The chart on the right is downstream severity consistency, measured by classifying the synthesized images: ControlNet comes closest to the ground-truth imagery, while the mixture of experts is the most balanced across severity levels.
Three takeaways: single-model approaches cannot yet balance visual plausibility with strict structural alignment; high perceptual realism does not mean high semantic accuracy, so evaluation must be structure-aware; and trustworthiness, not fidelity alone, should be the target for disaster generation.


## Slide 51 (backup) — Case 4: Satellite-to-Street: Synthesizing Post-Disaster Views from Satellite Imagery via Generative Vision Models (Accepted, IEEE IGARSS 2026)

Backup for case four. This paper was accepted at IGARSS 2026, the IEEE International Geoscience and Remote Sensing Symposium, and appears in the proceedings with Lei Zou and Wendy Jepson as co-authors.


## Slide 52 (backup) — Case 5: Generative AI for Disaster Resilience (Under Review, book chapter in Geography in the Age of Generative AI, CRC Press)

Backup for case five. This is a chapter under review for the CRC Press volume "Geography in the Age of Generative AI."
It reviews how generative AI can serve each phase of the resilience cycle, mitigation, preparedness, response, and recovery, and distills a three-stage pipeline from my own work: selective image restoration, GenAI-assisted damage recognition, and reasoning and decision support. This chapter consolidates stage two into a reusable framework for the community.


## Slide 53 (backup) — Case 8: When Satellite and Street Views Disagree: Cross-View Complementarity in Disaster Damage Assessment (Accepted, ACM SIGSPATIAL GeoSearch 2026)

Backup. This is an additional stage-two study, accepted at the fifth ACM SIGSPATIAL GeoSearch workshop in 2026. It asks what happens when satellite and street views disagree about the same building, and shows that the two views are complementary rather than redundant: the view that actually sees the damaged element should be trusted. It is a direct extension of the cross-view theme in cases three and four.
