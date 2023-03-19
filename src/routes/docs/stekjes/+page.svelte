<h2>Stekjes</h2>

<h3 id="get">GET</h3>

<ul>
  <li>Voor alle stekjes: <a href="/api/v1/stekjes">/api/v1/stekjes</a></li>
  <li>Voor 3 stekjes: <a href="/api/v1/stekjes?first=3">/api/v1/stekjes?first=3</a></li>
  <li>Voor een andere volgorde: <a href="/api/v1/stekjes?orderBy=updatedAt&direction=ASC">/api/v1/stekjes?orderBy=updatedAt&direction=ASC</a></li>
  <li>Gecombineerd: <a href="/api/v1/stekjes?orderBy=updatedAt&direction=ASC&first=5">/api/v1/stekjes?orderBy=updatedAt&direction=ASC&first=5</a></li>
  <li>Voor 1 specifiek stekje: <a href="/api/v1/stekjes?id=clfcqxa340rx30btd3y0xuvq7">/api/v1/stekjes?id=clfcqxa340rx30btd3y0xuvq7</a></li>
</ul>

<h3 id="post">POST</h3>

<p>Voeg een nieuwe stekje toe.</p>

<p>De volgende structuur is vereist:</p>

<pre><code>&lbrace;
	"naam": "..."
&rbrace;</code></pre>

<p>Met als voorbeeld voor een Zonnebloem:</p>

<pre><code>&lbrace;
	"naam": "Zonnebloem"
&rbrace;</code></pre>

<p>De volgende velden zijn niet vereist:</p>

<pre><code>&lbrace;
	"beschrijving": "...",
	"aanmelddatum": "...",
	"landvanherkomst", "..."
&rbrace;</code></pre>

<ul><li>
  <a href="/api/v1/stekjes">/api/v1/stekjes</a>
</li></ul>