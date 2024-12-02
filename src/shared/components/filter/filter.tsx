import { FlexContainer, FlexContainerResponsive } from '../flexcontainer/flexcontainer.style'
import { Button, Select, SelectProps, Slider } from 'antd'
import { PriceTitle, TitleFilter } from './filter.style'
import { useEffect, useState } from 'react'
import InputMoney from '../inputs/inputMoney/inputMoney'
import { useCategoriesReducer } from '../../../store/reducers/categoriesReducer/useCategoryReducer'
import { SearchOutlined } from '@ant-design/icons'
import { ProductType } from '../../types/ProductType'

interface FilterProps {
  products: ProductType[]
  setprodctfiltered: React.Dispatch<React.SetStateAction<ProductType[]>>
}

export const Filter = (props: FilterProps) => {
  const { categories, searchCategories } = useCategoriesReducer()

  const [loading, setLoading] = useState(false)
  const [prices, setValue] = useState([20, 9999])
  const [options, setOptions] = useState<SelectProps['options']>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  useEffect(() => {
    searchCategories()
    const updatedOptions = categories.map((category) => ({
      label: category.name,
      value: category.id,
    }))
    setOptions(updatedOptions)
  }, [categories])

  const handlePriceChange = (value: any) => {
    setValue(value)
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'min') {
      setValue([Number(value), Number(prices[1])])
    } else if (name === 'max') {
      setValue([Number(prices[0]), Number(value)])
    }
  }

  const handleFilter = () => {
    setLoading(true)
    const filteredProducts = props.products.filter((product) => {
      const isCategoryMatch = selectedCategories.length > 0 ? selectedCategories.includes(product.category) : true

      const isPriceMatch = (prices[0] ? product.price >= parseFloat(`${prices[0]}`) : true) && (prices[1] ? product.price <= parseFloat(`${prices[1]}`) : true)

      return isCategoryMatch && isPriceMatch
    })

    props.setprodctfiltered(filteredProducts)
    setLoading(false)
  }

  const handleChangeCategory = (categorySelected: string[]) => {
    setSelectedCategories(categorySelected)
  }

  return (
    <FlexContainerResponsive maxmin="max" media="781px" directionwrap="column nowrap" gap="25px" padding="10px 10px 15px" width="100%" height="#" maxheightcontainer="500px" style={{ maxWidth: '270px', borderRadius: '9px' }}>
      <FlexContainer height="1" directionwrap="column nowrap" gap="7px">
        <TitleFilter>Categorias</TitleFilter>
        <Select onChange={handleChangeCategory} mode="multiple" size="middle" placeholder="Selecione a categoria" style={{ width: '100%' }} options={options} />
      </FlexContainer>

      <FlexContainer directionwrap="column nowrap">
        <FlexContainer height="1" padding="0 10px 0 0" directionwrap="column nowrap">
          <TitleFilter>Preço</TitleFilter>
          <Slider onChange={(event) => handlePriceChange(event)} range value={prices} min={1} max={10000} style={{ width: '100%' }} />
        </FlexContainer>
        <FlexContainer justify="space-between" height="15px">
          <PriceTitle>
            {prices[0].toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </PriceTitle>
          <PriceTitle>
            {prices[1].toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </PriceTitle>
        </FlexContainer>

        <FlexContainer gap="3px">
          <InputMoney name="min" title="" value={prices[0]} onChange={(e) => handleOnChange(e)} width="50%" />
          <InputMoney name="max" title="" value={prices[1]} onChange={(e) => handleOnChange(e)} width="50%" />
        </FlexContainer>
      </FlexContainer>

      <FlexContainer justify="center">
        <Button type="primary" icon={<SearchOutlined />} onClick={handleFilter} loading={loading} style={{ width: '150px' }}>
          Filtrar
        </Button>
      </FlexContainer>
    </FlexContainerResponsive>
  )
}
