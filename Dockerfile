FROM node:17

# Sets the Working Directory as "/server"
WORKDIR /server

RUN apt-get update && apt-get -y install cron && apt-get -y install nano-tiny && apt-get -y install curl
COPY crontab_command  /etc/cron.d/crontab_command
RUN chmod 0644 /etc/cron.d/crontab_command
RUN crontab /etc/cron.d/crontab_command
RUN touch /var/log/cron.log
CMD ["cron", "-f"]

# Copies the package.json file into "/server" and runs npm i
COPY package.json /server
RUN npm i
# Copies the entire source code into "/server"
COPY ./backend/ /server
COPY ./package-lock.json /server
COPY ./package.json /server
COPY ./.env /server/.env

# Specifies the port the node app will be running on
EXPOSE 5000

# Runs "node server.js" after the above step is completed
CMD ["node", "server.js"]