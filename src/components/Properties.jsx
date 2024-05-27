import React, { useState } from "react";
import useProperties from "../utils/useProperties";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Progress,
  Spinner,
  CardBody,
  Card,
} from "@nextui-org/react";
import SellerDetails from "./SellerDetails";
import { FaHeart } from "react-icons/fa6";
import { toast } from "sonner";
import axios from "axios";

function Properties() {
  const [filters, setFilters] = useState({
    bedrooms: "",
    bathrooms: "",
    place: "",
    area: "",
    nearby: "",
  });

  const { properties, loading } = useProperties();

  const [openModalForProperty, setOpenModalForProperty] = useState({});

  const handleLikeBtn = async (propertyId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to like a property!");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/properties/${propertyId}/like`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Property liked successfully!");
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("Property not found!");
      } else if (error.response.status === 400) {
        toast.error("You have already liked this property!");
      } else {
        toast.error("Something went wrong, please try again later!");
      }
    }
  };

  const filteredProperties = properties.length
    ? properties.filter((property) => {
        return (
          (filters.bedrooms === "" ||
            property.bedrooms === parseInt(filters.bedrooms)) &&
          (filters.bathrooms === "" ||
            property.bathrooms === parseInt(filters.bathrooms)) &&
          (filters.place === "" ||
            property.place
              .toLowerCase()
              .includes(filters.place.toLowerCase())) &&
          (filters.area === "" ||
            property.area.toLowerCase().includes(filters.area.toLowerCase())) &&
          (filters.nearby === "" ||
            property.nearby
              .toLowerCase()
              .includes(filters.nearby.toLowerCase()))
        );
      })
    : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spinner label="Loading..." color="primary" size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-[85%] m-auto my-4">
      {/* Filter Section */}
      <div className="mb-4 flex gap-4">
        <select
          value={filters.place}
          onChange={(e) => setFilters({ ...filters, place: e.target.value })}
          className="border border-gray-300 px-3 py-2 rounded-md mb-2 w-full"
        >
          <option value="">Filter by place...</option>
          {properties.map((property) => (
            <option key={property.place} value={property.place}>
              {property.place}
            </option>
          ))}
        </select>
        {/* Add other filter dropdowns similarly */}
        <select
          value={filters.area}
          onChange={(e) => setFilters({ ...filters, area: e.target.value })}
          className="border border-gray-300 px-3 py-2 rounded-md mb-2 w-full"
        >
          <option value="">Filter by area...</option>
          {properties.map((property) => (
            <option key={property.area} value={property.area}>
              {property.area}
            </option>
          ))}
        </select>
        <select
          value={filters.bedrooms}
          onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
          className="border border-gray-300 px-3 py-2 rounded-md mb-2 w-full"
        >
          <option value="">Filter by bedrooms...</option>
          {properties.map((property) => (
            <option key={property.bedrooms} value={property.bedrooms}>
              {property.bedrooms}
            </option>
          ))}
        </select>
        <select
          value={filters.bathrooms}
          onChange={(e) =>
            setFilters({ ...filters, bathrooms: e.target.value })
          }
          className="border border-gray-300 px-3 py-2 rounded-md mb-2 w-full"
        >
          <option value="">Filter by bathrooms...</option>
          {properties.map((property) => (
            <option key={property.bathrooms} value={property.bathrooms}>
              {property.bathrooms}
            </option>
          ))}
        </select>
        <select
          value={filters.nearby}
          onChange={(e) => setFilters({ ...filters, nearby: e.target.value })}
          className="border border-gray-300 px-3 py-2 rounded-md mb-2 w-full"
        >
          <option value="">Filter by nearby...</option>
          {properties.map((property) => (
            <option key={property.nearby} value={property.nearby}>
              {property.nearby}
            </option>
          ))}
        </select>
      </div>

      {/* Properties */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProperties.map((property) => {
          return (
            <Card key={property.place}>
              <CardBody>
                <div className="p-4">
                  <h2 className="text-xl font-bold">
                    {property.place}, {property.area}
                  </h2>
                  <p>
                    <span className="font-bold">Bedrooms:</span>{" "}
                    {property.bedrooms}
                  </p>
                  <p>
                    <span className="font-bold">Bathrooms:</span>{" "}
                    {property.bathrooms}
                  </p>
                  <p>
                    <span className="font-bold">Nearby:</span> {property.nearby}
                  </p>
                  <p>
                    <span className="font-bold">Price:</span> {property.price}
                  </p>
                  <p>
                    <span className="font-bold">Rating:</span> {property.rating}
                  </p>

                  <p className="text-sm">{property.description}</p>
                  <div className="flex justify-center items-center gap-2 mt-4">
                    <span className="font-bold">
                      <Button
                        color="danger"
                        aria-label="Like"
                        className="flex justify-center items-center w-fit"
                        variant="ghost"
                        onClick={() => handleLikeBtn(property._id)}
                      >
                        <span>{property.likes.length}</span>
                        <span>{<FaHeart className="text-lg" />}</span>
                      </Button>
                    </span>
                    <Button
                      onPress={() =>
                        setOpenModalForProperty({
                          ...openModalForProperty,
                          [property.place]: true,
                        })
                      }
                      color="primary"
                      variant="shadow"
                    >
                      I'm interested
                    </Button>
                    <Modal
                      isOpen={openModalForProperty[property.place] || false}
                      onOpenChange={(isOpen) =>
                        setOpenModalForProperty({
                          ...openModalForProperty,
                          [property.place]: isOpen,
                        })
                      }
                    >
                      <SellerDetails userId={property.userId} />
                    </Modal>
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Properties;
