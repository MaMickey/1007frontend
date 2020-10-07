import React from 'react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import '../style.css';
import bannerImg1 from '../../../images/banner1.jpg';
import bannerImg2 from '../../../images/banner2.jpg';
import bannerImg3 from '../../../images/banner3.jpg';

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default () => {
  return (
    <div className="BannerWrapper d-md-block d-lg-block d-none">
    <Swiper className="SliderWrapper"
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      autoplay={true}
    >
      <SwiperSlide><img alt='' src={bannerImg1} className="SliderImg" /></SwiperSlide>
      <SwiperSlide><img alt='' src={bannerImg2} className="SliderImg" /></SwiperSlide>
      <SwiperSlide><img alt='' src={bannerImg3} className="SliderImg" /></SwiperSlide>
    </Swiper>
    </div>
  );
};