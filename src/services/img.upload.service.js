export const uploadService = {
  uploadImg,
}

async function uploadImg(img) {
  const CLOUD_NAME = "did21pz5q"
  const UPLOAD_PRESET = "ak5udk3z"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  try {
    const formData = new FormData()
    formData.append("upload_preset", UPLOAD_PRESET)
    formData.append("file", img)

    const res = await fetch(UPLOAD_URL, {
      method: "POST",
      body: formData,
    })
    const imgUrl = await res.json()
    return imgUrl
  } catch (err) {
    throw err
  }
}
