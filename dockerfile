FROM node:16.15-bullseye-slim

RUN apt update -y
RUN apt upgrade -y
RUN apt install build-essential libssl-dev libffi-dev python3-dev python3-pip git -y

WORKDIR /selfbot-ts
COPY . .

RUN npm i typescript -g -y
RUN npm install
RUN tsc

CMD [ "node", "build/bot.js" ]