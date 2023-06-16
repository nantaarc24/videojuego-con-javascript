let nave = document.querySelector(".nave");
let body = document.querySelector("body");
let laser = document.getElementById("laser");
let explosion = document.getElementById("explosion");
let live =document.querySelector('i');
let lives=5;
let times= document.getElementById('times');
let second=60;

setInterval(() => {
    --second;
    times.textContent=second;

    if (second== 0) {
        alert('You win');
        location.reload();
    }
}, 1000);

document.addEventListener("mousemove", (e) => {
  nave.style.left = e.clientX - 40 + "px";
});

//generar disparo
document.addEventListener("click", () => {
  let bala = document.createElement("div");
  bala.classList.add("bala");
  //posicionar
  bala.style.bottom = 70 + "px";
  bala.style.left = nave.getBoundingClientRect().left + 40 + "px";
  body.append(bala);
  laser.play();
});

//movimiento del disparo
setInterval(() => {
  let balas = document.querySelectorAll(".bala");

  balas.forEach((bala) => {
    bala.style.top = bala.getBoundingClientRect().top - 20 + "px";

    if (bala.getBoundingClientRect().top <= 0) {
      bala.remove();
    }

    //detectar las colisiones
    let enemigos=document.querySelectorAll('.enemigo');
    enemigos.forEach(enemigo => {
        if (bala.getBoundingClientRect().top <= enemigo.getBoundingClientRect().top+50) {
            if (bala.getBoundingClientRect().left >= enemigo.getBoundingClientRect().left &&
                bala.getBoundingClientRect().left <= enemigo.getBoundingClientRect().left+80) 
            {
                
                explosion.play();
                enemigo.style.backgroundImage='url("../img/explosion.png")';

                setTimeout(() => {
                    explosion.stop();
                    enemigo.remove();
                }, 100);
            }
        }
    });
  });
}, 100);

//generar meteoritos
let aparecer = 0;

setInterval(() => {
  aparecer++;

  if (aparecer % 10 == 0) {
    let enemigo = document.createElement("div");
    enemigo.classList.add("enemigo");
    body.append(enemigo);

    enemigo.style.left = Math.random() * window.innerWidth - 100 + "px";
  }

  let enemigos = document.querySelectorAll(".enemigo");

  enemigos.forEach((elem) => {
    elem.style.top = elem.getBoundingClientRect().top + 10 + "px";

    if (elem.getBoundingClientRect().top > nave.getBoundingClientRect().top) {
        lives--;
        live.textContent= lives;

        // vida
        if (lives < 0) {
            alert('Game over');
            lives=0;
            location.reload();
        }
        
        elem.remove();
    }
  });
}, 100);
