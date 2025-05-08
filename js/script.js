// script.js

document.addEventListener("DOMContentLoaded", function () {
  const email = localStorage.getItem("usuarioLogado");
  const bodyAuthRequired = document.body.dataset.auth === "true";
  const authAction = document.getElementById("authAction");
  const userEmail = document.getElementById("userEmail");

  // Redireciona se a página exigir login
  if (bodyAuthRequired && !email) {
    window.location.href = "login.html";
    return;
  }

  // Atualiza navbar com email do usuário e botão de logout
  if (email) {
    if (userEmail) {
      userEmail.classList.remove("d-none");
      userEmail.querySelector("a").textContent = email;
    }
    if (authAction) {
      authAction.innerHTML = '<a class="nav-link" href="#" id="logout">Sair</a>';
      const logoutBtn = document.getElementById("logout");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          localStorage.removeItem("usuarioLogado");
          alert("Você saiu com sucesso.");
          window.location.href = "index.html";
        });
      }
    }
  }

  // Formulário de login
  const formLogin = document.getElementById("form-login");
  if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      if (!email || !senha) {
        alert("Preencha todos os campos.");
        return;
      }

      localStorage.setItem("usuarioLogado", email);
      alert("Login simulado com sucesso!");
      window.location.href = "perfil.html";
    });
  }

  // Formulário de cadastro de usuário
  const formCadastro = document.getElementById("form-cadastro");
  if (formCadastro) {
    formCadastro.addEventListener("submit", function (e) {
      e.preventDefault();
      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const telefone = document.getElementById("telefone").value;
      const senha = document.getElementById("senha").value;

      if (!nome || !email || !telefone || !senha) {
        alert("Preencha todos os campos.");
        return;
      }

      const usuario = { nome, email, telefone };
      localStorage.setItem("usuarioLogado", email);
      localStorage.setItem("perfil", JSON.stringify(usuario));

      alert("Cadastro simulado com sucesso!");
      window.location.href = "perfil.html";
    });
  }

  // Formulário de cadastro profissional
  const formProfissional = document.getElementById("form-cadastro-profissional");
  if (formProfissional) {
    formProfissional.addEventListener("submit", function (e) {
      e.preventDefault();
      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const telefone = document.getElementById("telefone").value;
      const especialidade = document.getElementById("especialidade").value;
      const formacao = document.getElementById("formacao").value;

      if (!nome || !email || !telefone || !especialidade || !formacao) {
        alert("Preencha todos os campos.");
        return;
      }

      const novoProfissional = { nome, email, telefone, especialidade, formacao };
      let profissionais = JSON.parse(localStorage.getItem("profissionais")) || [];
      profissionais.push(novoProfissional);
      localStorage.setItem("profissionais", JSON.stringify(profissionais));

      alert("Cadastro profissional realizado com sucesso!");
      window.location.href = "profissionais.html";
    });
  }

  // Extrato (exclusivo para carteira.html)
  const tabelaExtrato = document.getElementById("extrato-tbody");
  if (tabelaExtrato) {
    const extratoFicticio = [
      { data: '07/05/2025', profissional: 'Maria Silva', servico: 'Cuidados Diários', valor: 'R$ 150,00', status: 'Pago' },
      { data: '05/05/2025', profissional: 'João Oliveira', servico: 'Aplicação de Medicação', valor: 'R$ 80,00', status: 'Pago' },
      { data: '30/04/2025', profissional: 'Ana Souza', servico: 'Acompanhamento', valor: 'R$ 100,00', status: 'Pendente' }
    ];

    function carregarExtrato() {
      const dados = JSON.parse(localStorage.getItem('extrato')) || extratoFicticio;
      tabelaExtrato.innerHTML = '';
      dados.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${item.data}</td>
          <td>${item.profissional}</td>
          <td>${item.servico}</td>
          <td>${item.valor}</td>
          <td>${item.status}</td>
        `;
        tabelaExtrato.appendChild(tr);
      });
    }

    const btnReset = document.getElementById("btn-reset");
    if (btnReset) {
      btnReset.addEventListener("click", () => {
        localStorage.removeItem("extrato");
        carregarExtrato();
      });
    }

    carregarExtrato();
  }

  //  Botão de reset geral
  const btnGlobalReset = document.getElementById("btn-reset-global");
  if (btnGlobalReset) {
    btnGlobalReset.addEventListener("click", function () {
      localStorage.clear();
      alert("Todos os dados foram apagados.");
      location.reload();
    });
  }
});
