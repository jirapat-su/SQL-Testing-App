import { auth } from '@/src/libs/better-auth/auth'

const data = [
  {
    email: 'dev01@example.com',
    name: 'User Dev01',
    password: 'p@ssw0rd',
  },
  {
    email: 'dev02@example.com',
    name: 'User Dev02',
    password: 'p@ssw0rd',
  },
]

async function Seed_User() {
  for (let i = 0; i < data.length; i++) {
    await auth.api.signUpEmail({ body: data[i] })
  }
}

export { Seed_User }
