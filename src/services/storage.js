import fs from 'node:fs';

export class Storage {
    //private, protected, public

    #name = '';
    #type = '';
    #dir = '/src/storage/';
    #content = '';

    constructor(name, type = 'read',  content = '', dir = '') {
        this.#name = name + '.json';
        this.#type = type;

        if(dir != '')
            this.#dir = this.#dir + dir;

        this.#content = content;
    }

    save() {
        
    }
}