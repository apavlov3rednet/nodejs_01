const fs = require('fs').promises;
const path = require('path');
const CustomArray = require('./array.js');

class Storage {
  //private, protected, public

  #name = "";
  #type = "";
  #dir = "/src/storage/";
  #content = "";

  constructor(dir) {
    if (dir != "") this.#dir = this.#dir + dir + "/"; // src/storage/users/
  }

  prepareFilePath(fileName) {
    //process.cwd() - получить директорию проекта
    return process.cwd() + this.#dir + fileName + '.json';
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
  findFile(fileName) {
    fs.access(
        fileName, 
        fs.constants.F_OK, 
        (err) => {
            if (err) {
                return false;
            } else {
                return true;
            }
        }
    );
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

  updateFile(fileName, content) {
    const filePath = this.prepareFilePath(fileName);
    //1. Найти есть ли такой файл
    if(this.findFile(filePath)) {
        //2. Считать содержимое файла
        let oldContent = this.readFile(filePath); //array
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
    const filePath = this.#dir + fileName + '.json';
    fs.unlink(filePath);
    return true;
  }
}


module.exports = Storage;