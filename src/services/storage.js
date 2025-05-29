const fs = require("fs").promises; // Файловая система на обещаниях
const path = require("path"); // Управление директориями сервера
const { createHash } = require("node:crypto");
const CustomArray = require("./array.js");

class Storage {
  //private, protected, public

  #name = "";
  #type = "";
  #dir = "/src/storage/";
  #content = "";

  constructor(dir) {
    this.obSave = dir;
    this.currentName = '';
    if (dir != "") this.#dir = this.#dir + dir + "/"; // src/storage/users/
  }

  prepareFilePath(fileName) {
    const hash = createHash("md5");
    hash.update(fileName + "solt");
    let newFileName = hash.digest("hex");
    this.currentName = newFileName;

    return path.join(process.cwd(), this.#dir, newFileName + ".json");
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
    const hash = createHash("sha256");
    let simbols = content.split();
    let newPass = "";
    simbols.forEach((item) => {
      newPass += item + "solt";
    });

    hash.update(newPass);
    let newPassword = hash.digest("hex");

    return newPassword;
  }

  createFile(fileName, content) {
    if (!fileName || !content) return false;

    const nameFile = this.prepareFilePath(fileName);

    if (this.obSave === "user") {
      content.password = this.#protectContent(content.password);
    }

    if (content.send) {
      delete content.send;
    }

    content._id = this.currentName;

    const jsonContent = JSON.stringify(content);
    // a:{s: {}, d: {}} || a:{login: 'name', password: '}
    return this.writeToFile(nameFile, jsonContent);
  }

  //Ищем файл на сервере
  async findFile(fileName) {
    try {
      const filePath = this.prepareFilePath(fileName);
      await fs.readFile(filePath, "utf8");
      return true;
    } catch (E) {
      return false;
    }
  }

  async readFile(fileName) {
    const filePath = this.prepareFilePath(fileName);
    const data = await fs.readFile(filePath, "utf8");
    return data;
  }

  async getAllFiles(filter = {}, count = 100, offset = 0) {
    //Читаем содержимое директории
    const directoryPath = path.join(process.cwd(), this.#dir);
    let dataResult = {};

    let files = await fs.readdir(directoryPath);
    let arPromises = [];
    let start = 0;
    files.forEach((item, index) => {
      if (index < offset) {
        delete files[index];
      }
      if (parseInt(start) > parseInt(count) - 1 + parseInt(offset)) {
        delete files[index];
      }
      start++;
    });

    files = files.filter(function (el) {
      return (el != null && el != "" || el === 0);
    });

    arPromises = files.map(async (file, index) => {
      //Ограничение по количеству выборки
      try {
        let result = {};
        let isset = false;
        const filePath = path.join(directoryPath, file);
        result = JSON.parse(await fs.readFile(filePath, "utf8"));

        //filter
        if (Object.keys(filter).length > 0) {
          for (let key in filter) {
            let resultValue = result[key];
            let filterValue = filter[key];

            if (resultValue instanceof Array) {
              let bResult = resultValue.findIndex(
                (item) => item == filterValue
              );
              if (bResult != -1) {
                isset = true;
              }
            } else {
              if (resultValue == filterValue) {
                isset = true;
              }
            }
          }

          if (isset) {
            return result;
          }
        } else {
          return result;
        }
      } catch (error) {
        throw error;
      }
    });

    try {
      const values = await Promise.all(arPromises);
      return values;
    } catch (error) {
      console.error("Error in processing promises:", error);
      throw error;
    }
  }

  async updateFile(fileName, content) {
    const filePath = this.prepareFilePath(fileName);
    //1. Найти есть ли такой файл
    if (this.findFile(filePath)) {
      //2. Считать содержимое файла
      let oldContent = await this.readFile(filePath); //array
      //3. Обновить содержимое файла с обновлением
      let newContent = CustomArray.array_merge(oldContent, content);
      return this.writeToFile(filePath, newContent);
    } else {
      console.error("Файла не существует");
      return false;
    }
  }

  deleteFile(fileName) {
    const filePath = this.prepareFilePath(fileName);
    return fs.unlink(filePath);
  }
}

module.exports = Storage;
