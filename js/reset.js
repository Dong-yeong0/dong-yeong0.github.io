const resetBtn = document.querySelector(".hearder_reset");

function handleReset(event) {
    localStorage.clear();
    window.location.reload();
}

resetBtn.addEventListener("click", handleReset);