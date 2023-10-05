FROM node:latest as build-step
WORKDIR /usr/src/client
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest
COPY --from=build-step /usr/src/client/build /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# FROM node:latest as build-step
# WORKDIR /usr/client
# RUN npm install --global pm2
# COPY package*.json ./
# RUN npm install --production

# COPY . .

# RUN npm run build

# EXPOSE 3000

# USER node

# CMD [ "pm2-runtime", "npm", "--", "start" ]

# FROM nginx:latest
# COPY --from=build-step /usr/src/client/.next /usr/share/nginx/html
# COPY ./default.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
