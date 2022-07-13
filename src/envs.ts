import * as dotenv from 'dotenv';
import * as path from "path";

dotenv.config({path: path.join(__dirname, '../.env')});

export const Token: string = process.env.TOKEN;
export const Prefix: string = process.env.PREFIX || "sb.";
export const Ownerid = process.env.OWNERID;
export const LavalinkHost: string = process.env.LAVALINKHOST;
export const LavalinkPassword: string = process.env.LAVALINKPASSWORD;
export const Climode = process.env.CLIMODE || false;
export const Hardyuyuurl: string = process.env.HARDYUYUURL;
export const kyoueioshirasefuckurl: string = process.env.KYOUEIOSHIRASEFUCKURL;
export const kyoueizatudanfuckurl: string = process.env.KYOUEIZATUDANFUCKURL;
export const rengooshirasefuckurl: string = process.env.RENGOOSHIRASEFUCKURL;
export const rengozatudanfuckurl: string = process.env.RENGOZATUDANFUCKURL;
export const kyoueioshirasehimituurl: string = process.env.KYOUEIOSHIRASEHIMITUURL;
export const kyoueizatudanhimituurl: string = process.env.KYOUEIZATUDANHIMITUURL;
export const rengozatudanhimituurl: string = process.env.RENGOZATUDANHIMITUURL;
export const rengooshirasehimituurl: string = process.env.RENGOOSHIRASEHIMITUURL;