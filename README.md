# EffectCraft — Plugin Panels

## 1. Text Animation Studio

Panel ScriptUI `.jsx` berisi **60 animasi entrance teks** dengan gaya motion graphic yang bersih, minimal, dan terinspirasi bahasa visual Apple. Preset dibuat untuk langsung diterapkan pada satu atau beberapa text layer terpilih.

## Instalasi di EffectCraft

**Cara yang disarankan — pasang sebagai panel:**

1. Buka EffectCraft.
2. Pilih **Effect ▸ Install Effect Plug-in Bundle (Folder)…** (atau menu instalasi bundle yang tersedia di versi Anda), lalu pilih folder repo ini. EffectCraft memasang berkas `.jsx` sebagai ScriptUI panel.
3. Buka panel dari **Window ▸ Text Animation Studio.jsx**, **Window ▸ Curve Studio.jsx**, **Window ▸ Motion FX Studio.jsx**, **Window ▸ Apple Card Motion Studio.jsx**, **Window ▸ Apple Card Layout Studio.jsx**, atau **Window ▸ fyy apple style.jsx**. Jika tidak langsung terlihat, periksa submenu panel.
4. Di Text Animation Studio, pilih preset dan klik **Terapkan ke layer**. Di Curve Studio, pilih keyframe, pilih preset atau atur influence/speed, lalu klik **APPLY CURVE**. Di Motion FX Studio, pilih layer dan klik kartu FX untuk menambahkan effect stack. Di Apple Card Motion Studio, pilih layer kartu/teks/artwork dan klik preset gerak. Di Apple Card Layout Studio, pilih tipe kartu, isi judul/deskripsi per baris, lalu buat layout editable. Di **fyy apple style 1.0.1**, pilih item `.fig` dari dropdown dan klik **PASANG + ANIMASIKAN**; untuk mengedit teks/vector, buka precomp hasil impor.

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

Panel `.jsx` dengan **32 preset animasi card** dalam tujuh kategori: Slide & Reveal, Scale & Settle, Stack & Cascade, Float & Tilt, Apple Signature, Exit / Dismiss, dan Card Expansion. Ada entrance singkat, gerakan deck/cascade, exit, serta **Expand Boundary + Reveal / Collapse to Compact**. Entry default 0,32 detik (sekitar 10 frame di 30 fps); ekspansi memakai 0,48 detik agar isi sempat mengikuti boundary. Overshoot kecil dan opsional, bukan bounce terus-menerus. Atur durasi, jeda stagger, serta urutan layer.

Untuk transisi expansion, pilih precomp **Product / Expandable Card**, lalu terapkan Expand Boundary + Reveal di playhead pada compact state. Preset mengubah ukuran shape boundary di dalam precomp, kemudian memunculkan detail secara berurutan—bukan men-scale seluruh UI; teks dan artwork tidak melar. Gunakan Collapse to Compact ketika precomp sudah berada pada expanded state.

Terinspirasi pengukuran Apple Motion skill: animated entry sekitar 8 frame median, dengan cut/slide/fade sebagai gerakan utama dan aksen yang jarang; serta Apple HIG Motion yang menyarankan gerak singkat, bertujuan, presisi, dan tidak mengganggu. Untuk beberapa layer dalam satu kartu yang harus bergerak serempak, set **Jarak stagger = 0**; gunakan stagger di atas 0 untuk masuk bergantian. Animasi umum menggunakan keyframe Position, Scale, Opacity, dan Rotation 2D.

### Referensi inspirasi

- [Apple Design skill](https://github.com/emilkowalski/skills/blob/main/skills/apple-design/SKILL.md): motion responsif dan natural, dengan spring serta overshoot secara hemat.
- [Apple Motion skill](https://github.com/IskakovDamir/apple-motion/blob/main/skill/apple-motion/SKILL.md): entry singkat (sekitar 8 frame median), gerak slide/fade yang bersih, dan transisi aksen yang jarang. Preset ini menerjemahkan prinsip tersebut ke keyframe transform EffectCraft.
- [Apple HIG — Motion](https://developer.apple.com/design/human-interface-guidelines/motion): gerak singkat, presisi, bertujuan, serta tidak berlebihan.

Berkas utama: [`Text Animation Studio.jsx`](./Text%20Animation%20Studio.jsx) · [`Curve Studio.jsx`](./Curve%20Studio.jsx) · [`Motion FX Studio.jsx`](./Motion%20FX%20Studio.jsx) · [`Apple Card Motion Studio.jsx`](./Apple%20Card%20Motion%20Studio.jsx)

## 5. Apple Card Layout Studio

Pembuat layout kartu otomatis dengan **28 template berbeda**: Notification / Lock Screen, Settings / Dark UI, Widget / Dashboard, Media Player, App Store Feature, Message Thread, Liquid Glass Control Center, Tab Bar, Toolbar, Segmented Control, Live Activity / Dynamic Island, Spotlight Search, Sidebar Navigation, App Icon Grid, Weather Widget, Finance / Stocks, Smart Stack, Notification Stack, Focus Tile, Calendar Event, Wallet / Payment Pass, Apple Pay / Transaction, Product / Compact Card, Product / Expandable Card, App Store / Product Page, Editorial / Story Card, Accessory / Mini Player, dan Home / Control Tile. Pilih tema Light/Dark/Vibrant, jumlah 1–6 kartu, dan susunan kipas atau grid (grid menjadi default dan responsif terhadap orientasi comp). Panel sengaja tidak menampilkan form teks supaya kontrol tetap ringkas; tiap template mengisi teks awal yang relevan dan teksnya diedit langsung di dalam precomp kartu.

Template Liquid Glass ditujukan untuk kontrol/navigation yang mengambang di atas konten, dengan shape transparan yang menunjukkan background comp melalui permukaannya. Ini adalah **aproksimasi visual editable** menggunakan opacity dan highlight shape—bukan blur/refraction native atau implementasi Liquid Glass Apple. Untuk menjaga keterbacaan, gunakan di atas footage/background yang sesuai dan tidak menumpuk terlalu banyak material sekaligus.

Setiap kartu dibuat sebagai precomposition berisi shape vector dan text layer asli yang tetap editable. Tipografi menggunakan hierarki title/body/caption, heading lebih tegas, leading sekitar 1,2×, ukuran minimum yang terjaga, dan wrapping di dalam safe margin kartu. Di composition utama, kartu-kartu tersusun otomatis dan terpilih setelah dibuat. Double-click precomp untuk mengganti teks, warna, shape, atau elemen lain. Pilih precomp kartu tersebut lalu gunakan Apple Card Motion Studio untuk menerapkan animasi entrance. Semua pembuatan bisa di-undo sebagai satu langkah.

Template baru memakai komposisi shape, warna, dan copy generatif sendiri—bukan artwork yang disalin dari Figma, Dribbble, atau aset resmi Apple.

Acuan tipografi: [Typography in App Design — Ramotion](https://www.ramotion.com/blog/typography-in-app-design/) untuk hierarki, kontras, line length, whitespace, responsivitas, dan konsistensi gaya teks.

Acuan desain: [Apple HIG — Materials & Liquid Glass](https://developer.apple.com/design/human-interface-guidelines/materials) · [Tab Bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars) · [Sidebars](https://developer.apple.com/design/human-interface-guidelines/sidebars).

**Riset layout & ekspansi:** [Figma Apple Style Cards](https://www.figma.com/community/file/1123630287600326210/apple-style-cards) dan [Figma Apple UI kit recreation](https://www.figma.com/community/file/1234845281498117038/apple-ui-free-ui-kit-recreated) menjadi referensi hirarki komponen; [Dribbble Apple Card UI](https://dribbble.com/search/apple-card-ui) dipakai sebagai galeri inspirasi, bukan spesifikasi karya tertentu. [DEmotion: Apple-style card expansion](https://trydemotion.com/blog/apple-style-card-expansion-after-effects) menginformasikan desain endpoint compact/expanded, perubahan boundary shape saja, crop/isi tetap terpisah, detail muncul bertahap, dan pemeriksaan midpoint. [Apple Design UI Skills](https://www.ui-skills.com/skills/emilkowalski/apple-design) serta [iOS design guidelines 2025](https://tapptitude.com/blog/i-os-app-design-guidelines-for-2025) menjadi acuan motion ringkas dan natural, depth/translucency yang tetap terbaca, clarity, contrast, dan accessibility.

Berkas: [`Apple Card Layout Studio.jsx`](./Apple%20Card%20Layout%20Studio.jsx)

## 6. fyy apple style — versi 1.0.1

Panel bernama persis **fyy apple style** menyediakan dropdown dari **34 berkas `.fig` per-item** yang dapat diunduh dari folder Drive. Pilih komponen, lalu tekan **PASANG + ANIMASIKAN** untuk membuat precomp dengan path native AE, teks editable, aset gambar asli bila ada, dan stagger entrance. Payload vektor/teks diturunkan dari node `.fig`; file SVG tidak digunakan sebagai sumber.

Komponen hasil impor dipertahankan pada ukuran sumber penuh: panel tidak melakukan auto-fit/scale ke komposisi tujuan, dan tidak menerapkan batas ukuran per elemen. Jika komposisi tujuan lebih kecil, besarkan komposisi tujuan alih-alih mengecilkan atau memotong elemen sumber. Ukuran/transform internal gambar mengikuti data bounds `.fig` agar tampil sesuai tata letak sumber.

Koordinat path Figma (origin kiri-atas) dipusatkan ke anchor shape AE sebelum layer diposisikan—perbaikan terhadap clipping/offset sebelumnya. Label tombol memakai point text dengan anchor tengah agar fallback font tidak memecah kata seperti “Action 2”. PNG yang dirujuk dokumen Activity View disematkan dari image blob `.fig`, ditulis sementara saat impor, lalu dibawa masuk sebagai footage.

**Cakupan sumber yang belum tersedia:** 15 nama dari daftar 43 hanya ada di `Untitled (2).fig` (142,425,014 byte), yang melampaui batas unduh Drive 100 MB; item itu tidak ditampilkan sebagai artwork pengganti. Nama yang belum tercakup: Liquid Glass - Regular - Large; Notification - Collapsed; Notification - Collapsed - List; Notification - Expanded; Page Control; Popup Button; Popovers (iPad Only); Segmented Control; Progress Bar - Indeterminate Circular (Spinner); Progress Bar - Determinate Linear; Sheet - iPhone; Sliders; Tab Bar - iPhone; Tab Bar - iPhone Duo; Tab Bar - iPad. Jika file tersebut dipecah/diunggah sebagai `.fig` yang lebih kecil, katalog dapat dilengkapi.

Batas efek: Figma `GLASS`/refraction dan background blur proprietary belum dipetakan identik; layer GLASS dilewati dan status impor memberi peringatan. Gradient hanya memakai stop warna sumber pertama. SF Pro dipakai bila terpasang; teks tetap native/editable. Path, ukuran, posisi, fill warna, serta gambar berasal dari data `.fig`.

**Validasi:** syntax check seluruh panel dan mock smoke test yang membuat komposisi untuk seluruh 34 entri (termasuk tes anchor path, label Action 2, image import, serta keyframe). Runtime EffectCraft/After Effects belum tersedia untuk verifikasi akhir.

Catatan sizing, screenshot bug glyph, audit template PSD/AI, dan referensi symbol `.fig`: [catatan QA importer](./docs/importer-feedback/README.md).

Berkas: [`fyy apple style.jsx`](./fyy%20apple%20style.jsx)
