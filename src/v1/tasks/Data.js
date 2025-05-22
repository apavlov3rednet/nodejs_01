const Storage = require("../../services/storage.js");
const Model = require('../../models/task.js');

/**
 * Класс работы с хранилищем пользователя
 */
class Data {
  constructor(headers) {
    this.obStorage = new Storage("task");
  }

  async getByFileName(name) {
    let content = JSON.parse(await this.obStorage.readFile(name));
    return JSON.stringify(content);
  }

  async setTask(arData) {
    let nameFile = arData.name;
    let issetFile = await this.obStorage.findFile(nameFile);

    if (issetFile) {
      return await this.obStorage.updateFile(nameFile, arData);
    } else {
      return this.obStorage.createFile(nameFile, arData);
    }
  }

  async dropTask(arData) {
    if (!this.access.checkPublicKey) return;

    this.obStorage.deleteFile(arData);
  }
}

module.exports = Data;
