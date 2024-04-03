import React, { useState, useEffect, useContext } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import "../css/chapterList.css"
import { HiPencil } from "react-icons/hi2";
import { CiCirclePlus } from "react-icons/ci";
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { CgMenuGridO } from "react-icons/cg";

export default function ChaptersForm({courseId, change}){
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({title: ""})
    const [chapters, setChapters] = useState([])
    const navigate = useNavigate()
    const updateChapterOrderInDatabase = async (updatedChapters) => {
        try {
          const response = await fetch("http://localhost:5000/api/courses/chapters/updateOrder", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ updatedChapters }),
          });
      
          if (response.ok) {
            change();
          }else {
            const data = await response.json();
            console.error("Error updating chapter positions:", data.error);
          }
        } catch (error) {
          console.error("Error updating chapter positions:", error);
        }
      };
    useEffect(()=>{
        const fetchChapters = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/api/courses/${courseId}/chapters`,
					{
						method: "GET",
					}
				);
				if (response.ok) {
					const data = await response.json(); 
					setChapters(data);
				} else
					throw new Error(`HTTP error! Status: ${response.status}`);
			} catch (error) {
				console.error("Error fetching course chapters:", error);
                toast.error("Error fetching chapters");
			}
		}; 
        fetchChapters()
    },[isCreating]);

    useEffect(()=>{
        console.log(chapters)
        updateChapterOrderInDatabase(chapters);
    }, [chapters])

    function editChapter(chapterId) {
      navigate(`/chapters/${chapterId}`)
    }

    function handleClick() {
        setIsCreating(!isCreating)
    }
    const handleChange = (e) => {
		setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
	};

    const handleSubmit= async(e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
            if(!token) return
        try{
            const response = await fetch(
				`http://localhost:5000/api/courses/createChapter/${courseId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(formData),
				});
            if(response.ok) {
                const data = await response.json();
                toast.success(data.message);
                setIsCreating(!isCreating)
            } else {
                const data = await response.json();
                toast.error(data.error);
                console.error("Error updating course :", data.error);
            }
        } catch (error){
            console.error("Error updating course :", error);
        }
    }

    const handleDragEnd = (result) => {
      if (!result.destination) {
        return;
      }
      const reorderedChapters = Array.from(chapters);
      const [removed] = reorderedChapters.splice(result.source.index, 1);
      reorderedChapters.splice(result.destination.index, 0, removed);
      setChapters(reorderedChapters);
    };


    return(
      <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="chapters">
              {(provided) => (
                <div
                  className="form__chl"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <div className="formGroup__chl">
                    <div className="label__chl text">Course Chapters</div>
                    {isCreating ? (
                      <button onClick={handleClick} className="cancelButton__chl text">
                        Cancel
                      </button>
                    ) : (
                      <button onClick={handleClick} className="editButton__chl text">
                        <CiCirclePlus size={20} />Add a chapter
                      </button>
                    )}
                  </div>
                  {isCreating ? (
                    <div className="addChapter__chl">
                      <input
                        className="formInput__chl"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. 'Introduction to the course'"
                      />
                      <button className="submitButton__chl" onClick={handleSubmit}>
                        Submit
                      </button>
                    </div>
                  ) : (
                    <div className="chapterList__chl">
                      {chapters.map((chapter, index) => (
                        <Draggable
                          key={chapter._id}
                          draggableId={chapter._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <div className="chapter__chl">
                                <div className="chapterTitle__chl text">
                                  <CgMenuGridO size={20} />
                                  {chapter.title}
                                </div>
                                {!chapter.isPublished ? (<div className="badge__chl"><div className="draft__chl">Draft</div> <HiPencil className="editChapter__chl" onClick={() =>editChapter(chapter._id)}/></div>) : (<div className="badge__chl"><div className="published__chl">Published</div><HiPencil className="editChapter__chl" onClick={() =>editChapter(chapter._id)}/></div>) }
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
    )
}