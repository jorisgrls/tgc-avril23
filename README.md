# The good corner

A "Craigslist"-like app.

## Features

[![USE CASE](https://i.imgur.com/XODtq5W.png)](https://i.imgur.com/XODtq5W.png)

## Demo

[![DEMO](https://cdn.loom.com/sessions/thumbnails/215b1a87ffcc4d428f8214d41ad3556f-with-play.gif)](https://www.loom.com/share/215b1a87ffcc4d428f8214d41ad3556f)

## Stack

[![STACK](https://i.imgur.com/EiyYixC.png)](https://i.imgur.com/EiyYixC.png)

## DB

[![MCD](https://i.imgur.com/9jN0lAp.png)](https://i.imgur.com/9jN0lAp.png)
[![MLD](https://i.imgur.com/ZaDTKNi.png)](https://i.imgur.com/ZaDTKNi.png)
[![MPD](https://i.imgur.com/EsaNI6K.png)](https://i.imgur.com/EsaNI6K.png)

# Setup

## Environement variables

```
cd frontend # (do the same with backend and e2e-tests folders after copying .env like below)
cp .env.example .env
```

And then change variables inside `.env` to match your own environment.
If you ever want to add an environment variable, please add it to `.env.example`.

# Getting started

[Install Docker](https://www.docker.com/products/docker-desktop/) and then :

```sh
npm run dev
```

# First deploy on a Ubuntu 22.04 VPS

## 1. get a VPS and link a domain name to your VPS' IP

### 1.1 VPS

Buy or rent a VPS on Ubuntu 22.04. Here's a few options :

- [Contabo](https://contabo.com/en/vps/cloud-vps-1/?image=ubuntu.323&qty=1&contract=1&storage-type=vps1-100-gb-nvme)
- [OVH](<https://www.ovh.com/fr/order/vps/?v=3&_gl=1*dbt12s*_gcl_aw*R0NMLjE3MDkzMDA5MjguQ2p3S0NBaUFsb2F2QmhCT0Vpd0FidEFKTzV3Um1rS1p3anZfSXF1ZlBxanVOQk1yZzBsWGpQRTRlSnJHLXlnX1VmSHdmWnBhNkd2RmxSb0NTRFlRQXZEX0J3RQ..*_gcl_au*MTQ2NzQyNTYxNi4xNzA5MzAwODk3#/vps/build?selection=~(range~'VLE-2~pricingMode~'default~flavor~'vps-le-2-2-40~os~'ubuntu_22_04~datacenters~(GRA~1)~duration~'P1M)>)

### 1.2 Domain

If you don't have a domain name yet, here's [a free DNS provider](https://www.duckdns.org)

[![DNS](https://i.imgur.com/0eGZOai.png)](https://i.imgur.com/0eGZOai.png)

## 2. ssh into your VPS from your machine

Check your inbox and retrieve the SSH credentials to connect to your VPS.

```sh
ssh user@domain.duckdns.com
```

## 3. Install git

Once you have a SSH prompt on your VPS :

```sh
sudo apt install git-all -y
```

## 4. Clone the repo and cd into it

```sh
mkdir apps && cd apps && git clone https://github.com/ComicScrip/tgc-avril23.git && cd tgc-avril23
```

## 5. Install Docker

```sh
sh scripts/install_docker.sh
```

## 6. Configure environment variables

### 6.1 Backend

```sh
cd backend && cp .env.exmaple .env && nano .env
```

Change the JWT secret and adjust other environment variables, then save and close the file.

### 6.2 Backend

```sh
cd frontend && cp .env.exmaple .env && nano .env
```

Adjust environment variables, then save and close the file.

## 7. Start the whole app

```sh
npm run start:prod
```

## 8. Init the DB

sh into the backend container, run the resetDB script and exit :

```sh
docker exec -it tgc-avril23-backend-1 sh
```

(once in the container :)

```sh
/app # NODE_ENV=development npm run resetDB
/app # exit
```

## 9. Install Caddy

```sh
sh scripts/install_caddy.sh
```

## 10. Configure Caddy

```sh
sudo nano /etc/caddy/Caddyfile
```

Like so:

```txt
# frontend
domain.duckdns.org {
    reverse_proxy localhost:3000
}

# backend
api.domain.duckdns.org {
    reverse_proxy localhost:4001
}
```

Once the config saved, reload Caddy :

```sh
systemctl reload caddy
```

Test that everything works by going to https://domain.duckdns.com.
You're done !
