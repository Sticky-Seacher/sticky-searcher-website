import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useUserId } from "../context/userIdContext";
import { updateGroupsAndHistoriesAfterDragAndDrop } from "../firebase/afterDragAndDrop";
import { getHistoryGroups } from "../firebase/getHistoryGroups";

export default function useHistoryGroups() {
  const { userId } = useUserId();
  const queryClient = useQueryClient();

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

  const updateHistoryGroupsAfterDragAndDropMutation = useMutation({
    mutationFn: async ({ userId, newHistoryGroups }) => {
      await updateGroupsAndHistoriesAfterDragAndDrop(userId, newHistoryGroups);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["historyGroups", userId] });
    },
  });

  return {
    historyGroupsQuery,
    updateHistoryGroupsAfterDragAndDropMutation,
  };
}
