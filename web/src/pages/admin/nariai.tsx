import {
  Button,
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import { FaPlus } from "react-icons/fa";
import AdminLayout from "../../components/AdminLayout";
import AdminTopBar from "../../components/AdminTopBar";
import NariaiTableRow from "../../components/NariaiTableRow";
import {
  useCreateMemberMutation,
  useMembersQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

interface NariaiProps {}

const Nariai: FC<NariaiProps> = ({}) => {
  const [{ data, fetching, error }, reuseMembersQuery] = useMembersQuery();
  const [, createMember] = useCreateMemberMutation();
  if (error) {
    console.log("Error loading members: ", error);
  }

  return (
    <AdminLayout active="nariai">
      <AdminTopBar pageName="nariai">
        Narių sk. - {data?.members.length || 0}
      </AdminTopBar>
      {!data?.members || fetching ? null : (
        <div className="Admin-content">
          <Table
            as="div"
            boxShadow="base"
            borderTop="1px solid #e2e8f0"
            size="sm"
            className="members-table"
            variant="unstyled"
            //mt="3em"
            mx="auto"
            width="fit-content"
          >
            <table>
              <Thead borderRadius="xl">
                <Tr>
                  <Th isNumeric className="number">
                    Nr.
                  </Th>
                  <Th className="profile">Vardas ir Pavardė</Th>
                  <Th className="description">Trumpa mintis ar komentaras</Th>
                  <Th textAlign="center">Veiksmai</Th>
                </Tr>
              </Thead>
            </table>
            <Tbody as="div">
              {data.members.map((m, i) => (
                <NariaiTableRow
                  reuseMembersQuery={reuseMembersQuery}
                  key={`${i}=${m.fullName}`}
                  m={m}
                  index={i + 1}
                />
              ))}
              <Button
                leftIcon={<FaPlus />}
                borderRadius="0"
                width="100%"
                colorScheme="green"
                onClick={async () => {
                  const { error } = await createMember({
                    input: {
                      fullName: "",
                      description: "",
                      image: null,
                    },
                  });
                  if (error) {
                    console.log("Error creating new Member: ", error);
                  } else {
                    reuseMembersQuery({ requestPolicy: "network-only" });
                  }
                }}
              >
                Pridėti klubo narį
              </Button>
            </Tbody>
          </Table>
        </div>
      )}
    </AdminLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Nariai);
