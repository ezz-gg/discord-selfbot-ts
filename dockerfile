FROM node:16.15-bullseye-slim
ENV TZ=Asia/Tokyo

RUN apt update -y
RUN apt upgrade -y
RUN apt install build-essential libssl-dev libffi-dev python3-dev python3-pip git -y

WORKDIR /selfbot-ts
COPY . .

RUN npm i ts-node -g
RUN npm install

CMD [ "ts-node", "src/bot.ts" ]