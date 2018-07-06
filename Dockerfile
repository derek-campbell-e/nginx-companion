FROM ubuntu:16.04

# install nodejs
RUN apt-get update \
    && apt-get install -y gnupg \
    && apt-get install -y curl \
    && apt-get -y autoclean
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash 
RUN apt-get install -y nodejs

# install letsencrypt
RUN apt-get update
RUN apt-get install -y software-properties-common
RUN add-apt-repository ppa:certbot/certbot
RUN apt-get update
RUN apt-get install -y python-certbot-nginx

# install nginx
RUN apt-get install -y nginx

# port exposure
EXPOSE 80
EXPOSE 443
EXPOSE 4284
EXPOSE 3000

# environment variables
ENV apiToken="api.ugenu.io|token"

COPY . /var/www/node
WORKDIR /var/www/node
RUN npm install

CMD ["node", "index.js"]