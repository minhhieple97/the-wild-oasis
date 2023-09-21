import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertCabin as upsertCabinAPI } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
    mutationFn: ({ newCabinData, id: editId }) => {
      upsertCabinAPI(newCabinData, editId);
    },
    onSuccess: () => {
      toast.success("Cabin updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdating, updateCabin };
}
