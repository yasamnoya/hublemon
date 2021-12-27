<div align="center">
  <br>
  <a href="https://where-to-drink.app.jnyiunn.com/"><img src="https://i.imgur.com/Ewncc2Q.gif?raw=true" alt="Hub 檸檬" width="540"></a>
</div>

<h1 align="center">
  <a href="https://hublemon.app.jnyiunn.com/">Hub 檸檬</a>
</h1>

<h4 align="center">一次看完好檸檬在 Wiwi.video | Odysee | Youtube 的留言！</h4>

<p align="center">
  <a href="https://hublemon.app.jnyiunn.com/"><img src="https://img.shields.io/badge/Deployed%20On-AWS-yellow"></a>
</p>


# Tech Used

## Backend

- [Express](https://expressjs.com/) - web framework for Node.js
- [Axios](https://www.axios.com/) - fetching data from video platforms
- [Redis](https://redis.io/) - key-value database for caching

## Frontend

- [Vue](https://vuejs.org/) -  frontend framework
- [Vue router](https://router.vuejs.org/) - the official router for Vue.js
- [Axios](https://www.axios.com/) - handling ajax requests
- [Moment](https://momentjs.com/) - processing date & time

## Deployment

- [Amazon EC2](https://aws.amazon.com/ec2/) - hosting both frontend & backend of the application
- [Docker](https://www.docker.com/) - containerizing the services
- [Docker Compose](https://docs.docker.com/compose/) - managing the containers
- [NGINX](https://www.nginx.com/) - web server as a reverse proxy

## Setup

### For Development Purpose

#### Requirements

- [Node.js](https://nodejs.org/)
- [Redis](https://redis.io/)

#### Steps

1. Clone this repository.
2. Install the dependencies of both api and client( `npm install` in the directories).
3. Create the files for enviroment variables:
  - api: create `.env` under `api/`, sample as below:
    ```env
    BACKEND_PORT=3000
    YOUTUBE_KEY=<your_youtube_api_key> # get it from youtube developer console
    REDIS_URL=redis://localhost
    REDIS_EXPIRE_TIME=300 # in seconds
    ```
  - frontend: create `.env.local` under `client/`, sample as below:
    ```env
    VUE_APP_BACKEND_URL=http://localhost:3000/ # which points to your dev api
    ```
4. Start the api server by `npm run dev` under `api/`.
5. Start the client server by `npm run serve` under `clinet/`.
6. Goto `localhost:8080` to get access to the client.

### For Production

#### Requirements

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

#### Steps

1. Clone this repository.
2. Create `.env` under the root directory, sample as below:
  ```env
  BACKEND_PORT=3000 # this will be exposed to host
  YOUTUBE_KEY=<your_youtube_api_key> # get it from youtube developer console
  REDIS_URL='redis://redis' # don't modify this due to the name service declared in `docker-compose.yml`
  REDIS_EXPIRE_TIME=600 # in seconds

  FRONTEND_PORT=80 # this will be exposed to host
  VUE_APP_BACKEND_URL=http://your.domain/api:$BACKEND_PORT/ # this should be public accessible
  ```
3. Start the server by `docker-compose --env-file .env up`.
4. Goto `http://your.domain:80` to get access to the client.

# License

GNU General Public License v3.0

