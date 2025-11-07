🔥 Eya Isaac — tiyeni tikonze reset password UI yomwe imangowonetsa batani lokha pansi pa login form, ndipo user akadina bataniyo, imapanga form yoti alowetse email. Izi zimapangitsa UI kukhala yoyera komanso yosavuta kugwiritsa ntchito.

---

✅ 1. HTML UI yokonzeka

📍 Ikemo izi pansi pa login form:

`html
<!-- 🔁 Reset Password Trigger -->
<div id="resetTrigger">
  <button id="showResetFormBtn">Wayiwala Password?</button>
</div>

<!-- 🔐 Hidden Reset Form -->
<div id="resetFormSection" style="display: none;">
  <input type="email" id="resetEmail" placeholder="Lowetsani email yanu" />
  <button id="resetPasswordBtn">Tuma Email Yosintha Password</button>
  <p id="resetMessage"></p>
</div>
`

---

✅ 2. Code yowonjezera mu script.js

📍 Ikemo pansi pa login logic, kapena kumapeto kwa DOMContentLoaded block:

`js
// 🔁 Show reset form when button is clicked
document.getElementById('showResetFormBtn').addEventListener('click', () => {
  document.getElementById('resetFormSection').style.display = 'block';
  document.getElementById('resetTrigger').style.display = 'none';
});

// 🔐 Handle password reset
document.getElementById('resetPasswordBtn').addEventListener('click', async () => {
  const email = document.getElementById('resetEmail').value.trim();
  const message = document.getElementById('resetMessage');

  if (!email) {
    message.textContent = "⚠️ Lowetsani email yanu kaye.";
    return;
  }

  try {
    await auth.sendPasswordResetEmail(email);
    message.textContent = "✅ Tatumiza email yosintha password. Fufuzani inbox yanu.";
  } catch (error) {
    message.textContent = "❌ Zalephera: " + error.message;
  }
});
`

---

🔐 Zindikirani

- ✅ Batani limangowoneka pansi pa login form
- ✅ Form imabwera user akadina “Wayiwala Password?”
- ✅ Imagwira ntchito pa Firebase Auth — imatumiza email yokhala ndi link yosinthira password

---

💡 Isaac, izi zikuthandiza kuti Wanderslapp ikhale yosavuta kugwiritsa ntchito, yotetezeka, verified. Ukafuna ndikusungira module yokonzeka kapena ndikuthandize kuikapo pa login UI, ndingakuthandize 💪📱. Tiyeni tipange site yako ikhale Airtel-ready, yotetezeka, yokongola.         



/* 🔁 Reset Password Section */
#resetTrigger {
  margin-top: 10px;
  text-align: center;
}

#showResetFormBtn {
  background-color: transparent;
  border: none;
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
  font-size: 14px;
}

#resetFormSection {
  margin-top: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #f9f9f9;
}

#resetFormSection input {
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

#resetPasswordBtn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

#resetPasswordBtn:hover {
  background-color: #218838;
}

#resetMessage {
  margin-top: 8px;
  font-size: 14px;
  color: #333;
}

