import { authenticate } from "@feathersjs/authentication";
import { setField } from "feathers-authentication-hooks";

const restrict = [
  authenticate("jwt"),
  setField({
    from: "params.userId",
    as: "userId",
  }),
  // restrictToOwner({ ownerField: "userId" }),
];

module.exports = {
  before: {
    all: [],
    find: [...restrict],
    get: [],
    create: [
      authenticate("jwt"),
      setField({
        from: "params.userId",
        as: "userId",
      }),
    ],
    update: [...restrict],
    patch: [...restrict],
    remove: [...restrict],
  },
  after: {
    all: [],
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
