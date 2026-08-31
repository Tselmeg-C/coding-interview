# PairCode Interview

An online coding-interview application with a React frontend, an Express API,
and Socket.IO-based room synchronization. Room state is held in memory for the
initial release.

## Full application

Install workspace dependencies once, then start frontend and backend together:

~~~bash
npm install
npm run dev
~~~

Run all automated checks with:

~~~bash
npm test
~~~

The frontend is available on port 5181 and the backend on port 3001. Open the
forwarded port 5181 URL in Codespaces; port 3001 is the API only.

## Browser-only code execution

JavaScript and Python run in a Web Worker in the participant's browser. Python
uses Pyodide, which downloads its runtime on the first Python execution. The
backend never executes submitted code. Use Stop to terminate an unresponsive
worker and create a fresh one.

## Frontend

~~~bash
cd frontend
npm install
npm run dev
~~~

Run frontend tests with:

~~~bash
cd frontend
npm test
~~~

## Backend

~~~bash
cd backend
npm install
npm run dev
~~~

The backend listens on port 3001 by default. Run its endpoint and real-time
integration tests with:

~~~bash
cd backend
npm test
~~~

## Container

Build the frontend and backend into one image:

~~~bash
docker build -t coding-interview .
docker run --rm -p 5181:3001 coding-interview
~~~

Open http://localhost:5181. The container serves the frontend, HTTP API, and
Socket.IO service from the same origin.

## Railway deployment

Railway deploys this repository using the root Dockerfile. The container reads
the platform-provided PORT environment variable and serves the frontend, API,
and Socket.IO endpoint from one public service.

Live application: https://coding-interview-production-d138.up.railway.app/

After a successful Railway deployment, use the service's generated public
domain to open the application and verify that two browser sessions can join
the same room and synchronize edits.
