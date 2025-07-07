import { useRef } from "react";

import useGroups from "../hooks/useGroups";
import useHistoryGroups from "../hooks/useHistoryGroups";
import AddGroupButton from "../shared/AddGroupButton";
import KeywordGroup from "./KeywordGroup";

export default function DragAndDrop() {
  const dragPosition = useRef();

  const {
    historyGroupsQuery: { data: historyGroups },
    updateHistoryGroupsAfterDragAndDropMutation,
  } = useHistoryGroups();

  const { addGroupMutation } = useGroups();

  const startDrag = (historyGroupIndex, history) => {
    dragPosition.current = {
      historyGroupIndex: historyGroupIndex,
      history: history,
    };
  };

  async function drop(event, nextHistoryGroupIndex, historyGroups) {
    event.preventDefault();

    const newHistoryGroups = [...historyGroups];
    const { historyGroupIndex: prevHistoryGroupIndex, history: targetHistory } =
      dragPosition.current;

    newHistoryGroups[prevHistoryGroupIndex].histories = newHistoryGroups[
      prevHistoryGroupIndex
    ].histories.filter((history) => history !== targetHistory);

    newHistoryGroups[nextHistoryGroupIndex].histories.push(targetHistory);

    dragPosition.current = null;

    updateHistoryGroupsAfterDragAndDropMutation.mutate({
      newHistoryGroups,
    });
  }

  async function createHistoryGroup(groupName) {
    addGroupMutation.mutate({ groupName });
  }

  return (
    <>
      <AddGroupButton addGroup={createHistoryGroup} />
      {historyGroups.map((historyGroup, historyGroupIndex) => (
        <KeywordGroup
          key={historyGroup.id}
          groupName={historyGroup.name}
          historyGroup={historyGroup}
          onDragStart={(history) => startDrag(historyGroupIndex, history)}
          onDrop={(event) => drop(event, historyGroupIndex, historyGroups)}
        />
      ))}
    </>
  );
}
