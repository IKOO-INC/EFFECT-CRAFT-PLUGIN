# EffectCraft — Text Animation Studio (60 preset)

Panel ScriptUI `.jsx` berisi **60 animasi entrance teks** dengan gaya motion graphic yang bersih, minimal, dan terinspirasi bahasa visual Apple. Preset dibuat untuk langsung diterapkan pada satu atau beberapa text layer terpilih.

## Instalasi di EffectCraft

**Cara yang disarankan — pasang sebagai panel:**

1. Buka EffectCraft.
2. Pilih **Effect ▸ Install Effect Plug-in Bundle (Folder)…** (atau menu instalasi bundle yang tersedia di versi Anda), lalu pilih folder repo ini. EffectCraft memasang berkas `.jsx` sebagai ScriptUI panel.
3. Buka panel dari **Window ▸ Text Animation Studio.jsx**. Jika tidak langsung terlihat, periksa submenu panel.
4. Pilih satu atau beberapa text layer di timeline, pindahkan playhead ke waktu mulai yang diinginkan, pilih preset, atur durasi, lalu klik **Apply to Selected Text Layers**. Klik dua kali preset juga langsung menerapkannya.

**Alternatif:** pasang `Text Animation Studio.jsx` melalui **File ▸ Scripts ▸ Install ScriptUI Panel…**. Jika hanya menjalankan berkas melalui **Run Script File…**, panel akan terbuka sebagai palette mengambang.

## Isi panel

- **60 preset**, masing-masing berakhir kembali pada transform asli layer.
- Enam kategori: Fade & Reveal, Slide & Drift, Scale & Pop, Rotate & Flip, Bounce & Spring, dan Apple Signature.
- Pencarian/filter kategori, durasi yang dapat diatur (0,1–20 detik), dan dukungan beberapa layer sekaligus.
- Properti yang dianimasikan: Position, Scale, Opacity, dan Rotation. Semua keyframe dibuat di sekitar playhead saat ini dan dapat di-undo sebagai satu langkah.
- Tidak memerlukan font, footage, plug-in biner, atau dependensi eksternal.

## Catatan

Preset merupakan animasi transform layer secara keseluruhan, bukan animasi per karakter/kata. Efek “Squeeze” menggunakan perubahan skala seragam, bukan rotasi 3D sungguhan. Untuk hasil terbaik, pastikan layer yang dipilih adalah text layer, tidak memiliki expression yang mengendalikan properti transform, dan playhead punya ruang durasi yang cukup setelahnya. Pastikan juga posisi layer memang berada di komposisi yang terlihat—animasi slide menggunakan persentase ukuran composition.

Berkas utama: [`Text Animation Studio.jsx`](./Text%20Animation%20Studio.jsx)
