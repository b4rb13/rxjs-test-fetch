import { useState, useEffect, useCallback } from "react";
import { map } from "rxjs/operators";
import ApiService from "../services/api.service";

export default (path) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      return;
    }
    setIsLoading(true);
    const subscription = new ApiService(path)
      .get()
      .pipe(
        map((res) => {
          if (res) {
            return res;
          } else {
            return [];
          }
        })
      )
      .subscribe((response) => {
        setResponse(response);
        setIsLoading(false);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [isLoading, path]);

  const get = useCallback(() => {
    setIsLoading(true);
  }, []);

  return [isLoading, response, get];
};
