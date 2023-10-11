import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import { Container, Grid, Stack } from "@mui/material";
import PostsListPage from "./pages/PostsListPage";
import AddPostForm from "./components/add-post/AddPostForm";
import { useDispatch, useSelector } from "react-redux";
import PostDetailsPage from "./pages/PostDetailsPage";
import { fetchPostsAsync } from "./redux-toolkit/reducers/PostSlice";

function App() {
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
      <CssBaseline />
      <Container sx={{ flexGrow: 1 }} maxWidth={"lg"}>
        <Stack justifyContent={"center"} alignItems={"center"}>
          <AppBar position="static" color="inherit" elevation={0}>
            <Toolbar>
              {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to={"/"}>Blogify</Link>
              </Typography>
              <Button
                onClick={handleOpen}
                color="primary"
                variant="outlined"
                startIcon={<CreateIcon />}
              >
                YENİ YAZI
              </Button>
            </Toolbar>
          </AppBar>
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

export default App;
