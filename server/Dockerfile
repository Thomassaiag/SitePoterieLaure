# utilisation de l'image Node version 20
FROM node:20.10.0

# définition du répertoire dans le container
WORKDIR /app/server

#copy des fichiers package.json et packaeg.lock.json
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie de tous les fichiers du répertoire courant vers le répertoire du container précédemment défini
COPY . .

# Exposition du port sur lequel le back fonctionne
ENV PORT=14001

# Exécution des commandes
CMD ["node", "server.js"]