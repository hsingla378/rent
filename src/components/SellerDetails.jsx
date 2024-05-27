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
  Chip,
} from "@nextui-org/react";
import useSellerDetails from "../utils/useSellerDetails";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function SelelrDetails({ userId }) {
  const [loading, setLoading] = useState(true);
  const [sellerDetails, setSellerDetails] = useState(null);
  const [error, setError] = useState(null);

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
        if (error.response && error.response.status === 401) {
          setError("<p>Please login to view the seller details.</p>");
        } else {
          setError(
            "An error occurred while fetching the seller details. check console for more information."
          );
        }
        setLoading(false);
        return;
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
            ) : error ? (
              <>
                {/* <p className="text-red-500">{error}</p> */}
                <p>
                  Please{" "}
                  <span>
                    <Link to={"/login"}>
                      <Chip radius="sm" color="warning">
                        <span className="flex justify-center items-center gap-2 font-semibold">
                          Login <FaExternalLinkAlt className="text-[10px]" />
                        </span>
                      </Chip>
                    </Link>
                  </span>{" "}
                  to view the seller details.
                </p>
              </>
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
