import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useUserId } from "../context/userIdContext";
import { deleteHistory } from "../firebase/history";

export default function useHistories() {
  const queryClient = useQueryClient();
  const { userId } = useUserId();

  const deleteHistoryMutation = useMutation({
    mutationFn: async ({ groupId, targetHistoryId }) => {
      await deleteHistory(userId, groupId, targetHistoryId);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["historyGroups", userId] });
    },
  });

  return {
    deleteHistoryMutation,
  };
}
