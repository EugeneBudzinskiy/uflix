# build environment
FROM node:18.1-alpine

WORKDIR /code
ENV PATH /code/node_modules/.bin:$PATH

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY public /code/public
COPY src /code/src

RUN npm run build

# install serve - deployment static server suggested by official create-react-app
RUN npm install -g serve

CMD serve -s build -l 3000
