/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <Box
      sx={{
        maxWidth: 350,
        paddingLeft: 5,
        marginTop: 3,
        margin: 2,
      }}
    >
      <Card
        variant="outlined"
        sx={{
          borderWidth: 3,
          borderColor: "purple",
          width: 350,
          height: 250,
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Course ID: {course.courseid}
          </Typography>
          <Typography variant="h5" component="div">
            {course.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Tags: {course.coursetags.join(", ")}
          </Typography>
          <Typography variant="body2">{course.description}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <Link
              to={`/modules-page/${course.courseid}/${encodeURIComponent(
                course.title
              )}`}
            >
              Enter Course
            </Link>
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
