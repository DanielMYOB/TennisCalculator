# Use an official Node.js runtime as a base image
FROM node:18.17.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
