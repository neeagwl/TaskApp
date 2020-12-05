const sgmail = require('@sendgrid/mail');

sgmail.setApiKey(process.env.SENDGRID_API_KEY);

const welcomeMail =(email,name)=>{
    sgmail.send({
        to:email,
        from:'agarwalneetu301@gmail.com',
        subject:"Welcome to MyCreations",
        text:`Thanks for joining our team, ${name}. We are glad that you find our community exciting.`
    }).then(()=>{
        console.log("Email sent.")
    }).catch((e)=>{
        console.log(e)
    })
}

const goodbyeMail = (email,name)=>{
    sgmail.send({
        to:email,
        from:'agarwalneetu301@gmail.com',
        subject:"We are Sorry!",
        text:"You left us devastated. We are very sorry to hear that you left our community, maybe there is something that we can do to improve ourself so that you never have to leave again."
    }).then(()=>{
        console.log("Email sent.")
    }).catch((e)=>{
        console.log(e)
    })
}

module.exports= {
    welcomeMail,
    goodbyeMail
}
