# FROM -> Build this image from the specified image
FROM node:18-alpine
 
# WORKDIR -> Sets the working directory for all following commands
WORKDIR /app

# COPY -> Copies files or directories and add them to the filesystem of the container at the path <dest>. While RUN is executed in the container, Copy is executed on the host.
COPY package.json /app/

# RUN -> will execute any command in a shell inside the container environment
RUN ["npm", "install"]

# This will copy the entire directory into the container at the application location with the slash at the end. The trailing slash means that if "app" does not exist in the container yet, then create it.
COPY . /app/

RUN ["npm", "run", "build"]

EXPOSE 3000

# The instruction that is to be executed when a Docker container starts. There can only be one "CMD" instruction in a Dockerfile.
CMD ["npm", "start"]

