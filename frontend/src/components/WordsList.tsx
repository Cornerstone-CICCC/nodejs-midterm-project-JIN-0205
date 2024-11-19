import { Word } from "../types";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import WordItem from "./WordItem";

interface Props {
  listState: Word["listState"];
  title: string;
  words: Word[];
  ringColor: string;
  textColor: string;
  hideTranslated: boolean;
  toggleHideTranslated: () => void;
  showCheckedOnly: boolean;
  toggleShowCheckedOnly: () => void;
  toggleWordChecked: (wordId: string) => void;
}

const WordsList = ({
  listState,
  title,
  words,
  ringColor,
  textColor,
  hideTranslated,
  toggleHideTranslated,
  showCheckedOnly,
  toggleShowCheckedOnly,
  toggleWordChecked,
}: Props) => {
  const { setNodeRef } = useDroppable({
    id: listState,
    data: {
      listState,
    },
  });

  const displayedWords = showCheckedOnly
    ? words.filter((word) => word.checked)
    : words;

  return (
    <div
      ref={setNodeRef}
      className={` h-auto p-4 bg-gray-100 rounded-xl ring-4 ${ringColor} `}
    >
      <div className="flex items-center justify-around mb-2">
        <h3 className={`font-serif text-2xl ${textColor}`}>{title}</h3>
        {/* checkbox and hide BTN */}
        <div className="flex flex-col lg:flex-row md:flex-col min-[500px]:flex-row items-center justify-between space-x-2">
          <label className="flex items-center space-x-1">
            <input
              type="checkbox"
              checked={showCheckedOnly}
              onChange={toggleShowCheckedOnly}
            />
            <span className="text-sm">Checked Only</span>
          </label>
          <button
            onClick={toggleHideTranslated}
            className="px-2 py-1 text-sm bg-gray-200 rounded"
          >
            <span className={hideTranslated ? "line-through" : ""}>
              Translated
            </span>
          </button>
        </div>
      </div>
      <div className="max-h-[250px] overflow-y-auto">
        <table className="w-full p-2 rounded-full ">
          <tbody className="bg-gray-100 rounded-full">
            <SortableContext
              items={displayedWords.map((word) => word.id)}
              strategy={verticalListSortingStrategy}
            >
              {displayedWords.map((word) => (
                <WordItem
                  key={word.id}
                  word={word}
                  listState={listState}
                  title={title}
                  hideTranslated={hideTranslated}
                  toggleWordChecked={toggleWordChecked}
                />
              ))}
            </SortableContext>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WordsList;
