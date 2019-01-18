import path from "path";
import favicon from "serve-favicon";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

import feathers from "@feathersjs/feathers";
import configuration from "@feathersjs/configuration";
import express from "@feathersjs/express";
import socketio from "@feathersjs/socketio";

import logger from "./logger";
import middleware from "./middleware";
import services from "./services";
import appHooks from "./app.hooks";
import channels from "./channels";
import authentication from "./authentication";

const app = express(feathers());

app.configure(configuration());

app.use(cors("*"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(helmet());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get("public"), "favicon.ico")));
app.use("/", express.static(app.get("public")));

app.configure(express.rest());
app.configure(socketio());
app.configure(authentication);
app.configure(services);
app.configure(channels);
app.configure(middleware);

app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
