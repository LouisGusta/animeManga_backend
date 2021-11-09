const Users = require('../../models/users')

module.exports = {
    async login(req, res){
        const { login, password } = dbUsers = req.body

        const asUsername = await Users.findOne({ username: login})
        const asEmail = await Users.findOne({ email: login})

        if (asUsername || asEmail){
            const asUser = await Users.findOne({username: login, password}).select('-password') 

            if (asUser){
                res.status(201).send(asUser._id)
            } else {
                return res.json({'err': 'Senha incorreta'})
            }
        } else if (!asUsername) {
            return res.json({'err': 'Usuário ou email não encontrado'})
        }
    },

    async register(req, res) {   
        const { username, email} = dbUsers = req.body

        const asUsername = await Users.findOne({username})
        const asEmail = await Users.findOne({email})

        if (asUsername){
            return res.json({'err': 'Usuário já cadastrado.'})
        }
        if (asEmail){
            return res.json({'err': 'Email já cadastrado.'})
        }

        if(!asUsername && !asEmail) {
            Users.create(dbUsers, async (err, data)=>{
                if (err){ 
                    res.status(500).send(err)
                } else {
                    res.status(201).send(data._id)
                }
            })
        }
    }
} 