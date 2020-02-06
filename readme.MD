# Production-ready dockerised MEAN Stack Project Scaffold

A Mono-Repo scaffold for a dockerised production-ready MEAN stack application, served by NGINX.

## Workspace
This scaffold uses a MonoRepo structure to house both the server and client packages within the same git repository _(along with a common package for shared resources)_. It follows the following rough layout:

```
. Workspace Root
|
+-- package.json
+-- lerna.json
+-- node_modules/
+-- docker-compose.yaml
+-- .gitignore
|
+-- packages
    |
    +-- **api**
    |   +-- src/
    |   +-- node_modules/
    |   +-- package.json
    |   +-- package-lock.json
    |   +-- Dockerfile.*
    |   +-- config_files...
    |
    +-- **web-app**
    |   +-- src/
    |   +-- node_modules/
    |   +-- package.json
    |   +-- package-lock.json
    |   +-- angular.json
    |   +-- Dockerfile.*
    |   +-- config_files...
    |
    +-- **common**
    |   +-- src/
    |   +-- node_modules/
    |   +-- package.json
    |   +-- package-lock.json
    |   +-- config_files...
``` 

Each _package_ has it's own `package.json` file and `node_modules` folder. As such [Lerna](https://lerna.js.org/) should be used to manage the running of scripts across the repo.
```shell script
# If you want to use a global installation of lerna, install lerna locally
npm i -G lerna
# which will give you access to the lerna cli.
# then to install all external dependencies run
lerna bootstrap

# Alternatively, you can run `npm i` in the project root to install lerna locally then run
# lerna commands by prefixing lerna with npx for example
npx lerna bootstrap
```

Once the cli is installed, where you would normally have written `npm run <script>` to run npm scripts, instead use `lerna run <script>` at the root of the project which will run the scripts across all packages where that script is present.

### Git Hooks
1. Linting on `git commit` - Linting should automatically run on all staged files when a commit is made in this repository. This is carried out by `lint-staged` and `husky`
    
## Stack
|**Package**|**Technology**|**Language**| **Testing** |**Production runtime**|**Database** |
|---|---|---|---|---|---|
|**API** - _(Server)_|[Express](https://expressjs.com/) _([NodeJS](https://nodejs.org/en/))_|[Typescript](https://www.typescriptlang.org/)|[Jest](https://jestjs.io/) & [SuperTest](https://github.com/visionmedia/supertest#readme)|[PM2](https://pm2.keymetrics.io)|[MongoDB](https://www.mongodb.com/) _([Mongoose](https://mongoosejs.com/))_|
|**Web App** - _(Client)_|[Angular](https://angular.io/)|[Typescript](https://www.typescriptlang.org/)|[Jest](https://jestjs.io/)|Static files served by [NGINX](https://www.nginx.com/)|_N/a_|
|**Reverse Proxy** - _(Web Server)_|[NGINX](https://www.nginx.com/)|[NGINX](https://www.nginx.com/)|_N/a_|_N/a_|_N/a_|

## Running the App

### Dev Mode

#### Docker 

- App is accessible on: `localhost:8080`
- Api is accessible on: `localhost:8080/api`

```shell script
# At the Project Root
docker-compose up

# If a clean build is required:
docker-compose up --build

# Alternatively you can just use provided shell script
sh run-dev.sh
```

While run in dev mode it uses the `Dockerfile.dev` specs, navigate to the project root and run `docker-compose up` (add `--build` if a clean build is required). 

Both the _web-app_ and _api_ are set up for hot module replacement _(HMR)_ while run in development mode. **However** any changes to the `/packages/common` folder _(as both the api and web-app depend on it)_ will require a clean docker image build _(`docker-compose up --build`)_ in order to have the project dependencies properly updated. This is due to the way the projects have been linked _(the current method allows the use of the shared package without publishing it to npm independently)_

#### Locally

- By default the Angular App is accessible on: `localhost:4200`
- By default the API is accessible on: `localhost:3000`

The app can also be run locally, however you will need to write and wire up a custom `proxy.conf.json` to do so, as routing in the docker container is managed by a reverse-proxy (NGINX).
- See below for a sample of what the `proxy.conf.json` file will likely look like
- See [Angular docs](https://angular.io/guide/build#proxying-to-a-backend-server) for instructions on how to wire up and use the proxy

```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "pathRewrite": {
      "^/api": "/"
    }
  }
}
```

## Testing the App

Scripts have been provided across the current packages so that testing can be done by running `lerna run test`. Similarly `lerna run ci:test` has been provided to ensure that the test-suite exits after finishing testing to work around the issue that some CI providers have with frameworks that dynamically watch for updates.

The Dockerfiles found at the root of the repo (`Dockerfile.dev` | `Dockerfile.build`) can be used to build an image from which the entire repo can be tested. Once the image is built the default command needs to be overwritten to run the tests using `lerna run ci:test`. This builder image useful within CI:CD environments as production build images can also easily be built from this image. 

## Building the App for Production

A docker-compose file `docker-compose.production.yaml` has been created to handle the multi-stage build process and minimise the size of the production images. It does this primarily through building an image for the entire repo (using `Dockerfile.build`) which handles the build process for all the packages, then extracting the relevant production files and building new smaller images for them through the subsequent `Dockerfile`s found in packages.

```shell script
# At the Project Root
docker-compose -f docker-compose.production.yaml up

# If a clean build is required:
docker-compose -f docker-compose.production.yaml up --build

# Occasionally docker-compose can be a bit tempramental, if you need to force a completely clean build the following can be useful
docker-compose -f docker-compose.production.yaml up --build --remove-orphans --force-recreate

# Alternatively you can just use provided shell script
sh run-prod.sh
```

## API Docs

API docs are served by [Swagger](https://swagger.io) and can be accessed on `localhost:8080/api/docs`