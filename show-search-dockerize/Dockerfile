FROM node:16-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm i 

COPY . .

FROM base AS dev
EXPOSE 3000
CMD ["npm", "start"]

FROM base AS build
RUN npm run build

FROM nginx:1.21.1-alpine AS prod
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]