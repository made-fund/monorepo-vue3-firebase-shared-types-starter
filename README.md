# Welcome to the Vue 3 + Firebase + Shared Types - Starter Project by MadeForYou™

[https://madeforyou.cc](https://madeforyou.cc)

### This project includes:

- Vue 3 (with a minimal auth setup)
- Firebase
  - Cloud Functions
  - Firestore Database
  - Storage
  - Authentication
- Shared Types (managed in the backend project - exposed to the frontend project via "@shared/types")

## Getting started

1. Clone this repo
2. Run `npm install` in your terminal from the root level.
3. In your terminal, `cd` into `apps/backend/functions` and also run `npm install`.

#### Step 3 and 4 are only needed if you manually cloned this repo. If you used this as a github template, a new repo has already been created.

3. Disconnect it from this git repo by running `rm -rf .git`.
4. Create a new git repo by running `git init`.

### Project setup

5. Go to `apps/backend/.firebaserc` and add your Firebase project ID there.
6. Go to `apps/frontend/src/firebase.ts` and add your Firebase project configuration there.
7. Run `npm run dev` from the root of this project.
8. It should serve both the frontend, backend, and shared library with live reloading in all places.

### Important to know:

If you ever want to add additional apps or shared libs to this project, make sure to add those to the workspaces in the root `package.json`

## Usage

Instead of having a seperate 'shared' folder - firebase backends require for all files to be present in the src folder during build.
Because of this, we've decided to make the backend responsible for defining things like types & interfaces, while exposing them to the frontend project(s).

For examples of usage, check out the `user.store.ts` or `main.ts` files in the frontend app.
