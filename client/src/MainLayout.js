import * as React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { Container, Grid, Stack } from "@mui/material";
import PostsListPage from "./pages/PostsListPage";
import AddPostForm from "./components/add-post/AddPostForm";
import { useDispatch, useSelector } from "react-redux";
import PostDetailsPage from "./pages/PostDetailsPage";
import { fetchPostsAsync } from "./redux-toolkit/posts/PostSlice";
import Header from "./components/header";

function MainLayout({ theme, setTheme, toggleColorMode }) {
  const posts = useSelector((state) => state.posts.posts);
  const memoizedPosts = React.useMemo(() => posts, [posts]);
  // modal process
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    dispatch(fetchPostsAsync());
  }, [dispatch]);

  return (
    <>
      <Container sx={{ flexGrow: 1 }} maxWidth={"lg"}>
        <Stack justifyContent={"center"} alignItems={"center"}>
          <Header
            handleOpen={handleOpen}
            theme={theme}
            setTheme={setTheme}
            toggleColorMode={toggleColorMode}
          />
          <Grid container maxWidth={"lg"} mb={2}>
            <Routes>
              <Route
                path="/"
                element={<Navigate to={"/posts"} replace={true} />}
              />
              <Route
                index
                path="posts"
                element={<PostsListPage posts={memoizedPosts} />}
              />
              <Route path="posts/:id" element={<PostDetailsPage />} />
            </Routes>
          </Grid>
          <AddPostForm open={open} handleClose={handleClose} />
        </Stack>
      </Container>
    </>
  );
}

export default MainLayout;
