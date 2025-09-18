// Activación: domingo 21-09-2025 08:20 am Ecuador (UTC-5)
(function(){
  var typingEl = document.getElementById('typingText');
  var nextBtn = document.getElementById('nextBtn');
  if(!typingEl || !nextBtn) return;

  function typeText(text, done){
    var i = 0;
    function step(){
      if(i <= text.length){
        typingEl.textContent = text.slice(0, i);
        var ch = text.charAt(i-1);
        var delay = (ch === '.' || ch === '!' || ch === '?') ? 90 : (ch === ',' ? 60 : 32);
        i++;
        setTimeout(step, delay);
      } else if(typeof done === 'function') {
        done();
      }
    }
    step();
  }

  /***********************************************************************
   *  FECHA DE ACTIVACIÓN (EDITA AQUÍ - SOLO NÚMEROS)
   *  Hora local de Ecuador (UTC-5). Cambia estos valores y listo.
   ***********************************************************************/
  var EC_YEAR = 2025;     // Año, por ejemplo 2025
  var EC_MONTH = 9;       // Mes 1-12, por ejemplo 9 para septiembre
  var EC_DAY = 21;        // Día del mes, por ejemplo 21
  var EC_HOUR = 8;        // Hora 0-23 en Ecuador, por ejemplo 8 para 08:00
  var EC_MINUTE = 15;     // Minutos 0-59, por ejemplo 20

  // No cambies debajo de esta línea para la fecha: convierte Ecuador (UTC-5) a UTC
  var target = new Date(Date.UTC(EC_YEAR, EC_MONTH - 1, EC_DAY, EC_HOUR + 5, EC_MINUTE, 0));

  var beforeMsg = 'Te dije que revises el domingo 8:15am jeje no te va a salir la sorpresa sino ese día, no te desesperes 😊';
  var greetMsg = 'Buenos días, Srta. Mimi ☀️. Espero hayas amanecido bien. Me gustaría que te tomes unos 10-15 minutos de tu tiempo (no será más). Hoy es hora de tu sorpresa, espero que te guste ✨💛';

  function isBeforeTarget(now){
    return now.getTime() < target.getTime();
  }

  function init(){
    var now = new Date();
    var text = isBeforeTarget(now) ? beforeMsg : greetMsg;
    typeText(text, function(){
      if(!isBeforeTarget(new Date())){
        nextBtn.style.display = 'inline-block';
        nextBtn.addEventListener('click', function(){
          nextBtn.disabled = true;
          nextBtn.style.opacity = 0.8;
          // transición suave y navegación a flores
          document.getElementById('intro').style.transition = 'opacity .6s ease';
          document.getElementById('intro').style.opacity = '0';
          setTimeout(function(){ window.location.href = 'flower.html'; }, 600);
        });
      }
    });
  }

  init();
})();










