import { ModelBase } from "./base/ModelBase";

export default interface User extends ModelBase {
    displayName: string
    picture: string
}