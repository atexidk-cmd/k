(function(){
var CH=100000,BK="rescueParts";
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
function sizes(){
var a=[],i,k;
for(i=0;i<localStorage.length;i++){k=localStorage.key(i);if(/^bunny/i.test(k))a.push([k,(localStorage.getItem(k)||"").length])}
a.sort(function(x,y){return y[1]-x[1]});
return a.slice(0,3).map(function(x){return x[0]+": "+x[1]}).join(", ")}
function parts(){
var s=collect(),n=Math.ceil(s.length/CH)||1,a=[],i;
for(i=0;i<n;i++)a.push("[["+(i+1)+"/"+n+"]]"+s.slice(i*CH,(i+1)*CH));
return {list:a,total:s.length}}
function stored(){try{return JSON.parse(localStorage.getItem(BK)||"{}")||{}}catch(e){return{}}}
function open(){
var P=parts(),p=document.createElement("div");
p.style.cssText="position:fixed;inset:0;z-index:100000;background:#fff;color:#000;padding:16px;font:15px sans-serif;overflow:auto";
function h(t){var e=document.createElement("h3");e.textContent=t;e.style.margin="14px 0 6px";p.appendChild(e)}
function para(t){var e=document.createElement("p");e.style.cssText="margin:6px 0";e.textContent=t;p.appendChild(e);return e}
function ta(){var t=document.createElement("textarea");t.style.cssText="width:100%;height:90px;font:12px monospace;border:2px solid #000;border-radius:8px;padding:6px;box-sizing:border-box";p.appendChild(t);return t}
function btn(label,fn){var x=document.createElement("button");x.textContent=label;x.style.cssText="margin:6px 6px 0 0;padding:10px 14px;border:2px solid #000;border-radius:12px;background:#C8F135;color:#000;font:700 14px sans-serif";x.onclick=fn;p.appendChild(x);return x}
var t0=document.createElement("h2");t0.textContent="Data rescue";t0.style.margin="0 0 6px";p.appendChild(t0);
para("This phone's data: "+P.total+" characters = "+P.list.length+" part(s). Biggest: "+sizes());
h("A) In the OLD app: copy each part");
para("Tap Copy 1, paste into a note. Then Copy 2, and so on, in a new note each time or one long note.");
var out=ta(),m1=para("");
P.list.forEach(function(s,i){btn("Copy "+(i+1),function(){out.value=s;out.focus();out.select();var ok=false;try{ok=document.execCommand("copy")}catch(e){}m1.textContent=ok?("Copied part "+(i+1)+" of "+P.list.length+". Paste it in your note."):"Long-press the box, Select all, Copy."})});
h("B) In the NEW app: paste each part, then load");
var inp=ta(),m2=para("");
function status(){var s=stored(),have=s.p?Object.keys(s.p).length:0;if(!s.n){m2.textContent="No parts added yet.";return}var miss=[],i;for(i=1;i<=s.n;i++)if(!s.p||!s.p[i])miss.push(i);m2.textContent="Have "+have+" of "+s.n+(miss.length?". Missing: "+miss.join(", "):". All parts here. Tap Load all.")}
btn("Add part",function(){var r=/^\s*\[\[(\d+)\/(\d+)\]\]([\s\S]*)$/.exec(inp.value);if(!r){m2.textContent="Not recognised. Paste one whole part, starting with [[";return}var s=stored();s.n=+r[2];s.p=s.p||{};s.p[r[1]]=r[3];localStorage.setItem(BK,JSON.stringify(s));inp.value="";status()});
btn("Load all",function(){try{var s=stored(),i,j="";for(i=1;i<=s.n;i++){if(!s.p||s.p[i]==null)throw 0;j+=s.p[i]}var o=JSON.parse(j);if(!o||!o.bunnyRescue||!o.data)throw 0;for(var k in o.data)localStorage.setItem(k,o.data[k]);localStorage.removeItem(BK);m2.textContent="Loaded. Reloading...";setTimeout(function(){location.reload()},700)}catch(e){m2.textContent="Not complete or not valid. Check all parts were added."}});
btn("Clear parts",function(){localStorage.removeItem(BK);status()});
btn("Close",function(){p.remove()});
status();
document.body.appendChild(p)}
if(document.body)go();else document.addEventListener("DOMContentLoaded",go)
})();
