import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { COMMENTS } from "../../app/shared/COMMENTS";
import { baseUrl } from "../../app/shared/baseUrl";

const initialState = {
  commentsArray: [],
  isLoading: true,
  errMsg: "",
  postLoading: false,
  postError: "",
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const response = await fetch(baseUrl + "comments");
    if (!response.ok) {
      return Promise.reject("Unable to fetch, status: " + response.status);
    }
    const data = response.json();
    return data;
  }
);

export const postComment = createAsyncThunk(
  "comments/postComment",

  async (comment, { dispatch }) => {
    console.log(comment);
    const response = await fetch(baseUrl + "comments", {
      method: "POST",
      body: JSON.stringify(comment),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return Promise.reject(response.status);
    }
    const data = await response.json();
    dispatch(addComment(data));
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action) => {
      console.log("addComment action.payload:", action.payload);
      console.log("addComment state.commentsArray:", state.commentsArray);
      const newComment = {
        id: state.commentsArray.length + 1,
        ...action.payload,
      };
      state.commentsArray.push(newComment);
      // return {
      //   ...state,
      //   commentsArray: state.commentsArray.concat([newComment]),
      // };
    },
    clearPostError: (state) => {
      state.postError = "";
    },
  },
  extraReducers: {
    [fetchComments.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errMsg = "";
      state.commentsArray = action.payload;
    },
    [fetchComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.errMsg = action.error ? action.error.message : "Fetch failed";
    },
    [postComment.pending]: (state) => {
      state.postLoading = true;
    },
    [postComment.fulfilled]: (state, action) => {
      state.postLoading = false;
    },

    [postComment.rejected]: (state, action) => {
      state.postLoading = false;
      state.postError = action.error
        ? "Unable to post: Error " + action.error.message
        : "Post failed";
      // alert(
      //   "Your comment could not be posted\nError: " +
      //     (action.error ? action.error.message : "Fetch failed")
      // );
    },
  },
});

export const commentsReducer = commentsSlice.reducer;

export const { addComment } = commentsSlice.actions;
export const { clearPostError } = commentsSlice.actions;

export const selectCommentsByCampsiteId = (campsiteId) => (state) => {
  return state.comments.commentsArray.filter(
    (comment) => comment.campsiteId === parseInt(campsiteId)
  );
};
