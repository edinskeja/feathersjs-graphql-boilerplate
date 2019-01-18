import auth from "@feathersjs/authentication";
import {
  restrictToOwner,
  associateCurrentUser
} from "feathers-authentication-hooks";

const restrict = [
  auth.hooks.authenticate("jwt"),
  restrictToOwner({ ownerField: "userId" })
];

module.exports = {
  before: {
    all: [],
    find: [...restrict],
    get: [],
    create: [auth.hooks.authenticate("jwt"), associateCurrentUser()],
    update: [...restrict],
    patch: [...restrict],
    remove: [...restrict]
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
