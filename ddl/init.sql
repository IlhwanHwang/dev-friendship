DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS choices;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS user_information;
DROP TABLE IF EXISTS score_board;

CREATE TABLE questions (
    question_id VARCHAR NOT NULL PRIMARY KEY,
    contents VARCHAR
);

CREATE TABLE choices (
    id INT NOT NULL,
    question_id VARCHAR NOT NULL,
    choice_id VARCHAR NOT NULL,
    title VARCHAR,
    subtitle VARCHAR,
    image_url VARCHAR,
    PRIMARY KEY (question_id, choice_id)
);

CREATE TABLE answers (
    user_id VARCHAR NOT NULL,
    question_id VARCHAR NOT NULL,
    choice_id VARCHAR NOT NULL,
    PRIMARY KEY (user_id, question_id)
);

CREATE TABLE user_information (
    user_id VARCHAR NOT NULL PRIMARY KEY,
    user_name VARCHAR
);

CREATE TABLE score_board (
    source_user_id VARCHAR NOT NULL,
    solver_user_id VARCHAR NOT NULL PRIMARY KEY,
    score INT,
    created INT
);

INSERT INTO questions VALUES ("indent", "이 인덴트를 쓰는 방법은 무엇인가요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "indent", "tab", "탭", "쓰라고 있는 기능인데 왜 안 써", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "indent", "space", "스페이스", "누가 봐도 인덴트 길이는 똑같아야지", "");

INSERT INTO questions VALUES ("index", "은 '인덱스'를 의미하는 변수를 뭐라고 이름짓나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "index", "i", "i", "길게 쓸 필요 있나?", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "index", "ind", "ind", "자연스럽게 읽히는대로 써야지", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "index", "idx", "idx", "자음만 쓰는게 규칙인거 몰라?", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "index", "index", "index", "줄이면 헷갈리니까", "");

INSERT INTO questions VALUES ("temporary", "은 '임시변수'를 의미하는 변수를 뭐라고 이름짓나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "temporary", "temporary_variable", "temporary_variable", "줄이면 헷갈리니까", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "temporary", "temp", "temp", "다들 이렇게 쓰지 않나?", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "temporary", "tmp", "tmp", "모음은 생략해도 돼", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "temporary", "t", "t", "대충 알지 않겠어?", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "temporary", "x", "x", "미지수는 x로 하기로 했잖아", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "temporary", "a", "a", "빨리 손에 닿는대로 처야지", "");

INSERT INTO questions VALUES ("workaround", "은 'id'가 이미 있는 이름이라면 다른 이름을 어떻게 지을까요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "workaround", "id2", "id2", "두번째니까 2", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "workaround", "id_", "id_", "뭔갈 더 쓰긴 그렇고 언더바", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "workaround", "_id", "_id", "뒤에 쓰기엔 좀 그러니까", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "workaround", "identifier", "identifier", "차라리 다 쓰고 만다", "");

INSERT INTO questions VALUES ("get-parameter", "은 '패러미터를 받아온다'를 의미하는 함수를 뭐라고 이름짓나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "get-parameter", "camel", "getParameter", "카멜 케이스", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "get-parameter", "snake", "get_paremeter", "스네이크 케이스", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "get-parameter", "pascal", "GetParameter", "파스칼 케이스", "");

INSERT INTO questions VALUES ("http-manager", "은 'HTTP 연결을 관리하는 클래스'를 뭐라고 이름짓나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "http-manager", "camel-upper", "HTTPManager", "HTTP는 줄임말이니까", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "http-manager", "camel-title", "HttpManager", "아무리 줄임말이어도 보기 안 좋으니까", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "http-manager", "camel-lower", "httpManager", "클래스도 카멜케이스로", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "http-manager", "snake-upper", "HTTP_manager", "HTTP는 줄임말이고 스네이크 케이스도 쓰고싶어", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "http-manager", "snake-lower", "http_manager", "스네이크 케이스를 엄격히 지키자", "");

INSERT INTO questions VALUES ("brace", "은 어디에 중괄호를 쓰나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "brace", "same", "함수 선언 줄에", "한 줄 쓰기엔 좀 아까워", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "brace", "next", "함수 선언 다음 줄에", "보기 쉬운게 더 낫지", "");

INSERT INTO questions VALUES ("else", "은 어디에 'else'나 'catch'를 쓰나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "else", "new-line", "중괄호 다음 줄에", "아예 다른 구문이니까", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "else", "same-line", "중괄호와 같은 줄에", "굳이 띄울 필요 있나?", "");

INSERT INTO questions VALUES ("language", "이 선호하는 언어는 무엇인가요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "language", "c", "C, C++", "구관이 명관이다", "/images/c-original.svg");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "language", "jvm", "Java, Scala, Kotlin", "라이브러리도 많고 속도도 적당하지", "/images/java-original.svg");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "language", "python", "Python", "분석에 이만한게 없지", "/images/python-original.svg");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "language", "js", "Javascript, Typescript", "이만큼 호환성 좋은 언어 있어?", "/images/javascript-original.svg");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "language", "etc", "기타", "나는 변태다", "/images/haskell-original.svg");

INSERT INTO questions VALUES ("type", "이 선호하는 타입시스템은 무엇인가요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "type", "strong", "강한 타입 언어", "타입시스템은 우월하다", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "type", "weak", "약한 타입 언어", "강한 타입은 무서워", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "type", "no", "타입시스템이 싫다", "런타임에 타입은 허상일 뿐이야", "");

INSERT INTO questions VALUES ("theme", "이 선호하는 테마는 무엇인가요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "theme", "light", "밝은 테마", "흰 것은 종이요 검은 것은 글씨다", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "theme", "dark", "어두운 테마", "눈이 피로하니까", "");

INSERT INTO questions VALUES ("keyboard", "은 어떤 키보드를 쓰나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "keyboard", "mechanical", "기계식", "다양한 선택지가 있지", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "keyboard", "contactless", "무접점", "사각사각한 느낌", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "keyboard", "membrane", "멤브레인", "싼게 최고야", "");

INSERT INTO questions VALUES ("comments", "은 멀티라인 주석을 달 때 어떻게 하나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "comments", "line-by-line", "// 를 여러 줄 쓴다", "통일된게 좋지", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "comments", "multiline", "/* */ 로 닫는다", "한 번에 쓰는게 나아", "");

INSERT INTO questions VALUES ("os", "이 선호하는 운영체제는 무엇인가요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "os", "windows", "윈도우", "많이 쓰는 데는 이유가 있다", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "os", "mac", "맥", "비싸지만 좋잖아", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "os", "linux", "리눅스", "오픈소스만큼 재밌는 것도 없지", "");

INSERT INTO questions VALUES ("idle-computer", "은 컴퓨터를 안 쓸 때 어떻게 하나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "idle-computer", "shut-down", "끈다", "전기를 아끼자", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "idle-computer", "hibernate", "대기시킨다", "이 정도면 아끼는 거 아닌가?", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "idle-computer", "lock", "잠근다", "보안만 챙기면 됐지", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "idle-computer", "leave", "내버려둔다", "뚫던지 말던지", "");

INSERT INTO questions VALUES ("cpu", "이 선호하는 프로세서는 무엇인가요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "cpu", "intel", "인텔", "일어나라 인텔", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "cpu", "amd", "암드", "리싸-쑤", "");

INSERT INTO questions VALUES ("parts", "이 여유가 생기면 가장 먼저 구입할 부품은 무엇인가요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "parts", "display", "모니터/스피커", "출력장치가 좋아야 눈도 귀도 호강", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "parts", "hui", "키보드/마우스", "레이턴시는 줄여야 제맛", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "parts", "cpu", "CPU/RAM", "컴퓨팅 파워가 메인이다", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "parts", "gpu", "GPU", "역시 대세는 그래픽이지", "");

INSERT INTO questions VALUES ("dining", "은 밥을 어디서 먹나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "dining", "dining-table", "식탁", "밥은 식탁에서", "/images/dining-table.jpg");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "dining", "computer-table", "컴퓨터 앞", "컴퓨터가 반찬이지", "/images/computer-table.jpg");

INSERT INTO questions VALUES ("debug", "은 무엇으로 디버깅 하나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "debug", "debug-tool", "디버그 툴", "인간은 도구의 동물이다", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "debug", "print", "프린트", "도구 없이 할 수 있으면 베스트 아닌가", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "debug", "no-need", "디버깅이 필요없다", "그런거 왜 함?", "");

INSERT INTO questions VALUES ("real-environment", "은 어디서 코딩하는걸 선호하나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "real-environment", "home", "집", "역시 집이 좋아", "/images/home.jpg");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "real-environment", "office", "회사", "코딩 제일 많이 하는 곳이잖아", "/images/office.jpg");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "real-environment", "cafe", "카페", "커피냄새를 맡으며", "/images/cafe.jpg");

INSERT INTO questions VALUES ("time", "은 언제 코딩하는걸 선호하나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "time", "day", "낮", "날이 밝아야 머리도 맑은 법", "/images/day.jpg");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "time", "night", "밤", "내 머리는 밤에 더 맑아", "/images/night.jpg");