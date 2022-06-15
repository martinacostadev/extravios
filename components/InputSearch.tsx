import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { BiSearch } from 'react-icons/bi'

export const InputSearch = forwardRef<
  HTMLInputElement,
  { onChange: VoidFunction }
>(({ onChange }, ref) => {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" mt={4} ml={1} pr={1}>
        <BiSearch size={22} opacity={0.8} />
      </InputLeftElement>
      <Input
        placeholder="Buscar por título..."
        _placeholder={{ opacity: 0.8, color: 'cyan.100' }}
        color="white"
        fontSize="1.1em"
        marginY={4}
        onChange={onChange}
        ref={ref}
      />
    </InputGroup>
  )
})
