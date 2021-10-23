class User {
  constructor(user_id,_username, _token, _account) {
    this.userId = user_id;
    this.username = _username;
    this.token = _token;
    this.account = _account;
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

  isTeacher() {
    return this.account && this.account.accountType.name === "TEACHER";
  }

  getExperience() {
    return this.account.experience;
  }

  setExperience(experience) {
    this.account.experience = experience;
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
