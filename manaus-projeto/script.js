const elementoTemperatura =
    document.getElementById("temperatura");

const elementoSensacaoTermica =
    document.getElementById("sensacao-termica");

const elementoPm25 =
    document.getElementById("pm25");

const elementoAirCard =
    document.querySelector(".air-card");

const elementoAirMessage =
    document.querySelector(".air-message");

const elementoAirSummary =
    document.querySelector(".air-summary");

const elementoWeatherMessage =
    document.querySelector(".weather-message");

const elementoWeatherCondition =
    document.querySelector(".weather-condition");

const elementoRecommendationMain =
    document.querySelector(".recommendation-main");

const elementoLiveStatus =
    document.getElementById("liveStatus");

const elementoLiveText =
    document.getElementById("liveText");

const elementoRecommendationSecondary =
    document.querySelector(".recommendation-secondary");

const LATITUDE = -3.1190;
const LONGITUDE = -60.0217;

// API de clima (temperatura, sensação térmica, umidade, vento)
const urlClima = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,apparent_temperature&timezone=America%2FManaus`;

// API de qualidade do ar (PM2.5)
const urlQualidadeAr = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=pm2_5&timezone=America%2FManaus`;


async function buscarDadosClimaticos() {
    const resposta = await fetch(urlClima);
    const dados = await resposta.json();
    return dados;
}

function obterHoraAtualManaus() {
    const agora = new Date();

    const horaFormatada = new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Manaus",
        hour: "2-digit",
        hour12: false
    }).format(agora);

    return Number(horaFormatada);
}

async function buscarQualidadeDoAr() {
    const resposta = await fetch(urlQualidadeAr);
    const dados = await resposta.json();
    return dados;
}

function renderizarClima(dadosClimaticos) {
    const temperatura = Math.round(dadosClimaticos.current.temperature_2m);
    const sensacaoTermica = Math.round(dadosClimaticos.current.apparent_temperature);
    const hora = obterHoraAtualManaus();

    elementoTemperatura.textContent = temperatura;
    elementoSensacaoTermica.textContent = sensacaoTermica;

    if (temperatura < 28) {
        elementoWeatherMessage.textContent = "Bora aproveitar, tá de boa!";
        elementoWeatherCondition.lastChild.textContent = " Tranquilo";
    } else if (temperatura < 33) {
        if (hora < 12) {
            elementoWeatherMessage.textContent = "Te prepara pro meio-dia, maninho!";
        } else {
            elementoWeatherMessage.textContent = "Vai esquentando, aguenta firme!";
        }
        elementoWeatherCondition.lastChild.textContent = " Esquentando";
    } else {
        elementoWeatherMessage.textContent = "Eita, hoje tá quente que só!";
        elementoWeatherCondition.lastChild.textContent = " Muito quente";
    }
}

function renderizarQualidadeDoAr(dadosQualidadeAr) {
    const pm25 = dadosQualidadeAr.current.pm2_5;

    elementoPm25.textContent = pm25;

    if (pm25 < 12) {
        elementoAirCard.classList.remove("air-warning");
        elementoAirMessage.textContent = "Ar limpinho hoje, maninho!";
        elementoAirSummary.lastChild.textContent = " Pode ficar tranquilo, ar de boa qualidade.";
    } else if (pm25 < 35) {
        elementoAirMessage.textContent = "Fica ligado, maninho.";
        elementoAirSummary.lastChild.textContent = " O ar pede um pouco mais de cuidado hoje.";
    } else {
        elementoAirMessage.textContent = "Ar pesado hoje, se cuida!";
        elementoAirSummary.lastChild.textContent = " Evite esforço ao ar livre, principalmente quem tem problema respiratório.";
    }
}

function definirStatusOffline() {
    elementoLiveStatus.classList.add("offline");
    elementoLiveText.textContent = "OFFLINE";
}

async function iniciar() {
    try {
        const [infosClimaticas, infosQualidadeAr] = await Promise.all([
            buscarDadosClimaticos(),
            buscarQualidadeDoAr()
        ]);

        renderizarClima(infosClimaticas);
        renderizarQualidadeDoAr(infosQualidadeAr);
    } catch (erro) {
        definirStatusOffline();
    }
}

iniciar();