import axios from "axios";
import { useEffect, useState } from "react";

const useProperties = () => {
  const [properties, setProperties] = useState([]);

  const getPropeties = async () => {
    try {
      let response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/properties"
      );
      let data = await response.data;
      setProperties(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPropeties();
  }, []);

  return properties;
};

export default useProperties;
