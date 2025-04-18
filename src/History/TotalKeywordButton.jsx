import PropTypes from "prop-types";

import SearchKeyword from "./SearchKeyword";

export function TotalKeywordButton({ history }) {
  const numberOfKeywords = history.keywords.length;

  return (
    <div className="collapse w-[100%] rounded-[5px] collapse-arrow bg-base-200">
      <input type="checkbox" />
      <div className="collapse-title flex px-[10px]">
        {history.keywords.map(({ keyword, count }, index) => {
          return (
            index < 3 && (
              <SearchKeyword
                key={index}
                keyword={keyword}
                count={count}
              />
            )
          );
        })}
      </div>
      <div className="collapse-content px-[10px]">
        <div className="flex flex-wrap gap-[5px] items-center">
          {numberOfKeywords >= 4 ? (
            history.keywords.map(({ keyword, count }, index) => {
              return (
                index >= 3 && (
                  <SearchKeyword
                    key={index}
                    keyword={keyword}
                    count={count}
                  />
                )
              );
            })
          ) : (
            <div className="text-sm text-gray-500 italic">
              저장된 추가 키워드가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

TotalKeywordButton.propTypes = {
  history: PropTypes.object,
};
