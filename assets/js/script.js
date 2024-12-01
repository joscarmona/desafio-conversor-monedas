/* ************************************************************************* */
/* ** Referencia a los elementos web del DOM con los que se trabaja en JS ** */
/* ************************************************************************* */
// <INPUT>, entrada de tipo número que se utiliza para ingresar el monto en CLP a convertir en algunas de las monedas de cambio disponibles
const inputMontoEnClp = document.getElementById('inputClp')

// <SELECT>, opciones de monedas de cambio disponibles para realizar la conversión
const selectMonedaAConvertir = document.getElementById('monedaAConvertir')

// <BUTTON>, permite convertir el monto de CLP ingresado a la moneda de cambio seleccionada, además mostrará en un gráfico el valor de la moneda de cambio seleccionada en el los últimos 10 días
const buttonConvertirGraficar = document.getElementById('convertirGraficarButton')

// <P>, se utiliza para mostrar el resultado de la conversión del monto en CLP a la moneda seleccionada
const pResultadoConversion = document.getElementById('resultadoConversion')

// <CANVAS>, se visualiza en un gráfico el valor, de la moneda de cambio seleccionada y a la cual se le realizó la conversión, en los últimos 10 días
const canvasGraficoValorMoneda10dias = document.getElementById("graficoValorMoneda10dias")
/* ************************************************************************* */

/* ************************************************************************* */
/* ******************************** API URL ******************************** */
/* ************************************************************************* */
// URL a la API, obtener los valores actualizados de las monedas
// https://mindicador.cl/api/{tipo_indicador}: entrega los valores del último mes del indicador consultado
const apiUrl = "https://mindicador.cl/api/"
/* ************************************************************************* */

/* ************************************************************************* */
/* ***************** Obtener los datos de la API o endpoint **************** */
/* ************************************************************************* */
// Recibirá como parámetro el url de la API o del endpoint
const getMonedas = async(apiEndpointUrl) => {
    try {
        // Se obtienen datos desde el endpoint / API
        const response = await fetch(apiEndpointUrl)
        // console.log(response)

        // Se parsea a JSON
        const data = await response.json()
        // console.log(data)

        return data
    } catch(error) {
        console.log(error.message)
        // alert("No fue posible cargar los datos,  por favor intente nuevamente")
        // Se muestra un mensaje indicando que no fue posible conectar con la API o con el endpoint según sea el caso
        pResultadoConversion.textContent = `No fue posible cargar los datos. Por favor intente nuevamente!`
    }
}
/* ************************************************************************* */

/* **************************************************************************** */
/* ************ Renderizar el resultado de la conversión de monedas *********** */
/* **************************************************************************** */
const renderResultado = async(montoAConvertir, monedaAConvertir) => {
    // Obtener los datos de las monedas desde la API
    const monedasData =  await getMonedas(apiUrl)

    // Convertir CLP a la moneda seleccionada
    const resultado = montoAConvertir / monedasData[monedaAConvertir].valor
    pResultadoConversion.textContent = `Resultado: $${resultado.toFixed(2)}`
}
/* **************************************************************************** */

/* **************************************************************************** */
/* *********** Preparar el objeto de configuración para la gráfica ************ */
/* **************************************************************************** */
const objetoDeConfiguracionParaGrafica = (ultimos10Valores, moneda) => {
    // TYPE: tipo de gráfico
    const tipoDeGrafico = "line"

    // LABELS: eje horizontal se genera un nuevo arreglo con el nombre de las fechas
    const fechas10UltimosDias = ultimos10Valores.map((valorfecha) => valorfecha.fecha.slice(0, 10))

    // LABEL: título del conjunto de los datos
    const titulo = "Últimos 10 valores de " + moneda

    // BACKGROUNDCOlOR: color de los datos que se mostrarán en la gráfica
    const colorDeLaLinea = "red"

    // DATA: eje vertical (conjunto de los valores de la moneda durante los últimos 10 días), se genera un nuevo arreglo con los valores de la moneda seleccionada en los últimos 10
    const valores10UltimosDias = ultimos10Valores.map((valorfecha) => valorfecha.valor)
    
    // Objeto de configuración para el gráfico
    const config  = {
        type: tipoDeGrafico,
        data: {
            labels: fechas10UltimosDias,
            datasets: [{
                label: titulo,
                backgroundColor: colorDeLaLinea,
                borderColor: "rgba(255, 0, 0, 0.3)",
                data: valores10UltimosDias
            }]
        }
    }

    return config
}
/* **************************************************************************** */

/* **************************************************************************** */
/* ****** Renderizar un gráfico con los valores de la moneda seleccionada ***** */
/* *********************** durante los últimos 10 días ************************ */
/* **************************************************************************** */
const renderGrafico = async(moneda) => {
    // Endpoint que entrega los valores del último mes de la moneda seleccionada
    const endpointUrl = apiUrl + moneda
    // console.log(endpointUrl)
    // console.log(moneda)
    
    // Obtener los valores del último mes de la moneda seleccionada
    const valoresMonedaUltimoMes = await getMonedas(endpointUrl)

    // Obtener los 10 últimos valores
    const ultimos10Valores = valoresMonedaUltimoMes.serie.slice(0, 10)
    
    // Se Obtiene el objeto de configuración para el gráfico
    const config = objetoDeConfiguracionParaGrafica(ultimos10Valores, moneda)
    
    // Se destruye el gráfico existente antes de crear uno nuevo
    Chart.getChart("graficoValorMoneda10dias")?.destroy()

    // Se genera el gráfico
    canvasGraficoValorMoneda10dias.style.backgroundColor = "#d8d8d8"
    new Chart(canvasGraficoValorMoneda10dias, config)

}
/* **************************************************************************** */

// renderGrafico("dolar")

/* **************************************************************************** */
/* *************************** EVENTO del <BUTTON> **************************** */
/* **************************************************************************** */
buttonConvertirGraficar.addEventListener("click", () =>{
    // Además de la validación que tiene por defecto el INPUT para ingresar solo números, igualmente se chequea
    // a continuación que el valor a ingresar sea a partir del número 1 y solo valores positivos
    if(Number(inputMontoEnClp.value) > 0 && Number.isInteger(Number(inputMontoEnClp.value)) && selectMonedaAConvertir.value != "") {
        // Mostrar resultado de la conversión de CLP a la moneda seleccionada
        renderResultado(Number(inputMontoEnClp.value), selectMonedaAConvertir.value)

        // Se visualiza gráfico en el DOM con los valores de la moneda seleccionada en los últimos 10 días
        renderGrafico(selectMonedaAConvertir.value)

    } else{
        alert("por favor ingrese un monto válido y seleccione una moneda a convertir")
        pResultadoConversion.textContent = `...`
        inputMontoEnClp.value = ""
    }
})