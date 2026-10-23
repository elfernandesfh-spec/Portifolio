/* =========================================================
   PORTFÓLIO DE ELIEL FERNANDES
   JavaScript puro: tema, menu, digitação e efeitos de rolagem.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    // Seleciona os elementos da página que terão interatividade.
    const corpoPagina = document.body;
    const botaoTema = document.getElementById("botao-tema");
    const textoTema = document.querySelector(".texto-tema");
    const iconeTema = botaoTema.querySelector("i");
    const botaoMenu = document.getElementById("botao-menu");
    const menuNavegacao = document.getElementById("menu-navegacao");
    const botaoTopo = document.getElementById("botao-topo");
    const anoAtual = document.getElementById("ano-atual");
    const textoDigitado = document.getElementById("texto-digitado");

    // Atualiza o ano automaticamente para não deixar o rodapé envelhecer.
    anoAtual.textContent = new Date().getFullYear();

    // Lê a preferência de tema salva. Se não houver, usa o tema escuro.
    const temaSalvo = localStorage.getItem("tema-portfolio");
    if (temaSalvo === "claro") {
        corpoPagina.classList.add("tema-claro");
    }
    atualizarBotaoTema();

    // Troca entre tema escuro e claro e guarda a escolha no navegador.
    function alternarTema() {
        corpoPagina.classList.toggle("tema-claro");

        const temaAtual = corpoPagina.classList.contains("tema-claro") ? "claro" : "escuro";
        localStorage.setItem("tema-portfolio", temaAtual);
        atualizarBotaoTema();
    }

    // Atualiza o ícone, o texto e a descrição acessível do botão de tema.
    function atualizarBotaoTema() {
        const temaClaroAtivo = corpoPagina.classList.contains("tema-claro");

        if (temaClaroAtivo) {
            iconeTema.className = "bi bi-moon";
            textoTema.textContent = "Modo escuro";
            botaoTema.setAttribute("aria-label", "Ativar modo escuro");
        } else {
            iconeTema.className = "bi bi-sun";
            textoTema.textContent = "Modo claro";
            botaoTema.setAttribute("aria-label", "Ativar modo claro");
        }
    }

    botaoTema.addEventListener("click", alternarTema);

    // Abre ou fecha o menu de navegação no celular.
    function alternarMenu() {
        const menuEstaAberto = menuNavegacao.classList.toggle("aberta");
        botaoMenu.classList.toggle("ativo", menuEstaAberto);
        botaoMenu.setAttribute("aria-expanded", String(menuEstaAberto));
        botaoMenu.setAttribute("aria-label", menuEstaAberto ? "Fechar menu de navegação" : "Abrir menu de navegação");
    }

    function fecharMenu() {
        menuNavegacao.classList.remove("aberta");
        botaoMenu.classList.remove("ativo");
        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.setAttribute("aria-label", "Abrir menu de navegação");
    }

    botaoMenu.addEventListener("click", alternarMenu);

    // Fecha o menu depois que uma seção é selecionada.
    menuNavegacao.querySelectorAll("a").forEach(function (linkNavegacao) {
        linkNavegacao.addEventListener("click", fecharMenu);
    });

    // Fecha o menu com a tecla Escape, útil para navegação por teclado.
    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape") {
            fecharMenu();
        }
    });

    // Efeito máquina de escrever no texto da seção principal.
    const frasesDigitacao = [
        "Desenvolvimento Front-end",
        "interfaces web responsivas",
        "Desenvolvimento Full Stack"
    ];
    const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (movimentoReduzido) {
        textoDigitado.textContent = frasesDigitacao[0];
    } else {
        let indiceFrase = 0;
        let indiceLetra = frasesDigitacao[0].length;
        let apagandoTexto = true;

        function executarDigitacao() {
            const fraseAtual = frasesDigitacao[indiceFrase];

            if (apagandoTexto) {
                indiceLetra--;
                textoDigitado.textContent = fraseAtual.substring(0, indiceLetra);

                if (indiceLetra <= 0) {
                    apagandoTexto = false;
                    indiceFrase = (indiceFrase + 1) % frasesDigitacao.length;
                    window.setTimeout(executarDigitacao, 450);
                    return;
                }

                window.setTimeout(executarDigitacao, 35);
            } else {
                const proximaFrase = frasesDigitacao[indiceFrase];
                indiceLetra++;
                textoDigitado.textContent = proximaFrase.substring(0, indiceLetra);

                if (indiceLetra >= proximaFrase.length) {
                    apagandoTexto = true;
                    window.setTimeout(executarDigitacao, 1800);
                    return;
                }

                window.setTimeout(executarDigitacao, 65);
            }
        }

        // Espera um pouco antes de começar a animação.
        window.setTimeout(executarDigitacao, 1800);
    }

    // Mostra os elementos gradualmente quando eles entram na área visível.
    const elementosRevelar = document.querySelectorAll(".elemento-revelar");

    if ("IntersectionObserver" in window && !movimentoReduzido) {
        const observadorRolagem = new IntersectionObserver(function (entradas, observador) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visivel");
                    observador.unobserve(entrada.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        });

        elementosRevelar.forEach(function (elemento) {
            observadorRolagem.observe(elemento);
        });
    } else {
        // Alternativa para navegadores sem IntersectionObserver ou quem reduz movimento.
        elementosRevelar.forEach(function (elemento) {
            elemento.classList.add("visivel");
        });
    }

    // Exibe o botão "voltar ao topo" depois de rolar um pouco a página.
    function atualizarBotaoTopo() {
        if (window.scrollY > 450) {
            botaoTopo.classList.add("visivel");
        } else {
            botaoTopo.classList.remove("visivel");
        }
    }

    window.addEventListener("scroll", atualizarBotaoTopo, { passive: true });
    atualizarBotaoTopo();

    botaoTopo.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: movimentoReduzido ? "auto" : "smooth"
        });
    });
});
