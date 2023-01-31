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


// Используй наследование, чтобы не повторяться

// В программировании есть принцип «Не повторяйся» (DRY). Причина, по которой повторяющийся код является проблемой, заключается в том, что любое изменение требует исправления кода в нескольких местах. Это означает больше работы для программистов и больше места для ошибок.

// в приведенном ниже примере метод описания является общим для Bird и Dog:

Bird5.prototype = {
  constructor: Bird5,
  describe: function() {
    console.log("My name is " + this.name);
  }
};

Dog5.prototype = {
  constructor: Dog5,
  describe: function() {
    console.log("My name is " + this.name);
  }
};

// Описание метода повторяется в 2 местах. Код можно отредактировать, создав родитель с именем Animal:
function Animal() { };

Animal.prototype = {
  constructor: Animal, 
  describe: function() {
    console.log("My name is " + this.name);
  }
};

Bird.prototype = {
  constructor: Bird
};

Dog.prototype = {
  constructor: Dog
};


// Наследовать поведение от родителя
// Object.create(obj) создает новый объект и устанавливает obj в качестве прототипа нового объекта. Напомним, что прототип — это как бы «рецепт» созд. объекта. Установив прототип животного в качестве прототипа животного, вы фактически даете экземпляру животного тот же «рецепт», что и любому др. экземпляру животного.
function Animal2() { }
Animal2.prototype.eat = function() {
  console.log("nom nom nom");
};

let animal = Object.create(Animal2.prototype);

animal instanceof Animal; // true


// Установи дочерний прототип в экземпляр родителя
function Animal3() { }

Animal3.prototype = {
  constructor: Animal3,
  eat: function() {
    console.log("nom nom nom");
  }
};

Bird6.prototype = Object.create(Animal3.prototype); // установливаю прототип подтипа (или потомка) — в данном случае Bird — в качестве экземпляра Animal.

let duck2 = new Bird6("Donald"); // duck наследует все свойства класса Animal, включая метод eat.
duck2.eat();


// Сбросить унаследованное свойство конструктора

// Когда объект наследует свой прототип от др. объекта, он также наследует св-во конструктора родителя.
// duck и все экземпляры Bird должны показывать, что они были созданы Bird, а не Animal. Для этого можно вручную установить св-во конструктора Bird в объект Bird:
function Bird6() { }
Bird6.prototype = Object.create(Animal3.prototype);

Bird6.prototype.constructor = Bird6;

let duck3 = new Bird6();


// Добавляем методы после наследования
function Animal4() { }
Animal4.prototype.eat = function() { 
  console.log("nom nom nom"); 
};
function Dog() { }

Dog.prototype = Object.create(Animal4.prototype); // Dog наследуется от Animal
Dog.prototype.constructor = Dog; // конструктор прототипа Dog установлен на Dog
Dog.prototype.bark = function() { // добавление метода bark
  console.log('Woof!')
}

let beagle = new Dog();

beagle.eat();
beagle.bark();


// Переопределить унаследованные методы
function Animal5() { }
Animal5.prototype.eat = function() {
  return "nom nom nom";
};
function Bird7() { }

Bird7.prototype = Object.create(Animal5.prototype);

Bird7.prototype.eat = function() { // переопределение
  return "peck peck peck";
};

let duck5 = new Bird7();
duck5.eat(); // "peck peck peck"

// Как JS видет цепочку?
// duck => Здесь определено eat()? Нет. 
// Bird => Здесь определено eat()? => Да. Выполните его и прекратите поиск. 
// Animal => eat() также определен, но JS остановил поиск до достижения этого уровня. 
// Объект => JavaScript прекратил поиск до достижения этого уровня.


// Миксин для добавления общего поведения между несвязанными объектами

// Наследование плохо работает для несвязанных объектов, таких как Bird и Airplane. Они оба могут летать, но Птица не является типом Самолета и наоборот.
// Для несвязанных объектов лучше использовать примеси. Mixin позволяет другим объектам использовать набор функций

let flyMixin = function(obj) {  // lyMixin берет любой объект и дает ему метод fly
  obj.fly = function() {
    console.log("Flying, wooosh!");
  }
};

let bird = {
  name: "Donald",
  numLegs: 2
};

let plane = {
  model: "777",
  numPassengers: 524
};

flyMixin(bird);  // передаются в flyMixin, который затем назначает функцию полета объекту
flyMixin(plane);

// Теперь и птица, и самолет могут летать

bird.fly(); // Flying, wooosh!
plane.fly();  // Flying, wooosh!

// миксин позволяет повторно использовать один и тот же метод fly для несвязанных объектов birds и plane


// Используй замыкание для защиты свойств внутри объекта от внешнего изменения

// Самый простой способ сделать это общедоступное св-во частным — созд. переменную в функции-конструкторе. Это изменяет область действия этой переменной, чтобы она находилась внутри функции кон-ра, а не была доступна глобально. Таким образом, переменная может быть доступна и изменена только методами внутри функции-конструктора.

function Bird8() {
  let hatchedEgg = 10; // закрытая переменная

  this.getHatchedEggCount = function() { 
    return hatchedEgg;
  };
}
let ducky = new Bird8();
ducky.getHatchedEggCount();

// В JavaScript функция всегда имеет доступ к контексту, в котором она была создана. Это называется закрытием.


// Понимание выражения немедленно вызываемой функции (IIFE)

(function () {
  console.log("Chirp, chirp!");
})();

// Это анонимное функ-ное выражение, которое выполняется сразу же и выводит чирп, чирп! немедленно. Функция не имеет имени и не хранится в переменной. Две круглые скобки () в конце функ-ного выражения заставляют его немедленно выполняться или вызываться. Этот шаблон известен как немедленно вызываемое функциональное выражение или IIFE (Immediately Invoked Function Expression)


// Используем IIFE для создания модуля

function glideMixin(obj) {
  obj.glide = function() {
    console.log("Gliding on the water");
  };
}
function flyMixin(obj) {
  obj.fly = function() {
    console.log("Flying, wooosh!");
  };
}

// сгруппируем эти миксины в модуль:

let motionModule = (function () {
  return {
    glideMixin: function(obj) {
      obj.glide = function() {
        console.log("Gliding on the water");
      };
    },
    flyMixin: function(obj) {
      obj.fly = function() {
        console.log("Flying, wooosh!");
      };
    }
  }
})();

// немедленно вызываемое функциональное выражение (IIFE), которое возвращает объект motionModule. Этот возвр. объект содержит все варианты поведения примесей как сво-ва объекта. Преимущество модульного шаблона заключается в том, что все поведения движения могут быть упакованы в один объект, который затем может использоваться другими частями вашего кода. Вот пример его использования:

// motionModule.glideMixin(duck);
// duck.glide();