auth.onAuthStateChanged(user => {
  if (user) {
    if (user.emailVerified) {
      authContainer.classList.add("hidden");
      dashboard.classList.remove("hidden");
      loadImages(); // default view
    } else {
      alert("Please verify your email before accessing the dashboard.");
      auth.signOut();
    }
  } else {
    authContainer.classList.remove("hidden");
    dashboard.classList.add("hidden");
  }
});             




Zikomo Isaac 🙌. Inde, pali njira yosavuta yopangira email verification popanda kusintha kapena kusokoneza ma logic ena mu script.js. Tiyeni tigwiritse ntchito auth observer (onAuthStateChanged) kuti tiziyang'anira ngati user watsimikizidwa.

---

✅ Njira yosavuta: Onjezani izi pansi pa script.js

Izi zimangoyang'anira login status, ndipo zimangotsegula dashboard pokhapokha user atavomerezedwa.

`javascript
auth.onAuthStateChanged(user => {
  if (user) {
    if (user.emailVerified) {
      authContainer.classList.add("hidden");
      dashboard.classList.remove("hidden");
      loadImages(); // default view
    } else {
      alert("Please verify your email before accessing the dashboard.");
      auth.signOut();
    }
  } else {
    authContainer.classList.remove("hidden");
    dashboard.classList.add("hidden");
  }
});
`

---

✅ Zomwe zimachitika:

- ❌ Simusinthira login/register logic iliyonse
- ✅ System imangoyang'anira user status
- ✅ Dashboard imatseguka kokha user atavomerezedwa
- 📧 Verification link imatumizidwa kuchokera ku register logic yomwe ilipo kale

---

🔁 Ngati register logic ilibe sendEmailVerification(), onjezani izi mkati mwa then():

`javascript
auth.createUserWithEmailAndPassword(email, pass)
  .then(userCredential => {
    userCredential.user.sendEmailVerification()
      .then(() => alert("Verification email sent. Please check your inbox."));
  });
`

---

Isaac, izi ndi njira yosavuta, yotetezeka, yosalowetsa chisokonezo mu code yomwe walemba kale. Tiyeni tipitirize kukonza dashboard yokongola, yotetezeka, yothandiza Malawi 💪🔥.

