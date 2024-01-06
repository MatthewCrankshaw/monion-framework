# Monion API Migrations

## Introduction
We use [TypeORM](https://github.com/typeorm/typeorm) as our database ORM.

We configure migrations in the `migrate.ts` file within the root of the monion-api.

## Running Migrations
In the package.json we define the [TypeORM](https://github.com/typeorm/typeorm) commands these include `typeorm:up` and `typeorm:down`.

### Running Pending Migrations
You can run the following command from within the api root folder. If it is in your development environment you will need to run this within the docker container.

```npm run typeorm:up```

This will run all of the pending migrations by executing all of the `up` functions for pending migrations in this folder.

### Rolling Back Migrations
You can run the following command from within the api root folder. If it is in your development environment you will need to run this within the docker container.

```npm run typeorm:down```

This will run all of the pending migrations by executing all of the `down` functions for pending migrations in this folder.