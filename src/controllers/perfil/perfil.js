const Users = require('../../models/users')
const mongoose = require('mongoose');

module.exports = {
    async indexProfile(req, res){
        const {user_id:_id} = req.headers
        let validId = mongoose.Types.ObjectId.isValid(_id)

        if (validId){
            const asProfile = await Users.findOne({_id}).select('+password') 
            res.json(asProfile)  
        } else {
            res.json({
                'code':404,
                'msg': 'Ops, this id is not valid.'
            })
        }
    } 
}