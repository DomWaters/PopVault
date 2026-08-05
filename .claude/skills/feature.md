# feature

Runs the full Architect → Developer → Reviewer pipeline for a new feature request.

## Steps

1. **Architect phase** — invoke the `architect` agent with the feature description. It will read the relevant files and produce a structured plan covering: summary, files to change, files to create, order of implementation, and gotchas.

2. **Approval pause** — present the Architect's plan to the user and ask: *"Does this plan look right? Shall I pass it to the Developer?"* Do not proceed until the user confirms.

3. **Developer phase** — invoke the `developer` agent with the approved plan. It will implement the changes in the specified order and report back what was done.

4. **Review phase** — invoke the `code-reviewer` agent to review the files that were changed. It will check for correctness bugs, code quality issues, security problems, and performance concerns.

5. **Summary** — present a brief summary of: what was built, any deviations from the plan, and any findings from the reviewer that need attention.

## Usage

> /feature — add a progress bar to the top of each screen showing how far through the journey the user is
