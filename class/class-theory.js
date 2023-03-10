// класс = свойство (пример из жизни, какие свойства у стены, стола, ручки (цвет, размер и бла-бла) + методы() (это глагол, ручка пишет)) + вспомогательные инструменты (более полно позволяет манипулировать данными, они не привязаны к сущности, если же привязываются, то это уже метод)

// Инициализация: constructor()
// это метод внутри класса, служащий для инициализации экземпляра. Это место, где устанавливаются начальные значения полей экземпляра и осуществляется его настройка.

class User {
  // конструктор устанавливает начальное значение поля name:
  constructor(name) {
    this.name = name
  }
}
const pechorin = new User('Печорин');
console.log(pechorin) // name: 'Печорин'



// Открытые поля экземпляров класса
// В данном случае name — открытое поле, поскольку оно доступно за пределами класса User.
class User1 {
  constructor(name) {
      this.name = name
  }
}
const user1 = new User1('Печорин')
user1.name // name: 'Печорин'

class User2 {
  name = 'Имярек'

  constructor() {
      // инициализация отсутствует
  }
}
const user2 = new User2()
user2.name // Имярек

// На доступ к открытым полям и их изменение нет ограничений. Читать и присваивать значения таким полям можно в конструкторе, методах и за пределами класса.



// Частные поля экземпляров класса
// Хорошим способом скрыть детали является использование частных полей. Такие поля могут быть прочитаны и изменены только внутри класса, которому они принадлежат. За пределами класса частные поля недоступны.
// Для того, чтобы сделать поле частным, перед его названием следует поставить символ #,

class User3 {
  #name
  constructor(name) {
      this.#name = name
  }
  getName() {
      return this.#name
  }
}

const user3 = new User3('Печорин')
user3.getName() // Печорин
// user3.#name // SyntaxError

// #name — частное поле. Доступ к нему можно получить только внутри класса User. Это позволяет сделать метод getName().



// Открытые статические поля и методы
// В классе можно определить поля, принадлежащие самому классу: статические поля. Такие поля используются для создания констант, хранящих нужную классу информацию.
// Для создания статических полей используется ключевое слово static перед названием поля
class User4 {
  static TYPE_ADMIN = 'admin'
  static TYPE_REGULAR = 'regular'

  constructor(name, type) {
      this.name = name
      this.type = type
  }
}

const admin = new User4('Администратор сайта', User.TYPE_ADMIN)
admin.type === User4.TYPE_ADMIN // true

// Статические методы - это методы, которые прописаны в классе, но их вызвать можно без создания инстанса экзамепляра класса.
// Как определить, что это статический метод? Если при получении доступа к инструменту пытаетесь создать объект и не совсем понимаете что туда заносить, скорее всего это сво-во статическое. Создаете статический метод и обращаетесь к нему через класс

class UserName {
  constructor(name) {
    this.name = name
  }

  static getRole(email) {
    return 'admin'
  }
}

// const userName = new UserName('Pety')
console.log(UserName.getRole('Pety@mail.ru')) // за счет static можем обратится на прямую, без создания объекта
// С помощью статический методов мы можем реализовать множество вспомогательных инструментов, которые будут доступны пользователю и соотвественно можно применять без создания экземпляра (например, у пользователя узнать id, найти логин и т.п.). Статические методы наследуются

class Student extends UserName {
  constructor(name) {
    super()
  }
}

console.log(Student.getRole('tatd')) // admin, т.к. статические методы наследуются


// Частные статические поля
// Предположим, что мы хотим ограничить количество экземпляров класса User. Для сокрытия информации о количестве экземпляров можно создать частные статические поля:
class User5 {
  static #MAX_INSTANCES = 2 // определяет допустимое количество экземпляров
  static #instances = 0 // количество созданных экземпляров

  name

  constructor(name) {
      User.#instances++
      if (User.#instances > User.#MAX_INSTANCES) {
          throw new Error('Невозможно создать экземпляр класса User')
      }
      this.name = name
  }
}

new User5('Печорин')
new User5('Бэла')
new User5('Грушницкий') // Невозможно создать экземпляр класса User

// Эти частные статические поля доступны только внутри класса User. Ничто из внешнего мира не может повлиять на ограничения: в этом заключается одно из преимуществ инкапсуляции.



// Методы экземпляров класса
// Методы экземпляра класса могут изменять его данные. Методы экземпляра могут вызывать другие методы экземпляра, а также статические методы.
class User6 {
  name = 'Имярек'

  constructor(name) {
      this.name = name
  }

  getName() {
      return this.name // возвращающий имя пользователя
  }
}

const user6 = new User6('Печорин')
user6.getName() // Печорин

// Добавим новый метод nameContains(str), принимающий один аргумент и вызывающий другой метод:
class User7 {
  name

  constructor(name) {
      this.name = name
  }

  getName() {
      return this.name
  }

  nameContains(str) {
      return this.getName().includes(str) // Он вызывает другой метод экземпляра getName() для получения имени пользователя.
  }
}

const user7 = new User7('Печорин')
user7.nameContains('Печорин') // true
user7.nameContains('Грушницкий') // false

// Метод также может быть частным(приватным). Для того, чтобы сделать метод частным следует использовать префикс #.
class User8 {
  #name

  constructor(name) {
      this.#name = name
  }

  #getName() { // Будучи частным, метод #getName() не может быть вызван за пределами класса User.
      return this.#name
  }

  nameContains(str) {
      return this.#getName().includes(str)
  }
}

const user8 = new User8('Печорин')
user8.nameContains('Печорин') // true
user8.nameContains('Грушницкий') // false

// user8.#getName // SyntaxError

class NameUser {
  #test = 'hohoho' // нельзя использовать вне класса и в наследственном классе на прямую обращаться нельзя

  set name(name) {
    // console.log('Privat -  ' + this.#test) // Privat = hohoho - отобразит строку
    this._name = name
  }

  get name() {
    return this._name
  }
}

const nameUser = new Name();
console.log(nameUser.test); // такого сво-во нет, консольне отобрзит, так как он приватный
// console.log(nameUser.#test); // ошибка



// Геттеры и сеттеры
// это аксессоры или вычисляемые свойства. Это методы, имитирующие поля, но позволяющие читать и записывать данные.
// Геттеры используются для получения данных, сеттеры — для их изменения.
// Для установки запрета на присвоение полю name пустой строки, обернем частное поле #nameValue в геттер и сеттер:
class User9 {
  #nameValue

  constructor(name) {
      this.name = name
  }

  get name() {
      return this.#nameValue
  }

  set name(name) {
      if (name === '') {
          throw new Error('Имя пользователя не может быть пустым')
      }
      this.#nameValue = name
  }
}

const user9 = new User9('Печорин')
user9.name // вызывается геттер, Печорин
user9.name = 'Бэла' // вызывается сеттер

user9.name = '' // Имя пользователя не может быть пустым



// Статические методы
// это функции, принадлежащие самому классу. Они определяют логику класса, а не его экземпляров.
// Для создания статического метода используется ключевое слово static перед названием метода
// Статический метод имеет доступ к статическим полям
// Он не имеет доступа к полям экземпляров
class User10 {
  static #takenNames = []

  static isNameTaken(name) {
      return User.#takenNames.includes(name)
  }

  name = 'Имярек'

  constructor(name) {
      this.name = name
      User.#takenNames.push(name)
  }
}

const user10 = new User10('Печорин')

User10.isNameTaken('Печорин') // true
User10.isNameTaken('Грушницкий') // false



// Наследование: extends
// ContentWriter наследует от User конструктор, метод getName() и поле name. В самом ContentWriter определяется новое поле posts.
class User11 {
  name

  constructor(name) {
      this.name = name
  }

  getName() {
      return this.name
  }
}

class ContentWriter extends User11 {
  posts = []
}

const writer = new ContentWriter('Лермонтов')

writer.name // Лермонтов
writer.getName() // Лермонтов
writer.posts // []



// Родительский конструктор: super() в constructor()
// Для того, чтобы вызвать конструктор родительского класса в дочернем классе, следует использовать специальную функцию super(),
class User12 {
  name

  constructor(name) {
      this.name = name
  }

  getName() {
      return this.name
  }
}

class ContentWriter2 extends User12 {
  posts = []

  constructor(name, posts) {
      super(name) // вызывает конструктор родительского класса User.
      this.posts = posts
  }
}

const writer2 = new ContentWriter2('Лермонтов', ['Герой нашего времени'])
writer2.name // Лермонтов
writer2.posts // ['Герой нашего времени']

class Child extends Parent {
  constructor(value1, value2) {
      // так не работает! Нужен super
      this.prop2 = value2
      super(value1)
  }
}



// Родительский экземпляр: super в методах
// Для того, чтобы получить доступ к родительскому методу внутри дочернего класса, следует использовать super:
class User13 {
  name

  constructor(name) {
      this.name = name
  }

  getName() {
      return this.name
  }
}

class ContentWriter3 extends User13 {
  posts = []

  constructor(name, posts) {
      super(name)
      this.posts = posts
  }

  getName() {  // вызывает метод getName() родительского класса User. Это называется переопределением метода.
      const name = super.getName()
      if (name === '') {
          return 'Имярек'
      }
      return name
  }
}

const writer3 = new ContentWriter3('', ['Герой нашего времени'])
writer3.getName() // Имярек



// Проверка типа объекта: instanceof
// Выражение object instanceof Class определяет, является ли объект экземпляром указанного класса.
class User14 {
  name

  constructor(name) {
      this.name = name
  }

  getName() {
      return this.name
  }
}

const user14 = new User14('Печорин')
const obj = {}

user14 instanceof User14 // true
obj instanceof User14 // false

// Оператор instanceof полиморфичен: он исследует всю цепочку классов.
class User15 {
  name

  constructor(name) {
      this.name = name
  }

  getName() {
      return this.name
  }
}

class ContentWriter4 extends User15 {
  posts = []

  constructor(name, posts) {
      super(name)
      this.posts = posts
  }
}

const writer4 = new ContentWriter4('Лермонтов', ['Герой нашего времени'])

writer4 instanceof ContentWriter4 // true
writer4 instanceof User15 // true

// Что если нам нужно определить конкретный класс экземпляра? Для этого можно использовать свойство constructor:
writer4.constructor === ContentWriter4 // true
writer4.constructor === User15 // false
// или
writer4.__proto__ === ContentWriter4.prototype // true
writer4.__proto__ === User15.prototype // false



// Защищенное свойство (_)
class Abc {
  constructor(name) {
    this._name = name; // Если св-во начинается с нижнего подчеркивание, то оно защищено, на прямую к нему обращаться - плохой тон
  }
}

const abc = new Abc('алфавит')
// abs._name = 'Abc' // такое обращение не допустимо, не смотря на то что сво-во поменяется, это не как не контролируется кодом, это соглашение между программистами

// Ситуация, программист видит нижнее подчеркивание и понимает, что сво-во на прямую менять нельзя, поэтому нужен метод, которое называется так же, но без подчеркивания, и будет этот уже манипулировать с св-вом. set - меняет, get - получить
class Abc2 {
  constructor() {

  }

  set name(name) {
    this._name = name;
  }

  get name() {
    return this._name
  }
}

const abc2 = new Abc2()
Abc2.SetNameOnThisClass('алфавит') // Такое присвоение корректно