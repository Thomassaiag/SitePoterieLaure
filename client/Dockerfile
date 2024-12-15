#utilisation de l'image node version 20
FROM node:20.10.0

#Création du répertoire /app/client dans le container
WORKDIR /app/client

#Copy des packages
COPY package*.json ./

#installation des dépendances
RUN npm ci

#copie de l'ensemble des fichiers dans le contexte actuel, vers le contexte de destination du container
COPY . .

#lancement du build
RUN npm run build

#définition de la variable d'environnement pour le port
ENV PORT=14000

#execution des commandes
#npm scripts définis dans le package.json
#run preview: execute vite preview -> production build
#--port 14000 and --host sont passés à Vite Preview
#le server écoute sur le port 14000
#le server est accessible sur le network en mappant 0.0.0.0 qui écoute sur tous les networks disponibles
CMD ["npm","run","preview","--","--port","14000",  "--host"]