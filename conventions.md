# Repository Conventions

This document defines the technical and organizational conventions of the project to ensure clean, consistent, readable, and maintainable code.

---

## Branching Strategy

### Format

* `main` → stable branch
* `develop` → integration branch
* `feature/<feature-name>` → **new features / new additions**

### Examples

* `feature/auth-system`
* `feature/leaderboard-api`
* `feature/ui-homepage`

---

## Conventional Commits

This project follows the **Conventional Commits** specification.

### Format

```
<type>(scope?): <description>
```

### Allowed types

* `feat` → new feature
* `fix` → bug fix
* `refactor` → code refactoring
* `perf` → performance improvement
* `docs` → documentation
* `style` → formatting/style only (no logic impact)
* `test` → tests
* `chore` → technical tasks

### Examples

* `feat(api): add leaderboard endpoint`
* `fix(frontend): fix router bug`
* `refactor(backend): restructure services`
* `docs(): update README`

---

## Project Structure

Goals:

* clear frontend / backend separation
* modular architecture
* readability

---

## Naming Conventions

### Global rules

* English only
* explicit names
* no unclear abbreviations
* no generic names (`temp`, `test`, `stuff`)

---

## Backend Conventions

### Python / FastAPI

#### Files

* `snake_case.py`

#### Functions

* `snake_case()`

#### Classes

* `PascalCase`

#### Variables

* `snake_case`

#### Header
"""  
File: <filename>  
Project: <project-name>  
Description: <short description of the module purpose>  
Author: Sofian Hussein  
Created: <YYYY-MM-DD>  
Last modified: <YYYY-MM-DD>  
"""

#### Endpoints

* RESTful structure
* clear resource naming
* no unnecessary verbs

Examples:

* `GET /users`
* `POST /orders`
* `GET /orders/{id}`

---

## Frontend Conventions

### JavaScript / Vue.js

#### Files

* components: `PascalCase.vue`
* JS files: `camelCase.js`

#### Variables

* `camelCase`

#### Vue components

* `PascalCase`

#### Services

* `camelCase`

#### Header
/*  
File: <filename>  
Project: <project-name>  
Description: <short description of the file responsibility>  
Author: Sofian Hussein  
Date of creation: <DD-MM-YYYY>  
*/

---

## Source and AI Usage Conventions

### AI Assistance

When using an AI tool to generate text, code, or other content, indicate it in the following format:

**Source AI:**  
Source AI-Name:

**Prompt:**  
Prompt given to the AI

**Example:**  
Source ChatGPT:  
Prompt: Generate a Python function to calculate factorial recursively

### Documentation or External Sources

For references to official documentation or external websites, use this format:

**Source:**  
URL of the document or website

**Example:**  
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

**Where:**  
The sources must be indicated in the code just before using it.
---

Living document - any change must be validated by the team.
