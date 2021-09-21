import React from "react";
import Member from "./Member";
import { v4 as uuidv4 } from "uuid";
import Slider, { Settings as SliderSettings } from "react-slick";
import { useMembersQuery } from "../generated/graphql";

const visiNariai = [
  {
    fullName: "Gytis Kaulakis",
    description: "Jaunikis Jonas",
    imgLink: null,
  },
  {
    fullName: "Gabija Kaulakyte",
    description: "Panelė",
    imgLink: null,
  },
  {
    fullName: "Justas Kaulakis",
    description: "Vaikas",
    imgLink: null,
  },
  {
    fullName: "Gytis Kaulakis",
    description: "Jaunikis Jonas",
    imgLink: null,
  },
  {
    fullName: "Gabija Kaulakyte",
    description: "Panelė",
    imgLink: null,
  },
  {
    fullName: "Justas Kaulakis",
    description: "Vaikas",
    imgLink: null,
  },
];
interface OnClickType {
  onClick?: React.MouseEventHandler<any>;
}

const PrevArrow: React.FC<OnClickType> = ({ onClick }) => {
  return (
    <span onClick={onClick} className="priv_arrow">
      <img src="/left button.svg" alt="prev" />
    </span>
  );
};
const NextArrow: React.FC<OnClickType> = ({ onClick }) => {
  return (
    <span onClick={onClick} className="next_arrow">
      <img src="/right button.svg" alt="next" />
    </span>
  );
};

const Members = () => {
  const [{ data, fetching, error }] = useMembersQuery();
  if (error) {
    console.log("Error on Members Query: ", error);
  }
  const settings: SliderSettings = {
    draggable: false,
    autoplay: false,
    autoplaySpeed: 5000,
    speed: 1000,
    dots: true,
    infinite: data?.members.length > 5,
    slidesToShow: 5,
    slidesToScroll: 5,
    useTransform: true,
    cssEase: "ease-out",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          arrows: false,
          draggable: true,
          slidesToShow: 4,
          slidesToScroll: 4,

          infinite: data?.members.length > 4,
        },
      },
      {
        breakpoint: 850,
        settings: {
          rows: 2,
          arrows: false,
          draggable: true,
          slidesToShow: 3,
          slidesToScroll: 3,

          infinite: data?.members.length > 6,
        },
      },
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          draggable: true,
          rows: 2,
          slidesToShow: 2,
          slidesToScroll: 2,

          infinite: data?.members.length > 4,
        },
      },
      {
        breakpoint: 500,
        settings: {
          arrows: false,
          draggable: true,
          //rows: 3,
          slidesToShow: 2,
          slidesToScroll: 2,

          infinite: data?.members.length > 2,
        },
      },
    ],
  };
  return (
    <section id="Nariai">
      <div className="container-3">
        <h1 className="green-heading">Klubo nariai</h1>
        {!data?.members || fetching ? null : (
          <div style={{ marginBottom: 30 }}>
            <Slider {...settings}>
              {data.members.map((m) => (
                <Member key={m.id} data={m} />
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
};

export default Members;
