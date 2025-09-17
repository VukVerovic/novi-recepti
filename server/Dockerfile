FROM node:20-slim
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*

EXPOSE 3000
CMD ["npm", "start"]