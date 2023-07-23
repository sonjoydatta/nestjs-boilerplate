# NestJS API Boilerplate

This is a boilerplate for NestJS API. It is based on the [NestJS](https://nestjs.com/) framework. It is a TypeScript starter repository.

## Features

1. JWT Authentication library with access, refresh, confirmation, and reset tokens
   1. `Access tokens` are used to authenticate users
   2. `Refresh tokens` are used to refresh access tokens
   3. `Confirmation tokens` are used to confirm user email addresses
   4. `Reset tokens` are used to reset user passwords
2. Redis library with `ioredis` to store blacklisted tokens
3. Configured with `@nestjs/config` to load environment variables from `.env` files
4. Configured with `@nestjs/swagger` to generate Swagger documentation and Swagger example is documented with `Faker.js`
5. Configured with `@nestjs/mongoose` to connect to MongoDB
6. Configured with Docker and Docker Compose
7. Mailer library with `nodemailer` and `Handlebars` for templating

## Common Commands

| Command        | Description                          |
| -------------- | ------------------------------------ |
| yarn start:dev | Start the server in development mode |
| yarn build     | Build the app for production         |
| yarn start     | Start the app in production mode     |
| yarn lint      | Lint the code                        |
| yarn format    | Format the code                      |

## Environment Variables

There's a `.env.example` file in the `src/common/envs` directory. You can copy it to `.env`/`.env.development`/`.env.production` and set the values accordingly.

## Quick start

1. You'll need to have Node >= 18.16.1 and yarn >= 1.22.19 on your machine
2. Clone this repo using `git clone --depth=1 https://github.com/sonjoydatta/nestjs-boilerplate.git <YOUR_PROJECT_NAME>`
3. Enter to the project directory: `cd <YOUR_PROJECT_NAME>`
4. Run `yarn or npm install` in order to install dependencies
5. At this point you can run `yarn start:dev or npm run start:dev` to see the app at `http://localhost:4000`
6. You may need to a `.env` file. For development `.env.development`

## Docker

You can run the app with Docker and Docker Compose. There's a `docker-compose.yml` file in the root directory. You can run `docker-compose up` to start the app. You can also run `docker-compose up -d` to run the app in the background. You can run `docker-compose down` to stop the app.

## Swagger

You can access the Swagger UI at `http://localhost:{PORT}`. The default port is `4000`.

## Acknowledgements

- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [Swagger](https://swagger.io/)
- [Faker.js](https://fakerjs.dev)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [class-transformer](https://www.npmjs.com/package/class-transformer)
- [class-validator](https://www.npmjs.com/package/class-validator)
- [Nodemailer](https://nodemailer.com/about/)
- [Handlebars](https://handlebarsjs.com/)
- [JWT](https://jwt.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## License

This code is available under the MIT license. See the [LICENSE](LICENSE.md) file for more info.
