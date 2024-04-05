import { db } from './../src/libs/prisma'

export async function seed() {
  await db.event.create({
    data: {
      id: 'clulzplzp000008la7jbqcwk6',
      title: 'NlW Squad X',
      slug: 'nlw-squad-x',
      details: 'Um evento de tecnologia',
      maximumAttendees: 220,
    },
  })
}

seed().then(() => {
  console.log('Seed criada com successo')
  db.$disconnect()
})
