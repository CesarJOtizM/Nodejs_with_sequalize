FROM node:lts-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --no-progress

COPY . .

EXPOSE 8080

CMD [ "yarn", "start:prod" ]