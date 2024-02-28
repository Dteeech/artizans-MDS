import PropTypes from 'prop-types'
import './artisan.css'
// attributes === props.attributes
function ArtisanHeader ({ attributes }) {
  const imgUrl = process.env.REACT_APP_IMAGES_URL + attributes.profilePicture?.data?.attributes?.url

  return (
    <>
      <div className='artisan-header'>

        <div className='left-side'>
          <img src={imgUrl} className='artisan-picture' />
        </div>
        <div className='right-side'>
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
