class ModelController {
    constructor() {

    }

    checkModel(model, obData) {
        let errorsObject = {};
        let prepareData = {};
        for(let fieldName of model.fields) {
            let data = model.fields[fieldName];

            if(data.system) continue;

            if(data.important && obData[fieldName]) {
                //Обязательное поле
                switch(data.type) {
                    case 'string': 
                        if(obData[fieldName] instanceof String) {
                            prepareData[fieldName] = obData[fieldName];
                        }
                        else {
                            errorsObject[fieldName] = 'Incorrect type';
                        }

                    case 'number':
                        if(obData[fieldName] instanceof Number) {

                        }
                        else {
                            errorsObject[fieldName] = 'Incorrect type';
                        }
                    break;
                    default: 
                        errorsObject[fieldName] = 'Incorrect type';
                    break;
                }
            }
            else if(!data.important && obData[fieldName]) {
                //Необязательное поле
            
            }
            else {
                errorsObject[fieldName] = 'Not isset. Is important field.';
            }
        }
        if(Object.keys(errorsObject).length > 0) {
            return errorsObject;
        }
    }
}
