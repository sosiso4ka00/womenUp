const { Schema, Types, model } = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    name: String,
    password: String
});

userSchema.pre('save', async function(next){
    if(this.isModified('password') || this.isNew()){
        this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(+process.env.SALT_ROUNDS))
    }

    next()
})

userSchema.methods = {
    async comparePassword(password){
        return bcrypt.compare(password, this.password)
    }
}


module.exports.User = model('User', userSchema)

