import Link from "next/link";
import React, { FC } from "react";

interface CardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  createdAt?: string;
}

const Card: FC<CardProps> = ({ id, title, description, imageUrl }) => {
  return (
    <Link href="/projektai/[id]" as={`/projektai/${id}`}>
      <a className="card">
        <div
          className="image"
          style={{ backgroundImage: `url("${imageUrl}")` }}
        ></div>
        <div className="info">
          <h2>{title || "No Data"}</h2>
          <p>{description || "No Data"}</p>
        </div>
      </a>
    </Link>
  );
};

export default Card;
