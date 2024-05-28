import axios from "axios";
import { useEffect, useState } from "react";

const useProperties = (token) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPropeties = async () => {
    setLoading(true);
    try {
      let response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/properties/seller",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      let data = await response.data;
      setProperties(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPropeties();
  }, []);

  return { properties, loading };
};

export default useProperties;
