FROM node:12-alpine
LABEL maintainer="Nevermined <root@nevermined.io>"

WORKDIR /app/backend/

COPY . .

RUN npm install && \
    npm run build

ENTRYPOINT ["npm", "run", "serve"]
