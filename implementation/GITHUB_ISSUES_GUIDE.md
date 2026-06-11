# GitHub Issues Guide

## Objective
[Brief description of what needs to be achieved]

## Acceptance Criteria
- [ ] Criterion 1 (e.g., Page loads without errors)
- [ ] Criterion 2 (e.g., User can click X)

## Technical Notes (optional)
- Brief note on implementation strategy, e.g., "Using generic‑ui library"

## 1. Execution (During Work)
### Branching
- Create a dedicated branch for the issue using the naming convention:
  - `feat/<ISSUE_ID>-short-description` for new features
  - `fix/<ISSUE_ID>-short-description` for bug fixes

### Commits
- All commit messages must reference the issue ID and follow the format:
  - `[<ISSUE_ID>] <Commit message>`
  - Example: `[#12] Add responsive styles to header`

## 2. Completion (End of Task)
### Verification
- Ensure all Acceptance Criteria are met and validated.

### Closing the Issue
- Close the issue via the GitHub API or CLI.
- Tool command example: `github_update_issue --state closed --issue <ISSUE_ID>`
- GitHub automatically records the `closed_at` timestamp.

### Completion Record
- Update the issue body or add a comment summarising the resolution and completion time if explicit tracking is required.

## 3. Standard Labels
Apply relevant labels when creating issues:
- `enhancement` – New features or improvements
- `bug` – Defects to be fixed
- `documentation` – Docs updates or additions
- `high priority` – Critical work items
- `in progress` – Work has started
- `ready for review` – PR opened, awaiting review

---

*End of Guide*
This guide is intended to be **fed to AI development agents** at the start of every chat session. It defines a disciplined workflow for creating, updating, and closing GitHub issues and milestones, ensuring consistent tracking of our project's progress.

---

## 1. Purpose
- **Centralise work tracking**: Every feature, bug, or task is documented as a GitHub issue.
- **Synchronise milestones**: Issues are linked to milestones that represent release goals.
- **Enable AI agents**: Provides clear instructions for the AI to automatically manage issues when you ask it to "create a feature" or "update the status".

---

## 2. Naming Conventions
| Type | Prefix | Example |
|------|--------|---------|
| Feature | `feat:` | `feat: Add user profile page` |
| Bug | `bug:` | `bug: Fix booking cancellation race` |
| Chore / Refactor | `chore:` | `chore: Update dependencies` |
| Documentation | `docs:` | `docs: Add API usage guide` |

- Use **title case** after the prefix.
- Keep titles **under 70 characters**.

---

## 3. Issue Template (required sections)
```
**Title**: <prefix> Short, clear description

**Description**:
- What is being addressed?
- Why is it needed? (context / user impact)
- Acceptance criteria (list of conditions for completion)

**Scope**:
- Related components/files
- Dependencies on other issues (link with `#<issue-number>`)

**Labels**:
- `feature`, `bug`, `enhancement`, `high priority`, `needs review`, etc.

**Milestone**:
- Assign to an existing milestone (e.g., `v1.2.0`). If none exists, create a new milestone following the naming convention `vX.Y.Z`.

**Assignee**:
- Assign to the developer responsible (or leave unassigned for AI to suggest).

**Estimation**:
- Add an effort estimate (e.g., `2 sp` for story points or `4 h`).
```

---

## 4. Workflow for AI Agents
1. **Creating an Issue**
   - Follow the template above.
   - Add appropriate labels and link to the correct milestone.
   - If the milestone does not exist, create it with a target due date (ISO `YYYY‑MM‑DD`).

2. **Updating an Issue**
   - When work starts, add a comment `**In Progress**` and optionally change the label to `in progress`.
   - When a PR is opened that resolves the issue, comment `**Linked PR #<pr-number>**` and add the label `ready for review`.
   - When the PR merges, add a comment `**Closed via PR #<pr-number>**` and close the issue.

3. **Milestone Management**
   - After each release, close the completed milestone.
   - Create a new milestone for the next release, copy over any carry‑over issues, and set a realistic target date.

4. **Automation Hooks (optional)**
   - Use GitHub Actions to enforce the template and label requirements on issue creation.
   - Add a workflow that posts a summary to `#project-tracking` channel when a milestone is closed.

---

## 5. Example Commands for AI
- **Create a feature**: `Create an issue titled "feat: Add dark‑mode toggle" with description …, label `feature`, milestone `v1.3.0`.
- **Update status**: `Add a comment "In Progress" to issue #42 and add label `in progress`.
- **Link PR**: `Comment "Linked PR #123" on issue #42 and add label `ready for review`.
- **Close issue**: `Close issue #42 after PR #123 merges`.

---

## 6. Responsibilities
- **Developers**: Keep issue descriptions up‑to‑date, move cards on the project board.
- **AI Agents**: When instructed, perform the above actions automatically via the GitHub API.
- **Project Lead**: Review milestone dates and ensure backlog grooming occurs weekly.

---

*End of Guide*
