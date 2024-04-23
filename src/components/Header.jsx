import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllTypes } from '../apis/productApi'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

export default function Header() {
  const [types, setTypes] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    const fetchTypes = async () => {
      const res = await getAllTypes()
      if (res.status === 'OK') {
        setTypes(res.data)
      }
    }
    fetchTypes()
  }, [])

  return (
    <div>
      <div className='flex items-center justify-around p-2 border-b-2 border-gray-200'>
        <Link to='/' className='text-2xl font-bold text-blue-400 p-2 border-2 border-blue-500 rounded-md cursor-pointer'>
          <span>AnHuyShop</span>
        </Link>
        <div>
          <FormControl sx={{ m: 1, width: '500px' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-search">Tìm kiếm...</InputLabel>
            <OutlinedInput
              id="outlined-adornment-search"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              label="Search..."
            />
          </FormControl>
        </div>
        <div className='flex gap-4 items-center'>
          <div>
            <Button
              sx={{ fontSize: '16px', fontWeight: 'bold' }}
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              Tài Khoản
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
            >
              <MenuItem onClick={handleClose}>Hồ Sơ</MenuItem>
              <MenuItem onClick={() => navigate('/admin')}>Quản Lý</MenuItem>
              <MenuItem onClick={handleClose}>Đăng Xuất</MenuItem>
            </Menu>
          </div>
          <Link to='/order' className='text-blue-500 border-l-2 p-3 flex cursor-pointer'>
            <ShoppingCartIcon />
            <div className='flex justify-center rounded-full border-2 w-5 h-5 items-center bg-slate-400 text-white'>0</div>
          </Link>
        </div>
      </div>
      <div className='flex h-14 items-center justify-center gap-8 bg-orange-500'>
        {
          types.map((type, index) => {
            return (
              <div key={index}>
                <Button sx={{ color: 'white', fontWeight: '600', fontSize: '16px' }} variant="text">{type}</Button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
