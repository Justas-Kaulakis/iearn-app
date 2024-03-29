import React, { FC, useEffect, useRef } from "react";
import { Carousel as NativeCarousel } from "@fancyapps/ui";

interface CarouselProps {
  classNames?: string;
  nav?: boolean;
  dots?: boolean;
  options?: any;
  dependency?: any;
}

const Carousel: FC<CarouselProps> = ({
  classNames = "",
  dots = false,
  nav = true,
  options,
  dependency = null,
  children,
}) => {
  const carousel = useRef(null);

  useEffect(() => {
    const myCarousel = new NativeCarousel(carousel.current, {
      dots: dots,
      center: true,
      fill: true,
      infinite: true,
      slidesPerPage: 1,
      ...options,
    });

    return () => {
      myCarousel.destroy();
    };
  }, [dependency, dots, options]);

  return (
    <div
      className={`carousel ${classNames} ${dots ? "" : "no-dots"} ${
        nav ? "" : "no-nav"
      }`}
      ref={carousel}
    >
      {children}
    </div>
  );
};

export default Carousel;

export const CarouselSlide: FC<CarouselProps> = ({
  classNames = "",
  children,
}) => {
  return <div className={`carousel__slide ${classNames}`}>{children}</div>;
};
