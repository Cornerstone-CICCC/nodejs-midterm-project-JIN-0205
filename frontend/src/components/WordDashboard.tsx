import { useEffect, useState, useRef } from "react";
import { Word } from "../types";
import WordsList from "./WordsList";
import WordItem from "./WordItem";
import translator from "../apis/translator";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import TrashZone from "./TrashZone";

import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

const WordDashboard = () => {
  const navigate = useNavigate();
  const [lists, setLists] = useState<Word[]>([]);
  const [straggleList, setStraggleList] = useState<Word[]>([]);
  const [passingList, setPassingList] = useState<Word[]>([]);
  const [masteryList, setMasteryList] = useState<Word[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [activeWord, setActiveWord] = useState<Word | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [isDuplicated, setIsDuplicated] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const [hideTranslated, setHideTranslated] = useState<
    Record<Word["listState"], boolean>
  >({
    straggle: false,
    passing: false,
    mastery: false,
  });

  const [showCheckedOnly, setShowCheckedOnly] = useState<
    Record<Word["listState"], boolean>
  >({
    straggle: false,
    passing: false,
    mastery: false,
  });

  useEffect(() => {
    setStraggleList(lists.filter((word) => word.listState === "straggle"));
    setPassingList(lists.filter((word) => word.listState === "passing"));
    setMasteryList(lists.filter((word) => word.listState === "mastery"));
  }, [lists]);

  useEffect(() => {
    loadProfile();
  }, []);

  const fetchWords = async (): Promise<Word[]> => {
    const res = await fetch(`http://localhost:3000/words`, {
      credentials: "include",
    });
    const data = await res.json();
    return data;
  };

  const buildList = async (): Promise<void> => {
    const wordsData = await fetchWords();
    setLists(wordsData);
  };

  const loadProfile = async (): Promise<void> => {
    try {
      const res = await fetch(`http://localhost:3000/users/profile`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setUserId(data.userId);
      buildList();
    } catch (error) {
      console.error("Error loading profile:", error);
      navigate("/");
    }
  };

  const addWord = async () => {
    const trimmedInput = inputVal.trim().toLowerCase();
    if (trimmedInput === "") {
      setIsDuplicated("Enter word");
      return;
    }

    const isDuplicate = lists.some(
      (list) => list.origin.toLowerCase() === trimmedInput
    );

    if (isDuplicate) {
      setIsDuplicated("This word already exits");
      return;
    }
    const translation = await translator(inputVal, "ja");
    const newWord: Word = {
      id: uuidv4(),
      origin: inputVal,
      translated: translation,
      checked: false,
      listState: "straggle",
      userId: userId,
    };

    setLists((prev) => [...prev, newWord]);
    setInputVal("");

    await fetch(`http://localhost:3000/words/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newWord),
    });
    inputRef.current?.focus();
    setIsDuplicated("");
  };

  const handleInputEnterKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key !== "Enter") return;
    addWord();
  };

  const updateWord = async (
    id: string,
    updatedData: Partial<Word>
  ): Promise<void> => {
    setLists((prev) =>
      prev.map((word) => (word.id === id ? { ...word, ...updatedData } : word))
    );

    await fetch(`http://localhost:3000/words/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updatedData),
    });
  };
  const deleteWord = async (id: string): Promise<void> => {
    setLists((prev) => prev.filter((word) => word.id !== id));

    await fetch(`http://localhost:3000/words/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeItemId = active.id.toString();

    if (activeItemId) {
      const activeItem = lists.find((item) => item.id === activeItemId);
      if (activeItem) {
        setActiveWord(activeItem);
      }
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    if (overId === "trash") {
      await deleteWord(activeId);
      setActiveWord(null);
      return;
    }

    const activeListState = active.data.current?.listState as
      | Word["listState"]
      | undefined;
    let overListState = over.data.current?.listState as
      | Word["listState"]
      | undefined;

    if (!activeListState) return;

    if (!overListState) {
      const overItem = lists.find((item) => item.id === overId);
      if (overItem) {
        overListState = overItem.listState;
      } else {
        const possibleListStates: Word["listState"][] = [
          "straggle",
          "passing",
          "mastery",
        ];
        if (possibleListStates.includes(overId as Word["listState"])) {
          overListState = overId as Word["listState"];
        } else {
          return;
        }
      }
    }

    if (!overListState) return;

    if (activeListState === overListState) {
      let currentList: Word[] = [];
      let setCurrentList: React.Dispatch<React.SetStateAction<Word[]>>;

      switch (activeListState) {
        case "straggle":
          currentList = straggleList;
          setCurrentList = setStraggleList;
          break;
        case "passing":
          currentList = passingList;
          setCurrentList = setPassingList;
          break;
        case "mastery":
          currentList = masteryList;
          setCurrentList = setMasteryList;
          break;
        default:
          return;
      }

      const activeIndex = currentList.findIndex((item) => item.id === activeId);
      const overIndex = currentList.findIndex((item) => item.id === overId);

      if (activeIndex !== overIndex && overIndex !== -1) {
        const newList = arrayMove(currentList, activeIndex, overIndex);
        setCurrentList(newList);
      }
    } else {
      const activeItem = lists.find((item) => item.id === activeId);
      if (!activeItem) return;

      await updateWord(activeId, { listState: overListState });
    }

    setActiveWord(null);
  };

  const toggleWordChecked = async (
    listState: Word["listState"],
    wordId: string
  ) => {
    const updatedWord = lists.find((word) => word.id === wordId);
    if (updatedWord) {
      const newCheckedStatus = !updatedWord.checked;
      await updateWord(wordId, { checked: newCheckedStatus });
    }
  };

  const toggleShowCheckedOnly = (listState: Word["listState"]) => {
    setShowCheckedOnly((prev) => ({
      ...prev,
      [listState]: !prev[listState],
    }));
  };

  const toggleHideTranslated = (listState: Word["listState"]) => {
    setHideTranslated((prev) => ({
      ...prev,
      [listState]: !prev[listState],
    }));
  };

  const listData = [
    { listState: "straggle" as Word["listState"], words: straggleList },
    { listState: "passing" as Word["listState"], words: passingList },
    { listState: "mastery" as Word["listState"], words: masteryList },
  ];

  useEffect(() => {
    const trimmedInput = inputVal.trim().toLowerCase();
    if (trimmedInput === "") {
      setIsDuplicated("");
      return;
    }

    const isDuplicate = lists.some(
      (list) => list.origin.toLowerCase() === trimmedInput
    );

    if (isDuplicate) {
      setIsDuplicated("This word already exists");
    } else {
      setIsDuplicated("");
    }
  }, [inputVal, lists]);

  return (
    <div>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {/* input */}
        <div className="flex justify-center ">
          <div className={` w-[300px] flex justify-center p-4 relative `}>
            <input
              type="text"
              placeholder="Enter a word"
              ref={inputRef}
              value={inputVal}
              className="px-1 mr-2 border-2 rounded-md outline-none ring-2 ring-blue-600"
              onKeyDown={(e) => handleInputEnterKeyDown(e)}
              onChange={(e) => setInputVal(e.currentTarget.value)}
            />
            <button
              onClick={addWord}
              className="px-4 py-1 text-black bg-white rounded-lg outline-none hover:text-white ring-blue-600 ring-2 hover:bg-blue-600 focus:bg-blue-600 focus:text-white"
            >
              Add
            </button>
            {isDuplicated && (
              <span className="absolute top-12 left-8 text-rose-600">
                {isDuplicated}
              </span>
            )}
          </div>
        </div>

        {/* <div className="flex justify-between gap-5 py-10 mx-3"> */}
        <div className="grid grid-cols-1 gap-4 py-10 mx-3 md:grid-cols-3 ">
          {listData.map(({ listState, words }) => (
            <WordsList
              key={listState}
              listState={listState}
              title={
                listState === "straggle"
                  ? "Struggle List"
                  : listState === "passing"
                  ? "Passing List"
                  : "Mastery List"
              }
              words={words}
              ringColor={
                listState === "straggle"
                  ? "ring-rose-200"
                  : listState === "passing"
                  ? "ring-yellow-200"
                  : "ring-green-200"
              }
              textColor={
                listState === "straggle"
                  ? "text-rose-500"
                  : listState === "passing"
                  ? "text-yellow-500"
                  : "text-green-600"
              }
              hideTranslated={hideTranslated[listState]}
              toggleHideTranslated={() => toggleHideTranslated(listState)}
              showCheckedOnly={showCheckedOnly[listState]}
              toggleShowCheckedOnly={() => toggleShowCheckedOnly(listState)}
              toggleWordChecked={(wordId: string) =>
                toggleWordChecked(listState, wordId)
              }
            />
          ))}
        </div>
        <TrashZone deleteWord={deleteWord} />

        <DragOverlay>
          {activeWord ? (
            <table>
              <tbody>
                <WordItem
                  word={activeWord}
                  listState={activeWord.listState}
                  title=""
                  isOverlay={true}
                  hideTranslated={false}
                  toggleWordChecked={() => {}}
                />
              </tbody>
            </table>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default WordDashboard;
