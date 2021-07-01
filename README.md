[![banner](https://raw.githubusercontent.com/nevermined-io/assets/main/images/logo/banner_logo.png)](https://nevermined.io)

# Nevermined Cryptoarts

If you're a developer and want to contribute to, or want to utilize this code in your projects, then keep on reading.

- [Nevermined Cryptoarts](#nevermined-cryptoarts)
  - [Get Started](#get-started)
    - [Using minio locally](#using-minio-locally)
    - [Use with Nevermined Tools](#use-with-nevermined-tools)
    - [Environment Variables](#environment-variables)
      - [Client](#client)
      - [Server](#server)
      - [Feature Switches](#feature-switches)
      - [More Settings](#more-settings)
  - [Testing](#testing)
    - [Unit Tests](#unit-tests)
    - [End-to-End Integration Tests](#end-to-end-integration-tests)
  - [Code Style](#code-style)
  - [Production](#production)
  - [Releases](#releases)
  - [Changelog](#changelog)
  - [Attribution](#attribution)
  - [License](#license)

## Get Started

This repo contains a client and a server, both written in TypeScript:

- **client**: React app setup with [Nevermined SDK JS](https://github.com/nevermined-io/sdk-js), bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
- **server**: Node.js app, utilizing [Express](https://expressjs.com). The server provides various microservices, like remote file checking. The endpoints are documented in [server Readme](server/).

To spin up both, the client and the server in a watch mode for local development, execute:

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the client in the browser. The page will reload if you make edits to files in either `./client` or `./server`.

### Using minio locally

Start a minio instance with:
```bash
$ docker run -p 9000:9000 minio/minio server ./data
```

Restart the server (if already running) so that a new bucket is initialized.

### Use with Nevermined Tools

If you prefer to run locally all the Nevermined stack, you can spin up [`Nevermined Tools`](https://github.com/nevermined-io/tools) and use a local network (named `Spree`):

```bash
git clone git@github.com:nevermined-io/tools.git nevermined-tools
cd nevermined-tools

# startup with local Spree node
./start_nevermined.sh
```

Then set [environment variables](#️-environment-variables) to use those local connections.

Finally, you need to copy the generated contract artifacts out of the Docker container. To do this, execute this script in another terminal:

```bash
cd client
./scripts/nevermined-tools.sh
```

The script will wait for all contracts to be generated in the `nevermined-contracts` Docker container, then will copy the artifacts in place.

If you are on macOS, you need to additionally tweak your `/etc/hosts` file so Gateway can connect to the Metadata api. This is only required on macOS and is a [known limitation of Docker for Mac](https://docs.docker.com/docker-for-mac/networking/#known-limitations-use-cases-and-workarounds):

```bash
sudo vi /etc/hosts

# add this line, and save
127.0.0.1    metadata
```

Then use this host for the local Metadata url in the client config:

```bash
REACT_APP_METADATA_URI="http://metadata:5000"
```

### Environment Variables

#### Client

The `./client/src/config.ts` file is setup to prioritize environment variables for setting each Nevermined component endpoint.

By setting environment variables, you can easily switch between Nevermined networks the commons client connects to, without directly modifying `./client/src/config.ts`. This is helpful e.g. for local development so you don't accidentially commit changes to the config file.

For local development, you can use a `.env.local` file. There's an example file with the most common network configurations preconfigured:

```bash
cp client/.env.local.example client/.env.local

# uncomment the config you need
vi client/.env.local
```

#### Server

The server uses its own environment variables too:

```bash
cp server/.env.example server/.env

# edit variables
vi server/.env
```

#### Feature Switches

Beside configuring the network endpopints, the client allows to activate some features with environment variables in `client/.env.local`:

| Env Variable                           | Feature Description                                                                                                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `REACT_APP_SHOW_CHANNELS`              | Show the channels feature which shows assets based on a certain tag in a prominent view. This is deeactivated by default and only activated in some deployments. |
| `REACT_APP_SHOW_REQUEST_TOKENS_BUTTON` | Shows a second button on the `/faucet` route to request Nevermined Tokens in addition to Ether. Will only work in testnets.                                             |
| `REACT_APP_ALLOW_PRICING`              | Activate pricing feature. Will show a price input during publish flow, and output prices for each data asset.                                                            |

#### More Settings

| Env Variable                                                          | Example                                | Feature Description                               |
| --------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------- |
| client: `REACT_APP_IPFS_GATEWAY_URI`<br /> server: `IPFS_GATEWAY_URI` | `"https://ipfs.infura.com"`     | The IPFS gateway URI.                             |
| `REACT_APP_IPFS_NODE_URI`                                             | `"https://ipfs.infura.com:443"` | The IPFS node URI used to add files to IPFS.      |
| `REACT_APP_REPORT_EMAIL`                                              | `"test@organization.com"`              | The email used for the _report an asset_ feature. |

## Testing

Test suite is setup with [Jest](https://jestjs.io) and [react-testing-library](https://github.com/kentcdodds/react-testing-library) for unit testing, and [Cypress](https://www.cypress.io) for integration testing.

To run all linting, unit and integration tests in one go, run:

```bash
npm test
```

The endpoints the integration tests run against are defined by your [Environment Variables](#environment-variables), and Cypress-specific variables in `cypress.json`.

### Unit Tests

For local development, you can start the test runners for client & server in a watch mode.

```bash
npm run test:watch
```

This will work for daily development but it misses the full interactivity of the test runner. If you need that, you will need to run them in individual terminal sessions:

```bash
cd client/
npm run test:watch

cd server/
npm run test:watch
```

### End-to-End Integration Tests

To run all integration tests in headless mode, run:

```bash
npm run test:e2e
```

This will automatically spin up all required resources to run the integrations tests, and then run them.

You can also use the UI of Cypress to run and inspect the integration tests locally:

```bash
npm run cypress:open
```

## Code Style

For linting and auto-formatting you can use from the root of the project:

```bash
# auto format all ts & css with eslint & stylelint
npm run lint

# auto format all ts & css with prettier, taking all configs into account
npm run format
```

## Production

To create a production build of both, the client and the server, run from the root of the project:

```bash
npm run build
```

Builds the client for production to the `./client/build` folder, and the server into the `./server/dist` folder.

## Releases

From a clean `master` branch you can run any release task doing the following:

- bumps the project version in `package.json`, `client/package.json`, `server/package.json`
- auto-generates and updates the CHANGELOG.md file from commit messages
- creates a Git tag
- commits and pushes everything
- creates a GitHub release with commit messages as description

You can execute the script using {major|minor|patch} as first argument to bump the version accordingly:

- To bump a patch version: `npm run release`
- To bump a minor version: `npm run release minor`
- To bump a major version: `npm run release major`

By creating the Git tag with these tasks, Travis will trigger a new Kubernetes live deployment automatically, after a successful tag build.

For the GitHub releases steps a GitHub personal access token, exported as `GITHUB_TOKEN` is required. [Setup](https://github.com/release-it/release-it#github-releases)

## Changelog

See the [CHANGELOG.md](./CHANGELOG.md) file. This file is auto-generated during the above mentioned release process.

## Attribution

This application is based in the [Ocean Protocol](https://oceanprotocol.com) [Commons](https://github.com/oceanprotocol/commons)
It keeps the same Apache v2 License and adds some improvements. See [NOTICE file](NOTICE).

## License

```
Copyright 2020 Keyko GmbH
This product includes software developed at
BigchainDB GmbH and Ocean Protocol (https://www.oceanprotocol.com/)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
