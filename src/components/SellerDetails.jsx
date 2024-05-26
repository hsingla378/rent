import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Progress,
} from "@nextui-org/react";
import useSellerDetails from "../utils/useSellerDetails";
import axios from "axios";

export default function SelelrDetails({ userId }) {
  const [loading, setLoading] = useState(true);
  const [sellerDetails, setSellerDetails] = useState(null);

  useEffect(() => {
    const getSellerDetails = async () => {
      setLoading(true);
      try {
        let response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/users/" + userId,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setSellerDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getSellerDetails();
  }, [userId]);

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">
            Seller Details
          </ModalHeader>
          <ModalBody>
            {loading ? (
              <Progress size="sm" isIndeterminate aria-label="Loading..." />
            ) : (
              <>
                <p>
                  <strong>Name:</strong> {sellerDetails.firstName}{" "}
                  {sellerDetails.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {sellerDetails.email}
                </p>
                <p>
                  <strong>Phone:</strong> {sellerDetails.phoneNumber}
                </p>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  );
}
