import User from './users.model.js'

const users = [
  {
    username: 'dbot',
    password: 'youandmeforever'
  }
]

export const seedUsers = async () => {
  try {
    await User.deleteMany({}) // Optional: clear the collection before seeding

    await User.insertMany(users)

    console.log(users)
    console.log('Users seeded successfully')
  } catch (error) {
    console.error('Error seeding users:', error)
  }
}
