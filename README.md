# iEARN tinklapis

Meant for the "iearn Žiežmariai" club.

---

## Requirements

For development, you will need:

1. **Node.js** and a node global package, Yarn, installed in your environement.
2. **Postgres** database.
3. **Redis** for storing string based keyed data (cookies)

# Node setup

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

###

### Yarn installation

After installing node, this project will need yarn too, so just run the following command.

```bash
$ npm install -g yarn
```

# Database setup

For now the project is using postgres 13.

- Download and install from [HERE](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
- After logging in create database of name "iearn"

# Redis setup

Redis is a light and fast caching system. This project is uing it to send and retrieve cookies.

- Download and install for Windows [HERE](https://github.com/microsoftarchive/redis/releases)
- Download and install for linux [HERE](https://redis.io/download)
- Start the redis server from the binary file:

      $ redis-server

# Project Installation and launch

```bash
$ git clone https://github.com/Justas-Kaulakis/iearn-app.git
```

- ### Configure env variables based on .example files
  - In server/.env  
    And in web/.env.local
  - Set **NODE_ENV** to "production" or "develoment" accordingly. Default is "development".

## Server

```bash
$ cd iearn-app/server
$ yarn install
```

- ### development

      $ yarn watch
      $ yarn dev

- ### production

      $ yarn build
      $ yarn start

## Web

```bash
$ cd iearn-app/web
$ yarn install
```

- ### development

      $ yarn dev

- ### production

        $ yarn build
        $ yarn start

  more info for Next.js [Here](web/README.md)

---

## Authors:

- ### Justas Kaulakis
- ### Gytis Kaulakis
- ### Lukas Lančinskas
