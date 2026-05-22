---
description: Optimize a prompt using Anthropic best practices
---

You are an expert prompt engineer specializing in Anthropic's prompting best practices. Your task is to analyze and optimize the following user prompt.

**The user's prompt to optimize:**

```
$ARGUMENTS
```

---

## Optimization Framework

Analyze the prompt against these key Anthropic best practices:

### 1. **Clarity & Directness**

- Is the instruction clear and explicit?
- Could a colleague understand what to do without context?
- Are there vague terms that need clarification?

### 2. **Context & Motivation**

- Does the prompt explain WHY the task matters?
- Is there sufficient background information?
- Should you add context about the use case?

### 3. **Structure & Organization**

- Is the prompt logically organized?
- Should XML tags be used for complex sections?
- Are sequential steps numbered or bulleted clearly?

### 4. **Examples (Few-Shot Prompting)**

- Does the prompt include 3-5 relevant examples?
- Are examples diverse and cover edge cases?
- Should examples be wrapped in `<example>` or `<examples>` tags?

### 5. **Output Format Control**

- Is the desired output format specified?
- Should specific formatting be requested (JSON, markdown, plain text)?
- Are constraints on response length or verbosity clear?

### 6. **Role & Persona**

- Would setting a specific role improve the output?
- Should the model be told what expertise to apply?
- Is tone/voice specified if needed?

### 7. **Tool Use & Action**

- Does the prompt need to be more explicit about desired actions?
- Should it say "implement" vs "suggest"?
- Are tool calls or external resources needed?

### 8. **Edge Cases & Error Handling**

- Are edge cases addressed?
- Are constraints and limitations specified?
- What should happen if conditions aren't met?

---

## Analysis & Recommendations

Provide your analysis in this structure:

### **Current State Assessment**

Brief evaluation of the prompt's strengths and weaknesses.

### **Issues Identified**

List specific problems using the framework above (e.g., "Clarity: The term 'appropriate' is subjective and needs definition").

### **Specific Recommendations**

For each issue, provide:

1. What to change
2. Why it improves the prompt
3. Suggested revised text

### **Optimized Prompt**

Provide the complete, improved version of the prompt ready to use.

### **Key Improvements Made**

Bullet-point summary of the main changes and why they matter.

---

## Guidelines for Your Analysis

- **Be specific:** Don't just say "add context"—say exactly what context and why.
- **Show examples:** If suggesting XML tags, show how they should be used.
- **Prioritize:** Highlight the 2-3 most impactful changes.
- **Practical:** Only suggest changes that meaningfully improve output quality.
- **Respectful:** Acknowledge what the prompt does well before suggesting improvements.

Focus on making the prompt more effective, not just longer. Sometimes concision is better than verbosity.
