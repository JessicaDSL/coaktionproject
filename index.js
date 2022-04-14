const inputText = document.querySelector('[data-js="text"]');
const street = document.querySelector('[data-js="logradouro"]');
const city = document.querySelector('[data-js="cidade"]');
const state = document.querySelector('[data-js="estado"]');
const closeBtn = document.querySelector("[btn-close-menu]");

function getURL(url) {
  let request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send();
  return request.responseText;
}

function handleCEP() {
  let cepValue = inputText.value;
  let reg = /\D+$/g;
  let confirm = cepValue.match(reg);
  if (confirm) {
    inputText.value = "";
  }
}

function setInputData() {
  handleCEP(inputText.value);
  let CEP = inputText.value;
  if (CEP.length === 8) {
    let data = getURL(`https://viacep.com.br/ws/${CEP}/json/`);
    let user = JSON.parse(data);

    street.value = `${user.logradouro}, ${user.bairro}`;
    state.value = user.uf;
    city.value = user.localidade;
  }
}

inputText.addEventListener("onkeydown", setInputData, false);
//closeBtn.addEventListener("click", handlesStateMenu, false)
