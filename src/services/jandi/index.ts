import { Octokit } from "octokit";
import isToday from "date-fns/isToday";

const { getUsers } = require("../../services/users");

export const checkJandi = async () => {
  const octokit = new Octokit();

  const users = await getUsers();

  const result = await Promise.all(
    users.map((userItem: any) =>
      octokit
        .request("GET /users/{username}/events/public", {
          username: userItem.github_id,
          per_page: 1,
          page: 1,
        })
        .then((res) => {
          return {
            username:
              res.data[0]?.actor.login ?? (userItem.name || userItem.github_id),
            isJandi: res.data[0]?.created_at
              ? isToday(new Date(res.data[0].created_at))
              : false,
          };
        })
    )
  );

  return result;
};
