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


const token = core.getInput("token");
const input_user = core.getInput("user");
const users = JSON.parse(input_user);

Promise.all(users.map(async user => {
    return await check(user, token);
})).then(() => {
    core.info("All specified users can be assigned.");

    const user = users[Math.floor(Math.random() * users.length)];

    const octokit = github.getOctokit(token);

    const { pull_request } = github.context.payload;

    if (pull_request === undefined) {
        core.setFailed("Unable to retrieve information about the pull request.");
        process.exit(1);
    }

    octokit.rest.issues.addAssignees({
        ...github.context.repo,
        issue_number: pull_request.number,
        assignees: [user]
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