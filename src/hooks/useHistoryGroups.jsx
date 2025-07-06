import { useQuery } from "@tanstack/react-query";

import { useUserId } from "../context/userIdContext";
import { getHistoryGroups } from "../firebase/getHistoryGroups";

export default function useHistoryGroups() {
  const { userId } = useUserId();

  const historyGroupsQuery = useQuery({
    queryKey: ["historyGroups", userId],
    queryFn: async () => {
      if (!userId) {
        return [];
      }

      const historyGroups = await getHistoryGroups(userId);
      return historyGroups;
    },
    initialData: [],
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  return {
    historyGroupsQuery,
  };
}
