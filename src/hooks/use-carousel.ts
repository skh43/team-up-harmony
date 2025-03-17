
import * as React from "react"
import { type EmblaCarouselType } from "embla-carousel-react"

export function useCarousel() {
  const [carouselRef, setCarouselRef] = React.useState<HTMLDivElement | null>(null)
  const [api, setApi] = React.useState<EmblaCarouselType | null>(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      scrollPrev()
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      scrollNext()
    }
  }, [scrollPrev, scrollNext])

  React.useEffect(() => {
    if (!api) {
      return
    }

    setSelectedIndex(api.selectedScrollSnap())

    api.on("select", () => {
      setSelectedIndex(api.selectedScrollSnap())
    })
  }, [api])

  return {
    carouselRef: setCarouselRef,
    selectedIndex,
    api,
    setApi,
    scrollPrev,
    scrollNext,
    handleKeyDown,
  }
}
