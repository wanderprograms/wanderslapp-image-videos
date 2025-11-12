// ✅ Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBBZxCwywnv_ZVXYezOV8IKG6iKWK5sL10",

    authDomain: "studio-ywlo1.firebaseapp.com",

    projectId: "studio-ywlo1",

    storageBucket: "studio-ywlo1.firebasestorage.app",

    messagingSenderId: "791958850921",

    appId: "1:791958850921:web:149be668e7f132e59f41f8"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ✅ ImageKit config
const imagekitPublicKey = "public_9iOwyXje/HcKKnLaJQrrrdf2R0o=";
const imagekitUploadUrl = "https://ik.imagekit.io/wio2rlawfv";

// 🔐 Manual login only
loginBtn.onclick = () => {
  const email = loginEmail.value.trim();
  const pass = loginPassword.value.trim();
  if (!email || !pass) return alert("Please enter both email and password.");
  auth.signInWithEmailAndPassword(email, pass)
    .then(() => {
      authContainer.classList.add("hidden");
      dashboard.classList.remove("hidden");
      loadImages();
    })
    .catch(err => alert(err.message));
};

registerBtn.onclick = () => {
  const email = regEmail.value.trim();
  const pass = regPassword.value.trim();
  if (!email || !pass) return alert("Please enter both email and password.");
  if (!agreeBox.checked) return alert("Please agree to continue.");
  auth.createUserWithEmailAndPassword(email, pass)
    .then(() => {
      authContainer.classList.add("hidden");
      dashboard.classList.remove("hidden");
      loadImages();
    })
    .catch(err => alert(err.message));
};

showRegister.onclick = () => {
  loginSection.classList.add("hidden");
  registerSection.classList.remove("hidden");
};

showLogin.onclick = () => {
  registerSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
};

logoutBtn.onclick = () => {
  auth.signOut();
  authContainer.classList.remove("hidden");
  dashboard.classList.add("hidden");
};

// 🍔 Hamburger toggle
hamburger.onclick = () => navLinks.classList.toggle("hidden");

// 📁 Section switching
navImages.onclick = () => {
  imageGallery.classList.remove("hidden");
  videoGallery.classList.add("hidden");
  loadImages();
};

navVideos.onclick = () => {
  videoGallery.classList.remove("hidden");
  imageGallery.classList.add("hidden");
  loadVideos();
};

// 📤 Upload form toggle
uploadBtn.onclick = () => uploadFormSection.classList.remove("hidden");
closeUpload.onclick = () => uploadFormSection.classList.add("hidden");

// 📤 Upload logic
uploadForm.onsubmit = async (e) => {
  e.preventDefault();

  const file = fileInput.files[0];
  const title = titleInput.value.trim();
  const description = descInput.value.trim();

  if (!file || !title) return alert("Title and file required.");

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("publicKey", imagekitPublicKey);

    const res = await fetch(imagekitUploadUrl, { method: "POST", body: formData });
    const data = await res.json();
    if (!data.url) throw new Error("ImageKit upload failed.");

    const fileType = file.type.startsWith("video") ? "video" : "image";

    await db.collection("media").add({
      title,
      description,
      type: fileType,
      url: data.url,
      likes: 0,
      comments: []
    });

    alert("Upload successful!");
    uploadForm.reset();
    uploadFormSection.classList.add("hidden");
    fileType === "image" ? loadImages() : loadVideos();
  } catch (err) {
    console.error("Upload failed:", err);
    alert("Upload failed: " + err.message);
  }
};

// 🖼️ Load images
function loadImages() {
  imageList.innerHTML = "";
  db.collection("media").where("type", "==", "image").get().then(snapshot => {
    snapshot.forEach(doc => renderMediaCard(doc, imageList));
    setupInteractions();
  });
}

// 🎥 Load videos
function loadVideos() {
  videoList.innerHTML = "";
  db.collection("media").where("type", "==", "video").get().then(snapshot => {
    snapshot.forEach(doc => renderMediaCard(doc, videoList));
    setupInteractions();
  });
}

// 🧱 Render media card
function renderMediaCard(doc, container) {
  const data = doc.data();
  const card = document.createElement("div");
  card.className = "media-card";

  const media = data.type === "video"
    ? `<video src="${data.url}" controls></video>`
    : `<img src="${data.url}" />`;

  const commentsHTML = (data.comments || [])
    .map(c => `<li><strong>${c.user}:</strong> ${c.text}</li>`).join("");

  card.innerHTML = `
    ${media}
    <h3>${data.title}</h3>
    <p>${data.description || ""}</p>
    <button data-id="${doc.id}" class="likeBtn">❤️ ${data.likes || 0}</button>
    <div class="comments">
      <h4>💬 Comments (${data.comments?.length || 0})</h4>
      <ul>${commentsHTML}</ul>
      <input type="text" placeholder="Add comment..." class="commentInput" />
      <button data-id="${doc.id}" class="commentBtn">Send</button>
    </div>
  `;
  container.appendChild(card);
}

// 🧠 Setup like + comment interactions
function setupInteractions() {
  document.querySelectorAll(".likeBtn").forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      const ref = db.collection("media").doc(id);
      await ref.update({ likes: firebase.firestore.FieldValue.increment(1) });
      loadImages();
      loadVideos();
    };
  });

  document.querySelectorAll(".commentBtn").forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      const input = btn.previousElementSibling;
      const text = input.value.trim();
      if (!text) return;

      const user = auth.currentUser?.email || "Anonymous";
      const ref = db.collection("media").doc(id);
      await ref.update({
        comments: firebase.firestore.FieldValue.arrayUnion({ user, text })
      });

      input.value = "";
      loadImages();
      loadVideos();
    };
  });
}
