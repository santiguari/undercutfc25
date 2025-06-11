async function fetchPlayerPrices(url) {
    try {
        // Realizar una solicitud GET a la página web
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error al realizar la solicitud: ${response.status}`);
        }

        // Obtener el contenido HTML de la página
        const htmlContent = await response.text();

        // Crear un objeto DOMParser para analizar el HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');

        // Encontrar el div con la clase 'player-price-block xb-block'
        const playerPriceBlock = doc.querySelector('.player-price-block.xb-block');

        if (playerPriceBlock) {
            // Encontrar el div con la clase 'price-num'
            const priceNumDiv = playerPriceBlock.querySelector('.price-num');
            const priceNum = priceNumDiv ? priceNumDiv.textContent.trim() : 'No se encontró el precio principal';

            // Encontrar los divs dentro de 'extra-prices'
            const extraPricesDiv = playerPriceBlock.querySelector('.extra-prices');
            const extraPrices = extraPricesDiv ? Array.from(extraPricesDiv.querySelectorAll('div')).map(div => div.textContent.trim()) : [];

            // Imprimir los valores encontrados
            console.log(`Precio principal: ${priceNum}`);
            console.log('Precios adicionales:');
            extraPrices.forEach(price => console.log(` - ${price}`));
        } else {
            console.log('No se encontró el div con la clase especificada.');
        }
    } catch (error) {
        console.error(error.message);
    }
}

// URL de la página web
const url = 'https://www.futwiz.com/en/fc24/player/ewa-pajor/22111';
fetchPlayerPrices(url);
