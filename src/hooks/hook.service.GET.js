import { useState, useEffect, useCallback } from "react";
import ApiService from "../services/api.service";
import { map } from "rxjs/operators";
import { state } from "../state/state";


export default (path='', query = '', mutator = data => data) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      return;
    }
    setIsLoading(true);
    const subscription = new ApiService(`${path}/${query}`)
      .get()
      .pipe(
        map((res) => {
          if (res) {
            return res;
          } else {
            return [];
          }
        }),
        map(mutator)
      )
      .subscribe((res) => {
        setResponse(res);
        setIsLoading(false);
        // setGlobalState({...globalState, [path.split('/').join('')]: res});
        state[`${path}${query}`] = res

      });

    return () => {
      subscription.unsubscribe();
    };
  }, [isLoading, path, query]);

  const get = useCallback(() => {
    setIsLoading(true);
  }, []);

  return [isLoading, response, get];
};
