import React, { FC, useState } from "react";
import Slider, { Settings as SliderSettings } from "react-slick";
import Card from "../components/Card";
import { motion, AnimatePresence } from "framer-motion"

interface CardProps {
  id: number;
}

const KartaCard: FC<CardProps> = ({ id }) => {
  const [showProjects, setShowProjects] = useState(false);
  const imageSettings: SliderSettings = {
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
    <div className="Karta_container">
      <div className="top_container">
        <div className="content">
          <h2>Title Pavadinimas</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim reiciendis aperiam error amet mollitia, quisquam dolor facere, dolores ad, illo ipsum. Veritatis architecto illo accusamus ea maxime soluta dignissimos. Esse hic voluptatum rerum accusantium quia! Odit sed itaque voluptatum officiis laboriosam impedit, rem tenetur, delectus nisi est explicabo necessitatibus ipsam.</p>
          <h3 onClick={() => setShowProjects(!showProjects)} >Projektai</h3>
        </div>
        <Slider {...imageSettings}>
          <img src={"https://picsum.photos/400/250?random=1"} />
          <img src={"https://picsum.photos/400/250?random=2"} />
          <img src={"https://picsum.photos/400/250?random=3"} />
          <img src={"https://picsum.photos/400/250?random=4"} />
        </Slider>
      </div>
      <AnimatePresence>
        {showProjects && (
          <motion.div 
          className="bottom-container Kartos"
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0, y: -100}}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          >
          <Card id={5} title="Labas" description="Kaip jumjs sekasi sitoje grazioje girioje" imageUrl="https://picsum.photos/400/250?random=4"/>
          <Card id={4} title="Labas" description="Kaip jumjs sekasi sitoje grazioje girioje" imageUrl="https://picsum.photos/400/250?random=3"/>
          <Card id={3} title="Labas" description="Kaip jumjs sekasi sitoje grazioje girioje" imageUrl="https://picsum.photos/400/250?random=2"/>
          <Card id={2} title="Labas" description="Kaip jumjs sekasi sitoje grazioje girioje" imageUrl="https://picsum.photos/400/250?random=1"/>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KartaCard;
