const wrapper = document.querySelector('account')
let form = {
    inputs: {
        username: document.querySelector('#username'),
        password: document.querySelector('#password'),
    },
    button: document.querySelector('#login'),
    labels: {
        user: document.querySelector('#user'),
        pass: document.querySelector('#pass')
    }
}

const users = [{ username: 'user', password: 'password' }]

function submit(form) {
    const info = {
        inputs: {
            username: form.inputs.username.value,
            password: form.inputs.password.value
        }
    }
    resetForm(form)
    return createUser(info)
}

function resetForm(form) {
    form.inputs.username.value = null
    form.inputs.password.value = null
}

function createUser(info) {
    return { username: info.inputs.username, password: info.inputs.password }
}

function failed(form, color = '#f87171') {
    // border
    form.inputs.username.style.borderColor = color
    form.inputs.password.style.borderColor = color
    // labels
    form.labels.user.style.color = color
    form.labels.pass.style.color = color
    // background
    form.button.style.backgroundColor = color
}

form.button.addEventListener('click', () => {
    socket.emit('login', submit(form))

    // console.log(users)
    // if (checkUser(submit(form), users)) {
    //     console.log('Logged in...')
    //     wrapper.style.display = 'none'
    // } else {
    //     console.log('Failed...')
    //     failed(form)
    // }
})