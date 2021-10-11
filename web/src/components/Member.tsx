import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { FaUser } from "react-icons/fa";
import { Member as MemberType } from "../generated/graphql";
import { Image } from "@chakra-ui/react";

interface MemberProps {
  data: Pick<MemberType, "fullName" | "description" | "imageUrl" | "id">;
}



function Member2({ children, vardas }) {


  return (
    <div>
      <div>{children}</div>
      <p>{vardas}</p>
    </div>
  );
}
const Member: React.FC<MemberProps> = ({
  data: { fullName, description, imageUrl },
}) => {
  return (
    <>
      <div className="Nariai-card">
        <div>{!imageUrl ? <FaUser /> : <Image src={imageUrl} />}</div>
        <h2>{fullName || "No Data"}</h2>
        <p>{description || "No Data"}</p>
      </div>
      <Member2 vardas="Bobas">
        asdkhaskjdkjhasd
      </Member2>
    </>


  );
};

export default Member;
