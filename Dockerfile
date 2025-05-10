# Build the app
FROM node:22 AS builder

WORKDIR /app
COPY package.json ./
RUN npm install

COPY . .

RUN npm run build

# Expose webapp from Nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]