import axios from "axios";
import { useEffect, useState } from "react";

const useSellerDetails = (id) => {
  const [selletDetails, setSellerDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const getSellerDetails = async () => {
    setLoading(true);
    try {
      let response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/users/" + id,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      let data = await response.data;
      setSellerDetails(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getSellerDetails();
  }, []);

  return { selletDetails, loading };
};

export default useSellerDetails;
