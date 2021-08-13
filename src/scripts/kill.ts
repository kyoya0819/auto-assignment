import * as core from "@actions/core";

/**
 * Kill Process with message.
 *
 * @param message
 */
const kill = (message: string): never => {

    core.setFailed(message);
    process.exit(1);
};
export default kill;