# dDoc drop-in demo

Two identical Vite + React host apps. Only the editor version and `src/Editor.tsx` differ.

| App        | `@fileverse-dev/ddoc`                             | Dev port | Hosted path |
| ---------- | ------------------------------------------------- | -------- | ----------- |
| `latest/`  | `5.1.10` from npm                                 | 5181     | `/latest/`  |
| `drop-in/` | `6.0.0-drop-in.1` from npm                        | 5182     | `/drop-in/` |

Use the black bar at the bottom to switch scenarios. "Show code" prints what each app passes to `DdocEditor`.

## Run locally

```bash
cd latest && npm i && npx vite     # http://localhost:5181
cd drop-in && npm i && npx vite    # http://localhost:5182
```

## Hosted build

`npm run install:apps && npm run build` at the root builds both apps into `dist/` with a landing page; `vercel.json` runs the same commands.

## Updating the prerelease

Publish the next prerelease from the package repo (`npm publish --tag drop-in`), then `npm i @fileverse-dev/ddoc@<version> --save-exact` in `drop-in/` and commit.
