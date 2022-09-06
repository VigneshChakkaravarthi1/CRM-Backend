const redis=require("redis")
const client=redis.createClient();


const setJWT=(key,value)=>
{
    const client=redis.createClient();
    console.log(client.isOpen);
}

const getJWT= (key)=>{

    return new Promise((resolve,reject)=>{

        try{
            client.get(key,function(error,response){
                if(error){reject(error)}
                resolve(response)
    
            })

        }
       catch (error)
       {
        console.log(error)
        reject(error)
       }

    })
   
    
}
module.exports={setJWT,getJWT}