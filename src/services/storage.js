import fs from "node:fs";
import { CustomArray } from "./array";

export class Storage {
  //private, protected, public

  #name = "";
  #type = "";
  #dir = "/src/storage/";
  #content = "";

  constructor(dir) {
    if (dir != "") this.#dir = this.#dir + dir + "/"; // src/storage/users/
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

    const nameFile = this.#dir + fileName + ".json";
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

  readFile(fileName) {
    fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                console.error('Ошибка при чтении JSON файла:', err);
                return false;
            } else {
                try {
                    return JSON.parse(data);
                } catch (parseErr) {
                    console.error('Ошибка при разборе JSON данных:', parseErr);
                    return false;
                }
            }
        });
  }

  getAllFiles() {
    //Читаем содержимое директории
    fs.readdir(this.#dir, 'utf8', (err, data) => {
      if(!err && data) {
        let arrFiles = [];
        data.forEach(item => {
          let content = this.readFile(item);
          arrFiles.push(content);
        });
        return arrFiles;
      }
      else {
        //error
        return false;
      }
    });
  }

  updateFile(fileName, content) {
    const filePath = this.#dir + fileName + '.json';
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
