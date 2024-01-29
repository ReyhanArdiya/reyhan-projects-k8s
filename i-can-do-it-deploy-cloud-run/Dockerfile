FROM node:16-alpine AS base

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

FROM base AS prod
ENV NODE_ENV=production
RUN npm run build
EXPOSE 3000
CMD ["npm" ,"start"]

FROM base AS dev
ENV NODE_ENV=development
EXPOSE 3000
CMD ["npm" ,"run", "dev"]
