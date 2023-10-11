import { Button, Container, Grid, Stack } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import gridFour from "../images/grid_four.svg";
import gridThree from "../images/grid_three.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import Hidden from "@mui/material/Hidden";
import Loading from "../components/Loading";
import { fetchPostsAsync } from "../redux-toolkit/reducers/PostSlice";

export default function PostsListPage({ posts }) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, [dispatch]);

  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const [layout, setLayout] = useState("gridThree");

  const calculateMd = () => {
    return layout === "gridThree" ? 4 : 3;
  };
  const isMdScreen = useMediaQuery("(min-width: 900px)");

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {/* layout Shifter */}
      <Hidden mdDown={!isMdScreen}>
        <Container>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={1}
            my={1}
          >
            <Button
              variant="text"
              size="small"
              onClick={() => setLayout("gridThree")}
            >
              <img
                src={gridThree}
                alt="Three Columns Grid Icon"
                style={{ background: layout === "gridThree" ? "#ccc" : "" }}
              />
            </Button>

            <Button
              variant="text"
              size="small"
              onClick={() => setLayout("gridFour")}
            >
              <img
                src={gridFour}
                alt="grid four"
                style={{
                  background: layout === "gridFour" ? "#ccc" : "",
                }}
              />
            </Button>
          </Stack>
        </Container>
      </Hidden>
      <Grid container spacing={2}>
        {posts?.map((post) => (
          <Grid item key={post?._id} xs={12} sm={6} md={calculateMd()}>
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              flexWrap={"wrap"}
            >
              <Suspense fallback={<Loading />}>
                <Post {...post} />
              </Suspense>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
