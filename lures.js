rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /media/{docId} {
      allow read, write: if request.auth != null;
    }
  }
}

