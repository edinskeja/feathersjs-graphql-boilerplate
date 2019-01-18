// A hook that logs service method before, after and error
// See https://github.com/winstonjs/winston for documentation
// about the logger.
import logger from "../logger";

// To see more detailed messages, uncomment the following line:
// logger.level = "debug";

module.exports = () => {
  return hook => {
    let message = `${hook.type}: ${hook.path} - Method: ${hook.method}`;

    if (hook.type === "error") {
      message += `: ${hook.error.message}`;
    }

    logger.info(message);
    logger.debug("hook.data", hook.data);
    logger.debug("hook.params", hook.params);

    if (hook.result) {
      logger.debug("hook.result", hook.result);
    }

    if (hook.error) {
      logger.error(hook.error);
    }
  };
};
