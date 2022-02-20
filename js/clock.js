const time = document.querySelector("#timePrint");
const date = document.querySelector("#datePrint");

function getClock() {
    const date = new Date();
    // date의 get~~의 return type은 number로서 String으로 형변환 해줘야 padStart쓸 수 있음
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const weeks = ['SUN','MON','TUE','WEB','THU','FRI','SAT'];
    const years = date.getFullYear();
    const month = date.getMonth() + 1;
    const days = date.getDay();
    const week = weeks[date.getDay()];

    timePrint.innerText = `${hours}:${minutes}:${seconds}`;
    datePrint.innerText = `${years}.${month}.${days}.${week}`;
}   
// setInterval(사용할려는 함수 이름, 호출시간간격); -- 시간 간격 함수 호출
//setInterval(sayHello, 5000);



// web 로딩시 바로 호출 -> 1초 후 함수 살행
getClock();
setInterval(getClock, 1000);

/**
 * "1".padStart(2,"0");
 * 이거 좀 신기하네 .padStart(String 문자 최소 길이, 최소길이가 아닌 경우 앞쪽에 append할 문자열)
 * 이거 좀 신기하네 .padEnd는 뒤에 추가
 * "hello".padStart(20, "x")
 * ->'xxxxxxxxxxxxxxxhello'
 */