const Level = require("./Level");
class User {
  constructor(user_id,_username, _token, _account) {
    this.userId = user_id;
    this.username = _username;
    this.token = _token;
    this.account = _account;
    this.level = undefined
  }

  getUsername() {
    return this.username;
  }

  getToken() {
    return this.token;
  }

  getAccountId() {
    if(this.account) {
      return this.account.accountId;
    }
  }

  isLeader() {
    return this.account && this.account.accountType.name === "LEADER";
  }

  getExperience() {
    return this.account.experience;
  }

  setExperience(experience) {
    this.account.experience = experience;
  }

  getLevel() {
    return this.level;
  }

  setLevel(level) {
    this.level = new Level(level.id, level.name, level.numberLevel, level.maxValue, level.description, level.imagePath);
  }

  hasAccount() {
    return this.account;
  }

  getUserId() {
    return this.userId;
  }

  setAccount(account) {
    this.account = account;
  }
}

module.exports = User;
