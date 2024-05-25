FROM node:21

WORKDIR /usr/local/apps/fitapp

COPY package*.json ./

RUN npm install

COPY tsconfig.json ./
COPY src ./src
COPY .env ./

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]

