# syntax=docker/dockerfile:1

# STAGE 1
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./

RUN npm install -f

COPY . .

RUN npm run build

# STAGE 2
FROM node:18-alpine
WORKDIR /app

RUN apk update && apk add --no-cache bash
RUN apk add nano

COPY --from=builder /app/build ./build
COPY --from=builder /app/start.sh ./build
RUN npm install -g serve

EXPOSE 5081

CMD ["serve", "-s", "build", "--listen", "5081"]
