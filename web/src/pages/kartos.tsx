import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import Layout from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";
import Slider, { Settings as SliderSettings } from "react-slick";

interface KartosProps {}

const Kartos: FC<KartosProps> = ({}) => {
  const settings: SliderSettings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
  };
  return (
    <Layout active="kartos">
      <div className="Base">
        <div className="Karta_container">
          <div className="top_container">
            <div className="content">
              <h2>Title Pavadinimas</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim reiciendis aperiam error amet mollitia, quisquam dolor facere, dolores ad, illo ipsum. Veritatis architecto illo accusamus ea maxime soluta dignissimos. Esse hic voluptatum rerum accusantium quia! Odit sed itaque voluptatum officiis laboriosam impedit, rem tenetur, delectus nisi est explicabo necessitatibus ipsam.</p>
              <h3>Projektai</h3>
            </div>
            <Slider {...settings}>
              <div>
                <img src={"https://picsum.photos/400/250?random=1"} />
              </div>
              <div>
                <img src={"https://picsum.photos/400/250?random=2"} />
              </div>
              <div>
                <img src={"https://picsum.photos/400/250?random=3"} />
              </div>
              <div>
                <img src={"https://picsum.photos/400/250?random=4"} />
              </div>
          </Slider>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Kartos);
