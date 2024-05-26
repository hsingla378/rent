import axios from "axios";
import { useEffect, useState } from "react";

const useSellerDetails = (id) => {
  const [selletDetails, setSellerDetails] = useState(null);

  const getSellerDetails = async () => {
    try {
      let response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/users/" + id,
        {
          headers: {
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
            Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1MzRkMzQxMGNiN2NlY2QwYjE1Mzk2In0sImlhdCI6MTcxNjc0MjE3MiwiZXhwIjoxNzE2NzQ1NzcyfQ.XU1VNyVAV2T4drTFoq66cYjoMZ9dpb85RcS-SMf79Ac`,
          },
        }
      );
      let data = await response.data;
      setSellerDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSellerDetails();
  }, []);

  return selletDetails;
};

export default useSellerDetails;
