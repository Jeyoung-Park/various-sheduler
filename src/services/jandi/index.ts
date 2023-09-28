import { Octokit } from "octokit";
import isToday from "date-fns/isToday";
import { USERS } from "../../../data";

// const { getUsers } = require("../../controllers/users");

export const checkJandi = async () => {
  const octokit = new Octokit();

  const result = await Promise.all(
    USERS.map((userItem: any) =>
      octokit
        .request("GET /users/{username}/events/public", {
          username: userItem.github_id,
          per_page: 1,
          page: 1,
        })
        .then((res) => {
          return {
            username:
              (userItem.name || userItem.github_id) ?? res.data[0]?.actor.login,
            isJandi: res.data[0]?.created_at
              ? isToday(new Date(res.data[0].created_at))
              : false,
          };
        })
    )
  );

  return result;
};
