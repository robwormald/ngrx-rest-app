## Reactive RESTful Angular 2 application with ngrx store

A RESTful master-detail application built using Angular 2 and [ngrx store](https://github.com/ngrx/store).

### Getting Started

There are two main parts to this application. The first is the server which we are using `json-server` to simulate a REST api. The second part is the Angular 2 application which we will use `serve` to display.  

#### The Server

The first thing we need to do is clone the repo, install the dependencies and spin up the REST server.

```
$ git clone https://github.com/simpulton/ngrx-rest-app.git
$ cd nxrx-rest-app
$ npm install
$ npm run server
```

This will start `json-server` on port 3000 which we will use to consume in our client application.

#### The Client

We will spin up our client server in another terminal window with this command.

```
$ npm run client
```

And then navigate to `http://localhost:3001`
