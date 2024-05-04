import DefaultArtisan from '../assets/default-artisan.webp'
function extractImageUrl (profilePicture) {
  if (profilePicture && profilePicture.data && profilePicture.data.attributes && profilePicture.data.attributes.url) {
    return `${process.env.REACT_APP_API_URL}${profilePicture.data.attributes.url}`
  } else if (profilePicture && profilePicture.attributes && profilePicture.attributes.url) {
    return `${process.env.REACT_APP_API_URL}${profilePicture.attributes.url}`
  } else if (profilePicture && profilePicture.url) {
    return `${process.env.REACT_APP_API_URL}${profilePicture.url}`
  }
  return DefaultArtisan // Assurez-vous que cette URL par défaut est correcte
}

export { extractImageUrl }
