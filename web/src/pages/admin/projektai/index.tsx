import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import React, { FC } from "react";
import { FaFileImage, FaPlus } from "react-icons/fa";
import { useAdminProjectsQuery } from "../../../generated/graphql";
import AdminLayout from "../../../components/AdminLayout";
import AdminTopBar from "../../../components/AdminTopBar";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { formatDate } from "../../../utils/stringToDate";

interface ProjektaiProps {}

const Projektai: FC<ProjektaiProps> = ({}) => {
  const [{ data, error, fetching }] = useAdminProjectsQuery();
  if (error) {
    console.log(error);
  }
  // if (fetching) {
  //   return <Heading>Loading...</Heading>;
  // }
  return (
    <AdminLayout active="projektai">
      <AdminTopBar pageName="projektai">
        Projektų sk. - {data?.adminProjects.length}
      </AdminTopBar>
      <Box bg="#f1f1f1" className="korteles">
        <Link href="/admin/projektai/naujas">
          <div className="new-project hoverCursor">
            <span>
              <FaPlus />
            </span>
            <p>Sukurti naują projektą</p>
          </div>
        </Link>
        {!data?.adminProjects || fetching
          ? null
          : data?.adminProjects.map((p) => (
              <Link
                href={`/admin/projektai/[id]`}
                as={`/admin/projektai/${p.id}`}
                key={p.id}
              >
                <div className="korta hoverCursor">
                  <div className="img-con">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt="Projekto img" />
                    ) : (
                      <FaFileImage />
                    )}
                  </div>
                  <h3>{p.title}</h3>
                  <div className="korta-button">
                    <div>Redaguoti</div>
                  </div>
                  <div className="info">
                    <p className="data">{p.publishedAt}</p>
                    <h6 className={p.isPublished ? "paskelbta" : "redaguojama"}>
                      <span></span>
                    </h6>
                  </div>
                </div>
              </Link>
            ))}
      </Box>
    </AdminLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Projektai);
