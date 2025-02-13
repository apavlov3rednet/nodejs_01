import { Storage } from "../../services/storage.js";

export class Base {
    name = '';
    rules = {};

    constructor() {}

    checkRules() {
        return true;
    }

    setRules(rules) 
    {
        this.rules = rules;
    }

    save() {
        //сохраним настройки группы в наше хранилище
        /**
         * 1. group если отсутствует то создать ее
         * 2. group:name.json - создать если отсутствует
         * 3. Записать в него настройки 
         * 4. Закрыть файл
         */
        let el = new Storage(this.name, 'write', this.rules);
        el.save();
    }

    getGroup() {
        /**
         * 1. искать файл в папке /group/group:name.json
         * 2. читаем его содержимое
         * 3. проверяем права checkRules(type)
         */
    }
}