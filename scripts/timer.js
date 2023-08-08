const boton = document.getElementById('selector');
const pararBoton = document.getElementById('parar'); // Agregado botón de parar
const tiempo = document.getElementById('temporizador');

let horas = 0;
let minutos = 0;
let segundos = 0;
let interval;
let isPaused = false; // Variable para controlar si el temporizador está pausado

boton.addEventListener('click', () => {
    if (interval) {
        clearInterval(interval);
    }

    pararBoton.style.display='block';

    if (!isPaused) { // Si no está pausado, configura el temporizador
        horas = parseInt(prompt('Introduce las horas:', '0'));
        minutos = parseInt(prompt('Introduce los minutos:', '0'));
        segundos = 0;
        
        if (horas >= 0 && horas <= 23 && minutos >= 0 && minutos <= 59) {
            tiempo.textContent = formatTiempo(horas, minutos, segundos);
    
            interval = setInterval(() => {
                if (segundos === 0) {
                    if (minutos === 0) {
                        if (horas === 0) {
                            clearInterval(interval);
                            alert('Contador finalizado');
                            pararBoton.style.display='none';
                            return;
                        } else {
                            horas--;
                            minutos = 59;
                            segundos = 59;
                        }
                    } else {
                        minutos--;
                        segundos = 59;
                    }
                } else {
                    segundos--;
                }
    
                tiempo.textContent = formatTiempo(horas, minutos, segundos);
            }, 1000);
            pararBoton.textContent = "Parar"; // Cambia el texto del botón a "Parar"
            pararBoton.style.display = "inline-block"; // Muestra el botón de parar
        } else {
            alert('Por favor, ingresa valores válidos.');
        }
    }
});

pararBoton.addEventListener('click', () => {
    if (!isPaused) {
        isPaused = true;
        clearInterval(interval); // Detiene el temporizador
        pararBoton.textContent = "Reanudar"; // Cambia el texto del botón a "Reanudar"
    } else {
        isPaused = false;
        interval = setInterval(() => {
            if (segundos === 0) {
                if (minutos === 0) {
                    if (horas === 0) {
                        clearInterval(interval);
                        alert('Contador finalizado');
                        
                        return;
                    } else {
                        horas--;
                        minutos = 59;
                        segundos = 59;
                    }
                } else {
                    minutos--;
                    segundos = 59;
                }
            } else {
                segundos--;
            }

            tiempo.textContent = formatTiempo(horas, minutos, segundos);
        }, 1000);
        pararBoton.textContent = "Parar"; // Cambia el texto del botón a "Parar"
    }
});

function formatTiempo(hrs, min, sec) {
    return `${String(hrs).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}


