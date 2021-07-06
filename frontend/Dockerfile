# Imagem de base - ultima versao do node
FROM node:alpine

RUN mkdir -p /usr/app/node_modules

# Configurando diretorio base do projeto no container
WORKDIR /usr/app

# Copiar todos os arquivo package.json e yarn.lock
COPY package*.json ./
COPY yarn*.lock ./
# COPY .env.example .env

# Rodar comando yarn install para instalar bibliotecas
RUN yarn install

# Copiar todas as outras pastas
COPY . .

# Definir porta
EXPOSE 3000

# Rodar comando para inicializar projeto React
CMD yarn start