(function () {

  document.addEventListener("DOMContentLoaded", () => {

    const links = document.querySelectorAll("a[id^='Link']");
    if (!links.length) return;

    let data = JSON.parse(localStorage.getItem("comentarios2026")) || {};

    // 🔑 Clave basada en TU variable lunao
    function claveMes() {
      return `2026-${window.lunao}`;
    }

    function guardar() {
      localStorage.setItem("comentarios2026", JSON.stringify(data));
    }

    function pintar() {
      // limpiar SIEMPRE
      links.forEach(l => l.classList.remove("con-comentario"));

      const mes = claveMes();
      if (!data[mes]) return;

      Object.keys(data[mes]).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add("con-comentario");
      });
    }

    // CLICK EN DÍAS
    links.forEach(link => {
      link.addEventListener("click", () => {

        const actual = data[claveMes()]?.[link.id] || "";
        const nuevo = prompt("Comentario:", actual);

        if (nuevo === null) return;

        if (!data[claveMes()]) data[claveMes()] = {};

        if (nuevo.trim() === "") {
          delete data[claveMes()][link.id];
        } else {
          data[claveMes()][link.id] = nuevo.trim();
        }

        guardar();
        pintar();
      });
    });

    // 🧠 OBSERVAR CAMBIOS DE lunao (CLAVE)
    let ultimoMes = window.lunao;

    setInterval(() => {
      if (window.lunao !== ultimoMes) {
        ultimoMes = window.lunao;
		console.log(ultimoMes);
        pintar();
      }
    }, 100);

    pintar();
  });

})();
