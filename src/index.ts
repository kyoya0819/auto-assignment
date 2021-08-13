import * as core from "@actions/core";
import * as github from "@actions/github";

import check from "./scripts/check";
import kill from "./scripts/kill";
import { users, token, pull_request } from "./scripts/variables";


Promise.all(users().map(async user => {
    return await check(user, token());
})).then(() => {
    core.info("All specified users can be assigned.");

    github.getOctokit(token()).rest.issues.addAssignees({
        ...github.context.repo,
        issue_number: pull_request(),
        assignees: users(true)
    }).then(() => {

        core.info("Complete This Action ✨");
        process.exit(0);
    }).catch(() => {

        kill("Cannot be assigned.");
    });

}).catch((data) => {

    const user = data.response.url.match(/[^/]*?$/)[0];
    kill(`"${ user }" cannot be assigned.`);
});