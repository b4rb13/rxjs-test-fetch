import { useState, useEffect, useCallback } from "react";
import { map } from "rxjs/operators";
import { state } from "../state/state";
import ApiService from "../services/api.service";

export default (path='', query = '', postData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      return;
    }
    setIsLoading(true);
    const subscription = new ApiService(`${path}/${query}`, postData).post().pipe(
      map((res) => {
        if (res) {
          return res;
        } else {
          return [];
        }
      })
    ).subscribe((res) => {
      setIsLoading(false);
      setResponse(subscription);
      state[`posted${path}${query}`] = res

    });

    return () => {
      subscription.unsubscribe();
    };
  }, [postData, isLoading, path, query]);

  const post = useCallback(() => {
    setIsLoading(true);
  }, []);


  return [isLoading, response, post];
};
