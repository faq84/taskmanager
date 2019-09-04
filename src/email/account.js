const sgMail = require('@sendgrid/mail')
//const sendGridAPIKey = 

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//     to:'faizanaqeel@gmail.com',
//     from:'faizanaqeel@developer.io',
//     subject:'1st Test email using SendGrid',
//     text:'This is a test message to validate the email functonality'
// })

const sendWelcomeEmail = (email, name)=>{
    console.log(process.env.SENDGRID_API_KEY)
    sgMail.send({
    to:email,
    from:'faizanaqeel@developer.io',
    subject:'Welcome Email',
    text: `Thank you for Joining the community, ${name}. Do report back any issues that you face on the same email. Cheers!`
})
}

const sendDeleteTokenEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'faizanaqeel@developer.io',
        subject:'Token Delete Confirmation!',
        text: `Dear ${name}, Your Token associated with your account has been removed from our DB on your Request!`
    })
}

const sendTaskCreationEmail = (email, name, taskName)=>{
    sgMail.send({
        to:email,
        from:'faizanaqeel@developer.io',
        subject:'Task Creation Confirmation!',
        text: `Dear ${name}, Your Task, ${taskName}, has been created successfully on your Request!`
    })
}

const userDeletionEmail = (email, name)=>{
    sgMail.send({
        to:email,
        from:'faizanaqeel@developer.io',
        subject:'Sorry to see you Going!',
        text: `Dear ${name}, your account has been deleted with us, we are sad to see you go! incase you change your mind you can simply register again!`
    })
}

const userLoginEmail = (email, name)=>{
    sgMail.send({
        to:email,
        from:'faizanaqeel@developer.io',
        subject:'Succesfully Logged into Account',
        text: `Dear ${name}, you have successfully logged into your account!`
    })
}

const userUpdateEmail = (email, user,field)=>{
    sgMail.send({
        to:email,
        from:'faizanaqeel@developer.io',
        subject:'User Updated',
        text: `Dear ${name}, Your Token associated with your account has been removed from our DB on your Request!`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendDeleteTokenEmail,
    sendTaskCreationEmail,
    userDeletionEmail,
    userUpdateEmail,
    userLoginEmail
}