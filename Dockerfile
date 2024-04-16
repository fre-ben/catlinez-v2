FROM node:20-alpine AS base

RUN set -eux \
    & apk add \
        --no-cache \
        yarn

# Needed for Kamal healthchecks
RUN apk add --no-cache libc6-compat curl

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000

ENV NODE_ENV production

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["yarn", "start"]
