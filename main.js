var lastResFind = ""; // последний удачный результат
var copy_page = ""; // копия страницы в исходном виде

function TrimStr(s) {
  s = s.replace(/^\s+/g, "");
  return s.replace(/\s+$/g, "");
}

function FindOnPage(inputId) {
  // получаем ссылку на поле ввода
  var obj = window.document.getElementById(inputId);

  // если поле ввода не найдено, не делаем ничего
  if (!obj) {
    return;
  }

  // получаем текст для поиска
  var textToFind = TrimStr(obj.value);

  // если запрос пустой, не делаем ничего
  if (textToFind == "") {
    alert("Вы ничего не ввели");
    return;
  }

  // Создаем регулярное выражение для поиска с игнорированием регистра
  var regex = new RegExp("(" + textToFind + ")", "gi");

  // если текст не найден на странице, выводим сообщение
  if (!document.body.innerHTML.match(regex)) {
    console.log("Ничего не найдено, проверьте правильность ввода!");
    return;
  }

  // сохраняем копию страницы
  if (copy_page.length > 0) {
    document.body.innerHTML = copy_page;
  } else {
    copy_page = document.body.innerHTML;
  }

  // стираем предыдущие якори для скрола
  document.body.innerHTML = document.body.innerHTML.replace(
    new RegExp("name=" + lastResFind, "gi"),
    " "
  );

  // заменяем найденный текст ссылками с якорем
  document.body.innerHTML = document.body.innerHTML.replace(
    regex,
    "<span name=" + textToFind + " style='background:red'>$1</span>"
  );

  // сохраняем фразу для поиска, чтобы в дальнейшем по ней стереть все ссылки
  lastResFind = textToFind;

  // перемещаем скрол к последнему найденному совпадению
  window.location = "#" + textToFind;
}

// добавляем обработчик события для нажатия клавиши Enter
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    FindOnPage("inputId");
  }
});
