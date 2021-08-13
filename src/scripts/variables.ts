import * as core from "@actions/core";
import * as github from "@actions/github";

import kill from "./kill";
import extractArray from "./extractArray";


/**
 * Returns an array of user names.
 *
 * @param selected
 */
export const users = (selected: boolean|undefined = false): string[] => {

    const input_users = JSON.parse(core.getInput("users"));

    if (selected)
        return extractArray(input_users, count());
    else
        return input_users;
};


/**
 * Return the set number of assignees.
 */
export const count = (): number => {

    let count = Number(core.getInput("count"));

    if (count === 0)
        count = users().length;

    if (count > users().length)
        kill("The number of assignees is larger than the number of users specified.");

    return count;
};


/**
 * Return the GitHub token.
 */
export const token = (): string => {

    return core.getInput("token");
};


/**
 * Return the number of the pull request.
 */
export const pull_request = (): number => {

    const pull_request = github.context.payload.pull_request;

    if (pull_request === undefined) {
        kill("Unable to retrieve information about the pull request.");
        process.exit(1);
    }
    else
        return pull_request.number;
};