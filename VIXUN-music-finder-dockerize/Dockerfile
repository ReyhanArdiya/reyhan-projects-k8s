FROM zenika/alpine-chrome:with-puppeteer

WORKDIR /app

COPY package.json .
RUN npm install --omit=dev

COPY . .

CMD npm run build:env && npm start