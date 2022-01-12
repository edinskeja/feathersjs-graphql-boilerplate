import checkPermissions from "feathers-permissions";
import { authenticate } from "@feathersjs/authentication";
import { hooks } from "@feathersjs/authentication-local";
import { setField } from "feathers-authentication-hooks";
import { iff } from "feathers-hooks-common";

const restrict = [
  authenticate("jwt"),
  setField({
    from: "_id",
    as: "_id",
  }),
  // restrictToOwner({ ownerField: "_id" }),
];

module.exports = {
  before: {
    all: [],
    find: [
      authenticate("jwt"),
      checkPermissions({
        roles: ["super_admin", "admin"],
        field: "role",
        error: false,
      }),
      iff(
        (context) => !context.params.permitted,
        setField({
          from: "_id",
          as: "_id",
        }),
        (context) => {
          Promise.resolve(context);
        }
      ),
    ],
    get: [...restrict],
    create: [hooks.hashPassword("password")],
    update: [...restrict],
    patch: [...restrict],
    remove: [...restrict],
  },
  after: {
    all: [hooks.protect("password")],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
