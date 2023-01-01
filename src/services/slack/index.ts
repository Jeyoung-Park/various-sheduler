const Slack=require('slack-node')

const slack=new Slack();
slack.setWebhook(process.env.SLACK_WEBHOOK_UNIV);

export const sendSlackMessage=async (message:string)=>{
    slack.webhook({text:message}, (err: any, response: any)=>{
        console.log({response})
    })
}