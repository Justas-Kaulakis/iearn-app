import { Heading } from "@chakra-ui/react";
import Link from "next/link";
import React, { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { useProjectsQuery } from "../generated/graphql";
import Card from "./Card";

interface NewestProjectsProps {}

const NewestProjects: FC<NewestProjectsProps> = ({}) => {
  const [{ data, fetching, error }] = useProjectsQuery({
    variables: {
      offset: 0,
      limit: 3,
    },
  });
  if (error) {
    console.log("ERROR FETCHING PROJECTS: ", error);
  }
  if (fetching) {
    return <Heading>Loading...</Heading>;
  }

  return (
    <section className="projects">
      <div className="container-2">
        <h1 className="green-heading">Naujausi Projektai</h1>
        <div className="content">
          {data.projects?.projects?.map((p) => (
            <Card
              key={p.id}
              id={p.id}
              title={p.title}
              description={p.description}
              imageUrl={p.imageUrl}
            />
          ))}

          <Link href="/projektai">
            <a className="card daugiau_projektu">
              <h2 className="green-heading-h2">Daugiau projektų</h2>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewestProjects;
