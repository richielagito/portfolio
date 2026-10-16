# Hosting a project under richielagito.com/&lt;slug&gt;

Each project keeps its own repo and deployment. The portfolio proxies `/<slug>` and `/<slug>/*` to that deployment, so visitors stay on `www.richielagito.com`.

## The convention

The rewrite **keeps the prefix**:

```
www.richielagito.com/<slug>/anything  →  <demo origin>/<slug>/anything
```

So every project must serve itself under `/<slug>` on its own deployment as well. If `https://my-app.vercel.app/<slug>/` works, `www.richielagito.com/<slug>/` works.

Rewrites are generated from `lib/data/projectData.json` in `next.config.mjs`. No other config is needed.

## 1. Make the project serve under `/<slug>`

Use the same slug as in the portfolio JSON (lowercase letters, digits, and hyphens).

**Next.js**

```js
// next.config.mjs
export default { basePath: "/<slug>" };
```

Links made with `next/link` and images made with `next/image` pick this up automatically. Hard-coded `/foo` paths need the prefix added.

**Static HTML / CSS**

Put the site's files inside a `<slug>/` folder in the deploy output, so `index.html` is served at `/<slug>/`. Use relative asset paths (`./style.css`, not `/style.css`).

**Vite (React, Vue, Svelte)**

```js
// vite.config.js
export default { base: "/<slug>/" };
```

For React Router, also set `<BrowserRouter basename="/<slug>">`.

**Angular**

```bash
ng build --base-href /<slug>/
```

**Flask**

Mount the app under the prefix:

```python
from werkzeug.middleware.dispatcher import DispatcherMiddleware
from werkzeug.wrappers import Response

app.wsgi_app = DispatcherMiddleware(Response("Not found", status=404), {"/<slug>": app.wsgi_app})
```

Use `url_for(...)` for links and static files, so the prefix gets added.

Deploy, then confirm `https://<deployment>/<slug>/` loads with its CSS and images.

## 2. Point the portfolio at it

In `lib/data/projectData.json`, set `demo` to the deployment origin (no path), and remove `demoUrl`:

```json
{
  "slug": "aether-lens",
  "demo": "https://aether-lens-aerial.vercel.app"
}
```

The Live demo button now links to `/aether-lens`. Projects that aren't adapted yet can keep an external `demoUrl` instead.

## Reserved slugs

These are taken by the portfolio itself. `next build` fails if a project uses one:

`work`, `api`, `_next`, `projects`, `videos`, `avatar.webp`, `sitemap.xml`, `robots.txt`, `favicon.ico`, `opengraph-image.png`

The list lives in `RESERVED_SLUGS` in `lib/projects.mjs`. Add to it whenever a new top-level route or `public/` file is added.
