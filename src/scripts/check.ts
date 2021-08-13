import * as github from "@actions/github";
import { OctokitResponse } from "@octokit/types";

/**
 * Function to check if a user can be assigned.
 *
 * @param user
 * @param token
 */
const check = async (user: string, token: string): Promise<OctokitResponse<never, 204>> => {

    const octokit = github.getOctokit(token);

    return octokit.rest.issues.checkUserCanBeAssigned({
        ...github.context.repo,
        assignee: user,
    });
};
export default check;