# 프로젝트 이름

TodoList App

# 프로젝트 소개

간단한 투두 리스트를 작성하고 관리할 수 있는 웹 어플리케이션입니다.

# 프로젝트 실행 방법

HTML 파일을 다운로드 받은 폴더에서 해당 파일을 더블 클릭하거나, 브라우저에서 파일을 드래그 앤 드롭하여 열 수 있습니다.
HTML 파일을 열게 되면, HTML 파일에 연결된 CSS와 JavaScript 파일도 자동으로 로드됩니다.

# 프로젝트 구조 및 파일 설명

## 디렉토리 구조

- `index.html`: 프로젝트의 메인 HTML 파일입니다.
- `css/`: CSS 파일들이 위치하는 디렉토리입니다.
  - `style.css`: 프로젝트의 기본 스타일을 정의한 파일입니다.
- `js/`: JavaScript 파일들이 위치하는 디렉토리입니다.
  - `script.js`: 프로젝트의 메인 JavaScript 파일입니다.

## 각 파일 설명

### index.html

프로젝트의 메인 HTML 파일입니다.

### css/style.css

프로젝트의 기본 스타일을 정의한 CSS 파일입니다. ...

### js/script.js

프로젝트의 메인 JavaScript 파일입니다.

# 기술 스택

- JavaScript, HTML, CSS

# 작업 내용

TodoList의 기본적인 기능(할 일 추가, 삭제, 완료 처리)을 구현하였습니다.
CSS 스타일링을 통해 UI를 디자인하였습니다.

## 표 생성 및 행 추가 기능

Add Row 버튼을 클릭하여 새로운 행을 추가할 수 있습니다.

## 같은 열의 input text에 대한 counting

같은 열에 존재하는 행에 대해서 자동으로 input text 시작 부분에 숫자를 넣었습니다. 이를 통해 해야 할 list의 개수를 쉽게 파악할 수 있습니다.

## input 요소 값 저장 및 불러오기 기능

input text의 value 값을 받아서 해당 셀의 값을 localStorage에 저장합니다. 그 덕분에 value 값들에 대해 CRUD 할 수 있고, 새로고침을 하더라도 데이터가 계속 보여질 수 있습니다.

## select 요소 값 저장 및 불러오기 기능

select의 value 값을 받아서 해당 셀의 값을 localStorage에 저장합니다. 그 덕분에 새로고침을 하더라도 데이터가 계속 보여질 수 있습니다.

이 기능을 통해 새로고침을 하더라도 작업 중인 list의 현황을 면밀히 살필 수 있습니다.

## select 값에 따른 input 요소 배경색 변경 기능

select 값에 따라 input 요소의 배경색이 변경이 됩니다. select 요소의 값이 "진행 중"이면 input 요소의 배경색을 주황색으로, "지연"이면 핑크색으로, 그 외의 경우에는 배경색을 초기값으로 설정합니다.

## 체크박스에 따른 input 요소 배경색 변경

check box에 체크를 하게 되면 완료 되었다는 표시입니다. 이는 input의 색상을 초록색으로 변경하여 표시 됩니다.

## clear 버튼 및 활성화 기능

clear 버튼을 클릭하면 같은 열에 존재하는 모든 행의 input text의 내용이 삭제됩니다. 이는 동시에 localStorage에서도 삭제가 됩니다.

특정 열의 모든 체크박스가 체크되었는지 확인하고, 그 결과에 따라 해당 열의 "clear" 버튼을 활성화 또는 비활성화합니다.

# 오류 발생 및 문제 해결 과정

## 여러가지의 input text의 value를 localStorage에 저장하는 과정

input text의 개수가 많아서 이를 관리하기 위한 코드를 어떻게 작성할지 고민이었습니다. 기존 프로젝트를 진행했을 때는 각자의 value 값에 랜덤한 number의 id를 부여해서 key로 저장하여 해결했었기 때문에 이번에도 동일하게 시도를 하려고 했으나, 1행 1열에 있는 value 값을 수정 했는데 1행 2열에 있는 value 값이 변경되는 등의 오류를 겪어서 해결하는 과정 중에 id가 랜덤한 숫자이다보니 식별하기가 어려워서 1_1, 1_2 이런 식으로 행과 열의 위치를 표시해서 key의 값으로 부여하고나니 식별하기가 쉬워졌고 이를 통해 조금 더 쉽게 구글링을 하여 해결할 수 있었습니다.

이를 해결한 뒤 select가 새로고침 되었을 때 기존 데이터가 유지되지 못 했던 문제를 함께 해결하였습니다. 이 또한 특정 행열의 위치를 따서 key의 값으로 지정했습니다.

## Add Row 버튼에 의한 행 추가 과정

행을 추가하는데 있어서 tr과 td를 사용해서 만들려고 시도 했으나 원하는 위치에 행을 추가하도록 구현할 때 많은 오류를 겪었습니다. 결과적으로는 appendChild의 사용을 잘못해서 이런 과정을 겪었는데 구글링을 통해 해결했습니다.

## clear 버튼을 눌렀을 때 원하는 위치가 아닌 다른 곳의 값이 삭제되는 문제

4개의 clear 버튼이 있고 각자의 열에 맞춰서 todo-list가 작성된 행의 모든 input text를 사라지도록 구현해야 하는데, todo-list가 작성된 행을 포함하여 1행에 존재하는 이름 까지도 삭제되는 문제가 있었습니다. 이를 해결하기 위해 테이블도 다시 만들어 보고, 2개의 테이블로 만들어서 해결해보려고 했으나 해결 되지 않아서 구글링을 통해 해결하였습니다. 행을 삭제하는 함수의 인자로 행의 위치를 전달 받아서 +1을 해주면 되는 매우 간단한 문제였습니다.

# 구현 못한 기능

## clear 버튼을 누른 뒤에 input text에 카운팅 해주는 기능이 다시 생성되어야 하는데 구현하지 못 했습니다.

## select의 경우 새로고침을 하더라도 색상이 유지되지만, check box는 유지 되고 있지 않습니다.

## Add Row 버튼을 통해 행을 추가 했을 때 추가된 행에 존재하는 input text에 value 값이 존재하면 그 행까지는 새로고침을 했을 때 불러오도록 구현되어야 하는데 이 부분은 구현하지 못 했습니다.

## DB를 통해 데이터를 보관할 수 있도록 구현해야 했는데 구현하는 도중에 데드라인에 맞추기 어려울것 같아서 로컬 스토리로 대체하여 구현했습니다.

# 프로젝트를 진행하면서 느낀 점

## todo-list는 과거에 이미 만들어본 적이 있었습니다. 과거에 만든 todo-list의 경우는 하나의 input에 의해 생성되고 수정되도록 구현을 했었는데 이번 프로젝트는 수 많은 input들을 관리해야 하기 때문에 상대적으로 더 어렵게 느껴졌지만 많은 것을 배울 수 있었기에 의미가 깊다고 생각합니다. 개발자로서 데드 라인에 맞춰서 높은 완성도를 가진 결과물을 도출해야 하는 것은 필수적인 소양이라고 생각합니다. 기회가 주어진다면 어떻게든 이 프로젝트를 요구사항에 맞춰 완성 시키고 싶습니다. 다음 채용 절차인 면접의 참여 가능과 불가능을 떠나 개인적으로 꼭 완성을 시킬 예정입니다. 이렇게 과제 전형에 참여할 수 있는 기회를 주셔서 감사합니다!