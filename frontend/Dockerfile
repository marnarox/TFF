FROM node:25-alpine
WORKDIR /usr/app/frontend
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 4200
CMD ["npm", "run", "start"]
