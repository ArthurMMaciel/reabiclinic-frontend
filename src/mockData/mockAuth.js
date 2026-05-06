/**
 * Mocks para desenvolvimento local sem backend.
 * Ativado via VITE_MOCK_AUTH=true no .env
 *
 * Cobre: autenticação, profissionais e turnos.
 */

export const MOCK_AUTH_ENABLED = import.meta.env.VITE_MOCK_AUTH === "true";

// ─── Auth ─────────────────────────────────────────────────────────────────────

const MOCK_USERS = [
  {
    login: "arthur",
    senha: "12345",
    payload: {
      sub: 1,
      login: "arthur",
      admin: true,
      especialidade: "administrador",
      nomeCompleto: "Arthur",
    },
  },
];

function buildFakeJWT(payload, type = "access") {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const fullPayload = {
    ...payload,
    type,
    iat: now,
    exp: now + (type === "refresh" ? 3600 : 900),
  };
  const b64url = (obj) =>
    btoa(JSON.stringify(obj))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  return `${b64url(header)}.${b64url(fullPayload)}.mock_sig`;
}

export function mockAutentica(login, senha) {
  return new Promise((resolve, reject) => {
    const user = MOCK_USERS.find(
      (u) => u.login === login && u.senha === senha
    );
    if (!user) {
      reject({ data: { message: "O Login ou a senha está incorreta." } });
      return;
    }
    resolve({
      token_acesso: buildFakeJWT(user.payload, "access"),
      refreshToken: buildFakeJWT(user.payload, "refresh"),
    });
  });
}

// ─── Profissionais ────────────────────────────────────────────────────────────

const MOCK_PROFISSIONAIS = [
  {
    id: 1,
    login: "arthur",
    nomeCompleto: "Arthur",
    email: "arthur@reabi.com",
    especialidade: "Administrador",
    ativo: true,
  },
  {
    id: 2,
    login: "ana.lima",
    nomeCompleto: "Ana Lima",
    email: "ana.lima@reabi.com",
    especialidade: "Fisioterapia",
    ativo: true,
  },
  {
    id: 3,
    login: "carlos.souza",
    nomeCompleto: "Carlos Souza",
    email: "carlos.souza@reabi.com",
    especialidade: "Terapia Ocupacional",
    ativo: true,
  },
  {
    id: 4,
    login: "julia.matos",
    nomeCompleto: "Júlia Matos",
    email: "julia.matos@reabi.com",
    especialidade: "Fonoaudiologia",
    ativo: true,
  },
];

/**
 * Simula GET /usuarios com paginação básica.
 * Retorna { usuarios: [...], contador: number }
 */
export function mockBuscarTodosUsuarios(
  filtro = "",
  colunaOrdem = "",
  ordem = "",
  limit = null,
  offset = null
) {
  return new Promise((resolve) => {
    let lista = [...MOCK_PROFISSIONAIS];

    // Filtro simples por campo
    if (filtro && filtro.field && filtro.value) {
      lista = lista.filter((p) => {
        const val = String(p[filtro.field] ?? "").toLowerCase();
        return val.includes(String(filtro.value).toLowerCase());
      });
    }

    // Ordenação simples
    if (colunaOrdem) {
      lista.sort((a, b) => {
        const av = String(a[colunaOrdem] ?? "");
        const bv = String(b[colunaOrdem] ?? "");
        return ordem === "desc" ? bv.localeCompare(av) : av.localeCompare(bv);
      });
    }

    const contador = lista.length;

    // Paginação
    if (limit) {
      const start = (offset ?? 0) * limit;
      lista = lista.slice(start, start + limit);
    }

    resolve({ usuarios: lista, contador });
  });
}

// ─── Turnos ───────────────────────────────────────────────────────────────────

const MOCK_TURNOS = [
  // Segunda
  { id: 1,  dia_semana: "Segunda",  hora_inicial: "08:00", hora_final: "12:00", id_profissional: 1 },
  { id: 2,  dia_semana: "Segunda",  hora_inicial: "13:00", hora_final: "17:00", id_profissional: 1 },
  // Terça
  { id: 3,  dia_semana: "Terça",    hora_inicial: "08:00", hora_final: "12:00", id_profissional: 2 },
  { id: 4,  dia_semana: "Terça",    hora_inicial: "14:00", hora_final: "18:00", id_profissional: 3 },
  // Quarta
  { id: 5,  dia_semana: "Quarta",   hora_inicial: "07:00", hora_final: "11:00", id_profissional: 1 },
  { id: 6,  dia_semana: "Quarta",   hora_inicial: "13:00", hora_final: "17:00", id_profissional: 4 },
  // Quinta
  { id: 7,  dia_semana: "Quinta",   hora_inicial: "08:00", hora_final: "12:00", id_profissional: 2 },
  // Sexta
  { id: 8,  dia_semana: "Sexta",    hora_inicial: "08:00", hora_final: "12:00", id_profissional: 1 },
  { id: 9,  dia_semana: "Sexta",    hora_inicial: "13:00", hora_final: "17:00", id_profissional: 3 },
  // Sábado
  { id: 10, dia_semana: "Sábado",   hora_inicial: "08:00", hora_final: "12:00", id_profissional: 2 },
];

/**
 * Simula GET /turnos.
 * Retorna array de turnos — mesmo formato que o backend real.
 */
export function mockBuscarTodosHorarios() {
  return Promise.resolve([...MOCK_TURNOS]);
}

// ─── Avisos ───────────────────────────────────────────────────────────────────

const MOCK_AVISOS = [
  {
    id: 1,
    title: "Novo protocolo de higiene para equipamentos",
    text: [
      "A partir desta semana, todos os equipamentos de reabilitação devem ser higienizados com álcool 70% antes e após cada atendimento.",
      "O protocolo completo está disponível na pasta de documentos na sala dos profissionais.",
    ],
    tags: ["protocolo", "higiene"],
  },
  {
    id: 2,
    title: "Capacitação: Técnicas de Bobath — Março/2025",
    text: [
      "Está confirmada a capacitação em técnicas de Bobath para fisioterapeutas e terapeutas ocupacionais nos dias 15 e 16 de março, das 8h às 17h.",
      "As inscrições devem ser feitas com a coordenação até o dia 10/03. Vagas limitadas.",
    ],
    tags: ["capacitação", "bobath"],
  },
  {
    id: 3,
    title: "Expansão do horário de atendimento aos sábados",
    text: [
      "A partir do próximo sábado, o horário de atendimento será ampliado para até às 14h, atendendo à demanda crescente de pacientes.",
      "Profissionais interessados em adicionar turno de sábado devem comunicar à coordenação até sexta-feira.",
    ],
    tags: ["horário", "sábado"],
  },
  {
    id: 4,
    title: "Manutenção preventiva dos equipamentos — 10/03",
    text: [
      "No dia 10 de março (segunda-feira) não haverá atendimentos no período da tarde devido à manutenção preventiva dos equipamentos de eletroterapia e ultrassom.",
      "Os pacientes já foram notificados pelo administrativo. Dúvidas, falar com a coordenação.",
    ],
    tags: ["manutenção", "equipamentos"],
  },
];

/**
 * Simula GET /avisos.
 * Retorna array de avisos — mesmo formato que o backend real.
 */
export function mockBuscarAvisos() {
  return Promise.resolve([...MOCK_AVISOS]);
}
