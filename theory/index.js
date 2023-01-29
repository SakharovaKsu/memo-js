// Функция-конструктор

// Конс-ры определяются с именами, написанными с заглавной буквы, чтобы отличать их от других функций, не являющихся конс-рами. 
// Конс-ры используют ключевое слово this для установки св-тв объекта, который они будут создавать. Внутри конс-ра это относится к новому объекту, который он создаст.
// Конс-ры определяют св-ва и поведение вместо того, чтобы возвращать значение, как могли бы др. функции.

function Bird() {
  this.name = "Albert";
  this.color = "blue";
  this.numLegs = 2;
}

let blueBird = new Bird();

// Оператор new используется при вызове конс-ра. Это говорит JS созд. новый экземпляр Bird с именем blueBird. Теперь у blueBird есть все свойства, определенные внутри конструктора Bird:

// blueBird.name;
// blueBird.color;
// blueBird.numLegs;


// Расширение конструкторов для получения аргументов

// Что, если нужны птицы с разными значениями имени и цвета? Можно изменить св-ва каждой птицы вручную, но это потребует много работы. Чтобы упростить создание различных объектов Bird, можно добавить параметры:

function Bird2(name, color) {
  this.name = name;
  this.color = color;
  this.numLegs = 2;
}

let cardinal = new Bird2("Bruce", "red");


// Проверка конструктора объекта с помощью instanceof

// instanceof позволяет сравнивать объект с конс-ом, возвращая значение true или false в зависимости от того, был ли этот объект создан с помощью конс-ра. 

let Bird3 = function(name, color) {
  this.name = name;
  this.color = color;
  this.numLegs = 2;
}

let crow = new Bird3("Alexis", "black");

crow instanceof Bird3; // true

let canary = {
  name: "Mildred",
  color: "Yellow",
  numLegs: 3
};

canary instanceof Bird; // false


// Используем свойства прототипа, чтобы уменьшить повторяющийся код

// numLegs, вероятно, будет иметь одно и то же значение для всех экземпляров Bird, по сути, у вас будет дублированная переменная numLegs внутри каждого экземпляра Bird.
// Лучше использовать prototype Bird. Сво-ва в прототипе являются общими для ВСЕХ экземпляров Bird. Вот как добавить numLegs в прототип Bird:

Bird3.prototype.numLegs = 2;


// Добавим собственные свойства утки в массив ownProps и свойства прототипа в массив prototypeProps:

let duck = new Bird3("Donald", "black");

let ownProps = [];
let prototypeProps = [];

for (let property in duck) {
  if(duck.hasOwnProperty(property)) { // метод hasOwnProperty() возвращает логическое значение, которое указывает на то содержит ли объект указанное cобственное (неунаследованное) свойство, или метод.
    ownProps.push(property);
  } else {
    prototypeProps.push(property);
  }
}

console.log(ownProps); //  ['name', 'color', 'numLegs']
console.log(prototypeProps); // ["numLegs"]


// Меняем прототип на новый объект
// Более эффективный способ — установить в качестве прототипа новый объект, который уже содержит свойства. Таким образом, свойства добавляются все сразу.

// Существует один важный побочный эффект ручной установки прототипа для нового объекта. Он стирает свойство конс-ра! Это сво-во можно использовать для проверки того, какая функция-конструктор создала экземпляр, но, поскольку сво-во было перезаписано, теперь оно даст ложный результат:

// duck.constructor === Bird; // false
// duck.constructor === Object; // true
// duck instanceof Bird; // true

Bird3.prototype = {
  constructor: Bird, // Чтобы исправить это, не забудьте определить свойство конструктора
  numLegs: 2, 
  eat: function() {
    console.log("nom nom nom");
  },
  describe: function() {
    console.log("My name is " + this.name);
  }
};


// Понять, откуда берется прототип объекта

// Oбъект наследует свой прототип непосредственно от функции-конструктора, которая его создала. Например, здесь конструктор Bird создает объект-утку:

function Bird4(name) {
  this.name = name;
}

let duck4 = new Bird4("Donald");

// duck наследует свой прототип от функции-конструктора Bird. Вы можете показать эту связь с помощью метода isPrototypeOf:

Bird4.prototype.isPrototypeOf(duck4); // true