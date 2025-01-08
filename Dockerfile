FROM node:16.14.0

WORKDIR /app

COPY package.json .
COPY ./.env .
COPY nest-cli.json .
RUN npm install

COPY . .
RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "start" ]
