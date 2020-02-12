function checkInput(field, pattern) {
    return field.match(pattern) ? true : false;
}

function confirmPassword(form) {
    let data = form.serializeJSON()
    let fields = false
    if (data.password == data.confirmPassword) {
        fields = true
    }
    return fields
}

function checkForm(form) {
    let data = form.serializeJSON()
    let fields = false
    if (checkInput(data.name, "^[a-z A-Z]{4,30}$")) {
        if (checkInput(data.email, "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$")) {
            if (confirmPassword(form)) {
                fields = true
            }
        }
    }
    return fields;
}

export { checkForm, confirmPassword }