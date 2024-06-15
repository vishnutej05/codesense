import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProgress, addProgress, setModules, markLessonDone } from '../../redux/progressSlice';
import { Button, Typography, Paper } from '@mui/material';
import LessonContent from "../LessonContent/index";
import Checkbox from '@mui/material/Checkbox';
import './index.css';

export default function ModuleCards({ modules, courseId }) {
  const dispatch = useDispatch();
  const storedModules = useSelector((state) => state.progress.modules);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showLessons, setShowLessons] = useState({});

  useEffect(() => {
    dispatch(setModules(modules));
    dispatch(fetchProgress({ courseId }));
  }, [dispatch, modules, courseId]);

  const handleCheckboxChange = (moduleId, lessonId, lessonPoints) => {
    const userConfirmed = window.confirm("This action cannot be undone. Do you want to continue?");
    if (userConfirmed) {
      dispatch(markLessonDone({ moduleId, lessonId }));
      dispatch(addProgress({ courseId, moduleId, lessonId, lessonPoints }));
    }
  };

  const handleModuleClick = (moduleId) => {
    setShowLessons((prevState) => ({
      ...prevState,
      [moduleId]: !prevState[moduleId]
    }));
  };

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
  };

  return (
    <div className="module-card-container">
      <div className="sidebar">
        {storedModules.map((module) => (
          <div key={module._id} className="module-card">
            <Button
              className={`module-title-btn ${module.lessons.every(lesson => lesson.isDone) ? 'completed' : ''}`}
              variant="contained"
              onClick={() => handleModuleClick(module._id)}
            >
              {module.module_title}
            </Button>

            {showLessons[module._id] && (
              <div className="lessons-container">
                {module.lessons.map((lesson) => (
                  <div key={lesson._id} className="lesson-item">
                    <Typography
                      className={`lesson-title ${lesson.isDone ? 'completed' : ''}`}
                      onClick={() => handleLessonClick(lesson)}
                    >
                      {lesson.lesson_title}
                    </Typography>
                    {!lesson.isDone && lesson.contentype === 'text-material' && (
                      <Checkbox
                        checked={lesson.isDone}
                        onChange={() => handleCheckboxChange(module._id, lesson._id, lesson.lesson_points)}
                        className="lesson-checkbox"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="lesson-content">
        {selectedLesson ? (
          <Paper className="lesson-paper">
            <LessonContent lessonId={selectedLesson._id} />
          </Paper>
        ) : (
          <Typography variant="h6">Select a lesson to view its content</Typography>
        )}
      </div>
    </div>
  );
}
