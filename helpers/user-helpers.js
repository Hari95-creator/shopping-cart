var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcrypt')


module.exports={
        
        doSignup:(userData)=>{

            return new Promise(async (resolve,rreject)=>{

                userData.password= await bcrypt.hash(userData.password,10)
                db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                    resolve(data.ops[0])
                })

            })

          

        },
        doLogin:(userData)=>{
            return new Promise(async(resolve,reject)=>{
                let loginstatus=false
                let response={}
                let user=await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
                if(user)
                {
                    bcrypt.compare(userData.password,user.password).then((status)=>{
                            if(status)
                            {
                                console.log("login success")
                            }
                            else
                            {
                                console.log("login failed")
                            }
                    })
                }
                else
                {
                    console.log("user not in database")
                }
            })
        }

}