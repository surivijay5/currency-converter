import countryCodes from "./currencies.js";

const baseCurSelect = document.querySelector('#base-currency')
const toCurSelect = document.querySelector('#to-currency')
const baseVal = document.querySelector('#base-value')
const resultVal = document.querySelector('#result-value')
const swapBtn = document.querySelector('#swap')

function renderSelectDropdown(el){
    for(let countryCode of countryCodes){
        const optionEl = document.createElement("option")
        optionEl.setAttribute("value", countryCode)
        optionEl.innerText = countryCode
        el.appendChild(optionEl)
    }
}

async function calculateConversion(){
    const baseCurrencyVal = baseCurSelect.value
    const toCurrencyVal = toCurSelect.value
    const baseValue = baseVal.value
    const currencyConversionMapping = await fetchFromAPI(baseCurrencyVal)

    const result = currencyConversionMapping[toCurrencyVal] * baseValue
    resultVal.value = result
    
}

async function fetchFromAPI(from){
    const API_URL = `https://v6.exchangerate-api.com/v6/61a1a2853df966650b7e32a6/latest/${from}`
    const response = await fetch(API_URL)
    const data = await response.json()
    return data.conversion_rates
}


function initializeExchangeConverterUI(){
    renderSelectDropdown(baseCurSelect)
    renderSelectDropdown(toCurSelect)
    baseVal.value = 1
     
    calculateConversion()
}

function swapCurrencies(){
    [baseCurSelect.value, toCurSelect.value] = [toCurSelect.value,baseCurSelect.value]
    calculateConversion()
}


baseCurSelect.addEventListener('change',calculateConversion )
toCurSelect.addEventListener('change',calculateConversion )
baseVal.addEventListener('change',calculateConversion )
swapBtn.addEventListener('click', swapCurrencies)


initializeExchangeConverterUI()
