# these are as layers of docker image and each layer got cached
FROM node:15
# create a working directory
WORKDIR /app
# copy packge.json to the working directory for installing packages
COPY package.json .
# install packages
RUN npm install

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi
        
# then copy other stuff
COPY . ./
ENV PORT 3000
EXPOSE $PORT
# command for run the container
CMD ["node", "index.js"]
