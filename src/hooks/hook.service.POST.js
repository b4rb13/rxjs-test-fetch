import { useState, useEffect, useCallback } from "react";
import ApiService from "../services/api.service";

export default (path, postData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      return;
    }
    setIsLoading(true);
    const subscription = new ApiService(path, postData).post().subscribe(() => {
      setIsLoading(false);
      setResponse(subscription);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [postData, isLoading, path]);

  const post = useCallback(() => {
    setIsLoading(true);
  }, []);


  return [isLoading, response, post];
};
