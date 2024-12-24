'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-cube'
import 'swiper/css/autoplay'

import Communities from '@/components/ui/aside/Communities'
import Trending from '@/components/ui/aside/Trending'
import woman from '../_lib/images/woman.jpg'
import avatar from '../_lib/images/avatar.jpg'
import { EffectCube, Pagination, Autoplay } from 'swiper/modules'
import MyFriends from '@/components/ui/aside/MyFriends'

export default function Aside() {
    const images = [
        { image: avatar },
        { image: woman },
        { image: avatar },
        { image: woman },
    ]

    return (
        <div className="min-h-[90vh] flex flex-col gap-[1rem]">
            <Trending />

            <Swiper
                effect="cube"
                grabCursor={true}
                autoplay={{
                    delay: 5000, // 5 seconds per slide
                    disableOnInteraction: false, // Continue autoplay after user interaction
                }}
                cubeEffect={{
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                }}
                pagination={{ clickable: true }}
                modules={[EffectCube, Pagination, Autoplay]}
                className="w-full h-[430px]" // Adjust height as needed
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="h-full flex justify-center items-center">
                            <Communities image={image.image} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <MyFriends />
        </div>
    )
}
