import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useEffect, useState } from 'react'
import { getAllProducts } from '../apis/productApi'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProducts()
      if (res.status === 'OK') {
        setProducts(res.data)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className='min-h-screen'>
      <div className='flex justify-center'>
        <img className='w-full' src='../../public/ecommerce-banner.jpg' alt='background' />
      </div>
      <div className='my-8'>
        <Grid sx={{ flexGrow: 1 }} rowSpacing={5} container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {
            products.map((product) => {
              return (
                <Grid sx={{ cursor: 'pointer' }} key={product._id} item xs={2} sm={4} md={3}>
                  <Card sx={{ maxWidth: '350px', marginX: 'auto' }}>
                    <CardHeader
                      sx={{ maxWidth: '350px' }}
                      title={product.name}
                    >
                    </CardHeader>
                    <CardMedia
                      onClick={() => {navigate(`/product-detail/${product._id}`)}}
                      sx={{
                        transition: 'transform 0.3s ease',
                        ':hover': {
                          transform: 'scale(1.1)'
                        },
                        height: '200px'
                      }}
                      component="img"
                      image={product.image}
                      alt={product.name}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                      <div className='text-lg font-bold mt-4'>{product.price}$ <span className='text-red-500 text-xl'>{`Giảm giá đến ${product.discount}$`}</span></div>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to card">
                        <ShoppingCartIcon />
                      </IconButton>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              )
            })
          }
        </Grid>
      </div>
    </div>
  )
}
