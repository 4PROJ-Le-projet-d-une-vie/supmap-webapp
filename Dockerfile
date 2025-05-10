# Build the app
FROM node:22 AS builder

WORKDIR /app
COPY package.json ./
RUN npm install

COPY . .

RUN npm run build

# Étape 2 : Configurer Nginx sans SSL (HTTP seulement)
FROM nginx:alpine

# Copier la configuration Nginx sans SSL dans le conteneur
COPY default.conf /etc/nginx/conf.d/default.conf

# Copier le dossier dist depuis le build précédent
COPY --from=builder /app/dist /usr/share/nginx/html

# Exposer seulement le port 80 pour HTTP
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]