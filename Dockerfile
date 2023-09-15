# these are as layers of docker image and each layer got cached
FROM node:15
# create a working directory
WORKDIR /app
# copy packge.json to the working directory for installing packages
COPY package.json .
# install packages
RUN npm install
# then copy other stuff
COPY . ./
ENV PORT 3000
EXPOSE $PORT
# command for run the container
CMD ["npm", "run", "dev"]
