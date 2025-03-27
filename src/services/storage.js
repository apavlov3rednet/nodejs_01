const fs = require('fs').promises; // Файловая система на обещаниях
const path = require('path'); // Управление директориями сервера
const {createHash} = require('node:crypto');
const CustomArray = require('./array.js');

class Storage {
  //private, protected, public

  #name = "";
  #type = "";
  #dir = "/src/storage/";
  #content = "";

  constructor(dir) {
    this.obSave = dir;
    if (dir != "") this.#dir = this.#dir + dir + "/"; // src/storage/users/
  }

  prepareFilePath(fileName) {
    const hash = createHash('md5');
    hash.update(fileName + 'solt');
    let newFileName = hash.digest('hex');

    return path.join(process.cwd(), this.#dir, newFileName + '.json');
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

  #protectContent(content) {
    const hash = createHash('sha256');

    let simbols = content.split();
    let newPass = '';
    simbols.forEach(item => {
      newPass += item + 'solt';
    });

    hash.update(newPass);
    let newPassword = hash.digest('hex');

    return newPassword;
  }

  createFile(fileName, content) {
    if (!fileName || !content) return false;

    const nameFile = this.prepareFilePath(fileName);

    if(this.obSave === 'user') {
      content.password = this.#protectContent(content.password);
    }

    const jsonContent = JSON.stringify(content);
    // a:{s: {}, d: {}} || a:{login: 'name', password: '}
    return this.writeToFile(nameFile, jsonContent);
  }

  //Ищем файл на сервере
  async findFile(fileName) {
    try{
      const filePath = this.prepareFilePath(fileName);
      await fs.readFile(filePath, 'utf8');
      return true;
    }
    catch(E) {
      return false;
    }
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