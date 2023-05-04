import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  data: any;
}

const CourseCard = (props: CourseCardProps) => {
  const { data } = props;
  const { videoid, name, level, image, description, slug } = data;

  const navigate = useNavigate();

  const handleOnLearn = () => {
    navigate(`/course/${slug}`, {
      replace: true,
    });
  };
  return (
    <Box p={1} boxShadow={"0px 0px 8px #ccc"}>
      <Typography
        sx={{
          display: "-webkit-box",
          height: 50,
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: "2",
          overflow: "hidden",
        }}
        fontWeight={600}
      >
        {name}
      </Typography>
      <Box>
        <img
          // src={`https://img.youtube.com/vi/${formData.videoid}/sddefault.jpg`}
          src={image}
          alt="..."
          style={{ width: "100%" }}
        />
        <Box>
          <Typography
            variant="subtitle2"
            sx={{
              display: "-webkit-box",
              height: 70,
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: "3",
              overflow: "hidden",
            }}
          >
            {description}
          </Typography>
          <Stack direction="row" width={"100%"} justifyContent="flex-end">
            <Button
              sx={{ width: "fit-content" }}
              variant="contained"
              size="small"
              onClick={handleOnLearn}
            >
              Learn!!
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseCard;
