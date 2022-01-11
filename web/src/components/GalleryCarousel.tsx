import React, { FC, useEffect, useRef } from "react";
import { Carousel as NativeCarousel } from "@fancyapps/ui";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";

interface GalleryCarouselProps {
  data?: (
    | {
        id: number;
        imageUrl: string;
        thumbnailUrl: string;
        description?: string;
      }
    | any
  )[];
}

const GalleryCarousel: FC<
  React.HTMLAttributes<HTMLDivElement> & GalleryCarouselProps
> = ({ data, ...props }) => {
  const mainCarouselRef = useRef(null);
  const thumbnailCarouselRef = useRef(null);
  // Initialise Carousel
  useEffect(() => {
    // Main Carousel
    const mainCarousel = new NativeCarousel(mainCarouselRef.current, {
      Dots: false,
    });
    // Thumbnails
    const thumbCarousel = new NativeCarousel(
      thumbnailCarouselRef.current,
      {
        Sync: {
          target: mainCarousel,
          friction: 0,
        },
        Dots: false,
        Navigation: false,
        center: true,
        slidesPerPage: 1,
        infinite: false,
      },
      []
    );
    // Customize Fancybox
    NativeFancybox.bind('[data-fancybox="gallery"]', {
      Carousel: {
        on: {
          change: (that) => {
            mainCarousel.slideTo(mainCarousel.findPageForSlide(that.page), {
              friction: 0,
            });
          },
        },
      },
    });

    return () => {
      mainCarousel.destroy();
      thumbCarousel.destroy();
      NativeFancybox.destroy();
    };
  }, []);

  return (
    <div {...props}>
      <div
        ref={mainCarouselRef}
        id="mainCarousel"
        className="carousel w-10/12 max-w-5xl mx-auto"
      >
        {data.map(({ id, imageUrl, description }) => (
          <div
            className="carousel__slide"
            data-src={imageUrl}
            data-fancybox="gallery"
            data-caption={description || undefined}
            key={id}
          >
            <img src={imageUrl} />
          </div>
        ))}
      </div>

      <div
        ref={thumbnailCarouselRef}
        id="thumbCarousel"
        className="carousel max-w-xl mx-auto"
      >
        {data.map(({ id, thumbnailUrl }) => (
          <div className="carousel__slide" key={id}>
            <img className="panzoom__content" src={thumbnailUrl} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryCarousel;
