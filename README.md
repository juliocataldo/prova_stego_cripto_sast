# 🔐 Prova — Investigação Forense em Segurança

Prova prática de segurança (esteganografia → criptografia → SAST → relatório), rodando numa única imagem Docker. Duração 2 horas, valor 10,0.

---

## 👥 Aluno

➡️ **Leia [`PROVA.md`](PROVA.md).** É o documento único da prova: cenário, setup, as 4 etapas com os comandos, entrega e troubleshooting. Não precisa abrir mais nada além dele e do template do relatório.

## 👨‍🏫 Professor

➡️ **Leia [`professor/GUIA-PROFESSOR.md`](professor/GUIA-PROFESSOR.md).** Gerar os artefatos, testar a prova (dry-run), distribuir, conduzir e corrigir. O gabarito está em `professor/gabarito/RESPOSTAS_ESPERADAS.md`.

> A pasta `professor/` inteira é ignorada pelo `.gitignore` — nunca vai para o Git nem chega ao aluno.

---

## 📁 O que o aluno recebe (via `git clone`)

```
prova-investigacao/
├── PROVA.md                    ← documento único da prova
├── evidencia/evidencia.jpg     ← arquivo comprometido
├── setup/
│   ├── hash-sha256.txt         ← hash para o John quebrar
│   ├── wordlist_comum.txt      ← wordlist (a senha está aqui)
│   └── semgrep-nodejs.yml      ← ruleset SAST offline
├── vulnerable-code/            ← código Node.js para o SAST
├── docker/toolbox/Dockerfile   ← imagem com todas as ferramentas
└── templates/
    ├── RELATORIO_TEMPLATE.md   ← preencher e salvar como RELATORIO_PROVA.md
    └── CHECKLIST-ENTREGA.txt   ← verificação antes de entregar
```
