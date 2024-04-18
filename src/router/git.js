import { Octokit } from "@octokit/rest";
import fs from "fs";
const octokit = new Octokit({
  auth: "",
});

(async function test(params) {
  // let data = await octokit.request("GET /users/neel0402/repos", {
  //   username: "neel0402",
  //   headers: {
  //     "X-GitHub-Api-Version": "2022-11-28",
  //   },
  // });
  let data = await octokit.request("PUT /user/starred/neel0402/homepage", {
    owner: "OWNER",
    repo: "REPO",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  // let data2 = await octokit.request("GET /user/starred", {
  //   // username: "neel0402",
  //   headers: {
  //     "X-GitHub-Api-Version": "2022-11-28",
  //   },
  // });
  console.log("-----------  data2----------->", data);

  const jsonString = JSON.stringify(data, null, 2);

  const filePath = "./data.json";

  fs.writeFile(filePath, jsonString, (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log("JSON file created successfully!");
    }
  });
})();
