FROM node:18-alpine as builder_base

WORKDIR /srv/app

RUN apk add --no-cache libc6-compat

COPY --link . .
COPY --from=deps --link /srv/app/node_modules ./node_modules

RUN yarn install

EXPOSE 3000
ENV PORT 3000

CMD ["sh", "-c", "yarn start"]

