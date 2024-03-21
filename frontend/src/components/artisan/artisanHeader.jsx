import PropTypes from 'prop-types'
import './artisan.css'
// attributes === props.attributes
function ArtisanHeader ({ attributes }) {
  const imgUrl = process.env.REACT_APP_IMAGES_URL + attributes.profilePicture?.data?.attributes?.url

  return (
    <>
      <div className='flex flex-row gap-4items-center justify-center'>

        <div className='flex flex-col'>
          <img src={imgUrl} className='rounded-lg ' />
        </div>
        <div className='flex flex-col'>
          <h1>{attributes.name}</h1>
          <h2>{attributes.description}</h2>
        </div>
      </div>
    </>
  )
}
ArtisanHeader.propTypes = {
  attributes: PropTypes.object
}
export default ArtisanHeader
