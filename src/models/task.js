const task = {
    fields: {
        _id: {
            type: 'string', // тип данных
            important: true, //важность
            system: true // системная переменная, которую не может менять юзер
        },
        project: {
            type: 'linkId',
            important: true,
            ref: 'project'
        },
        name: {
            type: 'string',
            important: true,
        },
        description: {
            type: 'text',
            important: false,
        },
        dateCreate: {
            type: 'datetime',
            important: false,
            auto: true,
        },
        dateDeadline: {
            type: 'datetime',
            important: true,
        },
        employee: {
            type: 'linkId',
            important: true,
            ref: 'user',
        },
        producer: {
            type: 'linkId',
            important: true,
            ref: 'user',
        },
        files: {
            type: 'file',
            maxSize: 4,
            important: false,
            ext: 'jpg, png, jpeg, webp, gif, pdf, doc*, xls*'
        },
        status: {
            type: 'list',
            default: '0',
            list: [
                'Новая',
                'В работе',
                'На проверке',
                'Выполнена'
            ],
            important: true
        }
    }
}

module.exports = task;