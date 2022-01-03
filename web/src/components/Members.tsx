import React, { FC, useEffect, useRef } from "react";
import { useMembersQuery } from "../generated/graphql";
//import { Image } from "@chakra-ui/react";
//import { FaUser } from "react-icons/fa";

import {Carousel as NativeCarousel} from "@fancyapps/ui";
// import "@fancyapps/ui/dist/carousel.css";

const Members: FC = () => {
  const [{ data, fetching, error }] = useMembersQuery();
  if (error) {
    console.log("Error on Members Query: ", error);
  }

  const memberCarouselRef = useRef(null);
  let memberCarousel: any;

  // Initialise Carousel
  useEffect(() => {
    // Main Carousel
    memberCarousel = new NativeCarousel(memberCarouselRef.current, {
      slidesPerPage : "auto",
      infinite: false,
      dragfree: false,
    });
    
    return () => {
      memberCarousel.destroy();
    };
  }, []);

  return (
    <section id="Nariai">
      {fetching || !data?.members ? null : (
        <div ref={memberCarouselRef} className="carousel" id="cardSlider">
          {data.members.map((m) => (
            <figure key={m.id} className="carousel__slide member-card">
              <img
                className="mb-4 w-full rounded-lg"
                src={m.imageUrl}
              />
              <figcaption>
                <h3 className="text-lg font-semibold">{m.fullName}</h3>
                <p>{m.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
};

export default Members;
