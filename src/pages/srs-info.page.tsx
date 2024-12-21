import {
    Box,
    Button,
    Card as MuiCard,
    Container,
    Stack,
    Typography,
    styled,
    useTheme,
    useMediaQuery
  } from "@mui/material";

  import {
    AnimationPlaybackControls,
    Easing,
    stagger,
    useAnimate,
    useInView,
    motion,
  } from "framer-motion";

  import React from "react";
 
  const Card = styled(MuiCard)(({ theme }) => ({
    textAlign: "center",
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    zIndex: 2,
  })) as typeof MuiCard;

  const MotionBox = motion(Box);
  
  export type SRSHomeProps = {};

  export default function SRSInfo(props: SRSHomeProps) {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  // const [cardStates, setCardStates] = useState<{ [key: number]: boolean }>({}); //implement later 
 
  const [scope, animate] = useAnimate();

  const cards = [
    {
      quarter: "Fall",
      week: "Week 1",
      date: "Friday 7 Jan 2025",
      title: "Team Pitches",
      description: "Team leads will pitch their ideas to general members.",
    },
    {
      quarter: "Fall",
      week: "Week 2",
      date: "Friday 14 Jan 2025",
      title: "SRS stuff 2",
      description: "they do srs stuff week 2",
    },
    {
      quarter: "Winter",
      week: "Week 3",
      date: "Friday 21 Jan 2025",
      title: "SRS stuff 3",
      description: "They do srs stuff week 3",
    },
    {
      quarter: "Spring",
      week: "Week 4",
      date: "Friday 28 Jan 2025",
      title: "SRS stuff week 4",
      description: "They do SRS stuff week 4",
    },
    {
      quarter: "Spring",
      week: "Week 5",
      date: "Friday 4 Feb 2025",
      title: "SRS stuff week 5",
      description: "I'm so tired of writing stuff",
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };
  const visibleCount = 5;

    return (
      <Container
            maxWidth= "lg"
            sx={(theme) => ({
                scrollSnapAlign: "start",
                width: "100%",
                   
            })}
          >
            <Stack gap={4}>
              <Typography
                variant="display2"
                className="community__section"
                
              >
                Student Run Studios
              </Typography>
              <Typography
                variant = "display1
                "
              >Each year, Studio splits into teams of students who work through the winter and spring quarters to put together an indie game. Students can apply to be team leads to pitch their idea to the club and have people join them to bring their game concept into reality! 
              </Typography>

              <Typography >
              Last year, we had over 100 students collaborate to make 11 finished games, all of which you can play on the official itch.io site!              
              </Typography>
              <Button
                   variant = "outlined"
                  
                   href = "https://itch.io/c/4447548/students-run-studios-2024"
              >
                   See the 2024 entries on itch.io!

            </Button>
            <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "1200px", 
        margin: "0 auto",
        overflow: "hidden", 
      }}
    >
      {/* Carousel Wrapper */}
      <Box
        sx={{
          display: "flex",
          transition: "transform 0.5s ease-in-out",
          transform: `translateX(${-currentIndex * (100 / visibleCount)}%)`,
          gap: 3, 
        }}
      >
        {cards.map((card, index) => (
          <Box
            key={index}
            sx={{
              flex: `0 0 ${100 / visibleCount}%`, // Each card takes up 1/visibleCount of the width
              boxSizing: "border-box",
              textAlign: "center",
              padding: 2,
              position: "relative", 
            }}
          >
            <Card
              sx={{
                height: "200px", 
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: 3,
                padding: 2,
                border: "1px solid pink",
                background: "FF4466",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {card.quarter} {card.week}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.date}
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {card.title}
              </Typography>
              <Typography variant="body2">{card.description}</Typography>
            </Card>

            
            {index < cards.length - 1 && (
              <Typography
                sx={{
                  position: "absolute",
                  right: "-20px", 
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "1.5rem",
                  color: "gray",
                }}
              >
                →
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      {/* Navigation Buttons */}
      <Button
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          background: "clear",
          color: "white",
          borderRadius: "30%",
          "&:hover": { background: "gray" },
          zIndex: 1,
        }}
      >
        &#8592;
      </Button>
      <Button
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          background: "gray",
          color: "white",
          borderRadius: "30%",
          "&:hover": { background: "gray" },
          zIndex: 1,
        }}
      >
        &#8594;
      </Button>
    </Box>


    <Typography
                variant="display2"
                className="community__section"
                
              >
                Current Cycle (2025)
    </Typography>  

    <Typography>Meet our teams this year! 
              </Typography>          

    </Stack>


    </Container>
      
    );
  }
  