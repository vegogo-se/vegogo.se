import { useAllPlaces } from "./useAllPlaces";

export const usePlace = path => {
  const allPlaces = useAllPlaces();

  const place = allPlaces.find(place => {
    return place.path === path;
  });

  return place;
};
