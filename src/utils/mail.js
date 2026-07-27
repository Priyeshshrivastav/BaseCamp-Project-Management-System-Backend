const Mailgen = require("mailgen")
const mailgen=require("mailgen")
const nodemailer=require("nodemailer")

// sending an emails 
// methods

const sendEmail=async (options)=>{
   const mailgenerator=new Mailgen({
        theme:"default",
        product:{
            name:"Task Manager",
            link:"https://taskmanagerlink.com"
        }
    })


    // generate email
    const emailTextual=mailgenerator.generatePlaintext(options.mailgenContent)

    const emailHTML=mailgenerator.generate(options.mailgenContent)

    const transporter=nodemailer.createTransport({
        host:process.env.MAILTRAP_SMPT_HOST,
        port:process.env.MAILTRAP_SMPT_PORT,
        auth:{
            user:process.env.MAILTRAP_SMPT_USER,
            pass:process.env.MAILTRAP_SMPT_PASS
        }
    })


    const mail={
        from:"mail.taskmanager@example.com",
        to:options.email,
        subject:options.subject,
        text:emailTextual,
        html:emailHTML
    }

    try{
        await transporter.sendMail(mail)

    }catch(err){
        console.log("Email service failed siliently,",err)
    }
}

// generate the mail

// top part
const emailVerificationMailgenContent=(
    username,
    verificationUrl
) =>{
    return {
        body:{
            name:username,
            intro:"Welcome to our app! We are excited to have you on board ",
            action:{
                instructions:"To verify your email plese click on the following button",
                button:{
                    color:"#22BC66",
                    text:"Verify your email",
                    link:verificationUrl
                }
            },
            outro:"Need help, or have questions ? just reply to this email"
        }
    }
}


// buttom part

const forgotPasswordMailgenContent=(
    username,
    passwordResetUrl
) =>{
    return {
        body:{
            name:username,
            intro:"we got a request to reset the password of your account",
            action:{
                instructions:"To reset your password click on the following button or link",
                button:{
                    color:"#1a5d37",
                    text:"Reset Password",
                    link:passwordResetUrl
                }
            },
            outro:"Need help, or have questions ? just reply to this email"
        }
    }
}

// buttom part 


module.exports={emailVerificationMailgenContent,forgotPasswordMailgenContent,sendEmail}



