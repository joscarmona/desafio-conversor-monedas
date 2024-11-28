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
/* ******* Función que permite obtener los datos del endpoint deseada ****** */
/* ************************************************************************* */
// Recibirá como parámetro el url del endpoint al que se desea conectar
const getMonedas = async(apiEnpointUrl) => {
    try {
        // Se obtienen datos desde el endpoint / API
        // const url = apiEnpointUrl
        const response = await fetch(apiEnpointUrl)
        // console.log(response)

        // Se parsea a JSON
        const data = await response.json()
        // console.log(data)
    } catch(error) {
        alert("No fue posible cargar los datos,  por favor intente nuevamente")
    }
}

// API/endpoint que se desea consultar
// const endpointUrl = "https://mindicador.cl/api/"
// const endpointUrl = "https://mindicador.cl/api/dolar"
// const endpointUrl = "https://mindicador.cl/api/euro/04-11-2024"
// Llamado de la función getMonedas()
// getMonedas(endpointUrl)
/* ************************************************************************* */

/* ************************************************************************* */
/* ********** Función que realiza el cálculo del cambio de monedas ********* */
/* ******************* y muestra en el DOM el resultado ******************** */
/* ************************************************************************* */

/* ************************************************************************* */