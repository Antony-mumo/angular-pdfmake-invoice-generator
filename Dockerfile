# Step 1: Build the Angular application
FROM node:14-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

EXPOSE 4200

CMD ["npm", "start"]

# Step 2: Serve the application with Nginx
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/angular-pdfmake-invoice /usr/share/nginx/html
