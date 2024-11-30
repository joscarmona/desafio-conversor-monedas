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
const canvasGraficoValorMoneda10dias = document.getElementById('graficoValorMoneda10dias')
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

/* ************************************************************************* */
/* **************** Realizar el cálculo del cambio de monedas *************** */
/* ******************* Conversión de CLP a otras monedas ******************* */
/* ******************* y muestra en el DOM el resultado ******************** */
/* ************************************************************************* */
// montoAConvertir: parámetro que indica el monto ingresado a través del <INPUT>
// valorMonedaAConvertir: parámetro que indica el valor actual de la moneda a la cual se desea convertir
// to.fixed(): el método toFixed() redondea la cadena a un número específico de decimales.
// const getResultadoConversionMoneda = (montoAConvertir, valorMonedaAConvertir) => {
//     // Operación de la conversión
//     const resultadoConversionMoneda = montoAConvertir / valorMonedaAConvertir
//     // console.log(resultadoConversionMoneda)

//     return resultadoConversionMoneda
// }

/* ************************************************************************* */

/* **************************************************************************** */
/* ************ Renderizar el resultado de la conversión de monedas *********** */
/* **************************************************************************** */
// const renderResultado = async(monedaAConvertir) => {
const renderResultado = async(montoAConvertir, monedaAConvertir) => {
    // Obtener los datos de las monedas desde la API
    const monedasData =  await getMonedas(apiUrl)

    // Convertir CLP a la moneda seleccionada
    // const resultado = getResultadoConversionMoneda(Number(inputMontoEnClp.value), monedasData[monedaAConvertir].valor)
    const resultado = montoAConvertir / monedasData[monedaAConvertir].valor
    pResultadoConversion.textContent = `Resultado: $${resultado.toFixed(2)}`
}
/* **************************************************************************** */


/* **************************************************************************** */
/* ******* Renderizar gráfico con los valores de la moneda seleccionada ******* */
/* *********************** Durante los últimos 10 días ************************ */
/* **************************************************************************** */

/* **************************************************************************** */


/* **************************************************************************** */
/* *************************** EVENTO del <BUTTON> **************************** */
/* **************************************************************************** */
buttonConvertirGraficar.addEventListener("click", () =>{
    // Además de la validación que tiene por defecto el INPUT para ingresar solo números, igualmente se chequea
    // a continuación que el valor a ingresar sea a partir del número 1 y solo valores positivos
    if(Number(inputMontoEnClp.value) > 0 && Number.isInteger(Number(inputMontoEnClp.value)) && selectMonedaAConvertir.value != "") {
        // alert("monto ingresado válido")
        // Mostrar resultado de la conversión de CLP a la moneda seleccionada
        // renderResultado(selectMonedaAConvertir.value)
        renderResultado(Number(inputMontoEnClp.value), selectMonedaAConvertir.value)

    } else{
        alert("por favor ingrese un monto válido y/o seleccione una moneda a convertir")
        pResultadoConversion.textContent = `...`
        inputMontoEnClp.value = ""
    }
})