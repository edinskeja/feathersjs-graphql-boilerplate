import auth from "@feathersjs/authentication";
import { restrictToOwner } from "feathers-authentication-hooks";
import checkPermissions from "feathers-permissions";
import { iff } from "feathers-hooks-common";

import local from "@feathersjs/authentication-local";

const restrict = [
  auth.hooks.authenticate(["jwt"]),
  restrictToOwner({ ownerField: "_id" })
];

module.exports = {
  before: {
    all: [],
    find: [
      auth.hooks.authenticate("jwt"),
      checkPermissions({
        roles: ["super_admin", "admin"],
        field: "role",
        error: false
      }),
      iff(
        context => !context.params.permitted,
        restrictToOwner({ ownerField: "_id" }),
        context => {
          Promise.resolve(context);
        }
      )
    ],
    get: [...restrict],
    create: [local.hooks.hashPassword()],
    update: [...restrict],
    patch: [...restrict],
    remove: [...restrict]
  },
  after: {
    all: [local.hooks.protect("password")],
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
