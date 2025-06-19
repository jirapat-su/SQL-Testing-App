/* eslint-disable no-console */

import { Seed_User } from "./user"

function formatTime(ms: number): string {
  if (ms < 1000) return `${ms.toFixed(2)}ms`
  const seconds = ms / 1000
  return seconds < 60 ? `${seconds.toFixed(2)}s` : `${(seconds / 60).toFixed(2)}min`
}

async function runSeed() {
  const seeds: (() => Promise<void>)[] = [
    Seed_User
  ]

  const startTotal = performance.now()
  console.log(``)

  for (let i = 0; i < seeds.length; i++) {
    console.log(`[${i + 1}/${seeds.length}] Seeding ${seeds[i].name.replace('Seed_', '')}...`)

    await seeds[i]()

    console.log(`[${i + 1}/${seeds.length}] Seed ${seeds[i].name.replace('Seed_', '')} completed`)
    console.log(`[${i + 1}/${seeds.length}] Seed completed`)
    console.log(``)
  }

  const endTotal = performance.now()
  const totalDuration = endTotal - startTotal
  console.log(`Total seeding process completed in ${formatTime(totalDuration)}`)
}

runSeed()
  .then(() => {
    process.exit(0)
  })
  .catch((err) => {
    console.error('Error running seed:', err)
    process.exit(1)
  })
