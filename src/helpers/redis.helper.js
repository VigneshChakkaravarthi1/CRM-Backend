const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);


client.on("error", function (error) {
  console.error(error);
});

const setJWT = async(key, value) => {
    if(!client.isOpen)
    {
        await client.connect()
    }
   try{
    return await client.set(key,value)

   }
   catch(error)
   {
    console.log(error)
    return error
   }
  
};

const getJWT = async(key) => {
    if(!client.isOpen)
    {
        await client.connect()
    }

    try{
        return await client.get(key)

    }
    catch(error)
    {
        console.log(error)
        return error
    }
   
   
 
};

const deleteJWT = async(key) => {
    if(!client.isopen)
    {
        client.connect()
    }
  try {
    client.del(key);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  setJWT,
  getJWT,
  deleteJWT,
};