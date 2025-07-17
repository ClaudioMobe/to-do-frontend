import { useState } from "react";
import useAxios from "../hooks/useAxios";
import {
  Card,
  EditableInput,
  SubtaskList,
  SubtaskItem,
  CommentsSection,
  ButtonRow,
  SmallButton
} from "../styles/TaskCardStyles";

const TaskCard = ({ task, onUpdate }) => {
  const [title, setTitle] = useState(task.title);
  const [completed, setCompleted] = useState(task.completed);
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const [comments, setComments] = useState(task.comments);
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [newComment, setNewComment] = useState("");
  const axios = useAxios();

  const allSubtasksCompleted = subtasks.length > 0 && subtasks.every(st => st.completed);

  const updateTask = async (data) => {
    try {
      await axios.put(`/tasks/${task._id}`, data);
      onUpdate();
    } catch (err) {
      console.error("Error al actualizar:", err);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCheckboxToggle = (index) => {
    const updated = [...subtasks];
    updated[index].completed = !updated[index].completed;
    setSubtasks(updated);
    updateTask({ title, subtasks: updated });
  };

  const handleSubtaskTitleChange = (index, value) => {
    const updated = [...subtasks];
    updated[index].title = value;
    setSubtasks(updated);
  };

  const addSubtask = () => {
    const updated = [...subtasks, { title: "", completed: false }];
    setSubtasks(updated);
  };

  return (
    <Card>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <input
          type="checkbox"
          checked={subtasks.length === 0 ? completed : allSubtasksCompleted}
          onChange={() => {
            if (subtasks.length === 0) {
              const newCompleted = !completed;
              setCompleted(newCompleted);
              updateTask({ completed: newCompleted });
            }
          }}
          disabled={subtasks.length > 0}
        />
        <EditableInput
          value={title}
          onChange={handleTitleChange}
          onBlur={() => updateTask({ title, subtasks })}
        />
      </div>

      <SubtaskList>
        {subtasks?.map((sub, i) => (
          <SubtaskItem key={i} completed={sub.completed}>
            <input
              type="checkbox"
              checked={sub.completed}
              onChange={() => handleCheckboxToggle(i)}
            />
            <input
              type="text"
              placeholder="Nueva subtarea"
              value={sub.title}
              onChange={(e) => handleSubtaskTitleChange(i, e.target.value)}
              onBlur={() => updateTask({ title, subtasks })}
            />
            <SmallButton
              onClick={() => {
                const updated = subtasks.filter((_, j) => j !== i);
                setSubtasks(updated);
                sub.title && updateTask({ title, subtasks: updated });
              }}
            >
              ❌
            </SmallButton>
          </SubtaskItem>
        ))}
      </SubtaskList>

      <ButtonRow>
        <SmallButton onClick={addSubtask}>+ Subtarea</SmallButton>
      </ButtonRow>

      <CommentsSection>
        {comments.map((c, i) => (
          <div key={i} className="comment">
            <div className="actions">
                <input
                type="text"
                value={c.content}
                disabled={editingCommentIndex !== i}
                onChange={(e) => {
                    const updated = [...comments];
                    updated[i].content = e.target.value;
                    setComments(updated);
                }}
                onBlur={() => {
                    setEditingCommentIndex(null);
                    updateTask({ title, subtasks, comments });
                }}
                />
                <SmallButton onClick={() => setEditingCommentIndex(i)}>✏️</SmallButton>
                <SmallButton
                    onClick={() => {
                    const updated = comments.filter((_, j) => j !== i);
                    setComments(updated);
                    updateTask({ title, subtasks, comments: updated });
                    }}
                >🗑️</SmallButton>
            </div>
          </div>
        ))}
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escribe un comentario..."
        />
        <SmallButton
          onClick={() => {
            if (newComment.trim() === "") return;
            const updatedComments = [...comments, { content: newComment }];
            updateTask({ comments: updatedComments });
            setComments(updatedComments);
            setNewComment("");
          }}
        >
          Agregar comentario
        </SmallButton>
      </CommentsSection>

      <SmallButton onClick={() => axios.delete(`/tasks/${task._id}`).then(onUpdate)}>
        Eliminar tarea
      </SmallButton>
    </Card>
  );
};

export default TaskCard;
