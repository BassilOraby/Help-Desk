import mongoose from "mongoose"

const dataSchema = mongoose.Schema
({
    userName: String,
    email: String,
    passwordHash: String,
    schoolName: String,
    mobileNumber: String,
    birthDate: String,
    resetToken: String,
    expireToken: Date
})

export default mongoose.model('membersInfo', dataSchema)