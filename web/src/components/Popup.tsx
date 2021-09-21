import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { FC } from "react";

interface PopupProps {
  title?: string;
  body?: string;
  closeText: string;
  okText: string;
  action: () => void;
}

const Popup: FC<PopupProps> = ({
  children,
  title,
  body,
  closeText,
  okText,
  action,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {(children as any)(onOpen)}
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent m="1em">
          {!title ? null : <ModalHeader>{title}</ModalHeader>}
          <ModalCloseButton />
          {!body ? null : <ModalBody>{body}</ModalBody>}

          <ModalFooter>
            <Box onClick={onClose}>
              <Button onClick={action} colorScheme="blue">
                {okText}
              </Button>
            </Box>
            <Button
              ml={3}
              colorScheme="red"
              variant="outline"
              onClick={onClose}
            >
              {closeText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Popup;
