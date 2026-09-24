#!/usr/bin/env bash
#
# ============================================================
#  GIT COMMIT & PUSH (auto)
# ------------------------------------------------------------
#  Script bantu: stage semua perubahan -> commit -> push.
#  Dipakai supaya commit punya pesan yang jelas & konsisten
#  sehingga mudah dipahami anggota tim lain.
#
#  Cara pakai (di folder root repo):
#     bash git-commit.sh "<pesan perubahan>"
#
#  Contoh:
#     bash git-commit.sh "tambah halaman Berita di navbar"
#
#  Jika pesan tidak ditulis, script akan meminta input.
# ============================================================

set -e   # berhenti jika ada error

# ---------- 1. Pastikan kita berada di dalam repo git ----------
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "ERROR: folder ini bukan bagian dari repo git."
  exit 1
fi

ROOT=$(git rev-parse --show-toplevel)
echo "Repositori : $ROOT"
echo "Branch     : $(git branch --show-current)"
echo ""

# ---------- 2. Tampilkan kondisi sebelum commit ----------
echo "---- Status saat ini ----"
git status --short
echo ""

# ---------- 3. Cek apakah ada perubahan ----------
CHANGES=$(git status --porcelain)
if [ -z "$CHANGES" ]; then
  echo "TIDAK ADA PERUBAHAN untuk di-commit. Selesai."
  exit 0
fi

# ---------- 4. Ambil pesan commit ----------
MESSAGE="$1"
if [ -z "$MESSAGE" ]; then
  read -r -p "Tulis pesan commit: " MESSAGE
fi
if [ -z "$MESSAGE" ]; then
  echo "ERROR: pesan commit kosong, batal."
  exit 1
fi

# ---------- 5. Stage semua perubahan ----------
echo ""
echo ">> Meng-stage semua perubahan..."
git add .

# ---------- 6. Commit ----------
echo ">> Commit... ($MESSAGE)"
git commit -m "$MESSAGE"

# ---------- 7. Push ke branch asal ----------
BRANCH=$(git branch --show-current)
echo ""
echo ">> Push ke origin/$BRANCH ..."
git push origin "$BRANCH"

# ---------- 8. Selesai ----------
echo ""
echo "SUKSES! Perubahan sudah ter-commit dan ter-push ke GitHub."
echo "Cek di https://github.com/wildan5089pplg1-ops/WebsiteSekolah-add"