if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let a={};const c=e=>n(e,t),o={module:{uri:t},exports:a,require:c};s[t]=Promise.all(i.map((e=>o[e]||c(e)))).then((e=>(r(...e),a)))}}define(["./workbox-75794ccf"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/8hrN6ipLZRDpvzIrJkrIk/_buildManifest.js",revision:"8hrN6ipLZRDpvzIrJkrIk"},{url:"/_next/static/8hrN6ipLZRDpvzIrJkrIk/_middlewareManifest.js",revision:"8hrN6ipLZRDpvzIrJkrIk"},{url:"/_next/static/8hrN6ipLZRDpvzIrJkrIk/_ssgManifest.js",revision:"8hrN6ipLZRDpvzIrJkrIk"},{url:"/_next/static/chunks/171.e9208ef84f4ddc07.js",revision:"8hrN6ipLZRDpvzIrJkrIk"},{url:"/_next/static/chunks/419-c6deeeaec3df75a8.js",revision:"8hrN6ipLZRDpvzIrJkrIk"},{url:"/_next/static/chunks/75fc9c18-c2ffd8d428a8879e.js",revision:"8hrN6ipLZRDpvzIrJkrIk"},{url:"/_next/static/chunks/framework-5f4595e5518b5600.js",revision:"8hrN6ipLZRDpvzIrJkrIk"},{url:"/_next/static/chunks/main-b82de7430d8403b8.js",revision:"8hrN6ipLZRDpvzIrJkrIk"},{url:"/_next/static/chunks/pages/%5Bpage%5D-54dfd51f60d2343d.js",revision:"8hrN6ipLZRDpvzIrJkrIk"},{url:"/_next/static/chunks/pages/_app-be258c3fadd252ef.js",revision:"8hrN6ipLZRDpvzIrJkrIk"},{url:"/_next/static/chunks/pages/_error-89e8e3b9713579cb.js",revision:"8hrN6ipLZRDpvzIrJkrIk"},{url:"/_next/static/chunks/pages/blog-93ae54dfe016bd1b.js",revision:"8hrN6ipLZRDpvzIrJkrIk"},{url:"/_next/static/chunks/pages/blog/%5Bpost%5D-123858479b7305ac.js",revision:"8hrN6ipLZRDpvzIrJkrIk"},{url:"/_next/static/chunks/pages/index-1669153a8649d94a.js",revision:"8hrN6ipLZRDpvzIrJkrIk"},{url:"/_next/static/chunks/pages/sitemap.xml-9c6802a279c36386.js",revision:"8hrN6ipLZRDpvzIrJkrIk"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"8hrN6ipLZRDpvzIrJkrIk"},{url:"/_next/static/chunks/webpack-6a8c89ae3a76a8ec.js",revision:"8hrN6ipLZRDpvzIrJkrIk"},{url:"/_next/static/css/2c4ffbab3c5fb744.css",revision:"8hrN6ipLZRDpvzIrJkrIk"},{url:"/contentstack-readme-logo.png",revision:"b876b33d59cbf5ce3ec7d9242745a7de"},{url:"/contentstack.png",revision:"b876b33d59cbf5ce3ec7d9242745a7de"},{url:"/copy.svg",revision:"b6ed71ceabe5e24a1ae9d3b964c92404"},{url:"/favicon.ico",revision:"9a6e4aaa6e90b763a122b06b12417091"},{url:"/icon/icon-192x192.png",revision:"ca9d675a868e5e2ef3389bf8e9e41ef6"},{url:"/icon/icon-256x256.png",revision:"4f4eed8bd6c5ce7c92ab25bc0f6d6319"},{url:"/icon/icon-384x384.png",revision:"d20f17d829aa3f2a136a2e20c3cd566f"},{url:"/icon/icon-512x512.png",revision:"9e5e8e7e2f879b75d304f2214fd46ac1"},{url:"/json.svg",revision:"7b433b4965ec8546087482b1d0cc21c1"},{url:"/manifest.json",revision:"124ae24a0899cbceafec169e2891adc6"},{url:"/robots.txt",revision:"f77c87f977e0fcce05a6df46c885a129"},{url:"/starter-app.png",revision:"b0383c57ab01d0be2aee3ed14771e519"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
