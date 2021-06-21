FROM node:14

RUN mkdir -p /data

WORKDIR /data

COPY package*.json /data

RUN npm install --quiet

COPY . /data

CMD npm run start