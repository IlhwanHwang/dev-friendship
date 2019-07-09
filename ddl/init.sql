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
    contents VARCHAR,
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
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "indent", "tab", "탭", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "indent", "space", "스페이스", "");

INSERT INTO questions VALUES ("index", "은 '인덱스'를 의미하는 변수를 뭐라고 이름짓나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "index", "i", "i", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "index", "ind", "ind", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "index", "idx", "idx", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "index", "index", "index", "");

INSERT INTO questions VALUES ("temporary", "은 '임시변수'를 의미하는 변수를 뭐라고 이름짓나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "temporary", "temporary_variable", "temporary_variable", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "temporary", "temp", "temp", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "temporary", "tmp", "tmp", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "temporary", "t", "t", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "temporary", "x", "x", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "temporary", "a", "a", "");

INSERT INTO questions VALUES ("workaround", "은 'id'가 이미 있는 이름이라면 다른 이름을 어떻게 지을까요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "workaround", "_id", "_id", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "workaround", "id_", "id_", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "workaround", "id2", "id2", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "workaround", "identifier", "identifier", "");

INSERT INTO questions VALUES ("get-parameter", "은 '패러미터를 받아온다'를 의미하는 함수를 뭐라고 이름짓나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "get-parameter", "camel", "getParameter", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "get-parameter", "snake", "get_paremeter", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "get-parameter", "pascal", "GetParameter", "");

INSERT INTO questions VALUES ("http-manager", "은 'HTTP 연결을 관리하는 클래스'를 뭐라고 이름짓나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "http-manager", "camel-upper", "HTTPManager", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "http-manager", "camel-title", "HttpManager", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "http-manager", "camel-lower", "httpManager", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "http-manager", "snake-upper", "HTTP_manager", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "http-manager", "snake-lower", "http_manager", "");

INSERT INTO questions VALUES ("brace", "은 어디에 중괄호를 쓰나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "brace", "same", "함수 선언 줄에", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "brace", "next", "함수 선언 다음 줄에", "");

INSERT INTO questions VALUES ("else", "은 어디에 'else'나 'catch'를 쓰나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "else", "new-line", "중괄호 다음 줄에", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "else", "same-line", "중괄호와 같은 줄에", "");

INSERT INTO questions VALUES ("language", "이 선호하는 언어는 무엇인가요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "language", "c", "C, C++", "/images/c-original.svg");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "language", "jvm", "Java, Scala, Kotlin", "/images/java-original.svg");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "language", "python", "Python", "/images/python-original.svg");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "language", "js", "Javascript, Typescript", "/images/javascript-original.svg");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "language", "etc", "기타", "/images/go-original.svg");

INSERT INTO questions VALUES ("type", "이 선호하는 타입시스템은 무엇인가요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "type", "strong", "강한 타입 언어", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "type", "weak", "약한 타입 언어", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "type", "no", "타입시스템이 싫다", "");

INSERT INTO questions VALUES ("theme", "이 선호하는 테마는 무엇인가요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "theme", "light", "밝은 테마", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "theme", "dark", "어두운 테마", "");

INSERT INTO questions VALUES ("keyboard", "은 어떤 키보드를 쓰나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "keyboard", "red", "적축", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "keyboard", "brown", "갈축", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "keyboard", "blue", "청축", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "keyboard", "black", "흑축", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "keyboard", "contactless", "무접점", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "keyboard", "membrane", "멤브레인", "");

INSERT INTO questions VALUES ("editor", "은 터미널에서 어떤 에디터를 쓰나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "editor", "vim", "vim", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "editor", "emacs", "emacs", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "editor", "nano", "nano", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "editor", "none", "안 쓰고 만다", "");

INSERT INTO questions VALUES ("comments", "은 멀티라인 주석을 달 때 어떻게 하나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "comments", "line-by-line", "// 를 여러 줄 쓴다", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "comments", "multiline", "/* */ 로 닫는다", "");

INSERT INTO questions VALUES ("terminal-window", "은 윈도우에서 어떤 터미널을 쓰나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "terminal-window", "putty", "Putty", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "terminal-window", "xshell", "XShell", "");

INSERT INTO questions VALUES ("os", "이 선호하는 운영체제는 무엇인가요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "os", "windows", "윈도우", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "os", "mac", "맥", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "os", "linux", "리눅스", "");

INSERT INTO questions VALUES ("idle-computer", "은 컴퓨터를 안 쓸 때 어떻게 하나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "idle-computer", "shut-down", "끈다", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "idle-computer", "hibernate", "대기시킨다", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "idle-computer", "lock", "잠근다", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "idle-computer", "leave", "내버려둔다", "");

INSERT INTO questions VALUES ("input-device", "이 선호하는 입력장치는 무엇인가요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "input-device", "mouse", "마우스", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "input-device", "touchpad", "터치패드", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "input-device", "tablet", "타블렛", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "input-device", "screen", "터치스크린", "");

INSERT INTO questions VALUES ("cpu", "이 선호하는 프로세서는 무엇인가요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "cpu", "intel", "인텔", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "cpu", "amd", "암드", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "cpu", "embedded", "임베디드 시스템", "");

INSERT INTO questions VALUES ("parts", "이 여유가 생기면 가장 먼저 구입할 부품은 무엇인가요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "parts", "monitor", "모니터", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "parts", "keyboard", "키보드", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "parts", "mouse", "마우스", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "parts", "speaker", "스피커", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "parts", "cpu", "CPU", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "parts", "memory", "RAM", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "parts", "gpu", "GPU", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "parts", "drive", "저장장치", "");

INSERT INTO questions VALUES ("dining", "은 밥을 어디서 먹나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "dining", "dining-table", "식탁", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "dining", "computer-table", "컴퓨터 앞", "");

INSERT INTO questions VALUES ("debug", "은 무엇으로 디버깅 하나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "debug", "debug-tool", "디버그 툴", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "debug", "print", "프린트", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "debug", "no-need", "디버깅이 필요없다", "");

INSERT INTO questions VALUES ("real-environment", "은 어디서 코딩하는걸 선호하나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "real-environment", "home", "집", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "real-environment", "office", "회사", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "real-environment", "cafe", "카페", "");

INSERT INTO questions VALUES ("time", "은 언제 코딩하는걸 선호하나요?");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "time", "day", "낮", "");
INSERT INTO choices VALUES ((SELECT IFNULL(MAX(id), 0) + 1 FROM choices), "time", "night", "밤", "");