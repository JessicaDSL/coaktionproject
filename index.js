const inputText = document.querySelector('[data-js="text"]');
const street = document.querySelector('[data-js="logradouro"]');
const city = document.querySelector('[data-js="cidade"]');
const state = document.querySelector('[data-js="estado"]');
const closeBtn = document.querySelector("[data-js=btn-close-menu]");
const openButton = document.querySelector("[data-js=btn-open-menu]");
const closeButton = document.querySelector("[data-js=btn-close-menu]");
const navMenu = document.querySelector("[data-js=nav]");
const imageLogo = document.querySelector("[data-js=logo]");

function setMenuOpen() {
  navMenu.style.display = "flex";
  imageLogo.style.display = "none";
}

function setMenuClose() {
  navMenu.style.display = "none";
  imageLogo.style.display = "flex";
}

function getURL(url) {
  const request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send();
  return request.responseText;
}

function handleCEP() {
  const cepValue = inputText.value;
  const reg = /\D+$/g;
  const confirm = cepValue.match(reg);
  if (confirm) {
    inputText.value = "";
  }
}

function setInputData() {
  handleCEP(inputText.value);
  const CEP = inputText.value;
  if (CEP.length === 8) {
    const data = getURL(`https://viacep.com.br/ws/${CEP}/json/`);
    const user = JSON.parse(data);
    if (user.uf === undefined) {
      street.value = "CEP não encontrado";
      state.value = "CEP não encontrado";
      city.value = "CEP não encontrado";
    } else {
      street.value = `${user.logradouro}, ${user.bairro}`;
      state.value = user.uf;
      city.value = user.localidade;
    }
  }
}

inputText.addEventListener("onkeydown", setInputData, false);
openButton.addEventListener("click", setMenuOpen, false);
closeButton.addEventListener("click", setMenuClose, false);
