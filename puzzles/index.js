// Переверните предоставленную строку и верните перевернутую строку. Например, "hello" должно стать "olleh".

function reverseString(str) {
  return str = str.split('').reverse().join(''); 
  // split разбирает строку на массив, каждая буква имеет свой индекс
  // reverse() обращает порядок элементов в массиве в обратном направлении
  // join() позволяет преобразовать и объединить все элементы массива в одно строковое значение
}

reverseString("hello");




// Факториализировать число. 
// Возвращает факториал предоставленного целого числа. Если целое число представлено буквой n, факториал представляет собой произведение всех положительных целых чисел, меньших или равных n. Факториалы часто обозначаются сокращенной записью n! Например: 5! = 1 * 2 * 3 * 4 * 5 = 120 В функцию будут переданы только целые числа, большие или равные нулю.

function factorialize(num) {
  let result = num;

  if (num === 0 || num === 1) 
    return 1; 
  
  while (num > 1) { 
    num --; // // уменьшение на 1 на каждой итерации
    result *= num;
  }

  return result;
}
factorialize(5); // 120

/* 
                    num           num--      var result      result *= num         
    1st iteration:   5             4            5             20 = 5 * 4      
    2nd iteration:   4             3           20             60 = 20 * 3
    3rd iteration:   3             2           60            120 = 60 * 2
    4th iteration:   2             1          120            120 = 120 * 1
    5th iteration:   1             0          120
    End of the WHILE loop 
    */

// console.log(factorialize(5));




// Найдите самое длинное слово в строке. 
// Возвращает длину самого длинного слова в предоставленном предложении. Ваш ответ должен быть числом.

function findLongestWordLength(str) {
  let strSplit = str.split(' '); // Разбиваем строку на массив строк. В скобках важен пробел, что б каждое слово получил свой индекс, а не буква 
  let longestWord = 0; // Инициализируем переменную, которая будет содержать в себе размер самого длинного слова

  for(var i = 0; i < strSplit.length; i++){
    if(strSplit[i].length > longestWord){ // strSplit[i].length больше, чем сравнимое слово...
	longestWord = strSplit[i].length; // затем longestWord принимает новое значение
    }
  }

  return longestWord;
};

findLongestWordLength("The quick brown fox jumped over the lazy dog"); // 6




// Возврат наибольших чисел в массивах
// Возвращает массив, состоящий из наибольшего числа из каждого предоставленного подмассива. Для простоты предоставленный массив будет содержать ровно 4 подмассива. Помните, что вы можете перебирать массив с помощью простого цикла for и обращаться к каждому члену с помощью синтаксиса массива arr[i].

function largestOfFour(arr, finalArr = []) {
  return !arr.length
    ? finalArr
    : largestOfFour(arr.slice(1), finalArr.concat(Math.max(...arr[0])))
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);




// Подтвердить окончание
// Проверить, заканчивается ли строка (первый аргумент, str) заданной целевой строкой (второй аргумент, target). Эту проблему можно решить с помощью метода .endsWith(), представленного в ES2015. Но для целей этой задачи мы хотели бы, чтобы вы вместо этого использовали один из методов подстроки JavaScript.

function confirmEnding(str, target) {
  return str.slice(str.length - target.length) === target;
  // slice копирует или извлекает заданное количество элементов в новый массив
}

confirmEnding("Bastian", "n"); // true




// Повторить строку. 
// Повторить заданную строку str (первый аргумент) num раз (второй аргумент). Возвращает пустую строку, если num не является положительным числом. В этой задаче не используйте встроенный метод .repeat().

function repeatStringNumTimes(str, num) {
  let repeatedString = "";

  while (num > 0) {
    repeatedString += str;
    num--;
  }

  return repeatedString;

  /* While loop logic
                      Condition       T/F       repeatedString += string      repeatedString        times
    First iteration    (3 > 0)        true            "" + "abc"                  "abc"               2
    Second iteration   (2 > 0)        true           "abc" + "abc"               "abcabc"             1
    Third iteration    (1 > 0)        true          "abcabc" + "abc"            "abcabcabc"           0
    Fourth iteration   (0 > 0)        false
    }
  */
};

repeatStringNumTimes("abc", 3);




// Обрезать строку (первый аргумент), если она длиннее заданной максимальной длины строки (второй аргумент). Вернуть усеченную строку с ... окончанием.

function truncateString(str, num) {
  return str.length > num ? str.slice(0, num) + "..." : str;
}

truncateString("A-tisket a-tasket A green and yellow basket", 8); // A-tisket...




// Создайте функцию, которая просматривает массив arr и возвращает первый элемент в нем, прошедший «проверку на истинность». Это означает, что для данного элемента x «проверка на истинность» пройдена, если func(x) истинна. Если ни один элемент не проходит проверку, возвращается значение undefined.

function findElement(arr, func) {
  return arr.find(func);

  //  find() вернёт первый найденный в массиве элемент, который подходит под условие в переданной колбэк-функции.
}

findElement([1, 2, 3, 4], num => num % 2 === 0); // 2




// Проверьте, классифицируется ли значение как логический примитив. Вернуть истину или ложь. Булевы примитивы бывают истинными и ложными.

function booWho(bool) {
  return typeof bool == "boolean";
}

booWho(null); // false