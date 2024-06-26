export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["android-chrome-96x96.png","apple-touch-icon.png","browserconfig.xml","favicon-16x16.png","favicon-32x32.png","favicon.ico","favicon.png","mstile-150x150.png","safari-pinned-tab.svg","site.webmanifest","style.css"]),
	mimeTypes: {".png":"image/png",".xml":"application/xml",".svg":"image/svg+xml",".webmanifest":"application/manifest+json",".css":"text/css"},
	_: {
		client: {"start":"_app/immutable/entry/start.bd1ab434.js","app":"_app/immutable/entry/app.64c94546.js","imports":["_app/immutable/entry/start.bd1ab434.js","_app/immutable/chunks/scheduler.ed9c3e2c.js","_app/immutable/chunks/singletons.a389a647.js","_app/immutable/entry/app.64c94546.js","_app/immutable/chunks/scheduler.ed9c3e2c.js","_app/immutable/chunks/index.12313480.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/contactFormSucces",
				pattern: /^\/contactFormSucces\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/maken",
				pattern: /^\/maken\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/stekjes_overzicht",
				pattern: /^\/stekjes_overzicht\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/workshops",
				pattern: /^\/workshops\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/[slug]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
