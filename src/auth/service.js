const { User } = require("../entites/user")
const jsonwebtoken = require('jsonwebtoken');

module.exports.register = async (req, res) => {
    const { name, password } = req.body

    let user = await User.findOne({ name })
    if (user) return res.status(400).json({ error: "name taken" })

    user = await User.create({ name, password })

    const token = await createJWT(user.id)

    res.json({
        token
    })

}

module.exports.login = async (req, res) => {
    const {name, password} = req.body

    let user = await User.findOne({name})
    if(!user) return res.status(400).json({error: "invalid name"})

    if(!await user.comparePassword(password)) return res.status(400).json({error: 'invalid password'})

    const token = await createJWT(user._id)

    res.json({
        user: {
            name: user.name,
            id: user._id
        },
        token
    })
}


async function createJWT(id) {
    return jsonwebtoken.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}
