# NestJS Application

This is a NestJS application setup for deployment.

## Getting Started

First, install the dependencies:

```
npm install
```

## Running the app

```
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Deployment

This application is setup for deployment using Docker. Build the Docker image using the following command:

```
docker build -t nestjs-app .
```

Then, run the Docker container:

```
docker run -p 3000:3000 nestjs-app
```

## Environment Variables

The application uses environment variables for configuration. These are defined in the `.env` file.

## Database

The application uses TypeORM for database interactions. The configuration for TypeORM is in the `ormconfig.json` file.

## Authentication

The application uses JWT for authentication. The `AuthService` handles the authentication logic.

## Contributing

Please read through our contributing guidelines. Included are directions for opening issues, coding standards, and notes on development.

## Versioning

We use Git for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Your Name** - *Initial work* - [YourName](https://github.com/yourname)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc