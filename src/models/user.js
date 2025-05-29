const validator = {
    phone: "^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$"
}

/**
 * 
 */
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
            //validator: validator.phone,
        },
        group: {
            type: 'list',
            important: true,
            multiply: true,
            ref: 'group'
        },
    },
    rules: {
        
    }
}

module.exports = user;