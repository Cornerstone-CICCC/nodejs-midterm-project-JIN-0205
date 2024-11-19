import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Word } from "../types";
import { GiRobotGrab } from "react-icons/gi";

interface Props {
  word: Word;
  listState: Word["listState"];
  title: string;
  isOverlay?: boolean;
  hideTranslated: boolean;
  toggleWordChecked: (wordId: string) => void;
}

const WordItem = ({
  word,
  listState,
  title,
  isOverlay = false,
  hideTranslated,
  toggleWordChecked,
}: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: word.id,
    data: {
      word,
      listState,
    },
    disabled: isOverlay,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging && !isOverlay ? 0.5 : 1,
  };

  const itemProps = isOverlay
    ? {}
    : {
        ...attributes,
      };

  return (
    <tr ref={isOverlay ? undefined : setNodeRef} style={style} {...itemProps}>
      <td className="pt-2 pb-0 cursor-grab" {...listeners}>
        <GiRobotGrab />
      </td>

      {/* checkbox */}
      <td className="pt-2 pb-0">
        <input
          type="checkbox"
          checked={word.checked}
          onChange={() => toggleWordChecked(word.id)}
          className="pt-2 pb-0 border-b-2"
        />
      </td>

      <td className="pt-2 pb-0 my-1 text-center border-b-2 border-gray-700">
        {word.origin}
      </td>

      <td className="w-6"></td>

      {!hideTranslated && (
        <td className="pt-2 pb-0 text-center border-b-2 border-gray-700">
          {word.translated}
        </td>
      )}
    </tr>
  );
};

export default WordItem;
