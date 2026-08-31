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
