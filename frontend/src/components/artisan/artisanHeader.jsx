import PropTypes from 'prop-types'
import './artisan.css'
// attributes === props.attributes
function ArtisanHeader ({ attributes }) {
  let imgUrl = '/path/to/default/image.jpg' // Mettez ici votre image par défaut

  // Vérifier si 'data' est présent dans l'objet 'profilePicture'
  if (attributes.profilePicture?.data?.attributes?.url) {
    imgUrl = `${process.env.REACT_APP_IMAGES_URL}${attributes.profilePicture.data.attributes.url}`
  } else if (attributes.profilePicture?.url) {
    imgUrl = `${process.env.REACT_APP_IMAGES_URL}${attributes.profilePicture.url}`
  }
  return (
    <>
      <div className='flex flex-row gap-4 items-center justify-center'>
        <div className='flex flex-col'>
          <img src={imgUrl} className='rounded-lg ' />
        </div>
        <div className='flex flex-col text-start '>
          <h1 className=' text-primary-500 my-4'>{attributes.name}</h1>
          <h2 className='my-4'>{attributes.description}</h2>
        </div>
      </div>
    </>
  )
}
ArtisanHeader.propTypes = {
  attributes: PropTypes.object
}
export default ArtisanHeader
