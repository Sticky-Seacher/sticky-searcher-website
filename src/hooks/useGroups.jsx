import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useUserId } from "../context/userIdContext";
import { addEmptyGroup, updateGroupName } from "../firebase/group";

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

  const updateGroupNameMutation = useMutation({
    mutationFn: async ({ userId, groupId, groupName }) => {
      await updateGroupName(userId, groupId, groupName);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["historyGroups", userId] });
    },
  });

  return {
    addGroupMutation,
    updateGroupNameMutation,
  };
}
