#
# BUILD
#
FROM node:25.6.0-bullseye-slim AS build

# create app directory
WORKDIR /app
RUN chown node:node /app

# switch to non-root user
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
FROM alpine:3.19

# install nginx and brotli module
RUN apk add --no-cache brotli nginx nginx-mod-http-brotli

# necessary to display the image on Github
LABEL org.opencontainers.image.source="https://github.com/molinfo-vienna/nerdd-frontend"

# copy the built React app to Nginx's web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]