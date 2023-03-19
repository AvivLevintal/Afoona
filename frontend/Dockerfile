FROM nginx:latest
COPY ./build/ /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./ssl-bundle.crt /etc/ssl/certs/
COPY ./afoona.com_key.key /etc/ssl/private/
