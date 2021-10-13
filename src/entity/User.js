class User {
  constructor(_username, _token, _account) {
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
    return this.account.accountId;
  }

  isTeacher() {
    return this.account.accountType.name === "TEACHER";
  }
}

module.exports = User;
