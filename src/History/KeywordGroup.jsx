import PropTypes from "prop-types";

import { useUserId } from "../context/userIdContext";
import useHistoryGroups from "../hooks/useHistoryGroups";
import ChangeGroupName from "./ChangeGroupName";
import HistoryItem from "./HistoryItem";

export default function KeywordGroup({
  setAddedGroupName,
  groupName,
  historyGroup,
  onDragStart,
  onDrop,
  setHistoryGroups,
}) {
  const { userId } = useUserId();
  const targetGroupId = historyGroup.id;

  const { deleteHistoryGroupMutation } = useHistoryGroups();

  return (
    <div className="newGroup h-full relative">
      <div>
        <div
          className="w-[100%] shadow rounded-[10px] border p-[20px] sticky z-0"
          onDrop={onDrop}
          onDragOver={(event) => event.preventDefault()}
        >
          <ChangeGroupName
            initialGroupName={groupName}
            setAddedGroupName={setAddedGroupName}
          />
          <div className="gap-[10px]">
            <ul className="pt-[30px]">
              {historyGroup.histories.map((history, historyIdex) => {
                return (
                  <HistoryItem
                    key={historyIdex}
                    history={history}
                    onDragStart={onDragStart}
                    onDrop={onDrop}
                    groupId={historyGroup.id}
                    setHistoryGroups={setHistoryGroups}
                  />
                );
              })}
            </ul>
          </div>
        </div>
        {targetGroupId !== "default" && (
          <button
            onClick={() => {
              if (targetGroupId === "default") {
                return;
              }
              deleteHistoryGroupMutation.mutate({ userId, targetGroupId });
            }}
            className=" w-DelBtnW h-DelBtnH rounded-sm hover:bg-[#ddd] absolute right-[10px] top-[10px] text-subPrimary1"
          >
            X
          </button>
        )}
      </div>
    </div>
  );
}

KeywordGroup.propTypes = {
  setAddedGroupName: PropTypes.func.isRequired,
  groupName: PropTypes.string.isRequired,
  historyGroup: PropTypes.object.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  setHistoryGroups: PropTypes.func.isRequired,
};
