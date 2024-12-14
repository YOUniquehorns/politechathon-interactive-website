# pull official base image
FROM node:23-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install serve -g

# add build folder
COPY build ./build

EXPOSE 3000

# start app
# Set the default command to run when a container starts
CMD [ "serve", "-s", "build", "-l", "3000" ]
