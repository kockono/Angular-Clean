### STAGE 1: Build ###
FROM node:14.20-alpine AS builder
LABEL maintainer="Chris Cobos <chris.ajna@>"

WORKDIR /app
RUN npm install -g @angular/cli@15.0.0

COPY ./package.json .
RUN npm install
COPY . .
RUN ng build

### STAGE 2: Run ###
FROM nginx:1.21.1-alpine as runtime
LABEL maintainer="Chris Cobos <chris.ajna@>"

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/web /usr/share/nginx/html
