FROM node:11-alpine
LABEL maintainer="Nevermined <root@nevermined.io>"

WORKDIR /app/backend/

COPY . .

RUN npm install && \
    npm run build

ENTRYPOINT ["npm", "run", "serve"]
