FROM node:alpine

ADD ./docker_dev/app/ /siep-gw/
WORKDIR /siep-gw/
RUN npm install

RUN wget https://api.github.com/repos/MaTiUs77/node-http-proxy/commits/master && mv master master.json
RUN wget https://api.github.com/repos/MaTiUs77/node-http-proxy/commits/developer && mv developer developer.json

CMD ["npm","start"]
