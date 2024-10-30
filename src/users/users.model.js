import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    select: false,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next()

    const salt = await bcrypt.genSalt(10)

    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password)
  } catch (error) {
    throw new Error(error)
  }
}

const User = mongoose.model('User', userSchema)

export default User
