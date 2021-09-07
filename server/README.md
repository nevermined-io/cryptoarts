[![banner](https://raw.githubusercontent.com/nevermined-io/assets/main/images/logo/banner_logo.png)](https://nevermined.io)

# Nevermined Marketplace Server

This folder contains server component written in TypeScript using [Express](https://expressjs.com). The server provides various microservices.

- [Nevermined Marketplace Server](#nevermined-marketplace-server)
  - [Get Started](#get-started)
  - [API Documentation](#api-documentation)
    - [Url Checker](#url-checker)
    - [Report](#report)
  - [Attribution](#attribution)
  - [License](#license)

## Get Started

To spin up the server in a watch mode for local development, execute:

```bash
yarn
yarn start
```

## API Documentation

### Url Checker

Url Checker returns size and additional information about requested file. This service is used as a solution to frontend CORS restrictions.

**Endpoint:** POST `/api/v1/urlcheck`

**Request Parameters**

```json
{
  "url": "https://test.com/raw.json"
}
```

```json
{
  "url": "ipfs://QmQfpdcMWnLTXKKW9GPV7NgtEugghgD6HgzSF6gSrp2mL9"
}
```

**Response: Success**

```json
{
  "status": "success",
  "result": {
    "found": true,
    "contentLength": "2989228",
    "contentType": "application/pdf"
  }
}
```

**Response: Error**

```json
{
  "status": "error",
  "message": null
}
```

### Report

Report endpoints sends an email via SendGrid. Requires `SENDGRID_API_KEY` set as environment variables.

**Endpoint:** POST `/api/v1/report`

**Request Parameters**

```json
{
  "msg": {
    "to": "test@example.com",
    "from": "test@example.com",
    "subject": "My Subject",
    "text": "Text",
    "html": "<strong>HTML</strong>"
  }
}
```

**Response: Success**

```json
{
  "status": "success"
}
```

**Response: Error**

```json
{
  "status": "error",
  "message": "Error message"
}
```

## Attribution

This library is based in the [Ocean Protocol](https://oceanprotocol.com) [Commons](https://github.com/oceanprotocol/commons)
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
