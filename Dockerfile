#Imagen base 
FROM node:18 AS build 

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install 

COPY . . 
RUN npm run build 

#Imagen Nginx para servir la app
FROM nginx:alpine 
COPY --from=build /app/dist/app-alianza/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]