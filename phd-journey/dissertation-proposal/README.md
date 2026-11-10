# Dissertation Proposal

This folder records my dissertation proposal: the final proposal document and the defense slides as presented to my committee, plus the defense flyer.

**Proposal defense:** Thursday, October 22, 2026, 1:00–2:30 p.m. CDT, Room 807, Eller O&M Building ([flyer](./2026-10-22-proposal-defense-flyer.pdf)); not passed. **Second defense:** November 13, 2026, online ([see below](#the-first-defense-and-the-second))
**Program:** Ph.D., Geography, Texas A&M University
**Committee:** Dr. Lei Zou (Chair), Dr. Heng Cai, Dr. Andrew Klein, Dr. Zhengzhong Tu

## Dissertation

**Advancing GeoAI for Disaster Resilience: From Damage Assessment to Insightful Decision Support**

(The 2026-10-22 proposal document below still carries the earlier subtitle "Responsible Decision Support"; "Insightful" is the title used from the second defense onward, including the 2026-11-13 proposal.)

> "Seeing, describing, and governing disasters: beyond the boundaries of the screen, let the real world become the stage for intelligence."

Disaster resilience is a geographical question: it is rooted in space, diverse across the globe, a spatial inquiry into where, how severely, and who, and a cycle in time from preparedness to response, recovery, and mitigation. Damage assessment is the hinge of that cycle, and imagery from overhead and ground-level views is its primary evidence. The dissertation advances GeoAI along three evolving model families, each answering one challenge:

| Challenge | Stage | Insight | Cases |
| --- | --- | --- | --- |
| Discriminative assessment is not yet accurate or reliable enough | **Stage 1, discriminative damage assessment:** restore the pre-disaster baseline and arbitrate among models, to *see better* | More accurate and reliable hyperlocal damage assessment | 1–2 |
| Specialized models do not generalize across events | **Stage 2, generative zero-shot understanding:** many views, regions, and hazards without event-specific training, to *respond faster* | Rapid, interpretable, zero-shot assessment across views, regions, and hazards | 3–5 |
| Assessment alone does not close the resilience loop | **Stage 3, agentic decision support:** anticipate, inspect, and communicate place-based impacts with accountability, to *prepare and deliver better* | Preparedness and accountable place-based decision support, delivered by RAY (Resilience Assistant for You) | 6–7 |

![Conceptual framework: three challenges mapped to the discriminative, generative, and agentic stages of evolving GeoAI for disaster resilience, and the insight each stage contributes](./2026-10-22-conceptual-framework.png)

Cases 1–5 are complete (CEUS 2025; Natural Hazards under review; ACM SIGSPATIAL 2026; IEEE IGARSS 2026; CRC Press chapter under review). Cases 6 and 7 are in progress, with the final defense and graduation planned for Summer 2027.

## Final versions

| Date | Document | File |
| --- | --- | --- |
| 2026-10-22 | Dissertation proposal, final version submitted to the committee | [PDF](./2026-10-22-yifan-yang-dissertation-proposal.pdf) |
| 2026-10-22 | Proposal defense slides (40 slides + 3 backup slides) | [PDF](./2026-10-22-yifan-yang-proposal-defense-slides.pdf) |
| 2026-10-22 | Proposal defense flyer | [PDF](./2026-10-22-proposal-defense-flyer.pdf) |
| 2026-11-13 | Dissertation proposal for the second defense | [PDF](./2026-11-13-yifan-yang-dissertation-proposal.pdf) |
| 2026-11-13 | Second-defense slides (44 slides, a backup divider, and 8 backup slides) | [PDF](./2026-11-13-yifan-yang-proposal-defense-slides.pdf) |
| 2026-11-13 | Speaker script for the second-defense slides, one section per slide (also stored in the deck's notes) | [Markdown](./2026-11-13-proposal-defense-speaker-script.md) |

What changed between the two decks: the background now builds the "disaster resilience is a geographical question" argument in four steps (rooted in space, diverse across the globe, a geographic inquiry, a cycle in time) before the bottleneck of volume, speed, and complexity; every results table became a bar chart; the DamageArbiter framework and the RAPID dataset pages gained explanatory bullets; dense pages reveal their content step by step; and the subtitle became "From Damage Assessment to Insightful Decision Support".

The second-defense files above are the final versions, settled on 2026-11-09. The standalone objectives slide is gone, because each stage divider now states its objective. The bottleneck slide uses real imagery for volume, speed, and complexity. Case 1 marks the paired setting and opens it up step by step on the next slide. Case 2 first shows why an image-only model is not enough (it can be confidently wrong), then introduces image-to-text descriptions and the research questions. Case 3 walks through data preparation, a method overview of the four agents, and one result slide per agent, with the perception agent's results as a bar chart. Extra results sit behind a backup divider with jump links.

Earlier working drafts (2026-09-30 proposal drafts, 2026-10-12 slide draft) were removed from this folder once the final versions were fixed; they remain in the git history.

## The first defense, and the second

The first proposal defense on October 22, 2026 did not pass. I am keeping that on record here rather than leaving only the polished final versions, because the failure is part of the journey and probably the most instructive part of it. The proposal will be defended again before the same committee on **November 13, 2026**, online.

That evening I wrote about it on my WeChat official account: **[Moving Toward Greater Failures! (向着更大的失败前进！)](https://mp.weixin.qq.com/s/hdapQiYII-huy9pmjt59wg)**. The essay starts from Cao Cao after the Battle of Red Cliffs, who answered defeat with "victory and defeat are common in war" (胜败乃兵家常事) and went on to regroup. Reflection does not undo a failure, but it restores morale and the nerve to go back into the field, and to aim at larger challenges, and so at larger possible failures, next time.

| Date | Event | Record |
| --- | --- | --- |
| 2026-10-22 | First proposal defense, not passed | Final versions above; [reflection essay](https://mp.weixin.qq.com/s/hdapQiYII-huy9pmjt59wg) |
| 2026-11-13 (planned) | Second proposal defense, online | [Proposal](./2026-11-13-yifan-yang-dissertation-proposal.pdf), [slides](./2026-11-13-yifan-yang-proposal-defense-slides.pdf), and [speaker script](./2026-11-13-proposal-defense-speaker-script.md); outcome to be added |

## After the second defense

- Committee feedback from the first defense and the revisions it led to
- Reflections: what changed between the preliminary examination, the first defense, and the second, and why
