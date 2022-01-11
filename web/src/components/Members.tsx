import React, { FC } from "react";
import { useMembersQuery } from "../generated/graphql";
import Carousel from "./Carousel";

const Members: FC = () => {
  const [{ data, fetching, error }] = useMembersQuery();
  if (error) {
    console.log("Error on Members Query: ", error);
  }

  return (
    <section id="Nariai">
      {fetching || !data?.members ? null : (
        <Carousel
          nav={false}
          dots
          options={{
            center: true,
            slidesPerPage: "auto",
            infinite: false,
            dragfree: false,
          }}
        >
          {data.members.map((m) => (
            <figure key={m.id} className="carousel__slide member-card">
              <img
                className="mb-4 w-full rounded-lg"
                alt="Nuotrauka"
                src={m.imageUrl}
              />
              <figcaption>
                <h3 className="text-lg font-semibold">{m.fullName}</h3>
                <p>{m.description}</p>
              </figcaption>
            </figure>
          ))}
        </Carousel>
      )}
    </section>
  );
};

export default Members;
