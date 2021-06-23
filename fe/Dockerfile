FROM node:12

## install simple http server for serving static content
#RUN npm install -g http-server

ENV src_path /usr/src
ENV app_path $src_path/file-upload

RUN npm install -g http-server


# make the 'app' folder the current working directory
WORKDIR $app_path

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

## copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . $app_path

## build app for production with minification
#RUN npm run build
RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]