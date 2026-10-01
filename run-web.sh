#!/usr/bin/env bash
#
# ============================================================
#  JALANKAN WEBSITE (Next.js frontend)
# ------------------------------------------------------------
#  Cara pakai:
#     bash run-web.sh            -> jalankan mode pengembangan (dev)
#     bash run-web.sh build      -> build untuk produksi
#     bash run-web.sh start      -> jalankan hasil build (setelah build)
# ============================================================

set -e

# Lokasi folder frontend (Next.js)
FRONTEND="$(dirname "$0")/web-sekolah-main/frontend"
cd "$FRONTEND"

echo "Folder : $FRONTEND"

# Install package kalau belum ada
if [ ! -d "node_modules" ]; then
  echo ">> node_modules belum ada, menjalankan npm install..."
  npm install
fi

MODE="${1:-dev}"
case "$MODE" in
  dev)
    echo ">> Menjalankan mode pengembangan..."
    npm run dev
    ;;
  build)
    echo ">> Build untuk produksi..."
    npm run build
    ;;
  start)
    echo ">> Menjalankan hasil build..."
    npm run start
    ;;
  *)
    echo "Mode tidak dikenal: $MODE (pakai dev / build / start)"
    exit 1
    ;;
esac