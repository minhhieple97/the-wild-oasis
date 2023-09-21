import { useQuery } from "@tanstack/react-query";
import { getSettings as getSettingsAPI } from "../../services/apiSettings";
export function useSettings() {
  const { isLoading, data: settings, error } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettingsAPI,
  });
  return { settings, isLoading, error };
}
