# Cokoa

## Overview

Node.js backend project created in order to generate a script to fill a data base in postgreSQL based on a csv "Denver Crime Data"
downloaded from (https://www.kaggle.com/paultimothymooney/denver-crime-data/downloads/denver-crime-data.zip/20)

# Quick Start Guide

### Prerequisites

In order to use Cokoa, you must have the following installed:

- [Node.js](https://nodejs.org/)
- [NPM](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

### Installation & Startup

To install Cokoa, simply enter the below in the terminal window:

```bash
$ git clone https://iamjinme@bitbucket.org/iamjinme/rappi-cokoa.git your-project
```

To install the dependencies, enter the following in your terminal:

```
$ cd your-project
$ npm install
```

This will install the Cokoa components into the `csv-script-bd-creator-denver-crimes` directory.

### Local Environment Variables for windows

Exist a file named `env.bat` in the server directory. This file should contain:

```
PORT=9001
APP_HOST=csv-script-bd-creator-denver-crimes
GELF_VERSION=1.1
LOGGLY_TOKEN=secret-loggly-token
LOGGLY_SUBDOMAIN=your-loggly-subdomain
```

### Local Environment Variables for linux

Exist a file named `.env` in the server directory. This file should contain:

```
PORT=9001
APP_HOST=csv-script-bd-creator-denver-crimes
GELF_VERSION=1.1
LOGGLY_TOKEN=secret-loggly-token
LOGGLY_SUBDOMAIN=your-loggly-subdomain
```

### Starting the App

To start the app, make sure you're in the project directory and type `npm start` into the terminal. This will start the Node server and connect to MongoDB.

You should the following messages within the terminal window:

```
> node src/server.js

info: SERVER_LISTENING {"port":your-port,"version":"1.1","host":microservices-name,"timestamp":your-timestamp}
```

Next, open your browser and enter `http://localhost:your-port/`. Congrats, you're up and running!

To run test `npm run test`.
To run test coverage `npm run coverage`.

Enjoy!

# Best Practices

## Validate incoming request in routes

We use routes to receive request and controllers separated to manage bussiness logic. According to this [post](https://medium.com/@kamerk22/the-smart-way-to-handle-request-validation-in-laravel-5e8886279271) looks like a excellent idea validate data in routes, NOT in controllers.

>> There’s nothing wrong with validating incoming request in the controller but it’s not the best way to do this and your controller looks messy. This is bad practice in my opinion. The controller should do only one thing handle request from the route and return an appropriate response.

Writing validation logic in the controller will break The **Single Responsibility Principle**. 

## GELF Payload Specification

[Graylog](https://www.graylog.org/) is an open source software to management logging, they have an interesting [specification](http://docs.graylog.org/en/3.0/pages/gelf.html) named GELF used to send logs to any server. You can read more about it in this [post](https://jpetazzo.github.io/2017/01/20/docker-logging-gelf/).

## Logging levels

It's project use six levels in logs according to specification [RFC5424](https://tools.ietf.org/html/rfc5424). We use [Winston](https://github.com/winstonjs/winston) library to transport logs to console, file or management log service as [Loggly](https://www.loggly.com/). In this [post](https://stackify.com/winston-logging-tutorial/) there are **logging best practices** to work with this library. READ this and remember: **Build logs for machines, not humans.**

## ECMAScript 6 (ES6)

**It's 2019!** It's time to forget to use Babel or any transpilate utility. This [post](http://2ality.com/2015/02/es6-classes-final.html) cover final semantics to create **Classes** with Javascript, our models use it. Arrow functions, default parameters, templates, const and let instead var, new array functions (map, filter, etc), destructuring, promises with async/await are important in our code, you can read about these [here](https://www.lifewire.com/best-javascript-es6-features-4579821). To use **ES6** implied better performance and a code more clean.

## Airbnb JavaScript Style Guide

ESLint is good, with **Airbnb rules** is better. Airbnb startup has been created many rules compiled in a [style guide](https://github.com/airbnb/javascript) to create a clean and understandable code with Javascript/Node.js, these rules could be customized, but Airbnb experience let us a good base to work in the same way when programming between our squad. **Please follow** this style guide. *FYI Airbnb has rules to React, Ruby and other tools/language.*

## NOTES

- This is a (WIP) Work In Progress. Many things can be improved. You can collaborate.
- It's use a powerful logger named Winston with transport to console, file and loggly (optional).
- It's use koa-combine-routers to combine any routers in an index.
- The project use postgresql drivers because is the main database used in the company.
- It's use CORS implementation. For now didn't use Import/Export.
- We try run coverage at least 95%, by now using mocha and chai. Testing with Ava?
- It's project use lightweight and minimal libraries.

## Contributing

This could be an open-source project, and contributions are always welcome!

## TODO

- Create documentation with [JSdocs](http://usejsdoc.org/).
- Upload to Bitbucket. Coming soon.
- Change some CommonJS minimal implementations.
- Add and check some validations of business logic and possible bugs.
- Any idea to add quality and performance to application?

## Time of development
*26 hrs 42 mins* and counting...

## Author

This project is cloned by the next author who wrote the project boilerplate

* [**Jinme Mirabal**](https://rappiplus.slack.com/messages/DKADP79HB) - *All the work including docs, a lot of work* - [Portfolio in Codepen.io](https://codepen.io/mirabalj/pens/popular/)

## License

GPL License. [Click here for more information.](LICENSE)