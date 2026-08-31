# AI Usage Report

## Purpose

This report records how AI assistance was used while building PairCode
Interview, including the review and verification applied to the generated work.

## AI-assisted tasks

| Area | AI-assisted work | Human review and verification |
| --- | --- | --- |
| Product planning | Structured the product specification, acceptance criteria, non-goals, and technical constraints. | Reviewed scope and kept accounts, persistence, video, and server-side code execution out of the first release. |
| Frontend | Created the React/Vite prototype, centralized room service boundary, CodeMirror editor, and UI states. | Ran the frontend locally and verified room creation, sharing, language selection, and visual behavior. |
| API and backend | Defined the OpenAPI contract, Express routes, in-memory store, and Socket.IO room protocol. | Ran endpoint tests and two-client Socket.IO synchronization tests. |
| Browser execution | Added JavaScript and Python Web Worker runners and Pyodide integration. | Confirmed Python execution in the browser and verified the backend never receives code for execution. |
| Containerization | Created the multi-stage Dockerfile and same-origin production serving arrangement. | Built the Docker image, requested its health endpoint, and verified it served the frontend HTML. |
| Documentation | Maintained local setup, test, container, and homework-answer documentation. | Reviewed commands against the project scripts and deployment approach. |

## Verification commands

~~~bash
npm test
npm run build --prefix frontend
docker build -t coding-interview .
docker run --rm -p 5181:3001 coding-interview
~~~

## Limitations and follow-up work

- Room state is in memory and is lost on server restart, by design for the
  initial release.
- The collaboration implementation uses last-write-wins updates, not CRDT or
  operational-transform conflict resolution.
- Pyodide downloads in the participant's browser on first Python execution and
  requires network access to its configured runtime CDN.
- Browser Workers isolate code from the application UI and server, but are not
  a substitute for a hardened multi-tenant remote execution sandbox.
- Production monitoring, CI/CD automation, a production database, and database
  migrations are future deployment/infrastructure work.
