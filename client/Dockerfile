FROM node:12-alpine
LABEL maintainer="Nevermined <root@nevermined.io>"

RUN apk add --no-cache --update \
    bash \
    g++ \
    gcc \
    git \
    gettext \
    make \
    python \
    && rm -rf /var/cache/apk/*

COPY package*.json /app/frontend/
WORKDIR /app/frontend
RUN yarn

COPY . /app/frontend

RUN cp -r /app/frontend/node_modules/jose/dist/browser/* /app/frontend/node_modules/jose
RUN yarn build

# Default ENV values
ENV LISTEN_ADDRESS='0.0.0.0'
ENV LISTEN_PORT='3000'

ENTRYPOINT ["yarn", "start"]
