import {google} from "googleapis"
import config from "config"

const OAuth2=google.auth.OAuth2;
const id=config.get("googleId") as string;
const secret=config.get("googleSecret") as string;

const myOAuth2Client=new OAuth2(id,secret);
export default myOAuth2Client;