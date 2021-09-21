import { Flex, Link as CLink } from "@chakra-ui/react";
import Link from "next/link";
import React, { FC } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface PaginationProps {
  href: string;
  totalPageCount: number;
  currentPage: number;
  hasMore: boolean;
}

const Pagination: FC<PaginationProps> = ({
  href,
  totalPageCount,
  currentPage,
  hasMore,
}) => {
  if (totalPageCount === 1) {
    return null;
  }
  return (
    <Flex mt="1em" justifyContent="center" width="100%">
      <Flex
        bg="white"
        p="0.5em"
        borderRadius="0.5em"
        boxShadow="0 3px 22px 1px rgba(55, 48, 48, 0.09)"
        flexWrap="wrap"
        justifyContent="center"
        maxWidth="300px"
      >
        {currentPage === 1 ? null : (
          <Link href="#">
            <CLink>
              <Flex height="100%" align="center">
                <FaAngleLeft />
              </Flex>
            </CLink>
          </Link>
        )}
        {Array.from(Array(totalPageCount).keys()).map((num) => (
          <Link key={num} href={`${href}?page=${num + 1}`}>
            {/* <span style={{ margin: "0 0.2em" }}>{num + 1}</span> */}
            <CLink
              p="0.2em"
              _hover={{ backgroundColor: "#84a98c", color: "white" }}
              px="7px"
              bg={currentPage === num + 1 ? "#84a98c" : undefined}
              color={currentPage === num + 1 ? "white" : undefined}
            >
              {num + 1}
            </CLink>
          </Link>
        ))}
        {!hasMore ? null : (
          <Link href="#">
            <CLink>
              <Flex height="100%" align="center">
                <FaAngleRight />
              </Flex>
            </CLink>
          </Link>
        )}
      </Flex>
    </Flex>
  );
};

export default Pagination;
