const user = {
    fields: {
        _id: {
            type: 'string', // тип данных
            important: true, //важность
            system: true // системная переменная, которую не может менять юзер
        },
        login: {
            type: 'string',
            important: true,
        },
        password: {
            type: 'string',
            important: true,
        },
        email: {
            type: 'string',
            important: true,
            validator: '^d*$',
        },
        group: {
            type: 'list',
            important: true,
            multiply: true,
            list: '{$ref: Group}'
        },
    },
    rules: {
        
    }
}

module.exports = user;