export class Message{
    sender: string;
    receiver: string;
    messageContent: string;
    timestamp: number;

    constructor(sender: string, receiver: string, messageContent: string, timestamp: number){
        this.sender = sender;
        this.receiver = receiver;
        this.messageContent = messageContent;
        this.timestamp = timestamp;
    }
}