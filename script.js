/* ---------------------------------------------------------
   1. ELEMENTOS PRINCIPAIS DA PÁGINA
   --------------------------------------------------------- */

const body = document.body;

const menuToggle = document.getElementById("menuToggle");
const menuPrincipal = document.getElementById("menuPrincipal");

const themeToggle = document.getElementById("themeToggle");
const saudacaoElemento = document.getElementById("saudacao");

const projectsGrid = document.getElementById("projectsGrid");
const projectFilters = document.getElementById("projectFilters");

const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const mensagemInput = document.getElementById("mensagem");
const consentimentoInput = document.getElementById("consentimento");

const mensagemContador = document.getElementById("mensagemContador");

const backToTop = document.getElementById("backToTop");
const anoAtual = document.getElementById("anoAtual");


/* ---------------------------------------------------------
   2. DADOS DOS PROJETOS
   --------------------------------------------------------- */

const projetos = [
    {
        id: 1,

        titulo: "Advocacia Oliveira Kardec",

        descricao:
            "Aqui eu criei, junto de um colega chamado Apolo, um site para uma advocacia com menção aos nomes dos pais de nossos clientes.",

        tecnologias: ["HTML", "CSS"],

        imagem:
             "https://i.pinimg.com/564x/cb/14/f8/cb14f8c7201007ab2ebde79d2bcd8ed7.jpg",
             

        link: "https://github.com/oliveira-ai/UC14-HTML-e-CSS/tree/main/Escrit%C3%B3rio%20de%20Advocacia",

        categoria: "Desenvolvimento web",

        demonstracao: true
    },

    {
        id: 2,

        titulo: "CINEFER",

        descricao:
            "A escolhe de assentos para um filme em questão. Atividade em grupo, onde cada grupo fazia parte do cinema.",
        tecnologias: ["HTML", "CSS", "JavaScript"],

        imagem:
            "https://s2-g1.glbimg.com/nlQ97K5biPENzsAwAuRKb5Bvl_0=/0x0:1600x1067/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/l/8/zjQ7goQnKRvKSurn9zCA/centerplex.jpg",

        link: "https://github.com/oliveira-ai/UC14-HTML-e-CSS/tree/main/Atvdd-cinema",

        categoria: "Design e interface",

        demonstracao: true
    },

    {
        id: 3,

        titulo: "Fast Coffee",

        descricao:
            "Site para um fast food mesclado com cafeteria, com foco em demonstar as comidas únicas.",

        tecnologias: ["Figma"],

        imagem:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTigOBBuMJdiWTCXzsxUNdeww8_KlnV-DMxwfDqFaKMizu6KyJpBsmYoOI6&s=10",

        link: "",

        categoria: "Design e interface",

        demonstracao: true
    }
];


/* ---------------------------------------------------------
   3. UTILITÁRIOS DE ACESSIBILIDADE
   --------------------------------------------------------- */

function criarElemento(tag, classe, texto) {
    const elemento = document.createElement(tag);

    if (classe) {
        elemento.className = classe;
    }

    if (texto !== undefined && texto !== null) {
        elemento.textContent = texto;
    }

    return elemento;
}


function atualizarEstadoMenu(aberto) {
    menuToggle.setAttribute("aria-expanded", String(aberto));

    menuToggle.setAttribute(
        "aria-label",
        aberto
            ? "Fechar menu de navegação"
            : "Abrir menu de navegação"
    );
}


function fecharMenu() {
    menuPrincipal.classList.remove("is-open");
    atualizarEstadoMenu(false);
}


function exibirFeedback(mensagem, tipo) {
    formFeedback.textContent = mensagem;

    formFeedback.classList.remove("is-success", "is-error");

    if (tipo === "sucesso") {
        formFeedback.classList.add("is-success");
    }

    if (tipo === "erro") {
        formFeedback.classList.add("is-error");
    }
}


/* ---------------------------------------------------------
   4. MENU HAMBÚRGUER
   --------------------------------------------------------- */

function alternarMenu() {
    const menuAberto = menuPrincipal.classList.toggle("is-open");

    atualizarEstadoMenu(menuAberto);
}


function configurarLinksMenu() {
    const linksMenu = menuPrincipal.querySelectorAll("a");

    linksMenu.forEach(function (link) {
        link.addEventListener("click", function () {
            fecharMenu();
        });
    });
}


/*
 * Fecha o menu mobile quando a pessoa pressiona Escape.
 */
function configurarTeclaEscape() {
    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape") {
            fecharMenu();
        }
    });
}


/*
 * Fecha o menu se a tela aumentar para o tamanho de tablet
 * ou computador enquanto o menu mobile estiver aberto.
 */
function configurarRedimensionamentoMenu() {
    window.addEventListener("resize", function () {
        if (window.innerWidth >= 768) {
            fecharMenu();
        }
    });
}


/* ---------------------------------------------------------
   5. SAUDAÇÃO DINÂMICA
   --------------------------------------------------------- */

/*
 * Recebe uma hora entre 0 e 23 e retorna a saudação adequada.
 */
function obterSaudacao(hora) {
    if (hora >= 5 && hora < 12) {
        return "Bom dia";
    }

    if (hora >= 12 && hora < 18) {
        return "Boa tarde";
    }

    return "Boa noite";
}


/*
 * Atualiza a saudação do Hero de acordo com a hora atual.
 */
function atualizarSaudacao() {
    const horaAtual = new Date().getHours();
    const saudacao = obterSaudacao(horaAtual);

    saudacaoElemento.textContent = saudacao + ", que bom ter você aqui!";
}


/* ---------------------------------------------------------
   6. TEMA CLARO E ESCURO
   --------------------------------------------------------- */

/*
 * Atualiza o texto, o símbolo e o estado acessível do botão
 * de tema de acordo com o tema que está ativo.
 */
function atualizarBotaoTema() {
    const temaEscuroAtivo = body.classList.contains("dark-theme");

    const iconeTema = themeToggle.querySelector(".theme-icon");
    const textoTema = themeToggle.querySelector(".theme-label");

    if (temaEscuroAtivo) {
        iconeTema.textContent = "☀";
        textoTema.textContent = "Modo claro";

        themeToggle.setAttribute(
            "aria-label",
            "Ativar tema claro"
        );

        themeToggle.setAttribute("aria-pressed", "true");

    } else {
        iconeTema.textContent = "☾";
        textoTema.textContent = "Modo escuro";

        themeToggle.setAttribute(
            "aria-label",
            "Ativar tema escuro"
        );

        themeToggle.setAttribute("aria-pressed", "false");
    }
}


/*
 * Salva a preferência de tema no armazenamento local do navegador.
 * Se o armazenamento estiver indisponível, o site continua funcionando.
 */
function salvarPreferenciaTema(tema) {
    try {
        localStorage.setItem("jenniferPortfolioTema", tema);
    } catch (erro) {
        console.warn(
            "Não foi possível salvar a preferência de tema.",
            erro
        );
    }
}


/*
 * Aplica o tema escolhido, atualiza os controles e, opcionalmente,
 * persiste a preferência para as próximas visitas.
 */
function aplicarTema(tema, salvar = true) {
    const temaEscuro = tema === "escuro";

    body.classList.toggle("dark-theme", temaEscuro);

    atualizarBotaoTema();

    const metaThemeColor = document.querySelector(
        'meta[name="theme-color"]'
    );

    if (metaThemeColor) {
        metaThemeColor.setAttribute(
            "content",
            temaEscuro ? "#201c20" : "#f8f5ef"
        );
    }

    if (salvar) {
        salvarPreferenciaTema(temaEscuro ? "escuro" : "claro");
    }
}


/*
 * Recupera a preferência salva anteriormente ou utiliza o tema
 * claro como padrão para quem ainda não escolheu um tema.
 */
function carregarPreferenciaTema() {
    let temaSalvo = null;

    try {
        temaSalvo = localStorage.getItem("jenniferPortfolioTema");
    } catch (erro) {
        console.warn(
            "Não foi possível recuperar a preferência de tema.",
            erro
        );
    }

    if (temaSalvo === "escuro" || temaSalvo === "claro") {
        aplicarTema(temaSalvo, false);
    } else {
        aplicarTema("claro", false);
    }
}


/*
 * Alterna entre os temas claro e escuro ao clicar no botão.
 */
function alternarTema() {
    const temaAtual = body.classList.contains("dark-theme")
        ? "escuro"
        : "claro";

    const novoTema = temaAtual === "escuro"
        ? "claro"
        : "escuro";

    aplicarTema(novoTema);
}


/* ---------------------------------------------------------
   7. CRIAÇÃO DOS FILTROS DE PROJETOS
   --------------------------------------------------------- */

/*
 * Descobre todas as tecnologias presentes nos projetos e cria
 * um botão para cada uma, sem repetir tecnologias.
 */
function criarFiltrosProjetos() {
    const tecnologias = new Set();

    projetos.forEach(function (projeto) {
        projeto.tecnologias.forEach(function (tecnologia) {
            tecnologias.add(tecnologia);
        });
    });

    tecnologias.forEach(function (tecnologia) {
        const botao = criarElemento(
            "button",
            "filter-button",
            tecnologia
        );

        botao.type = "button";
        botao.dataset.filter = tecnologia;
        botao.setAttribute("aria-pressed", "false");

        projectFilters.appendChild(botao);
    });
}


/*
 * Marca visualmente o filtro selecionado e informa seu estado
 * para leitores de tela por meio de aria-pressed.
 */
function atualizarFiltroAtivo(filtroSelecionado) {
    const botoesFiltro = projectFilters.querySelectorAll(
        ".filter-button"
    );

    botoesFiltro.forEach(function (botao) {
        const estaAtivo =
            botao.dataset.filter === filtroSelecionado;

        botao.classList.toggle("active", estaAtivo);

        botao.setAttribute(
            "aria-pressed",
            String(estaAtivo)
        );
    });
}


/* ---------------------------------------------------------
   8. RENDERIZAÇÃO DOS PROJETOS
   --------------------------------------------------------- */

/*
 * Cria uma imagem com descrição acessível e uma aparência
 * alternativa caso o arquivo não possa ser carregado.
 */
function criarImagemProjeto(projeto) {
    const imagem = document.createElement("img");

    imagem.className = "project-image";
    imagem.src = projeto.imagem;

    imagem.alt =
        "Imagem ilustrativa do projeto " + projeto.titulo;

    imagem.width = 900;
    imagem.height = 563;

    imagem.loading = "lazy";
    imagem.decoding = "async";

    imagem.addEventListener("error", function () {
        imagem.removeAttribute("src");
        imagem.alt =
            "Imagem indisponível para o projeto " + projeto.titulo;

        imagem.classList.add("image-unavailable");
    }, { once: true });

    return imagem;
}


/*
 * Monta o cartão completo de um projeto usando elementos DOM
 * e textContent para evitar interpretar textos como HTML.
 */
function criarCardProjeto(projeto, indice) {
    const artigo = criarElemento("article", "project-card");

    artigo.dataset.projectId = String(projeto.id);

    const areaImagem = criarElemento(
        "div",
        "project-image-wrap"
    );

    areaImagem.appendChild(criarImagemProjeto(projeto));

    const etiquetaImagem = criarElemento(
        "span",
        "project-image-label",
        projeto.categoria
    );

    areaImagem.appendChild(etiquetaImagem);

    const conteudo = criarElemento(
        "div",
        "project-content"
    );

    const numero = criarElemento(
        "span",
        "project-number",
        "PROJETO " + String(indice + 1).padStart(2, "0")
    );

    const titulo = criarElemento(
        "h3",
        "project-title",
        projeto.titulo
    );

    const descricao = criarElemento(
        "p",
        "project-description",
        projeto.descricao
    );

    const tecnologias = criarElemento(
        "div",
        "project-technologies"
    );

    tecnologias.setAttribute(
        "aria-label",
        "Tecnologias utilizadas"
    );

    projeto.tecnologias.forEach(function (tecnologia) {
        const etiqueta = criarElemento(
            "span",
            "technology-tag",
            tecnologia
        );

        tecnologias.appendChild(etiqueta);
    });

    conteudo.appendChild(numero);
    conteudo.appendChild(titulo);
    conteudo.appendChild(descricao);
    conteudo.appendChild(tecnologias);

    if (projeto.link) {
        const linkProjeto = document.createElement("a");

        linkProjeto.className = "project-link";
        linkProjeto.href = projeto.link;
        linkProjeto.target = "_blank";
        linkProjeto.rel = "noopener noreferrer";

        linkProjeto.appendChild(
            document.createTextNode("Conhecer projeto ")
        );

        const seta = criarElemento("span", "", "↗");

        seta.setAttribute("aria-hidden", "true");

        linkProjeto.appendChild(seta);

        linkProjeto.setAttribute(
            "aria-label",
            "Conhecer o projeto " + projeto.titulo +
            " em uma nova aba"
        );

        conteudo.appendChild(linkProjeto);

    } else {
        const aviso = criarElemento(
            "p",
            "project-link project-link-disabled",
            "Projeto demonstrativo"
        );

        aviso.setAttribute("aria-label", "Projeto sem link publicado");

        conteudo.appendChild(aviso);
    }

    artigo.appendChild(areaImagem);
    artigo.appendChild(conteudo);

    return artigo;
}


/*
 * Renderiza os projetos usando forEach e atualiza o estado
 * de carregamento da região de projetos.
 */
function renderizarProjetos(listaProjetos = projetos) {
    projectsGrid.replaceChildren();

    projectsGrid.setAttribute("aria-busy", "true");

    if (listaProjetos.length === 0) {
        const mensagemVazia = criarElemento(
            "p",
            "projects-empty",
            "Nenhum projeto encontrado com esse filtro. " +
            "Que tal explorar outra tecnologia? ✨"
        );

        projectsGrid.appendChild(mensagemVazia);

    } else {
        listaProjetos.forEach(function (projeto, indice) {
            const card = criarCardProjeto(projeto, indice);

            projectsGrid.appendChild(card);
        });
    }

    projectsGrid.setAttribute("aria-busy", "false");
}


/* ---------------------------------------------------------
   9. FILTRO DE PROJETOS POR TECNOLOGIA
   --------------------------------------------------------- */

/*
 * Exibe todos os projetos ou somente os que utilizam
 * a tecnologia selecionada.
 */
function filtrarProjetos(tecnologiaSelecionada) {
    const projetosFiltrados = tecnologiaSelecionada === "todos"
        ? projetos
        : projetos.filter(function (projeto) {
            return projeto.tecnologias.includes(
                tecnologiaSelecionada
            );
        });

    atualizarFiltroAtivo(tecnologiaSelecionada);

    renderizarProjetos(projetosFiltrados);
}


/*
 * Escuta os cliques nos filtros e atualiza os cartões
 * de acordo com a tecnologia escolhida.
 */
function configurarFiltrosProjetos() {
    projectFilters.addEventListener("click", function (evento) {
        const botao = evento.target.closest("[data-filter]");

        if (!botao || !projectFilters.contains(botao)) {
            return;
        }

        filtrarProjetos(botao.dataset.filter);
    });
}


/* ---------------------------------------------------------
   10. VALIDAÇÃO DO FORMULÁRIO
   --------------------------------------------------------- */

/*
 * Associa uma mensagem de erro ao campo correspondente,
 * atualiza aria-invalid e limpa o erro quando necessário.
 */
function definirErroCampo(campo, idErro, mensagem) {
    const elementoErro = document.getElementById(idErro);

    elementoErro.textContent = mensagem;

    if (mensagem) {
        campo.setAttribute("aria-invalid", "true");
    } else {
        campo.removeAttribute("aria-invalid");
    }
}


/*
 * Verifica o nome, o e-mail, a mensagem e o consentimento.
 * Impede o envio padrão e apresenta os erros junto aos campos.
 *
 * Esta função realiza validação no navegador. Ela não substitui
 * a validação de um servidor quando houver envio real de dados.
 */
function validarFormulario(evento) {
    evento.preventDefault();

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const mensagem = mensagemInput.value.trim();
    const consentimentoMarcado = consentimentoInput.checked;

    let formularioValido = true;
    let primeiroCampoInvalido = null;

    formFeedback.textContent = "";
    formFeedback.classList.remove("is-success", "is-error");

    definirErroCampo(nomeInput, "nomeErro", "");
    definirErroCampo(emailInput, "emailErro", "");
    definirErroCampo(mensagemInput, "mensagemErro", "");
    definirErroCampo(
        consentimentoInput,
        "consentimentoErro",
        ""
    );

    /*
     * Validação do nome.
     */
    if (nome.length === 0) {
        definirErroCampo(
            nomeInput,
            "nomeErro",
            "Por favor, informe seu nome."
        );

        formularioValido = false;
        primeiroCampoInvalido = primeiroCampoInvalido || nomeInput;

    } else if (nome.length < 2) {
        definirErroCampo(
            nomeInput,
            "nomeErro",
            "Digite pelo menos 2 caracteres para o nome."
        );

        formularioValido = false;
        primeiroCampoInvalido = primeiroCampoInvalido || nomeInput;
    }

    /*
     * Validação básica do e-mail.
     * Verifica a presença de @, ponto e uma estrutura mínima.
     */
    const posicaoArroba = email.indexOf("@");
    const ultimoPonto = email.lastIndexOf(".");

    const emailValido =
        email.length > 0 &&
        posicaoArroba > 0 &&
        email.indexOf("@", posicaoArroba + 1) === -1 &&
        ultimoPonto > posicaoArroba + 1 &&
        ultimoPonto < email.length - 1 &&
        !/\s/.test(email);

    if (email.length === 0) {
        definirErroCampo(
            emailInput,
            "emailErro",
            "Por favor, informe seu e-mail."
        );

        formularioValido = false;
        primeiroCampoInvalido = primeiroCampoInvalido || emailInput;

    } else if (!emailValido) {
        definirErroCampo(
            emailInput,
            "emailErro",
            "Digite um e-mail válido, como voce@exemplo.com."
        );

        formularioValido = false;
        primeiroCampoInvalido = primeiroCampoInvalido || emailInput;
    }

    /*
     * Validação da mensagem.
     */
    if (mensagem.length === 0) {
        definirErroCampo(
            mensagemInput,
            "mensagemErro",
            "Escreva uma mensagem antes de continuar."
        );

        formularioValido = false;
        primeiroCampoInvalido =
            primeiroCampoInvalido || mensagemInput;

    } else if (mensagem.length < 20) {
        definirErroCampo(
            mensagemInput,
            "mensagemErro",
            "Sua mensagem precisa ter pelo menos 20 caracteres."
        );

        formularioValido = false;
        primeiroCampoInvalido =
            primeiroCampoInvalido || mensagemInput;
    }

    /*
     * Validação do consentimento para o uso dos dados.
     */
    if (!consentimentoMarcado) {
        definirErroCampo(
            consentimentoInput,
            "consentimentoErro",
            "Marque a caixa de consentimento para continuar."
        );

        formularioValido = false;
        primeiroCampoInvalido =
            primeiroCampoInvalido || consentimentoInput;
    }

    /*
     * Se houver erro, informa a pessoa e direciona o foco
     * para o primeiro campo que precisa de correção.
     */
    if (!formularioValido) {
        exibirFeedback(
            "Alguns campos precisam de atenção. Confira as mensagens abaixo.",
            "erro"
        );

        if (primeiroCampoInvalido) {
            primeiroCampoInvalido.focus();
        }

        return;
    }

    /*
     * O formulário ainda não possui integração com servidor.
     * A mensagem informa isso de forma transparente.
     */
    exibirFeedback(
        "Tudo certo com os campos! ✨ Este formulário é uma demonstração: " +
        "nenhuma mensagem foi enviada. Para receber contatos de verdade, " +
        "será necessário conectar um serviço de envio.",
        "sucesso"
    );

    contactForm.reset();

    atualizarContadorMensagem();

    definirErroCampo(nomeInput, "nomeErro", "");
    definirErroCampo(emailInput, "emailErro", "");
    definirErroCampo(mensagemInput, "mensagemErro", "");
    definirErroCampo(
        consentimentoInput,
        "consentimentoErro",
        ""
    );

    nomeInput.focus();
}


/* ---------------------------------------------------------
   11. CONTADOR DE CARACTERES
   --------------------------------------------------------- */

/*
 * Mostra a quantidade de caracteres digitados na mensagem.
 */
function atualizarContadorMensagem() {
    const quantidade = mensagemInput.value.length;

    mensagemContador.textContent =
        quantidade + (quantidade === 1
            ? " caractere"
            : " caracteres");
}


/*
 * Remove o erro de um campo assim que a pessoa começa
 * a corrigir seu conteúdo.
 */
function configurarLimpezaDeErros() {
    nomeInput.addEventListener("input", function () {
        definirErroCampo(nomeInput, "nomeErro", "");
    });

    emailInput.addEventListener("input", function () {
        definirErroCampo(emailInput, "emailErro", "");
    });

    mensagemInput.addEventListener("input", function () {
        definirErroCampo(mensagemInput, "mensagemErro", "");
        atualizarContadorMensagem();
    });

    consentimentoInput.addEventListener("change", function () {
        if (consentimentoInput.checked) {
            definirErroCampo(
                consentimentoInput,
                "consentimentoErro",
                ""
            );
        }
    });

    contactForm.addEventListener("input", function () {
        if (formFeedback.textContent) {
            formFeedback.textContent = "";
            formFeedback.classList.remove(
                "is-success",
                "is-error"
            );
        }
    });
}


/* ---------------------------------------------------------
   12. BOTÃO VOLTAR AO TOPO
   --------------------------------------------------------- */

/*
 * Exibe o botão flutuante somente depois que a página
 * tiver sido rolada para baixo.
 */
function atualizarBotaoVoltarTopo() {
    const deveExibir = window.scrollY > 400;

    backToTop.hidden = !deveExibir;
}


/*
 * Leva a pessoa ao início da página respeitando a preferência
 * do navegador por movimento reduzido.
 */
function voltarAoTopo() {
    const movimentoReduzido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
        top: 0,
        behavior: movimentoReduzido ? "auto" : "smooth"
    });
}


/*
 * Configura o evento de rolagem com uma opção passiva,
 * evitando bloquear a rolagem normal da página.
 */
function configurarBotaoVoltarTopo() {
    window.addEventListener(
        "scroll",
        atualizarBotaoVoltarTopo,
        { passive: true }
    );

    atualizarBotaoVoltarTopo();
}


/* ---------------------------------------------------------
   13. ANO AUTOMÁTICO
   --------------------------------------------------------- */

/*
 * Insere o ano atual no rodapé automaticamente.
 */
function atualizarAno() {
    anoAtual.textContent = new Date().getFullYear();
}


/* ---------------------------------------------------------
   14. INICIALIZAÇÃO DO PORTFÓLIO
   --------------------------------------------------------- */

/*
 * Inicializa todas as funcionalidades depois que o HTML
 * já foi interpretado pelo navegador.
 */
function iniciarPortfolio() {
    atualizarSaudacao();

    carregarPreferenciaTema();

    atualizarAno();

    atualizarContadorMensagemInicial();

    configurarLinksMenu();

    configurarTeclaEscape();

    configurarRedimensionamentoMenu();

    criarFiltrosProjetos();

    renderizarProjetos();

    configurarFiltrosProjetos();

    configurarLimpezaDeErros();

    configurarBotaoVoltarTopo();

    atualizarEstadoMenu(false);
}


/*
 * Inicializa o contador da mensagem sem alterar o formulário.
 */
function atualizarContadorMensagemInicial() {
    atualizarContadorMensagem();
}


/* ---------------------------------------------------------
   15. EVENTOS PRINCIPAIS
   --------------------------------------------------------- */

/*
 * Registra os eventos de clique e envio necessários para
 * controlar o menu, o tema e o formulário.
 */
menuToggle.addEventListener("click", alternarMenu);

themeToggle.addEventListener("click", alternarTema);

contactForm.addEventListener("submit", validarFormulario);

backToTop.addEventListener("click", voltarAoTopo);


/* ---------------------------------------------------------
   16. EXECUÇÃO
   --------------------------------------------------------- */

iniciarPortfolio();
