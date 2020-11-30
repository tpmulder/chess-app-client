import { ModelBase } from "./base/ModelBase";

export default interface Message extends ModelBase {
    text: string
    senderId: string
    sentOn: Date
}