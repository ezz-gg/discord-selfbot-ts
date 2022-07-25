import * as dotenv from 'dotenv';
import * as path from "path";

dotenv.config({path: path.join(__dirname, '../.env')});

export const Token: string = process.env.TOKEN;
export const Prefix: string = process.env.PREFIX || "sb.";
export const Ownerid = process.env.OWNERID;
export const Only_guild = process.env.ONLYGUILD;
export const LavalinkHost: string = process.env.LAVALINKHOST;
export const LavalinkPassword: string = process.env.LAVALINKPASSWORD;
export const Climode = process.env.CLIMODE || false;