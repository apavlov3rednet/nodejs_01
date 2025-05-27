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
            validator: "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
        },
        phone: {
            type: 'string',
            important: false,
            validator: this.validator.phone,
        },
        workPhone: {
            type: 'string',
            important: false,
            validator: this.validator.phone,
        },
        group: {
            type: 'list',
            important: true,
            multiply: true,
            ref: 'group'
        },
    },
    rules: {
        
    },
    validator: {
        phone: '^(\+7|8){1,2}([0-9\ \-\(\)]){10,14}$'
    }
}

module.exports = user;