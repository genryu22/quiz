FROM node

WORKDIR /quiz

COPY package.json /quiz
COPY package-lock.json /quiz

RUN npm install

CMD ["npm", "start"]