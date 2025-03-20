import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { username } from "better-auth/plugins";

const prisma = new PrismaClient();
export const auth = betterAuth({
    plugins:
        [
            username({
                minUsernameLength: 5,
                maxUsernameLength: 20,
                usernameValidator: (username) => {
                    if (username === "admin") {
                        return false
                    }

                    // Usernames must be alphanumeric and can contain underscores
                    const regex = /^[a-zA-Z0-9_]+$/;
                    if (!regex.test(username)) {
                        return false
                    }

                    // Usernames must not contain spaces
                    if (/\s/.test(username)) {
                        return false
                    }

                    return true
                }
            })
        ]
    ,
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
});