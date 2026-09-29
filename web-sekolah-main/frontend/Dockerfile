FROM node:20-alpine

WORKDIR /app

# Copy package.json dan install dependencies
COPY package*.json ./
RUN npm install

# Copy semua source code frontend
COPY . .

EXPOSE 3000

# Ubah perintah di bawah ini sesuai script start di package.json Anda (contoh: npm run dev / npm start)
CMD ["npm", "run", "dev"]
