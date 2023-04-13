### STAGE 1: Build ###
FROM node:14.20-alpine AS builder
LABEL maintainer="Chris Cobos <chris.ajna@>"

WORKDIR /app
RUN npm install -g @angular/cli@15.2.0

COPY ./package.json .
RUN npm install
COPY . .
RUN ng build

### STAGE 2: Run ###

