# 🔐 Prova — Investigação Forense em Segurança

Prova prática de segurança (esteganografia → criptografia → SAST → relatório), rodando numa única imagem Docker. Duração 2 horas, valor 10,0.

➡️ **Comece por [`PROVA.md`](PROVA.md).** É o documento único da prova: cenário, setup, as 4 etapas com os comandos, entrega e troubleshooting. Além dele, você só usa o template do relatório em `templates/`.

---

## 📁 Estrutura

```
prova-investigacao/
├── PROVA.md                     ← documento único da prova (comece aqui)
├── evidencia/evidencia.jpg      ← arquivo comprometido
├── setup/
│   ├── hash-sha256.txt          ← hash para o John quebrar
│   ├── wordlist_comum.txt       ← wordlist (a senha está aqui)
│   └── semgrep-nodejs.yml       ← ruleset SAST offline
├── vulnerable-code/             ← código Node.js para o SAST
├── docker/toolbox/Dockerfile    ← imagem com todas as ferramentas
└── templates/
    ├── RELATORIO_TEMPLATE.md     ← preencher e salvar como RELATORIO_PROVA.md
    ├── RELATORIO_TEMPLATE.docx   ← versão Word do template
    └── CHECKLIST-ENTREGA.txt     ← verificação antes de entregar
```
