import Link from "next/link";
import React, { FC } from "react";
import { FaFileImage } from "react-icons/fa";

interface CardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  createdAt?: string;
  authorized?: boolean;
  published?: boolean;
}

const Card: FC<CardProps> = ({
  id,
  title,
  description,
  imageUrl,
  authorized = false,
  published,
}) => {
  return (
    <div className="card">
      <Link href="/projektai/[id]" as={`/projektai/${id}`}>
        <a>
          <div className="outer">
            <div className="inner">
              {imageUrl ? (
                <img src={imageUrl} alt="Nuotrauka" />
              ) : (
                <FaFileImage />
              )}
            </div>
          </div>
          <h2>{title ? title : "No Data"}</h2>
          <p>{description ? description : "No Data"}</p>
          {!authorized ? null : (
            <>
              {published ? (
                <div className="card-tag card-tag-green">Paskelbta</div>
              ) : (
                <div className="card-tag card-tag-red">Nepaskelbta</div>
              )}
            </>
          )}
        </a>
      </Link>
    </div>
  );
};

export default Card;
