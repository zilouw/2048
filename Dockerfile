# base image
FROM node

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package.json /app/package.json
COPY . .
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
RUN npm run build 
RUN npm install -g serve



# # start app
CMD ["serve", "-s", "build"]
