FROM node:14.7-slim as builder
ENV NODE_ENV production
WORKDIR /app
ADD . /app
RUN npm install --ci

FROM node:14.7-slim
ENV NODE_ENV production
WORKDIR /app
COPY --from=builder /app /app

EXPOSE 3000

CMD ["node", "/app/server.js", "--max-old-space-size=64"]
