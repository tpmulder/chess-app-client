import { ModelBase } from "./base/ModelBase";

export default interface User extends ModelBase {
    email: string
    picture: string
    displayName: string
    rating: string
}