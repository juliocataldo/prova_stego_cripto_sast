FROM kalilinux/kali-rolling

# Kali empacota o John "jumbo" (com raw-sha256 e outros formatos que o
# john/openssl do Debian puro não tem). Um único container com tudo que a
# prova precisa — evita ficar rodando "docker run" separado por ferramenta.
RUN apt-get update && apt-get install -y --no-install-recommends \
      steghide \
      libimage-exiftool-perl \
      imagemagick \
      john \
      openssl \
      python3 \
      python3-pip \
      ca-certificates \
    && pip3 install --no-cache-dir --break-system-packages semgrep \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /work
