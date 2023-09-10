#=======================
# build ganache
# base: ubuntu:22.04
# user：root
# workspace：/root
#=======================

FROM node:18.17.1-buster-slim
USER root
WORKDIR /root

#=======================
# Install ganache
#=======================
RUN npm install ganache --global

ENV NVM_DIR="$HOME/.nvm"

EXPOSE 8545

ENTRYPOINT ["ganache","--server.host=0.0.0.0","--server.port=8545","--server.ws=true"]