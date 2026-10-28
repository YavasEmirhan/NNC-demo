#!/usr/bin/env python3
"""Build the Ship's Log.

Reads assets/data/articles.json and:
  1. writes a static, indexable page for every entry in log/<slug>.html,
  2. writes log/index.html (the list of entries),
  3. refreshes the ARTICLES list inside assets/js/app.js,
  4. writes sitemap.xml and robots.txt.

Usage (from the repository root):
    python3 tools/build-log.py https://YOUR-USERNAME.github.io/navynight-site/
The URL is the public address of the site, with a trailing slash. It is only used
for sitemap.xml, robots.txt and canonical links.
"""
import json, re, sys, html, os, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = (sys.argv[1] if len(sys.argv) > 1 else "https://YOUR-USERNAME.github.io/navynight-site/").rstrip("/") + "/"
A = json.load(open(os.path.join(ROOT, "assets/data/articles.json"), encoding="utf-8"))
A.sort(key=lambda a: a["date"], reverse=True)
LH = open(os.path.join(ROOT, "assets/img/lighthouse.svg"), encoding="utf-8").read()
LH_PATHS = re.search(r'<g fill="#f7f5ef">(.*)</g>', LH, re.S).group(1)
e = lambda s: html.escape(s, quote=True)

def nice(d):
    return datetime.date.fromisoformat(d).strftime("%B %-d, %Y")

def body(a):
    out = []
    for b in a["body"]:
        if "h" in b: out.append(f"<h2>{e(b['h'])}</h2>")
        elif "ul" in b: out.append("<ul>" + "".join(f"<li>{e(x)}</li>" for x in b["ul"]) + "</ul>")
        else: out.append(f"<p>{e(b['p'])}</p>")
    return "\n        ".join(out)

def card(a, prefix=""):
    return (f'<a class="jr-card" href="{prefix}{a["slug"]}.html"><div class="jr-meta label"><span>{e(a["tag"])}</span>'
            f'<span>{nice(a["date"])}</span></div><h3 class="h3">{e(a["title"])}</h3><p>{e(a["dek"])}</p>'
            f'<span class="jr-more">Read entry <span>→</span></span></a>')

def page(title, desc, canonical, main, extra_head=""):
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{canonical}">
<meta name="theme-color" content="#071726">
<meta property="og:type" content="article">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<link rel="icon" href="../assets/img/lighthouse.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anek+Latin:wdth,wght@75..125,300..800&display=swap">
<link rel="stylesheet" href="../assets/css/style.css">
{extra_head}</head>
<body>
<div class="pt" id="pt" aria-hidden="true"><span class="pt-beam"></span></div>
<script>/* page transition: the same lighthouse beam as the main site */
(function(){{var pt=document.getElementById("pt"),b=pt.firstElementChild,ms=760;
if(matchMedia("(prefers-reduced-motion: reduce)").matches||!pt.animate){{pt.hidden=true;return}}
function beam(){{b.animate([{{transform:"translateX(110vw) skewX(-14deg)"}},{{transform:"translateX(-60vw) skewX(-14deg)"}}],{{duration:ms,easing:"cubic-bezier(.45,0,.25,1)"}})}}
pt.style.opacity=1;beam();pt.animate([{{opacity:1}},{{opacity:1,offset:.25}},{{opacity:0}}],{{duration:ms*.8,easing:"ease-out"}}).onfinish=function(){{pt.hidden=true;pt.style.opacity=""}};
document.addEventListener("click",function(e){{var a=e.target.closest("a[href]");if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target||a.hasAttribute("download"))return;
var u=new URL(a.href,location.href);if(u.origin!==location.origin||(u.pathname===location.pathname&&u.hash))return;
e.preventDefault();pt.hidden=false;beam();try{{sessionStorage.setItem("nnc-pt","1")}}catch(_){{}}
pt.animate([{{opacity:0}},{{opacity:1}}],{{duration:ms*.45,easing:"cubic-bezier(.5,0,.3,1)",fill:"forwards"}}).onfinish=function(){{location.href=a.href}}}});
addEventListener("pageshow",function(e){{if(e.persisted){{pt.getAnimations().forEach(function(x){{x.cancel()}});pt.hidden=true}}}});}})();</script>
<a class="skip" href="#main">Skip to content</a>
<header class="site-head solid">
  <div class="wrap head-in">
    <a class="brand" href="../index.html" aria-label="Navy Night Creative, home"><img src="../assets/img/logo-light.svg" alt="Navy Night Creative" width="150" height="30"></a>
    <nav class="nav static-nav" aria-label="Main">
      <a href="../index.html#work">Work</a><a href="../index.html#services">Services</a><a href="index.html" aria-current="true">Log</a>
      <a class="btn" href="../index.html#contact">Start a project</a>
    </nav>
  </div>
</header>
<main id="main">
{main}
</main>
<footer class="foot">
  <div class="wrap">
    <div class="foot-bottom"><span>© {datetime.date.today().year} Navy Night Creative</span><span class="label">Light characteristic · Fl(2) 6s</span><a href="../index.html">Back to the site ↑</a></div>
  </div>
</footer>
</body>
</html>
'''

os.makedirs(os.path.join(ROOT, "log"), exist_ok=True)
for a in A:
    url = f"{SITE}log/{a['slug']}.html"
    more = [x for x in A if x is not a][:2]
    ld = json.dumps({"@context": "https://schema.org", "@type": "Article", "headline": a["title"], "description": a["dek"],
                     "datePublished": a["date"], "author": {"@type": "Organization", "name": "Navy Night Creative"},
                     "publisher": {"@type": "Organization", "name": "Navy Night Creative"}, "mainEntityOfPage": url}, ensure_ascii=False)
    main = f'''<article>
  <header class="ph short"><div class="ph-img" aria-hidden="true" style="background:url('../assets/img/headers/hdr-wide.jpg') center 42%/cover no-repeat"></div><div class="wrap ph-in"><a class="back" href="index.html">← Ship's Log</a><span class="label gold">{e(a["tag"])}</span>
    <h1 class="big" style="font-size:clamp(2.6rem,6.4vw,5.4rem);max-width:18ch">{e(a["title"])}</h1><p class="lede">{e(a["dek"])}</p>
    <div class="art-meta label"><span>{nice(a["date"])}</span><span>{e(a["read"])}</span><span>Navy Night Creative</span></div></div></header>
  <div class="wrap"><div class="art art-body">
        {body(a)}
  </div></div>
  <section class="cream" style="padding-block:clamp(56px,9vh,100px)"><div class="wrap"><span class="label eyebrow">More from the log</span>
    <div class="jr-grid" style="grid-template-columns:repeat(2,minmax(0,1fr))">{"".join(card(x) for x in more)}</div></div></section>
</article>
<section class="cta-band cream"><div class="wrap"><h2 class="big">Let's put this<br>to work.</h2><a class="btn dark" href="../index.html#contact">Start a project ↗</a></div></section>'''
    open(os.path.join(ROOT, "log", a["slug"] + ".html"), "w", encoding="utf-8").write(
        page(f"{a['title']} · Navy Night Creative", a["dek"], url, main, f'<script type="application/ld+json">{ld}</script>\n'))

rows = "".join(f'<a class="jr-row" href="{a["slug"]}.html"><span class="label gold">{nice(a["date"])}</span><div><h2 class="h3">{e(a["title"])}</h2><p>{e(a["dek"])}</p></div><span class="label muted">{e(a["tag"])}</span></a>' for a in A)
idx = f'''<article><header class="ph short"><div class="ph-img" aria-hidden="true" style="background:url('../assets/img/headers/hdr-wide.jpg') center 42%/cover no-repeat"></div><div class="wrap ph-in"><a class="back" href="../index.html#journal">← Home</a><span class="label gold">Ship's Log</span><h1 class="big">Notes from<br>the bridge</h1>
  <p class="lede">Short, practical notes on marketing for local and growing businesses.</p></div></header><div style="height:clamp(32px,6vh,64px)"></div>
  <div class="wrap jr-list">{rows}</div></article>'''
open(os.path.join(ROOT, "log", "index.html"), "w", encoding="utf-8").write(
    page("Ship's Log · Navy Night Creative", "Short, practical notes on marketing for local and growing businesses.", f"{SITE}log/", idx))

# keep the list inside app.js in step with the JSON
app = os.path.join(ROOT, "assets/js/app.js")
s = open(app, encoding="utf-8").read()
s, n = re.subn(r"const ARTICLES=\[.*?\];\n", "const ARTICLES=" + json.dumps(A, ensure_ascii=False) + ";\n", s, count=1, flags=re.S)
if n: open(app, "w", encoding="utf-8").write(s)

urls = [SITE, f"{SITE}color-atelier/", f"{SITE}log/"] + [f"{SITE}log/{a['slug']}.html" for a in A]
open(os.path.join(ROOT, "sitemap.xml"), "w").write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    "".join(f"  <url><loc>{u}</loc></url>\n" for u in urls) + "</urlset>\n")
open(os.path.join(ROOT, "robots.txt"), "w").write(f"User-agent: *\nAllow: /\n\nSitemap: {SITE}sitemap.xml\n")
print(f"Ship's Log built: {len(A)} entries, sitemap for {SITE}")
