import React, { useState, useEffect, useContext } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import "../css/chapterForm.css"
import { HiPencil } from "react-icons/hi2";
import { CiCirclePlus } from "react-icons/ci";
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { CgMenuGridO } from "react-icons/cg";

export default function ChaptersForm({courseId}){
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({title: ""})
    const [chapters, setChapters] = useState([])
    const updateChapterOrderInDatabase = async (updatedChapters) => {
        try {
          const response = await fetch("http://localhost:5000/api/courses/chapters/updateOrder", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ updatedChapters }),
          });
      
          if (!response.ok) {
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
					`http://localhost:5000/api/courses/chapters/${courseId}`,
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
    },[]);

    useEffect(()=>{
        console.log(chapters)
        updateChapterOrderInDatabase(chapters);
    }, [chapters])

    function editChapter(chapterId) {
      console.log(chapterId)
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
                  className="form__chf"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <div className="formGroup__chf">
                    <div className="label__chf text">Course Chapters</div>
                    {isCreating ? (
                      <button onClick={handleClick} className="cancelButton__chf text">
                        Cancel
                      </button>
                    ) : (
                      <button onClick={handleClick} className="editButton__chf text">
                        <CiCirclePlus size={20} />Add a chapter
                      </button>
                    )}
                  </div>
                  {isCreating ? (
                    <div className="addChapter__chf">
                      <input
                        className="formInput__chf"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. 'Introduction to the course'"
                      />
                      <button className="submitButton__chf" onClick={handleSubmit}>
                        Submit
                      </button>
                    </div>
                  ) : (
                    <div className="chapterList__chf">
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
                              <div className="chapter__chf">
                                <div className="chapterTitle__chf text">
                                  <CgMenuGridO size={20} />
                                  {chapter.title}
                                </div>
                                {!chapter.isPublished ? (<div className="badge__chf"><div className="draft__chf">Draft</div> <HiPencil className="editChapter__chf" onClick={() =>editChapter(chapter._id)}/></div>) : (<div className="badge__chf"><div className="published__chf">Published</div><HiPencil className="editChapter__chf" onClick={() =>editChapter(chapter._id)}/></div>) }
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