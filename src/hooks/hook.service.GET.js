import { useState, useEffect, useCallback } from "react";
import { map } from "rxjs/operators";
import { state } from "../state/state";
import ApiService from "../services/api.service";

export default (path='') => {
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
      .subscribe((res) => {
        setResponse(res);
        setIsLoading(false);
        // setGlobalState({...globalState, [path.split('/').join('')]: res});
        console.log(res, '>>>');
        state[path] = res
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [isLoading, path]);

  const get = useCallback(() => {
    setIsLoading(true);
  }, []);

  return [isLoading, response, get, state];
};
