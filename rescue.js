(function(){
function go(){
var b=document.createElement("button");
b.textContent="Data rescue";
b.style.cssText="position:fixed;left:8px;bottom:130px;z-index:99999;padding:10px 14px;border:2px solid #000;border-radius:14px;background:#fff;color:#000;font:700 14px sans-serif";
b.onclick=open;
document.body.appendChild(b)}
function collect(){
var o={},i,k;
for(i=0;i<localStorage.length;i++){k=localStorage.key(i);if(/^bunny/i.test(k))o[k]=localStorage.getItem(k)}
return JSON.stringify({bunnyRescue:1,data:o})}
function open(){
var p=document.createElement("div");
p.style.cssText="position:fixed;inset:0;z-index:100000;background:#fff;color:#000;padding:16px;font:16px sans-serif;overflow:auto";
p.innerHTML='<h2 style="margin:0 0 8px">Data rescue</h2><p style="margin:0 0 8px">In the OLD app: tap Copy, then paste somewhere safe (Notes). In the NEW app: paste into the box, then tap Load.</p>';
var t=document.createElement("textarea");
t.style.cssText="width:100%;height:42%;font:12px monospace;border:2px solid #000;border-radius:8px;padding:6px;box-sizing:border-box";
t.value=collect();
p.appendChild(t);
function btn(label,fn){var x=document.createElement("button");x.textContent=label;x.style.cssText="margin:10px 8px 0 0;padding:12px 16px;border:2px solid #000;border-radius:12px;background:#C8F135;color:#000;font:700 15px sans-serif";x.onclick=fn;p.appendChild(x)}
var m=document.createElement("p");m.style.cssText="margin:10px 0 0";
btn("Copy",function(){t.focus();t.select();var ok=false;try{ok=document.execCommand("copy")}catch(e){}if(!ok&&navigator.clipboard){navigator.clipboard.writeText(t.value).then(function(){m.textContent="Copied."}).catch(function(){m.textContent="Long-press the box, Select all, Copy."});return}m.textContent=ok?"Copied.":"Long-press the box, Select all, Copy."});
btn("Load",function(){try{var j=JSON.parse(t.value);if(!j||!j.bunnyRescue||!j.data)throw 0;for(var k in j.data)localStorage.setItem(k,j.data[k]);m.textContent="Loaded. Reloading...";setTimeout(function(){location.reload()},600)}catch(e){m.textContent="That text isn't valid. Paste the whole thing."}});
btn("Close",function(){p.remove()});
p.appendChild(m);
document.body.appendChild(p)}
if(document.body)go();else document.addEventListener("DOMContentLoaded",go)
})();
