import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import noImage from "../images/noimage.svg";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { convertRelativeTime } from "../utils/utils";
import EditPostForm from "../components/EditPostForm";
import Loading from "../components/Loading";
import MDEditor from "@uiw/react-md-editor";
import {
  deletePostAsync,
  fetchSinglePostAsync,
} from "../redux-toolkit/reducers/PostSlice";

export default function PostDetailsPage() {
  const currentPost = useSelector((store) => store.posts.currentPost);

  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const [editMode, setEditMode] = useState(false);

  const openEditMode = () => {
    if (!editMode) setEditMode(true);
  };

  const closeEditMode = () => {
    if (editMode) setEditMode(false);
  };

  useEffect(() => {
    dispatch(fetchSinglePostAsync(id));
  }, [dispatch, id, editMode]);

  const removePost = () => {
    dispatch(deletePostAsync(id));
    navigate("/");
  };
  console.log("currentPost?.image ", currentPost?.image);
  if (status === "loading" && !currentPost) return <Loading />;

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <Paper elevation={2} sx={{ p: 3, mt: 1, mb: 8, width: "100%" }}>
      {editMode ? (
        <EditPostForm post={currentPost} handleClose={closeEditMode} />
      ) : (
        <>
          <Stack
            maxWidth={"lg"}
            direction={"row"}
            justifyContent={"space-between"}
            alignContent={"center"}
            sx={{ mb: 1 }}
            flexWrap={"wrap"}
          >
            <Typography variant="h5" gutterBottom>
              {currentPost?.title}
            </Typography>
            <Box display={"flex"} flexWrap={"nowrap"}>
              <Button
                onClick={openEditMode}
                sx={{ mr: 1 }}
                color="primary"
                variant="outlined"
                startIcon={<EditIcon />}
              >
                Düzenle
              </Button>

              <Button
                onClick={removePost}
                color="secondary"
                variant="outlined"
                startIcon={<DeleteIcon />}
              >
                SİL
              </Button>
            </Box>
          </Stack>

          <Divider />

          <Typography variant="overline" gutterBottom>
            {currentPost?.subtitle}
          </Typography>
          <Typography variant="caption" component={"p"}>
            {convertRelativeTime(currentPost?.createdAt)} by Serhat
          </Typography>

          <Chip
            sx={{ p: 1, my: 1 }}
            label={`# ${currentPost?.tag}`}
            color="primary"
            variant="outlined"
          />

          <Box maxWidth={"lg"}>
            <img
              style={{
                maxWidth: "100%",
                borderRadius: 5,
                marginTop: 3,
                marginBottom: 4,
              }}
              src={currentPost?.image || noImage}
              alt="Post"
            />
          </Box>
          {/* content */}
          <MDEditor.Markdown
            source={currentPost?.content}
            style={{ whiteSpace: "pre-wrap" }}
          />
        </>
      )}
    </Paper>
  );
}
