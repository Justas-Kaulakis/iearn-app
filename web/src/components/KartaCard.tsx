import React, { FC, useState } from "react";
import Slider, { Settings as SliderSettings } from "react-slick";
import Card from "../components/Card";
import { motion, AnimatePresence } from "framer-motion";
import { GenerationFragment } from "../generated/graphql";
import Carousel, { CarouselSlide } from "./Carousel";

interface CardProps {
  gen: GenerationFragment;
}

const KartaCard: FC<CardProps> = ({ gen }) => {
  const [showProjects, setShowProjects] = useState(false);
  return (
    <div className="Karta_container">
      <div className="top_container">
        <div className="content">
          <h2>{gen.title}</h2>
          <p>{gen.description}</p>
        </div>
        <Carousel
          classNames=" generation-images"
          options={{
            fill: true,
            dots: false,
            dragfree: false,
          }}
        >
          {gen.images.map((img) => (
            <CarouselSlide classNames=" generetion-slide my-slide" key={img.id}>
              <img alt="Profilis" src={img.imageUrl} />
            </CarouselSlide>
          ))}
        </Carousel>
      </div>
      <h3 onClick={() => setShowProjects(!showProjects)}>Projektai</h3>

      <AnimatePresence>
        {showProjects && (
          <motion.div
            className="bottom-container Kartos"
            transition={{ duration: 0.5 }}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
          >
            {gen.projects.map((p) => (
              <Card
                key={p.id}
                id={p.id}
                title={p.title}
                description={p.description}
                imageUrl={p.imageUrl}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KartaCard;
