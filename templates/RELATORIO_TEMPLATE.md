# 📋 Relatório Técnico — Investigação Forense

**Aluno:** _________________________  
**Matrícula:** _______________________  
**Data da Prova:** ___/___/2026  
**Tempo Total:** ________ min

---

## 📊 1. Resumo Executivo

Descreva em 3-5 linhas o que aconteceu e qual foi o impacto:

> ___________________________________________________________________________
> 
> ___________________________________________________________________________
> 
> ___________________________________________________________________________

---

## 🔍 2. Timeline do Ataque

### Etapa 1️⃣: Análise Forense (Steganografia)

**Onde os dados foram ocultos?**
- Tipo de arquivo: ___________________
- Ferramenta usada: ___________________
- Senha de embedding: ___________________

**Metadados EXIF suspeitos encontrados:**
1. _________________________________________________________________
2. _________________________________________________________________
3. _________________________________________________________________

**Como você identificou os dados ocultos?**
> _____________________________________________________________________

### Etapa 2️⃣: Quebra de Criptografia

**Tipo de criptografia:** ___________________  
**Algoritmo:** ___________________  
**Tamanho de chave:** ___________________  

**Hash SHA-256 inicial:**
```
[Cole aqui o hash]
```

**Senha encontrada:** ___________________

**Tempo para quebrar:** ________ segundos

**Força bruta ou dicionário?** ___________________

**Dados "roubados" contêm:**
- [ ] Credenciais de acesso
- [ ] Dados financeiros
- [ ] Informações de infraestrutura
- [ ] Segredos comerciais

**Liste 3 dados sensíveis encontrados:**
1. _________________________________________________________________
2. _________________________________________________________________
3. _________________________________________________________________

### Etapa 3️⃣: Análise de Código Vulnerável (SAST)

**Ferramenta SAST usada:** [ ] Snyk  [ ] Semgrep  [ ] Outra: __________

**Vulnerabilidade identificada:** ___________________

**Tipo de vulnerabilidade:** (marque todas que se aplicam)
- [ ] Cross-Site Scripting (XSS)
- [ ] SQL Injection (SQLi)
- [ ] Command Injection
- [ ] Insecure Logging
- [ ] Insecure Deserialization
- [ ] Outro: _________________

**Arquivo e linha de código:**
```
arquivo.js : linhas _____ - _____
```

**Código vulnerável (copie a função):**
```javascript
[Cole aqui o código]
```

**CVSS Score:** __________ (Critical/High/Medium/Low)

**Como o atacante explorou essa vulnerabilidade?**
> _____________________________________________________________________
> 
> _____________________________________________________________________

**Passo a passo do ataque:**
1. _________________________________________________________________
2. _________________________________________________________________
3. _________________________________________________________________

---

## 🛡️ 3. Remediação & Defesa

### Como corrigir o código?

**Solução proposta:**
```javascript
// Código corrigido aqui
[Cole código seguro]
```

**Explicação da fix:**
> _____________________________________________________________________

### Como detectar esse ataque em produção?

**Indicadores de Compromisso (IoC):**
1. _________________________________________________________________
2. _________________________________________________________________
3. _________________________________________________________________

**Monitoramento necessário:**
- [ ] IDS/IPS rules
- [ ] SIEM alerts
- [ ] WAF rules
- [ ] Log aggregation
- [ ] Network monitoring

---

## 📈 4. Análise Técnica Profunda

### Steganografia

**Conceito:** Data vs Metadata
> O que é metadata? ________________________________________________
> 
> Como foi usada nesse ataque? _____________________________________

**File Signatures:**
> Qual é a assinatura do arquivo JPG? ______________________________

### Criptografia

**Hash vs Encryption:**
| Aspecto | Hash | Encryption |
|---------|------|-----------|
| Reversível? | ___________ | ___________ |
| Uso | ___________ | ___________ |
| Força | ___________ | ___________ |

**Por que AES-256 é forte mas foi quebrada?**
> _____________________________________________________________________

### SAST - Análise Estática

**O que é SAST e como funciona?**
> _____________________________________________________________________

**Por que esse scanner detectou a vulnerabilidade?**
> _____________________________________________________________________

---

## ⭐ 5. Conclusão

**Este ataque será lembrado por:** (marque)
- [ ] Criatividade na técnica de steganografia
- [ ] Força bruta bem executada
- [ ] Vulnerabilidade crítica no código
- [ ] Falta de logging/monitoring
- [ ] Educativo para futuras defesas

**Lições aprendidas:**
1. _________________________________________________________________
2. _________________________________________________________________
3. _________________________________________________________________

---

## 📸 Anexos: Screenshots Esperadas

Anexe exatamente estes 6 screenshots (mesmos nomes em toda a prova), dentro de `screenshots/`:
- ✅ `etapa1-exiftool.png` (metadados EXIF)
- ✅ `etapa1-steghide.png` (sucesso da extração)
- ✅ `etapa2-john.png` (senha encontrada)
- ✅ `etapa2-openssl.png` (arquivo descriptografado)
- ✅ `etapa3-semgrep.png` (vulnerabilidades encontradas)
- ✅ `etapa3-codigo.png` (código com linha destacada)

---

**Fim do Relatório**

*Assinado em: _____/_____/2026*
