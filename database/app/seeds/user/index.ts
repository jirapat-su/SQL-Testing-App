import { auth } from "@/src/libs/better-auth/auth";

const data = [
  {
    name: 'User Dev01',
    email: 'dev01@example.com',
    password: 'p@ssw0rd',
  },
    {
    name: 'User Dev02',
    email: 'dev02@example.com',
    password: 'p@ssw0rd',
  },
];

const Seed_User = async () => {
  for (let i = 0; i < data.length; i ++) {
    await auth.api.signUpEmail({ body: data[i] });
  }
};

export { Seed_User };
