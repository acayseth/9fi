FROM node:14

COPY . /data

RUN npm install

COPY . /data

CMD npm run start