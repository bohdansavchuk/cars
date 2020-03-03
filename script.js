document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    select.addEventListener('change', () => {
        request()
            .then(resolve => {
                output.innerHTML = resolve;
            })
            .catch(e => {
                output.innerHTML = e;
            });
    });
    const request = () => {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', './cars.json');
            request.setRequestHeader('Content-type', 'application/json');
            request.send();
            request.addEventListener('readystatechange', () => {

                if (request.readyState === 4) {
                    if (request.status === 200) {
                        const data = JSON.parse(request.responseText);
                        data.cars.forEach(item => {
                            if (item.brand === select.value) {
                                const {brand, model, price} = item;
                                resolve(`Тачка ${brand} ${model} <br>Цена: ${price}$`);
                            }
                        });
                    } else {
                        reject('Возникла ошибка');
                    }
                }
            
            });
           
        });
    };

});


