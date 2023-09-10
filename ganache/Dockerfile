#=======================
# build ganache
# base: ubuntu:22.04
# user：root
# workspace：/root
#=======================

FROM ubuntu:22.04
USER root
WORKDIR /root
ENV DEBIAN_FRONTEND=noninteractive

#=======================
# install apt
#=======================
RUN apt update && apt upgrade -y \
               && apt install -y wget curl tini git git-lfs \
               && apt autoclean -y \
               && apt autoremove -y \
               && rm -rf /var/lib/apt/lists/*

#=======================
# Install nvm
#=======================
RUN curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash && \
    export NVM_DIR="$HOME/.nvm" && \
    [ -s "$NVM_DIR/nvm.sh" ] && \
    \. "$NVM_DIR/nvm.sh" && \
    [ -s "$NVM_DIR/bash_completion" ] && \
    \. "$NVM_DIR/bash_completion" && \
    nvm install 18 && \
    npm install ganache --global

ENV NVM_DIR="$HOME/.nvm"

#=======================
# Set ssh for root login
#=======================
RUN touch /entrypoint.sh && chmod +x /entrypoint.sh && \
                            echo "#!/usr/bin/env bash" >> /entrypoint.sh && \
                            echo "git lfs install" >> /entrypoint.sh && \
                            echo "ganache" >> /entrypoint.sh && \
                            echo "if [ \$# -eq 0 ]; then" >> /entrypoint.sh && \
                            echo "  echo \"No command, running /bin/bash as default.\"" >> /entrypoint.sh && \
                            echo "  /bin/bash" >> /entrypoint.sh && \
                            echo "else" >> /entrypoint.sh && \
                            echo "  \"\$@\"" >> /entrypoint.sh && \
                            echo "fi" >> /entrypoint.sh

EXPOSE 8545

ENTRYPOINT ["/usr/bin/tini", "--", "/entrypoint.sh"]