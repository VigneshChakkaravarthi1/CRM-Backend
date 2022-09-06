const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword=(hashPassword)=>{
    
    return new Promise(resolve=>{
        resolve(bcrypt.hashSync(hashPassword,saltRounds))
    })
}

const comparePassword =(plainPassword,passwordDb)=>{
    return new Promise((resolve,reject)=>{

        bcrypt.compare(plainPassword,passwordDb,function(error,result){
            if(error){reject(error)}
            resolve(result)
        })
    })

}

module.exports={hashPassword,comparePassword}