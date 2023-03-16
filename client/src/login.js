const wrapper = document.querySelector('account')
const h1 = document.querySelector('h1')
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

function failed(form, header, text, color = '#f87171') {
    // border
    form.inputs.username.style.borderColor = color
    form.inputs.password.style.borderColor = color
    // labels
    form.labels.user.style.color = color
    form.labels.pass.style.color = color
    // background
    form.button.style.backgroundColor = color
    // text
    header.innerText = `${text} - Failed`
}

form.button.addEventListener('click', () => {
    user = submit(form)
    socket.emit('login', user)
})