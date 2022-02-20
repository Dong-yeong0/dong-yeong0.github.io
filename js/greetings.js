const loginInput = document.querySelector("#login-form input");
const loginForm = document.querySelector("#login-form");
const greeting = document.querySelector("#greeting");
/*
*   관습 : string만 포함 된 변수는 대문자로 표기하고 string을 저장하고 싶을 때 사용
*   아마 int string 같은 타입이 없어서 저렇게 표시 해놓는거 같다.
*/
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

// 기본적으로 브라우저에서 제공해주는 미니 DB같은 localStorage
const saveUsername = localStorage.getItem(USERNAME_KEY);

// eventListener의 함수 첫번째 argument는 항상 submit의 정보가 된다
function onLoginSubmit(event) {
    // .preventDefault - 브라우저의 기본 동작을 막아줌
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    if(username.length === 0 || username === "" || username === undefined) {
        alert("이름을 적어주세요.");
    } else {
        localStorage.setItem(USERNAME_KEY, username);
        loginForm.style.display = "none";
        // setItem(key, value)로 저장
        paintGreetings(username);
    }
    
}

function paintGreetings(username) {
    greeting.classList.remove(HIDDEN_CLASSNAME);
    /*
        greeting.innerText = "Hello" + username;
        보통 위의 방식을 주로 썼는데
        이와 같은 방식으로도 된다는걸 이제 알았네 (문자열 합치기)
        규칙 single, double quotation이 아닌 `` (백틱)으로 감싸야 된다.
        백틱 사이에 표현하고 싶은 변수를 ${} 에 감싸면 끝.
    */
    greeting.innerText = `Hello ${username}`;

}

if(saveUsername === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    paintGreetings(saveUsername);
    loginForm.style.display = "none";
}