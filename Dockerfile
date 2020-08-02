FROM node:13

WORKDIR /usr/home/app

COPY . .

RUN npm install && npm run build

EXPOSE 3000

CMD [ "node", "app.js" ]