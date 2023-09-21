import { useQuery } from "@tanstack/react-query";
import { getAllCabins as getAllCabinsAPI } from "../../services/apiCabins";

export function useCabins() {
  const { isLoading, data: cabins,error } = useQuery({
    queryKey: ["cabins"],
    queryFn: getAllCabinsAPI,
  });
  return { cabins, isLoading,error };
}
