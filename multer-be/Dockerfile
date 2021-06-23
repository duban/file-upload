FROM node:12

## install simple http server for serving static content
#RUN npm install -g http-server

ENV src_path /usr/src
ENV app_path $src_path/multer-be

# make the 'app' folder the current working directory
WORKDIR $app_path

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

COPY ./node_modules ./node_modules
#COPY . .

# install project dependencies
#RUN npm install

## copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . $app_path


EXPOSE 5000
CMD [ "npm", "start" ]