<?xml version="1.0" encoding="UTF-8"?>
<!-- Purely cosmetic: makes sitemap.xml readable in a browser instead of
     rendering as a blank page. Crawlers ignore it. -->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" encoding="UTF-8" indent="yes"
            doctype-system="about:legacy-compat"/>

<xsl:template match="/">
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>ZPTH — sitemap</title>
  <style>
    @font-face{font-family:'JetBrains Mono';font-weight:400;font-display:swap;
      src:url('fonts/JetBrainsMono-Regular.woff2') format('woff2')}
    @font-face{font-family:'JetBrains Mono';font-weight:600;font-display:swap;
      src:url('fonts/JetBrainsMono-SemiBold.woff2') format('woff2')}
    :root{color-scheme:dark}
    body{margin:0;background:#08080a;color:#f0ede6;
      font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;
      -webkit-font-smoothing:antialiased}
    main{max-width:70ch;margin:0 auto;padding:clamp(26px,5vw,64px) 22px 80px}
    a{color:inherit}
    .back{display:inline-block;font-size:11px;letter-spacing:.09em;color:#8e8a81;
      text-decoration:none;margin-bottom:clamp(28px,5vw,52px)}
    .back:hover{color:#f0ede6}
    h1{font-size:clamp(24px,4vw,34px);font-weight:600;letter-spacing:-.02em;margin:0 0 8px}
    .meta{font-size:11px;letter-spacing:.07em;color:#57544e;margin:0 0 34px}
    table{width:100%;border-collapse:collapse;font-size:13px}
    th{text-align:left;font-size:10px;letter-spacing:.11em;text-transform:uppercase;
      color:#8e8a81;font-weight:400;padding:0 12px 10px 0;
      border-bottom:1px solid rgba(240,237,230,.13)}
    td{padding:12px 12px 12px 0;border-bottom:1px solid rgba(240,237,230,.07);
      vertical-align:top;word-break:break-all}
    td a{text-decoration:none;border-bottom:1px solid rgba(240,237,230,.2)}
    td a:hover{border-color:#f0ede6}
    .num{color:#57544e;white-space:nowrap}
    .note{font-size:11px;line-height:1.6;color:#57544e;margin-top:30px}
  </style>
</head>
<body>
<main>
  <a class="back" href="/">← ZPTH</a>
  <h1>Sitemap</h1>
  <p class="meta">
    <xsl:value-of select="count(s:urlset/s:url)"/> URLs · this page is the XML sitemap,
    styled for reading
  </p>
  <table>
    <tr><th>#</th><th>URL</th><th>Updated</th><th>Freq</th></tr>
    <xsl:for-each select="s:urlset/s:url">
      <tr>
        <td class="num"><xsl:value-of select="position()"/></td>
        <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
        <td class="num"><xsl:value-of select="s:lastmod"/></td>
        <td class="num"><xsl:value-of select="s:changefreq"/></td>
      </tr>
    </xsl:for-each>
  </table>
  <p class="note">Submit this file's address to Google Search Console:
  https://zpth.github.io/sitemap.xml</p>
</main>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
