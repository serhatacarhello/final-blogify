import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import noImage from "../images/noimage.svg";
import { Box, Chip, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { convertRelativeTime } from "../utils/utils";

export default function Post(props) {
  const { _id, title, subtitle, content, tag, image, createdAt } = props;

  return (
    <Card sx={{ maxWidth: 345, width: "100%", height: "100%" }}>
      <CardMedia
        width={"100%"}
        component="img"
        height="194"
        title="Resim"
        alt={"image"}
        src={image || noImage}
      />
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="content">
            S
          </Avatar>
        }
        title={title}
        subheader={convertRelativeTime(createdAt)}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component={"p"}>
          {title}
        </Typography>
        <Typography variant="overline" component={"p"} color="text.secondary">
          {subtitle}
        </Typography>
        <Typography variant="body2">
          {content?.length > 250 ? content.substring(0, 250) + "..." : content}
        </Typography>
      </CardContent>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        spacing={2}
        padding={1}
      >
        <Box>
          <Chip label={`# ${tag}`} sx={{ my: 2 }} variant="outlined" />
        </Box>

        <Box aria-label="show more">
          <Link to={`/posts/${_id}`}>
            <IconButton aria-label="show-more">
              <MoreHorizIcon />
            </IconButton>
          </Link>
        </Box>
      </Stack>
    </Card>
  );
}
