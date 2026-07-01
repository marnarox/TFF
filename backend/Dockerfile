FROM node:25-alpine
WORKDIR /usr/app/backend
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
