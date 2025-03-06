const fs = require('fs').promises;
const path = require('path');

// Путь к директории, которую вы хотите прочитать
const directoryPath = path.join(__dirname, 'your-directory-name');

// Функция для чтения содержимого всех файлов в директории
async function readFilesInDirectory() {
try {
    const files = await fs.readdir(directoryPath);
    const fileContents = await Promise.all(
     files.map(async (file) => {
        const filePath = path.join(directoryPath, file);
        const data = await fs.readFile(filePath, 'utf8');
        return { file, data };
     })
    );
    return fileContents;
} catch (err) {
    console.error('Ошибка при чтении файлов:', err);
}
}

// Вызов функции и обработка результата
readFilesInDirectory().then((fileContents) => {
fileContents.forEach(({ file, data }) => {
    console.log(`Содержимое файла ${file}:`);
    console.log(data);
});
});


//### Использование `async/await`
const fs = require('fs').promises;
const path = require('path');

// Путь к директории, которую вы хотите прочитать
const directoryPath = path.join(__dirname, 'your-directory-name');

// Асинхронная функция для чтения содержимого всех файлов в директории
async function readFilesInDirectory() {
try {
    const files = await fs.readdir(directoryPath);
    for (const file of files) {
     const filePath = path.join(directoryPath, file);
     const data = await fs.readFile(filePath, 'utf8');
     console.log(`Содержимое файла ${file}:`);
     console.log(data);
    }
} catch (err) {
    console.error('Ошибка при чтении файлов:', err);
}
}

// Вызов асинхронной функции
readFilesInDirectory();