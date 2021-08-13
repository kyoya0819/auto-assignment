import * as core from "@actions/core";
import * as github from "@actions/github";


/**
 * Function to check if a user can be assigned.
 *
 * @param user
 * @param token
 */
const check = async (user: string, token: string) => {

    const octokit = github.getOctokit(token);

    return octokit.rest.issues.checkUserCanBeAssigned({
        ...github.context.repo,
        assignee: user,
    });
};


/**
 * Create a new array by extracting a specific number of arrays.
 *
 * @param array
 * @param num
 */
const extractArray = (array: string[], num: number) => {
    const newArray: string[] = [];

    while (newArray.length < num && 0 < array.length) {
        const rand = Math.floor(Math.random() * array.length);
        newArray.push(array[rand]);
        array.splice(rand, 1);
    }

    return newArray;
};


const token = core.getInput("token");
const input_users = JSON.parse(core.getInput("users"));
let count = Number(core.getInput("count"));

if (count === 0)
    count = input_users.length;

if (count > input_users.length) {

    core.setFailed("The number of assignees is larger than the number of users specified.");
    process.exit(1);
}

Promise.all(input_users.map(async user => {
    return await check(user, token);
})).then(() => {
    core.info("All specified users can be assigned.");

    const users = extractArray(input_users, count);

    const octokit = github.getOctokit(token);

    const { pull_request } = github.context.payload;

    if (pull_request === undefined) {
        core.setFailed("Unable to retrieve information about the pull request.");
        process.exit(1);
    }

    octokit.rest.issues.addAssignees({
        ...github.context.repo,
        issue_number: pull_request.number,
        assignees: users
    }).then(() => {

        core.info("Complete This Action ✨");
        process.exit(0);
    }).catch(() => {

        core.setFailed("Cannot be assigned.");
        process.exit(1);
    });

}).catch((data) => {

    const user = data.response.url.match(/[^/]*?$/)[0];
    core.setFailed(`"${ user }" cannot be assigned.`);
});