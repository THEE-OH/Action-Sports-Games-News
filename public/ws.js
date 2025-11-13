self.addEventListener("push", (event) => {
  const data = event.data.json();
  const title = data.title || "New game update!";
  const options = {
    body: data.message || "",
    icon: "/icon-192.png",
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
