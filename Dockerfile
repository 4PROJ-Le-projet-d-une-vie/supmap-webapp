# Build the app
FROM node:22 AS builder

WORKDIR /app
COPY package.json ./
RUN npm install

COPY . .

RUN npm run build

# Final image
FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --omit=dev && npm install -g vite   # Install Vite to run easily the app

COPY --from=builder /app/dist ./dist

EXPOSE 4173
CMD ["vite", "preview", "--port", "4173", "--host"]