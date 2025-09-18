// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
var lyricsData = [
  { text: "At the time", time: 15 },
  { text: "The whisper of birds", time: 18 },
  { text: "Lonely before the sun cried", time: 27 },
  { text: "Fell from the sky", time: 32 },
  { text: "Like water drops", time: 33 },
  { text: "Where I'm now? I don't know why", time: 41 },
  { text: "Nice butterflies in my hands", time: 47 },
  { text: "Too much light for twilight", time: 54 },
  { text: "In the mood for the flowers love", time: 59 },
  { text: "That vision", time: 67 },
  { text: "Really strong, blew my mind", time: 72 },
  { text: "Silence Let me see what it was", time: 78 },
  { text: "I only want to live in clouds", time: 83 },
  { text: "Where I'm now? I don't know why", time: 91 },
  { text: "Nice butterflies in my hands", time: 97 },
  { text: "Too much light for twilight", time: 104 },
  { text: "In the mood for the flowers love", time: 108 },
  { text: "At the time", time: 144 },
  { text: "The whisper of birds", time: 148 },
  { text: "Lonely before the sun cried", time: 153 },
  { text: "Fell from the sky", time: 158 },
  { text: "Like water drops", time: 164 },
  { text: "Where I'm now? I don't know why", time: 169 },
  { text: "Nice butterflies in my hands", time: 176 },
  { text: "Too much light for twilight", time: 183 },
  { text: "In the mood for the flowers", time: 188 },
  { text: "Love.", time: 140 },
];

// Animar las letras
function updateLyrics() {
  var time = Math.floor(audio.currentTime);
  var currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 6
  );

  if (currentLine) {
    // Calcula la opacidad basada en el tiempo en la línea actual
    var fadeInDuration = 0.1; // Duración del efecto de aparición en segundos
    var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);

    // Aplica el efecto de aparición
    lyrics.style.opacity = opacity;
    lyrics.innerHTML = currentLine.text;
  } else {
    // Restablece la opacidad y el contenido si no hay una línea actual
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}

setInterval(updateLyrics, 1000);

// Mensaje tipográfico sobre las flores (si existe el contenedor)
(function(){
  var el = document.getElementById('secondMessage');
  var nextBtn = document.getElementById('flowersNextBtn');
  var finalEl = document.getElementById('finalMessage');
  if(!el) return;

  var firstMsg = "Estas flores son para ti 💛. Te las mereces por darme de tu tiempo, incluso cuando tienes otras responsabilidades. Gracias por ser como eres; tu presencia hace mis días un poquito más bonitos ✨ (Baja un poquito mas)";
  var finalMsg = "Ahora quiero pedirte algo por mí 🙏. No te tomará más de 10-15 minutos y me encantaría que sea justo ahora, mientras lees. Por favor, sal lo más pronto que puedas a la salida de tu conjunto y recibe un pequeño detalle 🎁. No me escribas, no me preguntes; solo hazlo y confía en mí. Hazlo en este momento… y luego me cuentas 😊";

  function typeInto(target, text, onDone){
    var i = 0;
    function step(){
      if(i === 0){ target.style.opacity = 1; target.style.animation = 'fadeIn 1s ease-in-out forwards'; }
      if(i <= text.length){
        target.textContent = text.slice(0, i);
        var ch = text.charAt(i-1);
        var delay = (ch === '.' || ch === '!' || ch === '?') ? 90 : (ch === ',' ? 60 : 28);
        i++;
        setTimeout(step, delay);
      } else if(typeof onDone === 'function'){
        onDone();
      }
    }
    step();
  }

  setTimeout(function(){
    typeInto(el, firstMsg, function(){
      if(nextBtn){ nextBtn.style.display = 'inline-block'; }
      if(nextBtn){
        nextBtn.onclick = function(){
          nextBtn.disabled = true;
          // Ocultar flores y mostrar mensaje final sobre fondo vacío
          var flowers = document.querySelector('.flowers');
          if(flowers){ flowers.style.transition = 'opacity .6s ease'; flowers.style.opacity = '0'; }
          setTimeout(function(){ if(flowers){ flowers.style.display = 'none'; } }, 600);
          // Limpiar y escribir nuevo mensaje
          el.style.display = 'none';
          if(finalEl){
            finalEl.style.display = 'block';
            typeInto(finalEl, finalMsg);
          }
        };
      }
    });
  }, 1000);
})();
