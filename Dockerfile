#
# BUILD
#
FROM node:23-alpine3.20 AS build

# create directory app as root user 
# change ownership to user "node" (predifined in "node:alpine" image)
RUN mkdir /app && chown -R node:node /app
WORKDIR /app

# do the rest as user "node"
USER node

# install dependencies
COPY --chown=node:node package.json package-lock.json* ./
RUN npm ci && npm cache clean --force

# copy source code
COPY --chown=node:node . .

# DISABLE_ESLINT_PLUGIN=true: compile despite eslint warnings
RUN DISABLE_ESLINT_PLUGIN=true \
    npm run build


#
# RUN SERVER
#
FROM nginx:1.27.3-alpine3.20

# necessary to display the image on Github
LABEL org.opencontainers.image.source="https://github.com/molinfo-vienna/nerdd-frontend"

# copy the built React app to Nginx's web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]