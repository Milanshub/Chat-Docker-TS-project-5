FROM node:18 

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . . 

RUN npm install -g typescript 

RUN npm run build 

EXPOSE 5000 

CMD ["node", "dist/app.js"]