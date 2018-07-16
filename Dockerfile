FROM node:10.2.1
COPY . /app
WORKDIR /app
RUN yarn --registry=https://registry.yarnpkg.com
EXPOSE 2333
