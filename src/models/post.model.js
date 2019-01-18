import NeDB from "nedb";
import path from "path";

module.exports = app => {
  const dbPath = app.get("nedb");
  const Model = new NeDB({
    filename: path.join(dbPath, "post.db"),
    autoload: true
  });

  return Model;
};
