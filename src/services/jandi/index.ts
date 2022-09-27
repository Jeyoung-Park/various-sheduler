import { Octokit } from "octokit";
import isToday from "date-fns/isToday";

const USERNAME_LIST = [
  "Jeyoung-Park",
  "hyojunahn111",
  "Felix-Silas",
  "dayremain",
];
export const checkJandi = async () => {
  const octokit = new Octokit();

  const result = await Promise.all(
    USERNAME_LIST.map((nameItem) =>
      octokit
        .request("GET /users/{username}/events/public", {
          username: nameItem,
          per_page: 1,
          page: 1,
        })
        .then((res) => {
          return {
            username: res.data[0]?.actor.login ?? nameItem,
            isJandi: res.data[0]?.created_at
              ? isToday(new Date(res.data[0].created_at))
              : false,
          };
        })
    )
  );

  return result;
};
