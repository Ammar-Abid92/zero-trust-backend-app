export const users = {
  admin: {
    password: process.env.ADMIN_PASSWORD,
    role: "admin",
  },
  user: {
    password: process.env.USER_PASSWORD,
    role: "user",
  },
};
