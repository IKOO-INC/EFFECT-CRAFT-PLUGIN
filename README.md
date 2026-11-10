# EffectCraft — Plugin Panels

## 1. Text Animation Studio

Panel ScriptUI `.jsx` berisi **60 animasi entrance teks** dengan gaya motion graphic yang bersih, minimal, dan terinspirasi bahasa visual Apple. Preset dibuat untuk langsung diterapkan pada satu atau beberapa text layer terpilih.

## Instalasi di EffectCraft

**Cara yang disarankan — pasang sebagai panel:**

1. Buka EffectCraft.
2. Pilih **Effect ▸ Install Effect Plug-in Bundle (Folder)…** (atau menu instalasi bundle yang tersedia di versi Anda), lalu pilih folder repo ini. EffectCraft memasang berkas `.jsx` sebagai ScriptUI panel.
3. Buka panel dari **Window ▸ Text Animation Studio.jsx**, **Window ▸ Curve Studio.jsx**, **Window ▸ Motion FX Studio.jsx**, **Window ▸ Apple Card Motion Studio.jsx**, atau **Window ▸ Apple Card Layout Studio.jsx**. Jika tidak langsung terlihat, periksa submenu panel.
4. Di Text Animation Studio, pilih preset dan klik **Terapkan ke layer**. Di Curve Studio, pilih keyframe, pilih preset atau atur influence/speed, lalu klik **APPLY CURVE**. Di Motion FX Studio, pilih layer dan klik kartu FX untuk menambahkan effect stack. Di Apple Card Motion Studio, pilih layer kartu/teks/artwork dan klik preset gerak. Di Apple Card Layout Studio, pilih tipe kartu, isi judul/deskripsi per baris, lalu buat layout editable.

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

## 3. Motion FX Studio

Katalog kartu glow dua kolom berisi effect stack yang terinspirasi workflow Alight Motion: Neon Bloom, Soft Bloom, Dream Blur, Directional Smear, Chromatic Shift, Echo Trails, Wave Warp, Cinematic Vignette, Film Grain, dan Neon RGB. Panel memakai effect native EffectCraft, menerapkan stack ke layer terpilih, lalu parameternya bisa disesuaikan lagi di **Effect Controls**.

Berkas utama: [`Motion FX Studio.jsx`](./Motion%20FX%20Studio.jsx)

## 4. Apple Card Motion Studio

Panel `.jsx` dengan **30 preset animasi card** dalam enam kategori: Slide & Reveal, Scale & Settle, Stack & Cascade, Float & Tilt, Apple Signature, dan Exit / Dismiss. Ada entrance singkat, gerakan deck/cascade, serta tiga exit preset. Default durasi 0,32 detik (sekitar 10 frame di 30 fps) dengan easing halus; overshoot dibuat kecil dan opsional, bukan efek bounce terus-menerus. Atur durasi, jeda stagger, serta urutan layer. Animasi menggunakan keyframe Position, Scale, Opacity, dan Rotation 2D.

Terinspirasi pengukuran Apple Motion skill: animated entry sekitar 8 frame median, dengan cut/slide/fade sebagai gerakan utama dan aksen yang jarang; serta Apple HIG Motion yang menyarankan gerak singkat, bertujuan, presisi, dan tidak mengganggu. Panel ini tidak mengganti atau meraster isi layer. Teks dan artwork tetap editable. Untuk beberapa layer dalam satu kartu yang harus bergerak serempak, set **Jarak stagger = 0**; gunakan stagger di atas 0 untuk masuk bergantian. Preset bekerja pada layer/precomp terpilih; bukan animasi 3D.

### Referensi inspirasi

- [Apple Design skill](https://github.com/emilkowalski/skills/blob/main/skills/apple-design/SKILL.md): motion responsif dan natural, dengan spring serta overshoot secara hemat.
- [Apple Motion skill](https://github.com/IskakovDamir/apple-motion/blob/main/skill/apple-motion/SKILL.md): entry singkat (sekitar 8 frame median), gerak slide/fade yang bersih, dan transisi aksen yang jarang. Preset ini menerjemahkan prinsip tersebut ke keyframe transform EffectCraft.
- [Apple HIG — Motion](https://developer.apple.com/design/human-interface-guidelines/motion): gerak singkat, presisi, bertujuan, serta tidak berlebihan.

Berkas utama: [`Text Animation Studio.jsx`](./Text%20Animation%20Studio.jsx) · [`Curve Studio.jsx`](./Curve%20Studio.jsx) · [`Motion FX Studio.jsx`](./Motion%20FX%20Studio.jsx) · [`Apple Card Motion Studio.jsx`](./Apple%20Card%20Motion%20Studio.jsx)

## 5. Apple Card Layout Studio

Pembuat layout kartu otomatis dengan **20 template berbeda**: Notification / Lock Screen, Settings / Dark UI, Widget / Dashboard, Media Player, App Store Feature, Message Thread, Liquid Glass Control Center, Tab Bar, Toolbar, Segmented Control, Live Activity / Dynamic Island, Spotlight Search, Sidebar Navigation, App Icon Grid, Weather Widget, Finance / Stocks, Smart Stack, Notification Stack, Focus Tile, dan Calendar Event. Pilih tema Light/Dark/Vibrant, jumlah 1–6 kartu, dan susunan kipas atau grid (grid menjadi default dan responsif terhadap orientasi comp). Panel sengaja tidak menampilkan form teks supaya kontrol tetap ringkas; tiap template mengisi teks awal yang relevan dan teksnya diedit langsung di dalam precomp kartu.

Template Liquid Glass ditujukan untuk kontrol/navigation yang mengambang di atas konten, dengan shape transparan yang menunjukkan background comp melalui permukaannya. Ini adalah **aproksimasi visual editable** menggunakan opacity dan highlight shape—bukan blur/refraction native atau implementasi Liquid Glass Apple. Untuk menjaga keterbacaan, gunakan di atas footage/background yang sesuai dan tidak menumpuk terlalu banyak material sekaligus.

Setiap kartu dibuat sebagai precomposition berisi shape vector dan text layer asli yang tetap editable. Di composition utama, kartu-kartu tersusun otomatis dan terpilih setelah dibuat. Double-click precomp untuk mengganti teks, warna, shape, atau elemen lain. Pilih precomp kartu tersebut lalu gunakan Apple Card Motion Studio untuk menerapkan animasi entrance. Semua pembuatan bisa di-undo sebagai satu langkah.

Acuan desain: [Apple HIG — Materials & Liquid Glass](https://developer.apple.com/design/human-interface-guidelines/materials) · [Tab Bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars) · [Sidebars](https://developer.apple.com/design/human-interface-guidelines/sidebars).

Berkas: [`Apple Card Layout Studio.jsx`](./Apple%20Card%20Layout%20Studio.jsx)
