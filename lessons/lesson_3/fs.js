const fs = require('fs');

// Создание и запись в файл JSON
function createFile(filename, jsonData) {
    const jsonString = JSON.stringify(jsonData, null, 2);
    fs.writeFile(filename, jsonString, (err) => {
        if (err) {
            console.error('Ошибка при создании и записи в JSON файл:', err);
        } else {
            console.log('JSON файл успешно создан и записан.');
        }
    });
}

function mergeArray(array1, array2) {
    // Объединяем массивы и удаляем дубликаты с помощью Set
    const mergedArray = [...new Set([...array1, ...array2])];
    return mergedArray;
}

function arrayDiff(array1, array2) {
    // Находим элементы, которые есть в array1, но нет в array2
    const difference1 = array1.filter(element => !array2.includes(element));
    
    // Находим элементы, которые есть в array2, но нет в array1
    const difference2 = array2.filter(element => !array1.includes(element));
    
    // Объединяем обе разницы
    return [...difference1, ...difference2];
}

// Перезапись существующего JSON файла
function update(filename, newJsonData) {
    const jsonString = JSON.stringify(newJsonData, null, 2);

    let jsonOld = JSON.parse(readFile(filename));
    let data = mergeArray(jsonOld, newJsonData);

    fs.writeFile(filename, JSON.stringify(data), (err) => {
        if (err) {
            console.error('Ошибка при создании и записи в JSON файл:', err);
        } else {
            console.log('JSON файл успешно создан и записан.');
        }
    });
}
    

// Чтение данных из JSON файла
function readFile(filename) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка при чтении JSON файла:', err);
        } else {
            try {
                const jsonData = JSON.parse(data);
                console.log('Данные из JSON файла:', jsonData);
            } catch (parseErr) {
                console.error('Ошибка при разборе JSON данных:', parseErr);
            }
        }
    });
}

// Удаление файла
function deleteFile(filename) {
    fs.unlink(filename, (err) => {
        if (err) {
            console.error('Ошибка при удалении файла:', err);
        } else {
            console.log('Файл успешно удалён.');
        }
    });
}