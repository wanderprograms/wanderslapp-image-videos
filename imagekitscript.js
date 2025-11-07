<IKContext

  publicKey="public_9iOwyXje/HcKKnLaJQrrrdf2R0o="

  urlEndpoint="https://ik.imagekit.io/wio2rlawfv"

  transformationPosition="path"

  authenticationEndpoint="http://www.yourserver.com/auth">

  // Image component

  <IKImage path="/default-image.jpg" transformation={[{

    "height": "300",

    "width": "400"

  }]} />

  // Image upload

  <IKUpload fileName="my-upload" />

</IKContext>