FROM node:14 as build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm config set https-proxy http://192.168.43.74:51515
RUN npm config set proxy http://192.168.43.74:51515
RUN npm run build

FROM nginx:1.15
# Copiar la configuracion del nginx
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
## Remover el index.html predefinido
RUN rm -rf /usr/share/nginx/html/*
## Copiar el sitio web exportado
COPY --from=build /app/out/ /usr/share/nginx/html
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]