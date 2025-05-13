const Storage = require("../../services/storage.js");

/**
 * Класс работы с хранилищем пользователя
 */
class Data {
  constructor(headers) {
    this.obStorage = new Storage("project");
  }

  async getByFileName(name) {
    let content = JSON.parse(await this.obStorage.readFile(name));
    return JSON.stringify(content);
  }

  async setProject(arData) {
    console.log(arData);
    let nameFile = arData.name;
    let issetFile = await this.obStorage.findFile(nameFile);

    if (issetFile) {
      return await this.obStorage.updateFile(nameFile, arData);
    } else {
      return this.obStorage.createFile(nameFile, arData);
    }
  }

  async dropProject(arData) {
    if (!this.access.checkPublicKey) return;

    this.obStorage.deleteFile(arData);
  }
}

module.exports = Data;
