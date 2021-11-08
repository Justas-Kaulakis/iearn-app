import Link from "next/link";
import React, { FC } from "react";
import { useGetAboutQuery } from "../generated/graphql";

const AboutUs: FC = ({
}) => {
  const [{ data, fetching, error }] = useGetAboutQuery();
  if (fetching) return null;
  return (
    <section className="AboutUs">
      {/* <div className="image" style={{ backgroundImage: `url("${data?.getAbout.imageUrl}")` }} /> */}
      <img className="image" src={data?.getAbout.imageUrl} alt="Apie Mus" />
      <div className="info">
        <h1 className="green-heading">Apie Mus</h1>
        <p>{data?.getAbout.content}</p>
      </div>
    </section>
  );
};

export default AboutUs;
