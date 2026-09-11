# 🔐 Prova — Investigação Forense em Segurança

**Duração:** 2 horas · **Valor:** 10,0 pontos · **Formato:** prático com Docker · **Entrega:** 6 screenshots + relatório

> Este é o **único documento** que você precisa ler. Ele tem tudo: cenário, setup, as 4 etapas
> com os comandos exatos, como entregar e o troubleshooting. Leia de cima a baixo com o terminal
> aberto ao lado.

---

## Cenário

Você é um **analista de segurança**. Um arquivo suspeito foi interceptado na rede. Sua missão é descobrir:

1. **O QUE foi roubado?** — dados ocultos no arquivo
2. **COMO foi feito?** — qual criptografia protegia os dados
3. **ONDE está a falha?** — a vulnerabilidade no código
4. **COMO mitigar?** — as recomendações

A prova tem **4 etapas em sequência fixa**. Cada uma pede 2 screenshots e alimenta o relatório final.

| Etapa | Tema | Tempo | Nota |
|---|---|---|---|
| 1 | Análise forense (esteganografia) | 30 min | 2,0 |
| 2 | Quebra de criptografia | 35 min | 2,5 |
| 3 | Análise de código (SAST) | 35 min | 2,5 |
| 4 | Relatório | 20 min | 3,0 |

---

## Setup (uma vez, ~5 min)

**Pré-requisitos:** Docker Desktop instalado e aberto

**1. Confirme que o Docker funciona:**
```bash
docker --version
```

**2. Builde a imagem com todas as ferramentas** (ExifTool, Steghide, John, OpenSSL, Semgrep — uma imagem só, build único):
```bash
docker build -t toolbox docker/toolbox/
```

**3. Entre no container.** Use o **PowerShell** (não o `cmd.exe`). Para diferenciar: o PowerShell começa a linha com `PS C:\...>`, o cmd com só `C:\...>`.
```powershell
docker run -it --rm -v "$(pwd):/work" toolbox bash
cd /work
```
Se só tiver `cmd.exe`, troque `$(pwd)` por `%cd%`:
```cmd
docker run -it --rm -v "%cd%:/work" toolbox bash
```

A partir daqui, **todos os comandos das etapas rodam dentro desse terminal** — não precisa mais
prefixar nada com `docker run`. Se fechar o terminal, é só entrar de novo com o mesmo comando;
nada se perde, porque `/work` é a sua pasta real montada no container.

---

##  Etapa 1 — Análise Forense (30 min · 3,0 pts)

**Objetivo:** extrair os dados ocultos em `evidencia/evidencia.jpg`.

**1.1 — Metadados com ExifTool:**
```bash
exiftool evidencia/evidencia.jpg
```

📸 **Screenshot 1:** `etapa1-exiftool.png` (o output do ExifTool na tela).

**1.2 — Extrair o payload com Steghide.** A senha de embedding é **vazia** (aperte Enter / passe `-p ""`):
```bash
steghide extract -sf evidencia/evidencia.jpg -xf evidencia/extracted.bin -p ""
```
O sucesso aparece como `wrote extracted data to "evidencia/extracted.bin"`. Confirme o arquivo:
```bash
ls -lh evidencia/extracted.bin
```

📸 **Screenshot 2:** (a mensagem de sucesso da extração mostrando o resultado do comando - sugestão: salve dentro de uma pasta `screenshots/)

**❓ Questão da Etapa 1:** o que você viu nos metadados? Descreva 3 anomalias.

---

## 🔐 Etapa 2 — Quebra de Criptografia (35 min · 2,5 pts)

** Cenário:** ao vasculhar o backup de banco de dados comprometido, você recuperou o hash SHA-256 da senha que o atacante usou para cifrar os dados exfiltrados — o arquivo `setup/hash-sha256.txt`. Ter o hash não é ter a senha: você precisa **quebrá-lo offline**, testando candidatos até um deles gerar o mesmo hash. É exatamente assim que vazamentos reais
expõem senhas a partir de dumps de banco. E como esse hash é `sha256` puro, **sem salt e com algoritmo rápido**, o ataque por wordlist é viável em segundos (guarde isso para a Remediação).

**Objetivo:** o `extracted.bin` está criptografado com AES-256, protegido por essa mesma senha. Quebre o hash para descobrir a senha e então descriptografe o arquivo.

**2.1 — Quebrar o hash com John the Ripper:**
```bash
john --format=raw-sha256 setup/hash-sha256.txt --wordlist=setup/wordlist_comum.txt
```
O John testa cada senha da wordlist contra o hash e mostra a senha encontrada na tela (leva menos de 1 segundo — a wordlist é pequena). Anote a senha.

📸 **Screenshot 3:** `etapa2-john.png` (a senha encontrada bem visível).

**2.2 — Descriptografar com OpenSSL** (troque `COLOQUE_A_SENHA` pela senha do John):
```bash
openssl enc -d -aes-256-cbc -pbkdf2 -in evidencia/extracted.bin -k "COLOQUE_A_SENHA" -S "0102030405060708"
```
> ⚠️ O `-S "0102030405060708"` é **obrigatório**. Sem ele o OpenSSL falha com `bad magic number`.

Se a senha estiver certa, aparece texto legível começando com `[CONFIDENCIAL] ROUBO DE DADOS`.
Opcional, salvar para referência: acrescente `> evidencia/dados-roubados.txt` no fim do comando.

📸 **Screenshot 4:** `etapa2-openssl.png` (os dados descriptografados na tela).

**❓ Questão da Etapa 2:** qual era a senha? Quanto tempo levou, e por que a wordlist funcionou?

---

##  Etapa 3 — Análise de Código / SAST (35 min · 2,5 pts)

**Objetivo:** descobrir qual vulnerabilidade em `vulnerable-code/` permitiu o roubo.

**3.1 — Rodar o Semgrep** com o ruleset offline da prova:
```bash
semgrep --config=setup/semgrep-nodejs.yml vulnerable-code/
```
Esse ruleset (`setup/semgrep-nodejs.yml`) roda **100% offline**, não baixa nada da internet. Para
salvar em JSON, acrescente `--json > semgrep-report.json`. O scanner lista os findings com o
arquivo e o número da linha de cada um.

> 💡 Existe o ruleset online `--config=p/owasp-top-ten`, mas ele baixa regras de `semgrep.dev`

📸 **Screenshot 5:** `etapa3-semgrep.png` (o relatório do Semgrep com os findings).

**3.2 — Capturar o código.** Abra `vulnerable-code/app.js` no seu editor (fora do container, é um
arquivo normal), vá até a linha que o Semgrep apontou como mais crítica e destaque-a.

📸 **Screenshot 6:** `etapa3-codigo.png` (o trecho vulnerável com a linha destacada).

**❓ Questão da Etapa 3:** qual é a vulnerabilidade principal? Em qual arquivo e linha? Como ela permite o roubo de dados?

---

## Etapa 4 — Relatório (20 min · 2,0 pts)

Copie o template para o nome de entrega e preencha (fora do container, é um arquivo normal):

O template é seu roteiro campo a campo. Seções obrigatórias (0,5 cada):

1. **Resumo Executivo** (3-5 linhas): o que aconteceu, impacto, recomendação de 1 linha.
2. **Timeline do Ataque:** conecte as 3 etapas — dados ocultos onde → senha encontrada → vulnerabilidade explorada.
3. **Análise Técnica:** esteganografia (ferramenta/como), criptografia (tipo/força), código (vulnerabilidade específica).
4. **Remediação:** como corrigir o código e como detectar esse ataque em produção.

---

## Como Entregar

Monte a pasta `prova-RM/` (seu sobrenome) com **exatamente** esta estrutura:
```
prova-RM/
├── screenshots/
│   ├── etapa1-exiftool.png
│   ├── etapa1-steghide.png
│   ├── etapa2-john.png
│   ├── etapa2-openssl.png
│   ├── etapa3-semgrep.png
│   └── etapa3-codigo.png
└── RELATORIO_PROVA.md
```

Compacte e entregue **`prova-RM.zip`**
Suba para o Teams - será aberto um trabalho.

---

## Troubleshooting

| Sintoma | Causa | Solução |
|---|---|---|
| `failed to connect to the docker API` | Docker Desktop não está aberto | Abra o Docker Desktop e espere iniciar |
| `docker: invalid reference format` | `-v` sem aspas | Use `-v "$(pwd):/work"` com aspas |
| `includes invalid characters for a local volume name` | Você está no `cmd.exe` | Use PowerShell, ou `-v "%cd%:/work"` no cmd |
| `cannot open file: evidencia.jpg` | Faltou `cd /work` | Rode `cd /work` depois de entrar no container |
| John não acha a senha | Arquivo errado ou fora do lugar | Confira `setup/hash-sha256.txt` e `setup/wordlist_comum.txt`; a wordlist tem a resposta |
| `bad magic number` no OpenSSL | Esqueceu o `-S` | Repita `-S "0102030405060708"` no decrypt |
| Semgrep `certificate verify failed` | Usou o ruleset online numa rede com proxy | Use `--config=setup/semgrep-nodejs.yml` (offline) |
| Fechou o terminal / saiu do container | Container é `--rm`, some ao sair | Rode `docker run -it --rm -v "$(pwd):/work" toolbox bash` de novo; nada se perde |

---

## Nota e Aprovação

**Total: 10,0 pontos.** Subdivisão por etapa (correção objetiva):

- **Etapa 1 (2,0):** screenshot ExifTool 0,5 · 3 anomalias descritas 1,0 · extração Steghide 1,0 · entende esteganografia 0,5
- **Etapa 2 (2,5):** senha correta pelo John 1,0 · decrypt legível 1,0 · explica por que a wordlist funcionou 0,5
- **Etapa 3 (2,5):** scan executado 0,5 · vuln principal certa (arquivo + linha) 1,0 · explica o roubo 1,0
- **Etapa 4 (3,0):** cada seção obrigatória 0,5

---
Você tem 2 horas. Tire os screenshots conforme avança, não deixe para o fim. **Boa investigação! 🔍🚀**
