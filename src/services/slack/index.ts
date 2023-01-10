const Slack = require("slack-node");

const slack = new Slack();
slack.setWebhook(
  process.env.NODE_ENV === "production"
    ? process.env.SLACK_WEBHOOK_UNIV
    : process.env.SLACK_WEBHOOK_UNIV_DEV
);

export const sendSlackMessage = async (message: string) => {
  slack.webhook({ text: message }, (err: any, response: any) => {});
};
