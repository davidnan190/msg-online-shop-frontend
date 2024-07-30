import axios, { CancelTokenSource } from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { ERROR_REQUEST_CANCELLED_BY_CLIENT } from '../../constants/api.constants';
import { ILocation } from '../../types/locations/location.interface';
import { locationService } from '../../services/location.service';
import { useLogger } from '../../context/LoggerContext';

type FetchResult = {
  locations: ILocation[] | undefined;
  isLoading: boolean;
  error: string | null;
};

export const useFetchLocations = (): FetchResult => {
  const [locations, setLocations] = useState<ILocation[] | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const logger = useLogger();

  const fetchLocations = useCallback(async (cancelToken: CancelTokenSource) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await locationService.getAllLocations(cancelToken);
      setLocations(data);
      logger.debug(`Fetch Locations Data: ${data}`, {
        hook: 'useFetchLocation',
        action: 'fetchLocations',
      });
    } catch (err) {
      if (!axios.isCancel(err)) setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    fetchLocations(cancelTokenSource);

    return () => {
      cancelTokenSource.cancel(ERROR_REQUEST_CANCELLED_BY_CLIENT);
    };
  }, [fetchLocations]);

  return { locations, isLoading, error };
};
