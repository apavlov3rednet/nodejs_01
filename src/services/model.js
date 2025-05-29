class ModelController {
  constructor(model) {
    this.fields = model?.fields || {};
    this.rules = model?.rules || {};
    this.validator = model?.validator || {};
    this.prepareFields = {};
    this.errors = {};
  }

  get(value) {
    return this[value]
  }

  #checkType(type, value) {
    switch (type) {
      case "string":
        if (typeof value === 'string') return true;

      case "number":
        if (typeof value === 'number') return true;
        break;

      case "list":
        if (value instanceof Array) return true;
        break;

      case "date":
      case "datetime":
        if (value instanceof Date) return true;
        break;

      default:
        return false;
        break;
    }
  }

  #checkValidate(value, validator = '') {
    if(validator != '') {
      console.log(validator)
        let reg = new RegExp(validator);
        console.log(reg)
        let result = value.match(reg);
        console.log(result)
        return result !== null;
    }

    return true;
  }

  #checkImportant(imp, value) {
    if(imp && value === '')
        return false;
    
    return true;
  }

  checkModel(obData) {
    let errorsObject = {};
    for (let fieldName in this.fields) {
      let data = this.fields[fieldName];

      if (data.system) continue;

      if(!obData[fieldName]) {
        errorsObject[fieldName] = `Error 2005: Field '${fieldName}' must be isset`;
        continue;
      }

      let correctType = this.#checkType(data.type, obData[fieldName]);
      let correctValidate = this.#checkValidate(obData[fieldName], data.validator);
      let correctImportant = this.#checkImportant(data.important, obData[fieldName]);

      if(!correctType) {
        errorsObject[fieldName] = 'Error 2001: Incorrect type';
        continue;
      }

      if(!correctValidate) {
        errorsObject[fieldName] = 'Error 2002: Validate is failure';
        continue;
      }

      if(!correctImportant) {
        errorsObject[fieldName] = 'Error 2004: Empty important field';
        continue;
      }

      this.prepareFields[fieldName] = obData[fieldName];
    }
    if (Object.keys(errorsObject).length > 0) {
      this.errors = errorsObject;
    }
  }
}

module.exports = ModelController;