import { Card, CardBody, CardHeader, CardFooter, Avatar } from '@nextui-org/react'
import PropTypes from 'prop-types'

function ProductsListItem ({ product, artisanImg }) {
  const { name, description, price, images } = product.attributes

  const imgUrl = process.env.REACT_APP_IMAGES_URL + images?.data[0]?.attributes?.url
  return (
    <Card isPressable className='max-w-[350px] bg-primary-200'>
      <CardHeader className='p-0'>
        <img
          src={imgUrl}
        />
      </CardHeader>
      <CardBody className='flex flex-col gap-4 justify-between'>
        <h3 className='font-semibold text-xl'>{name}</h3>
        <p>{description}</p>
        <p className='text-right'>{price} €</p>
      </CardBody>
      <CardFooter>

        <Avatar
          isBordered
          as='button'
          className='transition-transform'
          color='secondary'
          name='Jason Hughes'
          size='sm'
          src={artisanImg}
        />
      </CardFooter>

    </Card>
  )
}

ProductsListItem.propTypes = {
  product: PropTypes.object.isRequired,
  artisanImg: PropTypes.string
}

export default ProductsListItem
