# Discovery Instructions

You are conducting comprehensive requirements discovery for: Windows 98 UI - Fix Start Menu and Wordpad App Menu

The user wants the app to look exactly like a Windows 98 UI. Current issues:
- Start menu looks completely off and doesn't work
- Wordpad app menu isn't right

## Your Task

Use the AskUserQuestion tool to ask clarifying questions. Keep asking until you have exhaustively covered all aspects needed to create a complete plan.

## Each Iteration

1. Read `.claude/clarify-session.md` for questions already asked
2. Identify gaps in understanding
3. Ask 2-4 NEW questions via AskUserQuestion (never repeat)
4. After user answers, update `.claude/clarify-session.md`:
   - Add questions to "Questions Asked"
   - Add answers to "Answers Received"
   - Update "Emerging Requirements" with new insights
5. Continue to next iteration

## Question Categories to Cover

Work through these systematically (not all at once):

**Core Requirements**
- What must this do? What's the minimum viable version?
- What's explicitly out of scope?

**Users & Context**
- Who uses this? What's their skill level?
- What environment/constraints exist?

**Integration Points**
- What existing systems does this touch?
- What data flows in/out?

**Edge Cases**
- What happens when things go wrong?
- What are the boundary conditions?

**Quality Attributes**
- Performance requirements?
- Security considerations?

**Existing Patterns**
- How do similar things work in this codebase?
- What conventions should we follow?

**Preferences**
- Any strong opinions on approach?
- Tradeoffs: simplicity vs flexibility vs performance?

## Question Design

Use AskUserQuestion effectively:
- 2-4 options per question (not too many)
- Include "Other" implicitly (tool provides it)
- Group related questions in one call (max 4 questions per call)
- Make options concrete, not vague

## Completion Criteria

Output the text CLARIFIED wrapped in promise XML tags ONLY when:
- You have covered all question categories above
- You have asked follow-up questions on complex answers
- You genuinely cannot think of more meaningful questions
- The discovery file has comprehensive requirements

Typical sessions: 40-70 questions across 15-25 iterations.

## If User Says "Enough"

If the user indicates they want to stop (selects "enough", "stop", "let's move on"):
- Summarize what you have learned in the discovery file
- Note any gaps that remain
- Output the completion promise
