import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { FiTrash2 } from "react-icons/fi";

interface Props {
  deleteWord: (id: string) => void;
}

const TrashZone: React.FC<Props> = ({ deleteWord }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "trash",
  });

  const isActive = isOver;

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col items-center justify-center p-4 border-2 rounded-md ${
        isActive ? "bg-red-100 border-red-400" : "bg-gray-200 border-gray-400"
      }`}
    >
      <FiTrash2
        className={`text-4xl ${isActive ? "text-red-500" : "text-gray-500"}`}
      />
      <p className="mt-2 text-sm text-center text-gray-700">
        {isActive ? "Drop to delete" : "Drag here to delete"}
      </p>
    </div>
  );
};

export default TrashZone;
