<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A URL shortener service built with NestJS</p>

## Description

This project is a URL shortener service built using the [Nest](https://github.com/nestjs/nest) framework. It allows users to create shortened versions of long URLs, making them easier to share and manage.

## Features

- Shorten long URLs to compact, easy-to-share links
- Redirect users from shortened links to original URLs
- Track click statistics for shortened links
- User authentication and management
- API for programmatic access to URL shortening services

## Project setup

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## API Documentation

Once the application is running, you can access the Swagger API documentation at `http://localhost:3000/api`.

## Compodoc Documentation

You can also generate API documentation using [Compodoc](https://compodoc.app/).

## Environment Variables

Make sure to set up the following environment variables:

- `DATABASE_URL`: Connection string for your database

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Stay in touch

- Author - [Your Name]
- Website - [Your Website]
- Twitter - [@YourTwitterHandle]

## License

This project is [MIT licensed](LICENSE).
