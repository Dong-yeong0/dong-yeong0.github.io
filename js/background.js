const images = [
    "0.jpeg",
    "1.jpeg",
    "2.jpeg",
];

const choseImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");
const changeBgImageBtn = document.querySelector(".header_changeBgImg");


bgImage.src = `img/${choseImage}`
bgImage.id = "imgwrap";

document.body.append(bgImage);
