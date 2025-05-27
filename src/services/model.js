class ModelController {
  constructor(model) {
    this.fields = model?.fields || {};
    this.rules = model?.rules || {};
    this.validator = model?.validator || {};
  }

  #checkType(type, value) {
    switch (type) {
      case "string":
        if (!(value instanceof String)) return false;

      case "number":
        if (!(value instanceof Number)) return false;
        break;

      case "list":
        if (!(value instanceof Array)) return false;
        break;

      case "date":
      case "datetime":
        if (!(value instanceof Date)) return false;
        break;

      default:
        return true;
        break;
    }
  }

  #checkValidate(value, validator = '') {
    if(validator != '') {
        let reg = new RegExp(validator);
        let result = value.match(reg);
        return result == true;
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
    let prepareData = {};
    for (let fieldName of this.fields) {
      let data = this.fields[fieldName];

      if (data.system) continue;

      let correctType = this.#checkType(data.type, obData[fieldName]);
      let correctValidate = this.#checkValidate(obData[fieldName], data.validator);
      let correctImportant = this.#checkImportant(data.important, obData[fieldName]);

        
    }
    if (Object.keys(errorsObject).length > 0) {
      return errorsObject;
    }
  }
}
