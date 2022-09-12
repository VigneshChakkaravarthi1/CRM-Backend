const nodemailer= require("nodemailer")

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'ebba.kovacek92@ethereal.email',
        pass: 'we8Y8z2EH7d3cVDJyy'
    }
});
const send=async(info)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            

    let result = await transporter.sendMail(info);
   console.log("Message sent: %s", result.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
  
    resolve(result)
        }
        catch(error)
        {
            console.log(error)
            reject(error)
        }

    })
   

}
const emailProcessor=async(email,pin)=>{

    const info ={
        from: '"CRM Company" ebba.kovacek92@ethereal.email', // sender address
        to: email, // list of receivers
        subject: "Reset Pin", // Subject line
        text: "Here is your password reset pin"+pin+".This pin will expire in 1 day" ,
        html: `<p> Here is your pin : 
        <b>${pin}</b></p>`,
      }
return await send(info)

}

module.exports={emailProcessor}