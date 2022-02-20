const quotes = [
    {
        quote : "초짜 프로그래머 팀장 무서운줄 모른다.",
        author : "Dong-yeong0",
    },
    {
        quote : "가는 디자인 좋아야 오는 프로그램 좋다",
        author : "Dong-yeong0",
    },
    {
        quote : "두개의 버그는 한번에 잡을 수 없다.",
        author : "Dong-yeong0",
    },
    {
        quote : "오류를 넘으면 또 오류가 있다.",
        author : "Dong-yeong0",
    },
    {
        quote : "서버가 다운되도 백업이 있다",
        author : "Dong-yeong0",
    },
    {
        quote : "버그를 잡으려다 잡은버그 놓친다.",
        author : "Dong-yeong0",
    },
    {
        quote : "printf도 디버깅에 쓸려면 에러난다.",
        author : "Dong-yeong0",
    },
    {
        quote : "보기 좋은 코드가 디버깅 하기 좋다.",
        author : "Dong-yeong0",
    },
    {
        quote : "프로그램은 개발자가 짜고, 보너스는 영업이 받는다.",
        author : "Dong-yeong0",
    },
    {
        quote : "Where절 없는 DELETE.",
        author : "Dong-yeong0",
    },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");


/**
 * Math.random() = 난수 생성, 1에 가까운 float형태로 생성 (1이상은 아님)
 * Math.random() * 10 = 10까지 난수 생성
 * Math.round() - 반올림, .floor() - 내림, ceil() - 올림
 */
 
 todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];
 quote.innerText = todaysQuote.quote;
 author.innerText = todaysQuote.author;