FROM node:12-alpine
LABEL maintainer="Nevermined <root@nevermined.io>"

RUN apk add --no-cache autoconf automake alpine-sdk

WORKDIR /app/backend/

COPY . .

RUN npm install && \
    npm run build

ENTRYPOINT ["npm", "run", "serve"]
