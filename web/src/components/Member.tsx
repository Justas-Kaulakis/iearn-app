import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { FaUser } from "react-icons/fa";
import { Member as MemberType } from "../generated/graphql";
import { Image } from "@chakra-ui/react";

interface MemberProps {
  data: Pick<MemberType, "fullName" | "description" | "imageUrl" | "id">;
}

const Member: React.FC<MemberProps> = ({
  data: { fullName, description, imageUrl },
}) => {
  return (
    <div className="Nariai-card">
      <div>{!imageUrl ? <FaUser /> : <Image src={imageUrl} />}</div>
      <h2>{fullName || "No Data"}</h2>
      <p>{description || "No Data"}</p>
    </div>
  );
};

export default Member;
