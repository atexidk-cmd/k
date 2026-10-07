// Bunny's Planner - service worker: shows a nudge whenever a push arrives
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) { e.waitUntil(self.clients.claim()); });
function line() {
  var h = new Date().getHours();
  if (h < 11) return ["good morning!", "start with one little tick today"];
  if (h >= 20) return ["almost bedtime", "finish your ticks and wind down"];
  return ["quick check-in", "how are your routines going?"];
}
self.addEventListener("push", function (e) {
  var l = line();
  e.waitUntil(self.registration.showNotification(l[0], {
    body: l[1],
    icon: self.registration.scope + "icon-192.png",
    badge: self.registration.scope + "icon-192.png",
    tag: "bunny-nudge"
  }));
});
self.addEventListener("notificationclick", function (e) {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (cs) {
    for (var i = 0; i < cs.length; i++) { if ("focus" in cs[i]) return cs[i].focus(); }
    return self.clients.openWindow(self.registration.scope);
  }));
});
