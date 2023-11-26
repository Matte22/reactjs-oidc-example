# Step 1: Build the React application
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the local code to the container
COPY . ./

# Build the React app
RUN npm run build

# Step 2: Serve the React application using an Nginx web server
FROM nginx:stable-alpine

# Copy the build folder from step 1
COPY --from=build /app/build /usr/share/nginx/html

# Copy the nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
