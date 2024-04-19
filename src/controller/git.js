import { modals } from "../models/index.js";
import { config } from "../config.js";
import { asyncHandler } from "../handler/asyncHandler.js";
import { ErrorGenerator } from "../generator/errorGenerator.js";
import { handleResponse } from "../handler/responseHandler.js";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: config.GIT_AUTH_KEY,
});

export const getStaredRepo = async (userName) => {
  let data = await octokit.request(`GET /users/${userName}/starred`, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  let array = data?.data?.map?.((e) => e?.id);
  return array;
};

export const verifyGitUserName = async (userName) => {
  try {
    let data = await octokit.request(`GET /users/${userName}`, {
      username: "USERNAME",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    if (!data) return false;
    return data;
  } catch (error) {
    return false;
  }
};

export const getStaredRepoApi = asyncHandler(async (req, res) => {
  let data = await octokit.request("GET /users/uv199/starred", {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  handleResponse(data?.data, res, "Get user successfully");
});

export const getUserRepository = asyncHandler(async (req, res) => {
  let username = req?.params.userName;
  const user = await verifyGitUserName(username);
  let data = await octokit.request(`GET /users/${username}/repos`, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
      Accept: "application/vnd.github.v3+json",
    },
  });
  if (data.data.length > 0)
    data.data.sort((a, b) => b.watchers_count - a.watchers_count);
  handleResponse(
    { user: user?.data, data: data.data },
    res,
    "Get user successfully"
  );
});

export const getSearchListRepository = asyncHandler(async (req, res) => {
  let input = req.query.search;

  let data = await octokit.request(`GET /search/users?q=${input}`, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  let nameArr = data?.data?.items.map((e) => e?.login);

  handleResponse(nameArr, res, "Get user successfully");
});

export const starRepository = asyncHandler(async (req, res) => {
  let { owner, repoName, isRemove } = req.body;

  const method = isRemove ? "DELETE" : "PUT";

  let data = await octokit.request(
    `${method} /user/starred/${owner}/${repoName}`,
    {
      owner: "OWNER",
      repo: "REPO",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
  const staredRepo = await getStaredRepo(req?.me?.gitUserName);

  handleResponse({ data, staredRepo }, res, "Task did successfully");
});
