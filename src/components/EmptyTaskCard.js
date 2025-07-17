import { useState } from "react";
import useAxios from "../hooks/useAxios";
import {
  Card,
  EditableInput,
  SubtaskList,
  SubtaskItem,
  CommentsSection,
  ButtonRow,
  SmallButton,
} from "../styles/TaskCardStyles";

const EmptyTaskCard = ({ onCreated }) => {
  const [title, setTitle] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [comments, setComments] = useState([]);
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [newComment, setNewComment] = useState("");
  const axios = useAxios();

  const createTask = async () => {
    if (!title.trim()) return;
    try {
      await axios.post("/tasks", {
        title,
        subtasks,
        comments: comments.filter(c => c.content.trim() !== ""),
      });
      onCreated();
      setTitle("");
      setSubtasks([]);
      setComments([]);
      setNewComment("");
    } catch (err) {
      console.error("Error al crear tarea:", err);
    }
  };

  const handleSubtaskChange = (index, value) => {
    const updated = [...subtasks];
    updated[index].title = value;
    setSubtasks(updated);
  };

  const addSubtask = () => {
    setSubtasks([...subtasks, { title: "", completed: false }]);
  };

  const removeSubtask = (index) => {
    setSubtasks(prev => prev.filter((_, i) => i !== index));
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    setComments([...comments, { content: newComment }]);
    setNewComment("");
  };

  const removeComment = (index) => {
    setComments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Card>
        <EditableInput
            placeholder="Nombre de la tarea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />

        {subtasks.length > 0 && (
            <SubtaskList>
            {subtasks.map((sub, i) => (
                <SubtaskItem key={i}>
                <input type="checkbox" disabled checked={false} readOnly />
                <input
                    type="text"
                    placeholder={`Subtarea ${i + 1}`}
                    value={sub.title}
                    onChange={(e) => handleSubtaskChange(i, e.target.value)}
                />
                <SmallButton onClick={() => removeSubtask(i)}>❌</SmallButton>
                </SubtaskItem>
            ))}
            </SubtaskList>
        )}

        <ButtonRow>
            <SmallButton onClick={addSubtask}>+ Subtarea</SmallButton>
        </ButtonRow>

        <CommentsSection>
            {comments.map((c, i) => (
                <div key={i} className="comment">
                    <input
                    type="text"
                    value={c.content}
                    disabled={editingCommentIndex !== i}
                    onChange={(e) => {
                        const updated = [...comments];
                        updated[i].content = e.target.value;
                        setComments(updated);
                    }}
                    />
                    <div className="actions">
                    {editingCommentIndex === i ? (
                        <SmallButton onClick={() => setEditingCommentIndex(null)}>Guardar</SmallButton>
                    ) : (
                        <SmallButton onClick={() => setEditingCommentIndex(i)}>Editar</SmallButton>
                    )}
                    <SmallButton onClick={() => removeComment(i)}>Borrar</SmallButton>
                    </div>
                </div>
            ))}

            <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe un comentario..."
            />
            <SmallButton onClick={addComment}>Agregar comentario</SmallButton>
        </CommentsSection>

        <ButtonRow>
            <SmallButton onClick={createTask}>Guardar tarea</SmallButton>
        </ButtonRow>
    </Card>
  );
};

export default EmptyTaskCard;
