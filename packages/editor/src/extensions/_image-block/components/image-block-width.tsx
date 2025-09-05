import { memo, useState, useEffect, useCallback } from 'react'

type ImageBlockWidthProps = {
  onChange: (value: number) => void
  value: number
}

const ImageBlockWidth = memo(({ onChange, value }: ImageBlockWidthProps) => {
  const [currentValue, setCurrentValue] = useState(value)

  useEffect(() => {
    setCurrentValue(value)
  }, [value])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = Number.parseInt(e.target.value)

      onChange(nextValue)
      setCurrentValue(nextValue)
    },
    [onChange],
  )

  return (
    <div className='flex items-center gap-2'>
      <input
        className='h-2 appearance-none rounded border-0 bg-neutral-200 fill-neutral-300'
        max='100'
        min='25'
        onChange={handleChange}
        step='25'
        type='range'
        value={currentValue}
      />

      <span className='select-none font-semibold text-neutral-500 text-xs'>
        {value}%
      </span>
    </div>
  )
})
ImageBlockWidth.displayName = 'ImageBlockWidth'

export default ImageBlockWidth
