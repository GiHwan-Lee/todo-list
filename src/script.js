//인자로 받은 rowCount 값에 1을 더한 값을 각 input 요소의 value 값으로 설정하여, 새로운 tr 요소와 함께 input, checkbox, select 요소를 생성하고 반환합니다.
//각 요소들은 적절한 스타일을 지정하고 td 요소에 자식으로 추가됩니다.
function createNewRow(rowCount) {
  const newRow = document.createElement("tr");

  for (let i = 0; i < 4; i++) {
    const newCell = document.createElement("td");
    const newInput = document.createElement("input");
    const newCheckbox = document.createElement("input");
    const newSelect = document.createElement("select");
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    const option3 = document.createElement("option");
    newInput.type = "text";
    newCheckbox.type = "checkbox";
    option1.innerText = "select";
    option2.innerText = "진행 중";
    option3.innerText = "지연";
    newSelect.appendChild(option1);
    newSelect.appendChild(option2);
    newSelect.appendChild(option3);

    newInput.style.marginRight = "5px";
    newCell.appendChild(newCheckbox);
    newCell.appendChild(newInput);
    newCell.appendChild(newSelect);
    newRow.appendChild(newCell);

    newInput.value = `${rowCount + 1}.`;
  }

  return newRow;
}

//해당 셀렉트 박스의 값을 localStorage에 저장하는 함수
function storeSelectValue(columnIndex, rowIndex, value) {
  const storageKey = `selectValue_${columnIndex}_${rowIndex}`;
  localStorage.setItem(storageKey, value);
}

//해당 셀렉트 박스의 값을 localStorage에서 불러오는 함수
function loadSelectValue(columnIndex, rowIndex) {
  const storageKey = `selectValue_${columnIndex}_${rowIndex}`;
  return localStorage.getItem(storageKey);
}

//해당 행의 셀렉트 박스의 값을 불러와 업데이트하는 함수
function updateRowSelectValues(row, rowIndex) {
  const selects = row.querySelectorAll("select");
  selects.forEach(function (select, columnIndex) {
    const value = loadSelectValue(columnIndex, rowIndex);
    if (value) {
      select.value = value;
    }
    select.addEventListener("change", function () {
      storeSelectValue(columnIndex, rowIndex, select.value);
      updateInputBackgroundColor(select, columnIndex);
    });
    updateInputBackgroundColor(select, columnIndex);
  });
}

//select 값에 따라 input 요소의 배경색을 변경하는 함수
//select 요소의 값이 "진행 중"이면 input 요소의 배경색을 주황색으로, "지연"이면 핑크색으로, 그 외의 경우에는 배경색을 초기값으로 설정.
//이 함수는 updateRowSelectValues 함수 내에서 사용.
function updateInputBackgroundColor(select) {
  const parent = select.parentElement;
  const inputText = parent.querySelector("input[type=text]");

  if (select.value === "진행 중") {
    inputText.style.backgroundColor = "orange";
  } else if (select.value === "지연") {
    inputText.style.backgroundColor = "pink";
  } else {
    inputText.style.backgroundColor = "";
  }
}
//columnIndex와 rowIndex, 그리고 저장할 value 값을 받아서 해당 셀의 값을 localStorage에 저장.
function storeValue(columnIndex, rowIndex, value) {
  const storageKey = `inputValue_${columnIndex}_${rowIndex}`;
  localStorage.setItem(storageKey, value);
}

//columnIndex와 rowIndex 값을 받아서 localStorage에서 해당 셀의 값을 가져옴.
function loadValue(columnIndex, rowIndex) {
  const storageKey = `inputValue_${columnIndex}_${rowIndex}`;
  return localStorage.getItem(storageKey);
}

//input 요소에 값을 입력할 때마다 localStorage에 해당 값을 저장합니다.
//또한 row에 있는 input 요소들의 값을 업데이트하며, 이전에 저장된 값이 있다면 그 값을 불러와 입력값을 초기화합니다.
function updateRowInputValues(row, rowIndex) {
  const inputs = row.querySelectorAll("input[type=text]");
  inputs.forEach(function (input, columnIndex) {
    const value = loadValue(columnIndex, rowIndex);
    if (value) {
      input.value = value;
    }
    input.addEventListener("input", function () {
      storeValue(columnIndex, rowIndex, input.value);
    });
  });
}

//새로운 행을 복제하여 삽입하는 기능을 수행합니다.
//복제된 행에 대한 입력 필드를 업데이트하고, 그리고 지정된 위치에 삽입합니다. 마지막으로 새로운 행의 인덱스를 반환합니다.
function cloneAndInsertRow(newRow, rowCount, clearRow) {
  const clonedRow = newRow.cloneNode(true);
  rowCount++;
  updateRowInputValues(clonedRow, rowCount);
  clearRow.before(clonedRow);

  return rowCount;
}

//특정 열의 모든 체크박스가 체크되었는지 확인하고, 그 결과에 따라 해당 열의 "clear" 버튼을 활성화 또는 비활성화합니다.
//체크박스가 모두 체크된 경우 버튼이 활성화되고, 하나라도 체크가 해제되면 버튼이 비활성화됩니다.
function checkAllRows(columnIndex) {
  const checkboxes = document.querySelectorAll(
    `tr > td:nth-child(${columnIndex + 1}) input[type=checkbox]`
  );
  const clearButton = document.querySelector(
    `tr.clear-buttons > td:nth-child(${columnIndex + 1}) button`
  );

  const allChecked = Array.from(checkboxes).every(
    (checkbox) => checkbox.checked
  );

  if (allChecked) {
    clearButton.disabled = false;
  } else {
    clearButton.disabled = true;
  }
}

//columnIndex에 해당하는 열의 모든 input 값을 비우고, 해당 값들이 저장되어 있던 localStorage의 데이터도 삭제하는 역할을 합니다.
//이 함수는 clear 버튼이 클릭되었을 때 호출됩니다.
function clearColumnInputs(columnIndex) {
  const inputTexts = document.querySelectorAll(
    `tr > td:nth-child(${columnIndex + 1}) input[type=text]`
  );

  inputTexts.forEach((inputText, rowIndex) => {
    inputText.value = "";
    localStorage.removeItem(`inputValue_${columnIndex}_${rowIndex + 1}`);
  });
}

//웹 페이지가 로드될 때 실행되는 함수입니다.
//페이지에서 사용되는 버튼과 변수를 초기화하고, 버튼 클릭 및 변경 이벤트에 대한 리스너를 추가하고, 기존 데이터가 로드될 때 초기 상태를 업데이트합니다.
function onDOMContentLoaded() {
  //버튼 요소와 행 요소 가져오기
  const addRowButton1 = document.getElementById("addRowButton1");
  const addRowButton2 = document.getElementById("addRowButton2");
  const addRowButton3 = document.getElementById("addRowButton3");
  const addRowButton4 = document.getElementById("addRowButton4");
  const clearRow = document.querySelectorAll("tr")[2];

  //행 수 초기화하기
  let rowCount = 1;

  //버튼 클릭 이벤트
  addRowButton1.addEventListener("click", onClickAddRowButton);
  addRowButton2.addEventListener("click", onClickAddRowButton);
  addRowButton3.addEventListener("click", onClickAddRowButton);
  addRowButton4.addEventListener("click", onClickAddRowButton);

  //새로운 행 추가하기
  function onClickAddRowButton() {
    const newRow = createNewRow(rowCount);
    clearRow.before(newRow);
    updateRowInputValues(newRow, rowCount + 1);
    updateRowSelectValues(newRow, rowCount + 1);

    rowCount++;

    //모든 열에 대해 checkAllRows 함수 호출하기
    for (let i = 0; i < 4; i++) {
      checkAllRows(i);
    }
  }

  //페이지 로드시 첫번째 행 업데이트하기
  updateRowInputValues(document.querySelector("tr:nth-child(2)"), 1);

  //테이블에서 변경 이벤트 발생 시 처리하기
  document.querySelector("table").addEventListener("change", function (event) {
    const target = event.target;
    const parent = target.parentElement;

    //체크박스인 경우
    if (target.type === "checkbox") {
      const inputText = parent.querySelector("input[type=text]");
      if (target.checked) {
        inputText.style.backgroundColor = "#90EE90";
      } else {
        inputText.style.backgroundColor = "";
      }
    }

    //셀렉트인 경우
    if (target.tagName === "SELECT") {
      const inputText = parent.querySelector("input[type=text]");

      inputText.style.backgroundColor = "";

      if (target.value === "진행 중") {
        inputText.style.backgroundColor = "orange";
      } else if (target.value === "지연") {
        inputText.style.backgroundColor = "pink";
      }
    }

    //해당 열에 대해 checkAllRows 함수 호출하기
    const columnIndex = event.target.closest("td").cellIndex;
    checkAllRows(columnIndex);
  });

  //모든 clearButton 요소에 클릭 이벤트 등록하기
  for (let i = 1; i <= 4; i++) {
    const clearButton = document.getElementById(`clearButton${i}`);
    clearButton.addEventListener("click", () => {
      clearColumnInputs(i - 1);
    });
  }

  //페이지 로드시 첫번째 행의 셀렉트 업데이트하기
  updateRowSelectValues(document.querySelector("tr:nth-child(2)"), 1);
}

//DOMContentLoaded 이벤트 발생 시 onDOMContentLoaded 함수 호출
document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
