# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.8.0

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g @angular/cli

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
