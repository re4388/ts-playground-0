interface IMessageClient {
  sendMessage(channel: string, user: string, message: string): void;
}


class SlackClient {
  postMessageToUserInChannel(channel: string, user: string, message: string) {
    console.log(`Posting message to ${user} in ${channel} through Slack: ${message}`);
  }
}

class SlackAdapter implements IMessageClient {
  constructor(private slackClient: SlackClient) {}

  sendMessage(channel: string, user: string, message: string): void {
    this.slackClient.postMessageToUserInChannel(channel, user, message);
  }
}


class MSTeamsClient {
  postToChannel(channel: string, message: string) {
    console.log(`Posting message to ${channel} through MS Teams: ${message}`);
  }
}


class MSTeamsAdapter implements IMessageClient {
  constructor(private msTeamsClient: MSTeamsClient) {}

  sendMessage(channel: string, user: string, message: string): void {
    this.msTeamsClient.postToChannel(channel, `${message} (sent to ${user})`);
  }
}


const slackClient = new SlackClient();
const slackAdapter = new SlackAdapter(slackClient);

const msTeamsClient = new MSTeamsClient();
const msTeamsAdapter = new MSTeamsAdapter(msTeamsClient);

slackAdapter.sendMessage('general', 'alice', 'Hello, Alice!');
msTeamsAdapter.sendMessage('general', 'bob', 'Hello, Bob!');
