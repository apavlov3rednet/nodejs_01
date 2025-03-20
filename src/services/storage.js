const fs = require('fs').promises; // Файловая система на обещаниях
const path = require('path'); // Управление директориями сервера
const { v4: uuidv4 } = require('uuid');; // GUID генерация уникального имени
const CustomArray = require('./array.js');

class Storage {
  //private, protected, public

  #name = "";
  #type = "";
  #dir = "/src/storage/";
  #content = "";

  constructor(dir) {
    let newName = uuidv4(dir);

    if (dir != "") this.#dir = this.#dir + dir + "/"; // src/storage/users/
  }

  prepareFilePath(fileName) {
    //process.cwd() - получить директорию проекта
    return path.join(process.cwd(), this.#dir, fileName + '.json');
  }

  writeToFile(nameFile, jsonContent) {
    fs.writeFile(nameFile, jsonContent, (err) => {
        if (err) {
          console.error("Ошибка при создании и записи в JSON файл:", err);
          return false;
        } else {
          console.log("JSON файл успешно создан и записан.");
          return nameFile;
        }
    });
  }

  createFile(fileName, content) {
    if (!fileName || !content) return false;

    const nameFile = this.prepareFilePath(fileName);
    const jsonContent = JSON.stringify(content);
    // a:{s: {}, d: {}} || a:{login: 'name', password: '}
    return this.writeToFile(nameFile, jsonContent);
  }

  //Ищем файл на сервере
  async findFile(fileName) {
    const nameFile = this.prepareFilePath(fileName);
    const result = await fs.open(nameFile, "r");
    return result;
  }

  async readFile(fileName) {
    const filePath = this.prepareFilePath(fileName);
    const data = await fs.readFile(filePath, 'utf8');
    return data; 
  }

  getAllFiles() {
    //Читаем содержимое директории
    const directoryPath = process.cwd() + this.#dir;
    let dataResult = {};

    fs.readdir(directoryPath, (err, files) => {
      if (err) {
          return console.error('Не удалось прочитать директорию:', err);
      }

      // Перебор каждого файла в директории
      files.forEach(async (file, index) => {
        const filePath = path.join(directoryPath, file);

        dataResult[index] = await this.readFile(filePath);
      });
    });

    return dataResult;
  }

  async updateFile(fileName, content) {
    const filePath = this.prepareFilePath(fileName);
    //1. Найти есть ли такой файл
    if(this.findFile(filePath)) {
        //2. Считать содержимое файла
        let oldContent = await this.readFile(filePath); //array
        //3. Обновить содержимое файла с обновлением
        let newContent = CustomArray.array_merge(oldContent, content);
        return this.writeToFile(filePath, newContent);
    }
    else {
        console.error('Файла не существует');
        return false;
    }
  }

  deleteFile(fileName) {
    const filePath = this.prepareFilePath(fileName);
    return fs.unlink(filePath);
  }
}


module.exports = Storage;