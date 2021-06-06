# Imagem de base
FROM node

# Configurando diretorio no container
WORKDIR /usr/app

# Copiar todos os arquivo package.json e yarn.lock
COPY package*.json .
#COPY yarn*.lock .

# Rodar comando yarn install para instalar bibliotecas
RUN npm install

# Copiar todas as outras pastas
COPY . .

# Definir porta
#EXPOSE 3000

# Rodar script yarn start
#CMD [ "yarn", "start" ]
CMD [ "node", "src/server.js" ]