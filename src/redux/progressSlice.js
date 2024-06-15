import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export const fetchProgress = createAsyncThunk('progress/fetchProgress', async ({ courseId }, { rejectWithValue }) => {
  try {
    const token = Cookies.get('jwtToken'); // Retrieve JWT token from cookies

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };

    const res = await fetch(`http://localhost:8800/fetch/progress/${courseId}`, options);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const response = await res.json();
    return response.progress;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addProgress = createAsyncThunk('progress/addProgress', async ({ courseId, moduleId, lessonId, lessonPoints }, { rejectWithValue }) => {
  try {
    const token = Cookies.get('jwtToken'); // Retrieve JWT token from cookies

    await axios.post(
      'http://localhost:8800/add/progress',
      {
        courseid: courseId,
        moduleid: moduleId,
        lessonid: lessonId,
        lessonpoints: lessonPoints // Include lessonpoints in the request body
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return { moduleId, lessonId };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    modules: []
  },
  reducers: {
    setModules: (state, action) => {
      // Initialize each module and its lessons with isDone flag set to false
      state.modules = action.payload.map(module => ({
        ...module,
        lessons: module.lessons.map(lesson => ({
          ...lesson,
          isDone: false
        }))
      }));
    },
    markLessonDone: (state, action) => {
      const { moduleId, lessonId } = action.payload;
      const module = state.modules.find(mod => mod._id === moduleId);
      if (module) {
        const lesson = module.lessons.find(les => les._id === lessonId);
        if (lesson) {
          lesson.isDone = true;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgress.fulfilled, (state, action) => {
        const progressData = action.payload;
        state.modules = state.modules.map(module => ({
          ...module,
          lessons: module.lessons.map(lesson => ({
            ...lesson,
            isDone: progressData.some(progressModule => 
              progressModule.moduleid === module._id &&
              progressModule.lessons.some(progressLesson => 
                progressLesson.lessonid === lesson._id
              )
            )
          }))
        }));
      })
      .addCase(fetchProgress.rejected, (state, action) => {
        console.error("Fetch progress rejected:", action.payload);
      })
      .addCase(addProgress.fulfilled, (state, action) => {
        const { moduleId, lessonId } = action.payload;
        const module = state.modules.find(mod => mod._id === moduleId);
        if (module) {
          const lesson = module.lessons.find(les => les._id === lessonId);
          if (lesson) {
            lesson.isDone = true;
          }
        }
      })
      .addCase(addProgress.rejected, (state, action) => {
        console.error("Add progress rejected:", action.payload);
      });
  },
});

export const { setModules, markLessonDone } = progressSlice.actions;

export default progressSlice.reducer;
