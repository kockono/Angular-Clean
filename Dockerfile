### STAGE 1: Build ###
FROM node:14.20-alpine AS builder
LABEL maintainer="Chris Cobos <chris.ajna@gmail.com>"

WORKDIR /app
RUN npm install -g @angular/cli@15.2.4

COPY ./package.json .
RUN npm install
COPY . .
RUN ng build

### STAGE 2: Run ###

