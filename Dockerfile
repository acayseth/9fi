FROM node:14

WORKDIR /data

COPY package*.json .

RUN npm install --quiet

COPY . .