// Пример для теории из objects-prototypes-inheritance

// Логин и пароль пока пустые, пока это не интересует, когда пользователь зарегестр. - эти свойства заполнятся

let user = {
  'login': '',
  'password': '',
  'validatePassword': function() { // проверяем пароль на валидацию
    if(this.password.length > 6) {
      return true;
    }
    return false;
  }
}

// в app.js проверяем все ли рпботает, добавляем user-profile, что бы дополнить user