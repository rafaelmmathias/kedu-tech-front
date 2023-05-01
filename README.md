<h1 align="center">
    <font size="5">Kedu Tech Front</font>
</h1>

<div align="center">
    <font size="3">
        A small description...
    </font>
</div>

<div align="center">
  <img src="./doc/badges/badge-branches.svg" />
  <img src="./doc/badges/badge-functions.svg" />
  <img src="./doc/badges/badge-lines.svg" />
  <img src="./doc/badges/badge-statements.svg" />
</div>

## ⚡️ Getting started
First, clone:

```bash
git clone %git_address%
```

Install dependencies
```bash
npm install
```

Run (mock server will works automatically)
```bash
npm run dev
```

test
```bash
npm run test
```

<hr/>

## App stack
- [react](https://reactjs.org/) + typescript
- [react-router](https://reactrouter.com/)
- [styled-components](https://styled-components.com/)
- [react-query v4](https://tanstack.com/query/latest)
- [msw](https://mswjs.io/)
    - Used to serve the [mock server API](src/test/server/handlers.ts).
- [jest](https://jestjs.io/)
    - Unit tests integrated with msw
    - [React Testing Library](https://testing-library.com/)
- [axios-http](https://axios-http.com/)
- [vitejs](https://vitejs.dev/)