import { useState, useEffect } from 'react'
import banner1 from '../img/banners/1.webp'
import banner2 from '../img/banners/2.webp'
import banner3 from '../img/banners/3.webp'

export default function Banner() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const slides = [
        {
            id: 1,
            image: banner1,
        },
        {
            id: 2,
            image: banner2,
        },
        {
            id: 3,
            image: banner3,
        },
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const goToSlide = (index) => {
        setCurrentSlide(index)
    }

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    return (
        <div className="relative w-full h-96 bg-ml-gray overflow-hidden">
            {/* Slides */}
            <div className="relative h-full">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute w-full h-full transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={slide.image}
                            alt={`Banner ${slide.id}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Botones de navegación */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-ml-blue rounded-full w-12 h-12 flex items-center justify-center transition z-10"
            >
                ❮
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-ml-blue rounded-full w-12 h-12 flex items-center justify-center transition z-10"
            >
                ❯
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition ${index === currentSlide
                                ? 'bg-ml-yellow w-8'
                                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}
