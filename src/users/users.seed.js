import User from './users.model.js'

const user = {
  username: 'dbot',
  password: 'youandmeforever'
}

export const seedUsers = async () => {
  try {
    await User.deleteMany({}) // Optional: clear the collection before seeding

    await new User(user).save()

    console.log(user)
    console.log('Users seeded successfully')
  } catch (error) {
    console.error('Error seeding users:', error)
  }
}
