import React, { useState, useEffect, useRef } from 'react'
import { CarouselContainer, CarouselButton, CarouselTrackContainer, CarouselTrack, CarouselSlide, CarouselIndicators, CarouselIndicator } from './carouseloriginal.style'

interface CarouselOriginalProps {
  children: React.ReactNode
  slidesToShow?: number
  autoplay?: boolean
  autoplayInterval?: number
}

const CarouselOriginal: React.FC<CarouselOriginalProps> = ({ children, slidesToShow = 1, autoplay = false, autoplayInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const trackRef = useRef<HTMLUListElement>(null)
  const totalSlides = React.Children.count(children)

  const slides = React.Children.toArray(children)

  const handleNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => {
      const nextIndex = prev + slidesToShow
      return nextIndex >= totalSlides ? 0 : nextIndex
    })
  }

  const handlePrev = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => {
      const prevIndex = prev - slidesToShow
      return prevIndex < 0 ? totalSlides - slidesToShow : prevIndex
    })
  }

  const handleIndicatorClick = (index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(index * slidesToShow)
  }

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, autoplayInterval)
      return () => clearInterval(interval)
    }
  }, [autoplay, autoplayInterval, currentIndex, totalSlides, slidesToShow])

  useEffect(() => {
    if (isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [isTransitioning])

  const indicatorIndex = Math.floor(currentIndex / slidesToShow)

  return (
    <CarouselContainer>
      <CarouselButton className="prev" onClick={handlePrev} disabled={currentIndex <= 0}>
        ‹
      </CarouselButton>
      <CarouselTrackContainer>
        <CarouselTrack
          ref={trackRef}
          slidestoshow={slidesToShow}
          style={{
            transform: `translateX(-${(currentIndex * 100) / slidesToShow}%)`,
            transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
          }}
        >
          {slides.map((slide, index) => (
            <CarouselSlide key={index}>{slide}</CarouselSlide>
          ))}
        </CarouselTrack>
      </CarouselTrackContainer>
      <CarouselButton className="next" onClick={handleNext} disabled={currentIndex >= totalSlides - slidesToShow}>
        ›
      </CarouselButton>
      <CarouselIndicators>
        {Array.from({ length: Math.ceil(totalSlides / slidesToShow) }).map((_, index) => (
          <CarouselIndicator key={index} active={index === indicatorIndex} onClick={() => handleIndicatorClick(index)} />
        ))}
      </CarouselIndicators>
    </CarouselContainer>
  )
}

export default CarouselOriginal
