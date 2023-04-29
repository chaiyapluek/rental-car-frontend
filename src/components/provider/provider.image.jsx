import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

function ProviderImage({ images }) {
	return (
		<Swiper navigation={true} modules={[Navigation]}>
            {images.map((image) => {
                return (
                    <SwiperSlide key={image}>
                        <img src={image} alt="provider image" />
                    </SwiperSlide>
                );
            })}
        </Swiper>
	);
}

export default ProviderImage;
