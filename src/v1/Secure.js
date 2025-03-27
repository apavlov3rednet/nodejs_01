class Secure {
  #solt = "solt";

  preparePassword(pass) {
    const hash = createHash("sha256");

    let simbols = pass.split();
    let newPass = "";
    simbols.forEach((item) => {
      newPass += item + this.#solt;
    });

    hash.update(newPass);
    let newPassword = hash.digest("hex");

    return newPassword;
  }

  checkPassword(pass, userData) {
    let prepPass = this.preparePassword(pass);
    return prepPass === userData.password;
  }
}

module.exports = Secure;
