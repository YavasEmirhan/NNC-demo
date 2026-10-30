# Navy Night Creative: "The Voyage"

Navy Night Creative için hazırlanan site. Açılışta bir yolculuk sahnesi var: sisin içinde kaptan köşkünden ileri bakıyoruz, sağda fener yanıp rotamızı aydınlatıyor, kamera camdan çıkıp tekneyi geniş planda gösteriyor. Sahne güçlü bilgisayar ve telefonlarda gerçek zamanlı 3D çalışır; düşük donanım, veri tasarrufu ve WebGL yokluğu için önceden kaydedilmiş video fallback'i vardır.

Altında marka sayfası var: işler, hizmetler, yaklaşım, rota, Ship's Log (yazılar), müşteriler, "Find your heading" pusula testi ve 3 adımlı proje formu. Vaka, hizmet, About ve yazı sayfaları da var.

Saf HTML, CSS ve JavaScript. Build adımı yok, sunucu tarafı kod yok. GitHub Pages'te doğrudan çalışır.

## Klasör yapısı

```
index.html                  Ana sayfa (tüm bölümler)
404.html                    "Lost at sea" sayfası; GitHub Pages bulunamayan adreslerde otomatik gösterir
log/                        Ship's Log yazılarının Google'ın okuyabildiği sabit sayfaları (araçla üretilir)
sitemap.xml, robots.txt     Arama motorları için (araçla üretilir)
assets/css/style.css        Tüm stiller
assets/js/app.js            Site mantığı, pusula testi, Ship's Log, 3D sahne
assets/data/articles.json   Ship's Log yazılarının tek kaynağı
assets/video/               Açılış ve döngü videoları (WebM + MP4) ve kapak görseli
assets/img/                 Logo, fener, proje görselleri, müşteri logoları
assets/vendor/three/        three.js r128 ve parlama efekti dosyaları (MIT lisanslı, projeye dahil)
tools/build-log.py          Ship's Log sayfalarını, sitemap.xml ve robots.txt'yi üreten araç
.nojekyll                   GitHub Pages'in dosyaları olduğu gibi yayınlaması için
```

## GitHub Pages'e yükleme

1. GitHub'da yeni bir repo aç (ör. `navynight-site`).
2. Bu klasörün **içindekileri** reponun köküne yükle. `index.html` en üst seviyede olmalı.
   - Tarayıcıdan: **Add file → Upload files**, tüm dosya ve klasörleri sürükle bırak.
   - Terminalden:
     ```bash
     git init
     git add .
     git commit -m "Navy Night Creative site"
     git branch -M main
     git remote add origin https://github.com/KULLANICI/navynight-site.git
     git push -u origin main
     ```
3. Repo → **Settings → Pages** → Source: "Deploy from a branch", Branch: `main`, klasör `/ (root)`.
4. 1–2 dakika içinde site `https://KULLANICI.github.io/navynight-site/` adresinde açılır.

> `.nojekyll` dosyasını silme. Nokta ile başladığı için gizli görünebilir; yüklerken gittiğinden emin ol.

### Site adresini araca bildir (bir kez)

`sitemap.xml`, `robots.txt` ve yazı sayfalarındaki adresler şu an `https://YOUR-USERNAME.github.io/navynight-site/` olarak duruyor. Gerçek adresi öğrendikten sonra repo klasöründe şunu çalıştır ve değişiklikleri yükle:

```bash
python3 tools/build-log.py https://KULLANICI.github.io/navynight-site/
```

Repo adı `KULLANICI.github.io` ise (kök site), `404.html` içindeki ilk `<script>` satırını silip yerine `<base href="/">` yaz.

## Ship's Log'a yazı eklemek

1. `assets/data/articles.json` dosyasına yeni bir kayıt ekle (`slug`, `tag`, `date`, `read`, `title`, `dek`, `body`). `body` paragraf (`{"p": "..."}`), ara başlık (`{"h": "..."}`) ve madde listesi (`{"ul": ["...", "..."]}`) alır.
2. `python3 tools/build-log.py https://KULLANICI.github.io/navynight-site/` çalıştır. Araç yazı sayfasını üretir, ana sayfadaki listeyi ve sitemap'i günceller.
3. Değişiklikleri GitHub'a yükle.

Şu anki üç yazı taslaktır; yayından önce ajans tarafından okunup onaylanmalı.

## Site nasıl çalışıyor

- **Açılış:** WebGL'i olan yeterince güçlü bilgisayar, telefon ve tabletlerde three.js sahnesi canlı çalışır. Veri tasarrufu açık, düşük donanımlı veya WebGL'siz cihazlarda `assets/video/` içindeki video fallback'i oynar; altyazılar videoyla eş zamanlıdır. Chrome, Firefox ve Android WebM, Safari MP4 alır. Hareket azaltma ayarı açıksa sadece kapak görseli gösterilir.
- **Sinema katmanı (canlı 3D):** Fener hüzmesi sisin içinden geçen hacimli bir ışık olarak çizilir; sis, çisenti ve logo bu ışıkta parlar. Kamera elde tutulmuş gibi hafifçe sallanır. Odak önce dümene, fener görününce uzağa kayar. Fener lambası kontrollü bir yatay lens parlaması bırakır. Render 30 fps sinema ritminde çalışır; HiDPI ölçeği cihazın bellek ve çekirdek sayısına göre seçilir. Sahne uzun süre yavaş kalırsa çözünürlük kademeli düşer, performans toparlandığında tekrar yükselir. Netliği korumak için gren, kromatik sapma, bloom ve alan derinliği sınırlıdır.
- **Fener ışığında logo:** Hüzme rotaya dönerken Navy Night yazısı sisin içinde harf harf belirir. Yeri `renderVoyage` içinde `LOGOQ` satırındadır.
- **Fareyle bakış:** Masaüstünde fare hareket ettikçe kamera çok az o yöne bakar.
- **Kaydırınca geçiş:** Aşağı kaydırdıkça kamera yükselir, görüntü sise gömülür ve lacivert bölüme bağlanır. Video fallback'inde görüntü bulanıklaşarak aynı etkiyi verir.
- **Ses:** Rüzgar, dalga, motor ve çisenti sesleri ile fener göründüğünde uzaktan bir sis düdüğü tarayıcıda kodla üretilir; ses dosyası yoktur. Varsayılan olarak kapalıdır; açılışta ve hero'nun altında "Sound" düğmesiyle açılır. Kaptan köşkünün içindeyken sesler boğuk gelir, kamera dışarı çıkınca açılır.
- **Açılış her ziyarette oynar.** "Skip intro" ile geçilebilir; aşağı kaydırmak veya bir tuşa basmak da açılışı atlar. Bir sayfaya doğrudan link ile gelinirse (ör. `#work`) açılış oynamaz.
- **Işık imzası, Fl(2) 6s:** Fener her 6 saniyede iki kısa parlama yapar. Ritim `app.js` içinde `sigI()`, CSS'te `@keyframes sig` ile tanımlı; değişecekse ikisi birlikte değişmeli.
- **Sayfa geçişi:** Sayfa değişirken ekran kısaca kararır ve sağdan sola bir fener ışığı geçer, yeni sayfa arkasından açılır. Ana sayfa içindeki bölümlere gitmek normal kaydırmadır. Ship's Log sayfaları da aynı geçişi kullanır. Hareket azaltma ayarı açıksa geçiş yapılmaz.
- **Kaydırma hareketi:** Ana sayfada içerik görünür alana girince yumuşakça belirir, "How we steer" kartlarında altın çizgi çizilir, rota numaraları sırayla altına döner. Hareket azaltma ayarı açıksa hepsi doğrudan görünür. Kodu `app.js` içinde "gentle reveal on scroll" bölümünde.
- **Find your heading:** Beş soruluk test, en çok fayda sağlayacak hizmeti önerir ve proje formunu o hizmetlerle doldurur. Sorular ve puanlar `app.js` içinde `CQ` listesinde.

## İçerik nereden değişir

- **Alt sayfa başlık görselleri:** `assets/img/headers/` içinde, 3D sahneden alınmış üç görüntü: `hdr-bow` (hizmetler), `hdr-wheel` (About), `hdr-wide` (Ship's Log). Her birinin telefon için `-1000` ekli küçük bir sürümü var. Vaka sayfaları başlıkta kendi görselini bulanıklaştırarak kullanır.
- **Alt sayfa dokunuşları:** Başlık görsellerindeki fener lambası markanın ışık imzasıyla (Fl(2) 6s) yanar; konumu `HDR_LAMP` içinde. Büyük başlıklar satır satır yükselir. Hizmetler arasında geçerken pusula ibresi eski yönden yeni yöne döner. Hizmet sayfasında aşağı inince sağ altta "Let's talk about …" düğmesi çıkar ve formu o hizmet seçili açar. Vaka sayfalarında görsellerin altında açıklama ve görsellerden çıkarılmış renk paleti vardır (`CASES` içinde `palette`); renge tıklayınca kodu kopyalanır.
- **Hizmetler ve vakalar:** `assets/js/app.js` başındaki `SERVICES` ve `CASES` listeleri. Görseller `assets/img/work/` içinde WebP; her görselin 1000 px ve `-600` ekli 600 px iki boyutu var, tarayıcı ekrana uygun olanı seçer. Yeni görsel eklerken iki boyutu da koy.
- **Ana sayfa metinleri:** `index.html`.
- **Renkler ve yazı tipi:** `assets/css/style.css` başındaki `:root` değişkenleri.

## Google ölçümü (Lighthouse)

Yayından sonra https://pagespeed.web.dev adresine sitenin canlı adresini gir. Geliştirme ortamındaki ölçüm (ekran kartı yok, Google Fonts engelli, sıkıştırma yok) şuydu; canlı sonuç farklı çıkabilir, kontrol edilecek:

| Sayfa | Performans | Erişilebilirlik | En iyi uygulamalar | SEO |
|---|---|---|---|---|
| Ana sayfa, mobil | 97 | 100 | 96 | 100 |
| Ana sayfa, masaüstü (video modu) | 95 | 100 | 96 | 100 |
| Ship's Log yazısı, mobil / masaüstü | 99 / 100 | 100 | 96 | 100 |

"En iyi uygulamalar" 96, çünkü ölçüm ortamı Google Fonts'u engelledi ve konsola hata düştü. Ekran kartlı masaüstünde 3D sahne yüklendiği için masaüstü performans puanı bundan düşük çıkabilir; bu beklenen bir durum.

## Color Atelier (`color-atelier/`)

Sanzo Wada'nın 348 renk kombinasyonunu bir işletmenin işleri üzerinde deneten ücretsiz araç. Tek dosya: `color-atelier/index.html`, veri içine gömülü (dictionary-of-colour-combinations, MIT). Firmaya uyarlamak için sadece dosyanın en üstündeki `CONFIG` bloğu değişir: firma adı, iletişim linki, renkler, alt bandın eşiği, başlangıç kombinasyonu, örnek işletmeler. "Contact us" butonları sitenin formunu açar; form Branding seçili ve mesajında seçilen kombinasyon numarası ile renk kodları yazılı gelir (`?combination=271&colors=...`). Siteden bağlantılar: Work bölümü, Branding ve Creative hizmet sayfaları, altbilgi.

## Bilinmesi gerekenler

- **Form:** GitHub Pages statik olduğu için form gönderim yapmıyor; ziyaretçiye bu söyleniyor ve özet kopyalanabiliyor. Gerçek gönderim için Formspree gibi bir servise bağlanması gerekir (hesap gerekir). Canlı sitedeki Netlify formu burada çalışmaz.
- **Özel alan adı:** Settings → Pages → Custom domain. Site şu an Netlify'da yayında olduğu için patronla konuşulmadan yapılmamalı.
- **Lisanslar:** three.js MIT lisanslıdır (`assets/vendor/three/LICENSE`). Logo ve proje görselleri Navy Night Creative'e aittir.
