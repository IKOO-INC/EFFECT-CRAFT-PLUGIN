# EffectCraft — Plugin Panels

## 1. Text Animation Studio

Panel ScriptUI `.jsx` berisi **60 animasi entrance teks** dengan gaya motion graphic yang bersih, minimal, dan terinspirasi bahasa visual Apple. Preset dibuat untuk langsung diterapkan pada satu atau beberapa text layer terpilih.

## Instalasi di EffectCraft

**Cara yang disarankan — pasang sebagai panel:**

1. Buka EffectCraft.
2. Pilih **Effect ▸ Install Effect Plug-in Bundle (Folder)…** (atau menu instalasi bundle yang tersedia di versi Anda), lalu pilih folder repo ini. EffectCraft memasang berkas `.jsx` sebagai ScriptUI panel.
3. Buka panel dari **Window ▸ Text Animation Studio.jsx** atau **Window ▸ Curve Studio.jsx**. Jika tidak langsung terlihat, periksa submenu panel.
4. Di Text Animation Studio, pilih preset pada katalog kartu dua kolom dan klik **Terapkan ke layer**. Di Curve Studio, pilih keyframe di timeline, pilih preset curve atau atur influence/speed sendiri, lalu klik **APPLY CURVE**.

**Alternatif:** pasang masing-masing berkas `.jsx` melalui **File ▸ Scripts ▸ Install ScriptUI Panel…**. Jika hanya menjalankan berkas melalui **Run Script File…**, panel akan terbuka sebagai palette mengambang.

## Isi panel

- **60 preset** dalam enam kategori: Fade & Reveal, Slide & Drift, Scale & Pop, Rotate & Flip, Bounce & Spring, dan Apple Signature.
- Antarmuka katalog bergaya marketplace gelap dengan kartu animasi dua kolom, filter kategori, pencarian, dan halaman katalog.
- Pencarian/filter kategori, durasi yang dapat diatur (0,1–20 detik), dan dukungan beberapa layer sekaligus.
- Animasi standar memakai Position, Scale, Opacity, dan Rotation; **Word-by-Word Drop** memakai text range selector berbasis kata agar setiap kata turun dan muncul berurutan. Keyframe dibuat di sekitar playhead dan bisa di-undo sebagai satu langkah.
- Tidak memerlukan font, footage, plug-in biner, atau dependensi eksternal.

## Catatan

Hampir semua preset menggerakkan seluruh text layer; pengecualiannya adalah **Word-by-Word Drop**, yang menganimasikan teks per kata melalui range selector. Efek “Squeeze” menggunakan perubahan skala seragam, bukan rotasi 3D sungguhan. Untuk hasil terbaik, pastikan layer yang dipilih adalah text layer, tidak memiliki expression yang mengendalikan properti transform, dan playhead punya ruang durasi yang cukup setelahnya. Pastikan juga posisi layer memang berada di komposisi yang terlihat—animasi slide menggunakan persentase ukuran composition.

## 2. Curve Studio

Panel kurva easing dengan editor grafik bercahaya, kontrol **Out/In Influence** dan **Out/In Speed**, serta delapan preset: Linear, Soft S, Ease In, Ease Out, Ease In-Out, Snappy, Gentle, dan Overshoot. Pilih mode sisi **In & Out**, **In only**, atau **Out only**, lalu terapkan ke keyframe terpilih sebagai satu langkah undo. Speed preset dihitung relatif terhadap kecepatan rata-rata segmen tiap properti.

Berkas utama: [`Text Animation Studio.jsx`](./Text%20Animation%20Studio.jsx) · [`Curve Studio.jsx`](./Curve%20Studio.jsx)
