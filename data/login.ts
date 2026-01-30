export const LOGIN_CREDENTIALS = {
    INVALID_PASSWORD: {
        username: "locked_out_user",
        password: "hello_world"
    },

    VALID_CREDENTIALS: {
        username: process.env.TEST_USERNAME as string,
        password: process.env.TEST_PASSWORD as string
    }

}