import * as React from 'react'
import PropTypes from 'prop-types'
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput'
import clsx from 'clsx'
import { Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import { getProductDetail } from '../apis/productApi'

const resolveSlotProps = (fn, args) => (typeof fn === 'function' ? fn(args) : fn)

const NumberInput = React.forwardRef(function NumberInput(props, ref) {
  return (
    <BaseNumberInput
      {...props}
      ref={ref}
      slotProps={{
        root: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState
          )
          return {
            ...resolvedSlotProps,
            className: clsx(
              'grid grid-cols-[1fr_8px] grid-rows-2 overflow-hidden font-sans rounded-lg border border-solid  bg-white hover:border-violet-400 focus-visible:outline-0 p-1',
              ownerState.focused
                ? 'border-violet-400 shadow-outline-purple'
                : 'border-slate-300',
              resolvedSlotProps?.className
            )
          }
        },
        input: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.input,
            ownerState
          )
          return {
            ...resolvedSlotProps,
            className: clsx(
              'col-start-1 col-end-2 row-start-1 row-end-3 text-sm font-sans leading-normal bg-inherit border-0 rounded-[inherit] px-3 py-2 outline-0 focus-visible:outline-0 focus-visible:outline-none',
              resolvedSlotProps?.className
            )
          }
        },
        incrementButton: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.incrementButton,
            ownerState
          )
          return {
            ...resolvedSlotProps,
            children: '▴',
            className: clsx(
              'font-[system-ui] flex flex-row flex-nowrap justify-center items-center p-0 w-[19px] h-[19px] border border-solid outline-none text-sm box-border leading-[1.2] rounded-t-md border-slate-200 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-300 transition-all duration-[120ms] hover:cursor-pointer hover:bg-purple-500 hover:text-slate-50 dark:hover:bg-slate-800 dark:border-slate-600 col-start-3 col-end-3 row-start-1 row-end-2',
              resolvedSlotProps?.className
            )
          }
        },
        decrementButton: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.decrementButton,
            ownerState
          )
          return {
            ...resolvedSlotProps,
            children: '▾',
            className: clsx(
              'font-[system-ui] flex flex-row flex-nowrap justify-center items-center p-0 w-[19px] h-[19px] border border-solid outline-none text-sm box-border leading-[1.2] rounded-b-md border-slate-200 border-t-0 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-300 transition-all duration-[120ms] hover:cursor-pointer hover:bg-purple-500 hover:text-slate-50 dark:hover:bg-slate-800 dark:border-slate-600 col-start-3 col-end-3 row-start-2 row-end-3',
              resolvedSlotProps?.className
            )
          }
        }
      }}
    />
  )
})

NumberInput.propTypes = {
  /**
   * The props used for each slot inside the NumberInput.
   * @default {}
   */
  slotProps: PropTypes.shape({
    decrementButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    incrementButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  })
}

export default function ProductDetail() {
  const [value, setValue] = React.useState(null)
  const { productId } = useParams()
  const [product, setProduct] = React.useState({})
  console.log(product)

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductDetail(productId)
        if (res.status === 'OK') {
          setProduct(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchProduct()
  }, [productId])

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='flex items-center justify-center gap-8 border-2 p-10 rounded-md'>
        <div className='w-[500px] h-[500px]'>
          <img className='w-full h-full' src={product && product.image} alt="" />
        </div>
        <div className='flex flex-col gap-3'>
          <div className='font-bold text-2xl'>{product && product.name}</div>
          <div className='text-lg'>{product && product.price}$</div>
          <div className='text-lg'>Giảm còn <span className='text-red-500 font-semibold'>{ product && product.price - product.discount}$</span></div>
          <div className='text-slate-500 text-sm'>{product && product.description}</div>
          <div className='text-md'>Số lượng: {product && product.countInStock}</div>
          <NumberInput
            aria-label="Demo number input"
            placeholder="Type a number…"
            value={value}
            onChange={(event, val) => setValue(val)}
          />
          <div>
            <Button variant="contained">Thêm vào giỏ</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
