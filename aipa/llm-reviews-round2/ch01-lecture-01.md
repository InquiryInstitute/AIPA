# Review: 1.1: Definitions of Intelligence — Stored vs. Flowing

**Source:** part-i/ch01-intelligence-as-process/lecture-01.adoc

---

# Review of Lecture 1.1 – “Definitions of Intelligence — Stored vs. Flowing”

**Grade: B‑**  
*The lecture meets the structural requirements for a 90‑minute session and contains the right amount of material, but the narrative flow is uneven and several sections start with definition‑heavy prose. With a few concrete hooks, tighter transitions, and a richer diagram, it can become an engaging, A‑level session.*

---

## 1. Narrative Arc  

| Element | Evaluation | Comments |
|---------|------------|----------|
| **Hook** | ✅ Strong | The opening question about Siri (“stored fact sheet or on‑the‑fly model?”) is concrete, relatable, and immediately frames the stored ↔ flowing dichotomy. |
| **Development** | ⚠️ Mixed | The **Conceptual Core** jumps straight into “one way to define intelligence…”, which feels like a definition dump. The subsequent paragraphs introduce Turing/Chinese Room, but the link between the philosophical argument and the stored/flowing split is not always explicit. The **Technical Example** (chess endgame) is a good concrete illustration, yet it appears after a fairly abstract discussion, which can disrupt momentum. The **Philosophical Reflection** adds depth but feels like a separate essay rather than a continuation of the narrative. |
| **Closing / Bridge** | ✅ Good | The **Discussion Prompts**, **Lab Prep**, and **Reading** sections clearly point toward the next activities and give a sense of forward motion. |
| **Overall Verdict** | ⚠️ Needs tighter scaffolding | The lecture would benefit from a clearer “problem → response → limit” arc: start with the problem (how do we locate intelligence?), present the two competing responses (stored vs. flowing), then expose their limits (trade‑offs, hybrid reality) before moving to the lab. |

---

## 2. Density (Target ≈ 2,500‑3,500 words)

| Section | Paragraphs | Key‑point items | Approx. word count* |
|---------|------------|----------------|---------------------|
| Conceptual Core | 4 | 8 | ~1,100 |
| Technical Example | 3 | 7 | ~800 |
| Philosophical Reflection | 2 | 6 | ~600 |
| **Total** | **9** | **21** | **≈ 2,500** |

\*Word counts are rough estimates based on typical paragraph length (≈ 120‑150 words). The lecture sits comfortably within the target range.

**Observation:** The distribution is appropriate, but the **Conceptual Core** is a bit heavy on bullet‑point style exposition; spreading the key points across the narrative (instead of a single list) would improve readability and keep the pacing lively.

---

## 3. Interest – Will it hold attention for 90 minutes?

| Issue | Why it may lose attention | Suggested remedy |
|-------|---------------------------|-------------------|
| **Definition‑first dump** in the Conceptual Core (e.g., “One way to define intelligence is to locate it in what a system *has*…”) | Students hear a textbook definition before seeing why it matters. | Start the Core with a short *story*: “Imagine you are playing a blitz chess game against two opponents – one that has memorised every endgame, the other that thinks on the fly. Which feels smarter?” Then unpack the stored vs. flowing lenses. |
| **Sparse interactivity** – the lecture is largely monologue until the discussion prompts. | Long stretches of exposition can cause drift. | Insert a quick “think‑pair‑share” after the Siri hook: “What do you think Siri does under the hood? Write one sentence, then discuss.” |
| **Philosophical Reflection feels detached** | The jump from concrete chess example to Foucault’s episteme can feel abrupt. | Bridge with a transition sentence: “Beyond games, the same stored ↔ flowing tension shapes who controls knowledge in society.” Then weave the Foucault ideas as an extension of the earlier trade‑off discussion. |
| **Lack of visual dynamism** – only one static diagram. | Visual learners may disengage. | Add a second, minimal diagram showing a **hybrid** system (e.g., LLM + retrieval‑augmented generation) with arrows indicating both stored parameters and runtime retrieval. Use colour to differentiate the two flows. |
| **No concrete lab preview** | Students may not see the relevance of the upcoming hands‑on work. | Before “Lab Prep”, give a 30‑second teaser: “In Lab 1 you’ll build a tiny knowledge graph that can both store facts and answer queries on the fly – the very hybrid we just described.” |

---

## 4. Diagram Review (PlantUML block)

**Current diagram** – two parallel swim‑lanes: “Stored Representation” (single step → Retrieval) and “Flowing Process” (Input → Transform → Circulate → Output → Feedback). A caption notes “Hybrid systems”.

### Strengths
* Clearly distinguishes the two paradigms.
* Uses simple symbols that are easy to read.

### Weaknesses & Suggested Improvements
| Issue | Recommendation |
|-------|----------------|
| **Missing hybrid connection** – the “Hybrid systems” note is just a text label; no visual link shows how the two lanes interact. | Add a bidirectional arrow between the “Stored Knowledge / Retrieval” block and the “Input” block of the flowing lane, labelled “retrieval‑augmented query”. This illustrates that hybrids combine both flows. |
| **No quantitative cue** – the diagram does not convey the trade‑off (e.g., storage vs. compute). | Add small annotations (e.g., “high storage, low compute” under Stored lane; “low storage, high compute” under Flowing lane). |
| **Feedback loop only on flowing side** – stored lane appears static, which may imply immutability. | Add a thin feedback arrow from “Retrieval” back to “Stored Knowledge” labelled “updates / re‑training”. This shows that even stored systems can evolve. |
| **Styling** – the “sketchy‑outline” theme is fine, but the caption is not anchored. | Place the caption below the diagram with a border, and give each lane a distinct background colour (light blue vs. light orange) to reinforce the contrast. |
| **Label clarity** – “Circulate” is vague. | Replace with “Aggregate / Infer” or “Compose”. |
| **Scale** – the diagram is a bit cramped at 0.9 scale. | Increase scale to 1.0 or 1.1 for better readability on slides. |

**Revised PlantUML sketch (excerpt)**  

```plantuml
@startuml
scale 1.1
skinparam backgroundColor #F9F9F9
skinparam rectangle {
  BackgroundColor<<Stored>> #DDEEFF
  BackgroundColor<<Flow>>   #FFEEDD
}
' Stored lane
|Stored Representation|
start
:Stored Knowledge / Retrieval;
note right: high storage, low compute
--> :Update (re‑train);
note right: feedback loop
--> stop

' Flowing lane
|Flowing Process|
start
:Input;
--> :Transform;
--> :Compose;
--> :Output;
note right: low storage, high compute
--> :Feedback / Update;
note right: learning from use
--> stop

' Hybrid connection
Stored Knowledge --> Input : retrieval‑augmented query
Input --> Stored Knowledge : cache / update

note over Stored Representation, Flowing Process
  Hybrid systems combine both flows
end note
caption Stored vs. Flowing Intelligence
@enduml
```

---

## 5. Recommended Revisions (Prioritized)

1. **Re‑frame the Conceptual Core**  
   - Begin with a vivid, concrete story (e.g., blitz chess opponents) that illustrates the stored vs. flowing tension.  
   - Interleave the definition with the story rather than presenting a list of definitions first.

2. **Add micro‑interactions**  
   - Insert a 2‑minute “think‑pair‑share” after the Siri hook.  
   - After the chess example, ask students to vote (hand raise) which approach they think is “smarter” and why.

3. **Strengthen transitions**  
   - Write explicit bridge sentences linking each major section (e.g., “Having seen the technical trade‑off, we now ask what this means for who controls knowledge.”).

4. **Enrich the diagram**  
   - Implement the revised PlantUML code above (hybrid arrows, feedback on stored side, colour coding).  
   - Add a second, small diagram showing a retrieval‑augmented generation pipeline.

5. **Integrate a lab teaser**  
   - Insert a 30‑second preview of Lab 1 that directly references the hybrid diagram, reinforcing relevance.

6. **Condense the Key‑Point lists**  
   - Spread key points throughout the prose (bolded inline) to avoid a long bullet block that can feel “lecture‑note” style.

7. **Clarify philosophical language**  
   - Replace “episteme” with a brief parenthetical definition for non‑philosophy students.  
   - Tie Foucault’s concept directly back to the stored vs. flowing trade‑off (e.g., “When knowledge is stored, power concentrates; when it flows, power diffuses.”).

8. **Proofread for consistency**  
   - Ensure terminology is uniform (“stored‑representation” vs. “stored representation”).  
   - Verify that all PlantUML tags are correctly closed and that the diagram renders in the chosen theme.

---

### Closing Thought

With a tighter narrative arc, more interactive moments, and a clearer visual representation of hybrid systems, Lecture 1.1 will not only meet the 90‑minute density target but also captivate students from the first Siri question to the final lab preparation. Implementing the revisions above should elevate the lecture from a solid **B‑** to a compelling **A**.