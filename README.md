# PairCode Interview

An online coding-interview application. The frontend currently uses a mock
room client while the contract-aligned Express and Socket.IO backend is
implemented with in-memory room state. The next phase connects them.

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

The backend listens on port 3001 by default. Run its endpoint tests with:

~~~bash
cd backend
npm test
~~~
