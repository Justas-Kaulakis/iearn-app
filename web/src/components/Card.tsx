import Link from "next/link";
import React, { FC } from "react";
import { FaFileImage } from "react-icons/fa";

interface CardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  createdAt?: string;
}

const Card: FC<CardProps> = ({ id, title, description, imageUrl }) => {
  return (
    // <div className="card">
    <Link href="/projektai/[id]" as={`/projektai/${id}`}>
      <a className="card">
        <div
          className="image"
          style={{ backgroundImage: `url("${imageUrl}")` }}
        ></div>
        {/* <img className="image" src={imageUrl} alt="image" /> */}
        <div className="info">
          <h2>{title || "No Data"}</h2>
          <p>{description || "No Data"}</p>
        </div>
      </a>
    </Link>
    // </div>
  );
};

export default Card;
