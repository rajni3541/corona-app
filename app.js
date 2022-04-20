// ------------ constants or variables -----------
const wrapper = document.querySelector(".wrapper");
const inputPart = document.querySelector(".input-parts");
const infoText = document.querySelector(".info-text");
const inputField = document.querySelector("input");
const covidUpdates = document.querySelector(".covid-19");
const search = document.querySelector("#search");

const country = document.querySelector(".country");
const dateTime = document.querySelector(".date-time");
const back = document.querySelector(".fa-arrow-left");
const flag = document.querySelector(".flag");
const covidTotalCases = document.querySelector(".covid-total-cases");
const TotalActive = document.querySelector(".Total-confirmed");
const TotalRecovered = document.querySelector(".Total-recovered");

// ---------- search bar -----------
search.addEventListener("click", (e) => {
  if (inputField.value != "") {
    getApi(inputField.value);
  }
});
inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    getApi(inputField.value);
  }
});
// ----------- fetching API-------------
function getApi(getCountry) {
  fetch(new URL(`https://corona.lmao.ninja/v2/countries/${getCountry}`))
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      getUpdate(data);
    });
}

// ------------ validity check ---------
function getUpdate(data) {
  if (data.message == "Country not found or doesn't have any cases") {
    infoText.classList.remove("pending");
    infoText.classList.add("error");
    infoText.innerHTML = "Country not found or doesn't have any cases";
  } else {
    infoText.classList.add("pending");
    infoText.classList.remove("error");
    infoText.innerHTML = `Getting updates for ${inputField.value.toUpperCase()}...`;
    coronaUpdate(data);
  }
}

// ----------- search again ------------
back.addEventListener("click", () => {
  covidUpdates.classList.remove("active");
  wrapper.classList.add("active");
  infoText.innerHTML = "";
  inputField.value = "";
  infoText.classList.remove("pending");
});

// --------- getting updates ------------
function coronaUpdate(data) {
  setTimeout(() => {
    wrapper.classList.remove("active");
    covidUpdates.classList.add("active");
  }, 2000);
  country.innerHTML = data.country;
  flag.setAttribute("src", data.countryInfo.flag);
  covidTotalCases.innerHTML = data.cases;
  TotalRecovered.innerHTML = data.recovered;
  TotalActive.innerHTML = data.active;
  dateTime.innerHTML =
    "Updated at : " + new Date(data.updated).toLocaleString();
}
