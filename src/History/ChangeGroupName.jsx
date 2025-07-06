import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import useGroups from "../hooks/useGroups";
import useHistoryGroups from "../hooks/useHistoryGroups";

export default function ChangeGroupName({ initialGroupName }) {
  const [inputText, setInputText] = useState(initialGroupName);
  const [isChangeName, setIsChangeName] = useState(true);
  const [prevGroupName, setPrevGroupName] = useState("");

  const { updateGroupNameMutation } = useGroups();

  const {
    historyGroupsQuery: { data: historyGroups },
  } = useHistoryGroups();

  const defaultGroupName = historyGroups[0].name;
  const copiedPrevGroupName = [...historyGroups];
  const findGroupIndex = copiedPrevGroupName.findIndex(
    (group) => group.name === prevGroupName
  );

  useEffect(() => {
    if (inputText === defaultGroupName) {
      setIsChangeName(false);
    }
  }, []);

  function handleChange(event) {
    setInputText(event.target.value);
  }

  async function handleFixGroupName(event) {
    if (inputText.length === 0) {
      return;
    }

    if (event.key === "Enter") {
      copiedPrevGroupName[findGroupIndex].name = inputText;

      const groupId = copiedPrevGroupName[findGroupIndex].id;
      const groupName = copiedPrevGroupName[findGroupIndex].name;

      updateGroupNameMutation.mutate({ groupId, groupName });

      setIsChangeName(false);
    }
  }

  function handleChangeGroupName(event) {
    if (inputText === defaultGroupName) {
      return;
    }
    setPrevGroupName(event.target.innerText);
    setIsChangeName(true);
  }

  return (
    <>
      {isChangeName ? (
        <input
          type="text"
          placeholder="그룹명을 입력해주세요."
          value={inputText}
          onChange={handleChange}
          onKeyDown={handleFixGroupName}
          className="input input-sm text-lg font-semibold w-full"
        />
      ) : (
        <div
          onClick={handleChangeGroupName}
          className="flex mb-[10px] text-lg font-semibold"
        >
          {inputText}
        </div>
      )}
    </>
  );
}

ChangeGroupName.propTypes = {
  initialGroupName: PropTypes.string.isRequired,
};
