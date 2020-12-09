import User from './User';
import { ModelBase } from "./base/ModelBase";
import Message from "./Message";

export default interface Room extends ModelBase {
    name: string
    messages: Message[]
    members: User[]
}