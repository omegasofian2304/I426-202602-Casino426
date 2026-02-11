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

---

Living document - any change must be validated by the team.
