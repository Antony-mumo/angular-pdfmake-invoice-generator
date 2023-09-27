# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Build the Angular app for production
RUN yarn build

# Expose the port the app runs on
EXPOSE 80

# Define the command to run the Angular app
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "80"]
