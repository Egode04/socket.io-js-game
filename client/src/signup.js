const h2 = document.querySelector('h2')
let sign = {
    inputs: {
        username: document.querySelector('.username'),
        password: document.querySelector('.password'),
    },
    button: document.querySelector('#signup'),
    labels: {
        user: document.querySelector('.user'),
        pass: document.querySelector('.pass')
    }
}

function signUser(user, users) {
    if (user.username && user.password) {
        for (let obj of users) {
            if (obj.username === user.username || !user.password) {
                return false
            }
        } return true
    } return
}

function succeded(form, header, text = 'Sign Up', color = '#14b8a6') {
    // border
    form.inputs.username.style.borderColor = color
    form.inputs.password.style.borderColor = color
    // labels
    form.labels.user.style.color = color
    form.labels.pass.style.color = color
    // background
    form.button.style.backgroundColor = color
    // text
    header.innerText = `${text} - Succeded`
}

sign.button.addEventListener('click', () => {
    socket.emit('signup', submit(sign))
})