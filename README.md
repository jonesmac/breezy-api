# Breezy-API

This application is meant for demonstration purposes only.  It's designed to show a functioning user authentication system, basic restful API, database setup via docker.

# Usage
Breezy-API is a restful api that allows users to authenticate and save their favorite locations via label and zipcode.

# Environment Setup
The `.env.local` file has all the environment variables needed to run the application locally.  In order to start the application, the following tasks should be done in the following order:

* Copy .env.local to .env
* In a standalone shell, `docker-compose up` to start the mariadb container with a default database.
* In a standalone shell, `yarn` to install packages
* `yarn migrate` to setup the db schema
* `yarn seed` to seed the database
* `yarn start` to launch to api

# Notable Packages Used
* [Sequelize](https://sequelize.org) - ORM for database transactions
* [SequelizeCLI](https://github.com/sequelize/cli) - database migrations and seeding
* [ExpressJS](https://expressjs.com) - web framework for handling api calls
* [PassportJS](http://www.passportjs.org/) - authentication for users
* [ApolloServer](https://www.apollographql.com/docs/apollo-server/) - apollo server to handle graphql queries

# GraphQL Notes
* Playground accessible at `http://localhost:3000/graphql`
* In the `Http Headers` section, update header with a valid session key that can be derived from the cookie generated when a valid login is generated (i.e. via postman)

# Helpful Resources
* [Node Best Practices](https://github.com/goldbergyoni/nodebestpractices)