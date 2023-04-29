import { useState } from 'react'
import ProgressiveImage from 'react-progressive-graceful-image'

export default function Image({ Alt, src, style, delay }) {
  const [isError, setError] = useState(false)

  const handleError = () => {
    setError(true)
  }

  if (isError) {
    return (
      <div
        className='flex-center w-full h-full drop-shadow'
        style={{ backgroundColor: 'white', ...style }}
      >
        <Alt
          style={{
            objectFit: 'cover',
            overflow: 'hidden',
            width: '66.7%',
            height: '66.7%',
            color: '#696969',
            opacity: '30%',
            ...style,
          }}
        />
      </div>
    )
  }
  return (
    <ProgressiveImage src={src} delay={delay} onError={handleError}>
      {(src, loading) => (
        <img
          alt=''
          src={src}
          className={`w-full h-full ${
            loading ? 'img-loading' : 'img-loaded drop-shadow'
          }`}
          style={{
            objectFit: 'cover',
            overflow: 'hidden',
            ...style,
          }}
        />
      )}
    </ProgressiveImage>
  )
}
