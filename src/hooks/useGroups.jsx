import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useUserId } from "../context/userIdContext";
import { addEmptyGroup } from "../firebase/group";

export default function useGroups() {
  const { userId } = useUserId();
  const queryClient = useQueryClient();

  const addGroupMutation = useMutation({
    mutationFn: async ({ userId, groupName }) => {
      addEmptyGroup(userId, groupName);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["historyGroups", userId] });
    },
  });

  return {
    addGroupMutation,
  };
}
