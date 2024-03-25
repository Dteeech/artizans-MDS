import PropTypes from 'prop-types'
import { Card, CardBody, CardHeader, Link } from '@nextui-org/react'
function ArtisansListItem ({ artisan }) {
  const { name, description, slug, profilePicture } = artisan.attributes
  const imgUrl = process.env.REACT_APP_IMAGES_URL + profilePicture?.data?.attributes?.url
  return (
    <Card isPressable as={Link} className='max-w-[350px]' href={`/artisans/${slug}`}>
      <CardHeader className='p-0'>
        <img
          src={imgUrl}
          className='profile-picture'
        />
      </CardHeader>
      <CardBody className='flex flex-col gap-4'>
        <h3 className='font-semibold text-3xl'>{name}</h3>
        <p>{description}</p>
      </CardBody>
    </Card>
  )
}

ArtisansListItem.propTypes = {
  artisan: PropTypes.object
}

export default ArtisansListItem
