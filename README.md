# iEARN Žiežmariai tinklapis Ⓒ 2021

Meant for the "iearn Žiežmariai" club.

Šis tinklapis nuvo sukurtas tinklalapių kūrimo mokinimosi tikslais, siekiant padaryti brandos darbą 11-12 klasėse. Taigi šisprojektas turėjo gana daug drąstiškų, keistų, per daug komplikuotų sprendimų vien dėl to, nes tuo metu atrodė super duper kietai ir efektyvu - lyg ši svetainė turės tūkstančius vartotojų kiekvieną dieną...  
Taigi šią sveitainę per naują galimą padaryti naudojant per pus mažiau kodo ir kodas būtų daug labiau suprantamas, kadangi pagrindis šio projekto priešas yra - **GraphQL**. Buvo galima daryti paprast1 REST api, tačiau ne - pasirinkau patį pirmą YT pasitaikusį tutoria su daugiausiai peržiūrų ir iš jo viską mokinausi. Tokių video paskirtis yra - surinkti kuo daugiau peržiūrų naudojant naujas ir įmantrias technologjas - kurios greitai gali pasenti (kaip graphql).

Taigi, kas norės pasileisti šį projektą - sėkmės!

---

## Requirements

For development, you will need:

1. **Node.js** and a node global package, Yarn, installed in your environement.
2. **MySQL** database.
3. **Redis** for storing string based keyed data (cookies)

# Node setup

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  For Node you will need a version ^12.0.0, so intstall it via this curl command:
  
  ```shell
  curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```

### Yarn installation

After installing node, this project will need yarn too, so just run the following command.

```console
sudo npm install -g yarn
```

# Database setup

The project is using MySQL.

- Download and install from [HERE](https://dev.mysql.com/downloads/mysql/)
- After logging in create database of name "iearn"

# Redis setup

Redis is a light and fast caching system. This project is uing it to send and retrieve cookies.

- Download and install for Windows [HERE](https://github.com/microsoftarchive/redis/releases)
- Download and install for linux [HERE](https://redis.io/download)
- Start the redis server from the binary file:

  ```bash
  
  redis-server
  ```

# Project Installation and launch

```bash
git clone https://github.com/Justas-Kaulakis/iearn-app.git
```

- ## Configure env variables based on .example files

  - In server/.env  
    And in web/.env.local
  - Set **NODE_ENV** to "production" or "develoment" accordingly. Default is "development".

## Server

```bash
cd iearn-app/server
yarn install
```

- ### development
  Automatically watch for each change in the src folder and recompile typesript to the "dist/" folder:

  ```bash
  yarn watch
  ```

  If you havent yet ran any migrations, then so far there are no tables created for the "iearn" database. To create them from the migration files int the src code do:

  ```bash
  yarn run:mig
  ```

  To revert the last migration do:

  ```bash
  yarn rev:mig
  ```

  Then run the server:

  ```bash
  yarn dev
  ```

- ### production
  Compile Typescript to Javascript in the "dist/" folder:

  ```bash
  yarn build
  ```

   If you havent yet ran any migrations, then so far there are no tables created for the "iearn" database. To create them from the migration files int the src code do:

  ```bash
  yarn run:mig
  ```

  To revert the last migration do:

  ```bash
  yarn rev:mig
  ```

  Run the server:

  ```bash
  yarn start
  ```

  More info on the migration commands [HERE](https://typeorm.io/#/migrations).


## Web

```bash
cd iearn-app/web
yarn install
```

- ### development

  ```bash
  yarn dev
  ```

- ### production

  ```bash
  yarn build
  yarn start
  ```

  more info for Next.js [HERE](web/README.md)

---

## Authors

 ### [<span style="display: flex; align-items: center;"><img style="border-radius: 50%" height="50" src="https://avatars.githubusercontent.com/u/63920269?v=4">&nbsp;&nbsp;Justas Kaulakis</span>](https://github.com/Justas-Kaulakis)
 ### [<span style="display: flex; align-items: center;"><img style="border-radius: 50%" height="50" src="https://avatars.githubusercontent.com/u/42701017?v=4">&nbsp;&nbsp;Gytis Kaulakis</span>](https://github.com/GytisKau)
