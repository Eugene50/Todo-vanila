const newItemsBox = document.getElementById("list"); //ul куда клеим новые li
const inputText = document.getElementById("inputText"); //захват поля для ввода
const clearBtn = document.getElementById("clear-btn");
let data = JSON.parse(localStorage.getItem("items")) || []; //берем дынные из локалсторедж в виде массива
let arrInputText = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];
let arrOfTasks = [];
inputText.value = "";

localStorage.setItem("items", JSON.stringify(arrInputText));

function addNewItem(inputData) {
  if (inputData === "") {
    return;
  } else {
    let newElem = document.createElement("li"); //cоздали ли
    let checkBox = document.createElement("input");
    let span = document.createElement("span");
    let delButton = document.createElement("input"); //создали кнопку удаления

    arrOfTasks.push(newElem);

    newElem.className = "task-field";
    checkBox.type = "checkbox";
    checkBox.className = "check-box";
    checkBox.id = "checkbox-btn";
    span.id = "span";
    span.className = "text-container";
    delButton.type = "button";
    delButton.id = "delete-btn";
    delButton.className = "delete-btn";

    span.innerHTML = inputData;
    newItemsBox.appendChild(newElem).append(checkBox, span, delButton);
    inputData = "";

    delItem(delButton);
    textDecorationLine(checkBox);
  }
}

function delItem(element) {
  element.addEventListener("click", (event) => {
    element.parentElement.remove();
    event.stopPropagation();

    let newDataArr = JSON.parse(localStorage.getItem("items")).filter(
      (value) => {
        return value !== element.parentElement.textContent;
      }
    );
    localStorage.setItem("items", JSON.stringify(newDataArr));
  });
}

function textDecorationLine(element) {
  element.addEventListener("click", function () {
    if (this.checked) {
      element.parentElement.classList.add("decor-span");
    } else {
      element.parentElement.classList.remove("decor-span");
    }
  });
}

data.forEach((item) => {
  addNewItem(item);
});

inputText.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    arrInputText.push(inputText.value);
    localStorage.setItem("items", JSON.stringify(arrInputText)); //помещаем данные в локал
    addNewItem(inputText.value);
    inputText.value = "";
  }
});

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  inputText.value = "";
  arrInputText = [];
  arrOfTasks.forEach((item) => {
    item.remove();
  });
});
