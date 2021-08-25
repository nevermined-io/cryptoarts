FROM node:12-alpine
LABEL maintainer="Nevermined <root@nevermined.io>"

RUN apk add --update --no-cache \
    autoconf \
    automake \
    alpine-sdk \
    vips-dev \
    fftw-dev \
    build-base \
    python3

WORKDIR /app/backend/

COPY . .

RUN yarn
RUN yarn build

ENTRYPOINT ["yarn", "serve"]
