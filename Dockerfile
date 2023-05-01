FROM node:lts-alpine

COPY . .

RUN npm install && npm run build

CMD ["npm","run","dev"]

