import * as React from 'react'
import { Box } from '@mui/system'
import styles from './NumberInput.module.scss' // Import the Sass module

function OTP({
  separator,
  length,
  value,
  onChange,
  theme,
}: {
  separator: React.ReactNode
  length: number
  value: string
  theme: string
  onChange: React.Dispatch<React.SetStateAction<string>>
}) {
  const inputRefs = React.useRef<HTMLInputElement[]>(
    new Array(length).fill(null)
  )

  const focusInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex]
    targetInput.focus()
  }

  const selectInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex]
    targetInput.select()
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case ' ':
        event.preventDefault()
        break
      case 'ArrowLeft':
        event.preventDefault()
        if (currentIndex > 0) {
          focusInput(currentIndex - 1)
          selectInput(currentIndex - 1)
        }
        break
      case 'ArrowRight':
        event.preventDefault()
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1)
          selectInput(currentIndex + 1)
        }
        break
      case 'Delete':
        event.preventDefault()
        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1)
          return otp
        })
        break
      case 'Backspace':
        event.preventDefault()
        if (currentIndex > 0) {
          focusInput(currentIndex - 1)
          selectInput(currentIndex - 1)
        }
        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1)
          return otp
        })
        break
      default:
        break
    }
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    const currentValue = event.target.value
    let indexToEnter = 0

    while (indexToEnter <= currentIndex) {
      if (
        inputRefs.current[indexToEnter].value &&
        indexToEnter < currentIndex
      ) {
        indexToEnter += 1
      } else {
        break
      }
    }
    onChange((prev) => {
      const otpArray = prev.split('')
      const lastValue = currentValue[currentValue.length - 1]
      otpArray[indexToEnter] = lastValue
      return otpArray.join('')
    })
    if (currentValue !== '') {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1)
      }
    }
  }

  const handleClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
    currentIndex: number
  ) => {
    selectInput(currentIndex)
  }

  const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    event.preventDefault()
    const clipboardData = event.clipboardData

    if (clipboardData.types.includes('text/plain')) {
      let pastedText = clipboardData.getData('text/plain')
      pastedText = pastedText.substring(0, length).trim()
      let indexToEnter = 0

      while (indexToEnter <= currentIndex) {
        if (
          inputRefs.current[indexToEnter].value &&
          indexToEnter < currentIndex
        ) {
          indexToEnter += 1
        } else {
          break
        }
      }

      const otpArray = value.split('')

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? ' '
        otpArray[i] = lastValue
      }

      onChange(otpArray.join(''))
    }
  }

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <input
            ref={(ele) => (inputRefs.current[index] = ele!)}
            onKeyDown={(event: any) => handleKeyDown(event, index)}
            onChange={(event: any) => handleChange(event, index)}
            onClick={(event: any) => handleClick(event, index)}
            onPaste={(event: any) => handlePaste(event, index)}
            value={value[index] ?? ''}
            className={`${styles.inputElement} ${
              theme === 'dark' ? styles.dark : ''
            }`}
          />
          {index === length - 1 ? null : separator}
        </React.Fragment>
      ))}
    </Box>
  )
}

export default function NumberInput({
  otp,
  setOtp,
  length,
  theme,
}: {
  otp: string
  setOtp: React.Dispatch<React.SetStateAction<string>>
  length: number
  theme: string
}) {
  return (
    <div>
      {' '}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'scroll',
          marginBottom: '1rem',
        }}
      >
        <OTP
          separator={<span>-</span>}
          value={otp}
          onChange={setOtp}
          length={length}
          theme={theme ? theme : 'dark'}
        />
      </Box>
    </div>
  )
}
