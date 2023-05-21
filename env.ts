import * as dotenv from "dotenv";
dotenv.config();

function validate(m: string | undefined) {
    if (typeof m === "undefined") throw new Error("env vars validation error");
    return m;
}

export const ENV = {
    CLIENT_ID: validate(process.env.CLIENT_ID),
    TOKEN: validate(process.env.TOKEN),
} as const;
