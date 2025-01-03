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

  import ucloveImage from "../assets/images/uclove.png";
 
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
  const src = ucloveImage;
  
  export type SRSHomeProps = {};

  export type TeamBoxProps = {
    name: string, 
    description: string, 
    image: string, 
    link: string, 
    path: string,
  };



  export default function SRSInfo(props: TeamBoxProps) {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [hovering, setHovering] = React.useState(false);
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

  const teams = [
    {
      link: "", 
      path: "",
      image: ucloveImage,
      name: "Psychosis",
      members: "Aubrey Clark, Harry Hinmann, Rachel Jin",
      description: "Psychosis is a shooter hitman game where you a random civilian taking hits seen from advertisements on social media, where you go through levels under the influence of game changing drugs and use the money you get from hits to buy stranger drugs and better equipment"
      
    },
    {
      link: "", 
      path: "",
      image: ucloveImage,
      name: "Team Name TBD",
      members: "Oscar, Branden, Lea",
      description: "Genre: turn-based strategy RPG, Theme: Commentary of the modern world that expects everyone to fit in, Gameplay: turn-based strategy combat focusing on character synnergies and action commands",
    },
    
    {
      path: "",
      link: "",
      image: ucloveImage,
      name: "Team name also TBD",
      members: "Lea",
      description: "Themed around agents/spies as you take the position as a former top agent turned handler/mission control of a squad of 4 spies! It's main focus will be on choices and puzzles that determine mission success with a good amount of attention given to the 4 main interests and their story/romance routes over a series of missions. I'm also learning the basics to make it a chatsim / like those discord sim games!",
    },
    {

      link: "", 
      path: "",
      image: ucloveImage,
      name: "Faithless",
      members: "Marissa, Miles",
      description: "Faithless is a 3D FPS and/or 2.5D fighting game about bounty hunters from different factions that are commissioned to fight mobs on an abandoned continent, where you, the clairvoyant MC, discover your abilities, befriend and fight members of factions on the urban continent (2.5D), and attack and shoot mobs on the abandoned continent (3D)",
    },
    {
      link: "", 
      path: "",
      image: ucloveImage,
      name: "Novel Normal",
      members: "Rajana, Alani",
      description: "Novel Normal is a top-down, 2D RPG game where you play as an adolescent teenager trapped in a time loop of a scene from their favorite novel written by a mysterious author who passed away before finishing the final manuscript—one where the main character reconnects with their estranged father. Collect pages to progress the author’s untold story, bear the woes of being a father’s daughter, and escape the loop before you become mere ink on printed paper.",
    },
    {
      link: "", 
      path: "",
      image: ucloveImage,
      name: "The Leviathan's Cradle",
      members: "Rajana, Alani",
      description: "The Leviathan's Cradle is a time and turn based Japanese-styled RPG about the titular leviathan, last of her kind, trying to learn more about the extinction event through archaeology or mystical means, where you can play as the leviathan or her many friends and allies on their individual turns to combat and gain the initiative over the fielded enemy who use separate turn systems ",
    },
    {
      link: "", 
      path: "",
      image: ucloveImage,
      name: "Couch vs Multiplayer game",
      members: "Rahul, Josh",
      description: "My game is a couch vs multiplayer game, taking inspiration from games like Mario Kart and Overcooked to amp up the yelling-at-your-friends experience to 11, with gameplay like towerfall and super smash bros but much more chaotic.",
    },
    {
      link: "", 
      path: "",
      image: ucloveImage,
      name: "Crybaby",
      members: "Rajana, Alani",
      description: "Crybaby is a rhythm game about the ups and down of life and the tears we shed at our saddest and happiest moments. Your goal as the player is to try and stop the tears from overflowing while learning that maybe its okay to let it all out.",
    },
    {
      link: "", 
      path: "",
      image: ucloveImage,
      name: "Team Novel Normal",
      members: "Aderyn, Woyu",
      description: "Crybaby is a rhythm game about the ups and down of life and the tears we shed at our saddest and happiest moments. Your goal as the player is to try and stop the tears from overflowing while learning that maybe its okay to let it all out.",
    },

    // const handleClick = (team) => {
    //   if (team.path) {
    //     navigate(team.path);
    //   }
    //   else if (team.link) { 
    //     window.open(team.link, "_blank");
    //   }
    // }
    
    
  ];

    return (
      <Container
            maxWidth= "lg"
            sx={{
                scrollSnapAlign: "start",
                width: "100%",
                   
            }}
          >
            <Stack gap={4}>
              <Typography
                variant="display2"
                className="community__section"
                
              >
                Student Run Studios
              </Typography>
              <Typography
                
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
              <Typography fontWeight="bold">
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
      <Box
        onMouseEnter= {()=> setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        sx={{
          marginTop: 4,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          gap: 3,
          
        }}
      >
        {teams.map((team, index) => (
          <Card
            key={index}
            sx={{
              position: "relative", 
              minWidth: "500px",
              maxWidth: "500px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid pink",
              gap: 2,
              overflow: "hidden", 
              backgroundColor: "rgba(255, 248, 248, 0.5)",
              transition: "all 0.3s ease-in-out", 
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.5)", 
                transform: "scale(1.05)", 
              },
              
            }}
          >
            
            <img 
              src={team.image.src} 
              
              style={{ 
              width: '440px', 
              height: '300px',  
              borderRadius: '10%' 
          
              }} />
            <Typography fontWeight="bold">
              {team.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Members: {team.members}
            </Typography>
            <Typography variant="body1">{team.description}</Typography>

            <Box
                // onClick={handleNext}
                sx={{
                  position: "absolute", 
                  top: "50%", 
                  left: "50%", 
                  transform: "translate(-50%, -50%)",
                  
                  opacity: 0, 
                  transition: "opacity 0.3s ease-in-out", 
                  
                  "&:hover": {
                    opacity: 1, 
                  },
                }}

            >
              <Button
               
                sx={{
                  opacity: 1,
                  width: "500px",
                  height: "500px",
                  color: "white",
                  backgroundColor: "rgba(255, 255, 255, 0)",
                }}
                
                onClick={() => {
                  if (team.link) {
                    window.open(team.link, "_blank");
                  } else if (team.path) {
                    // navigate(team.path);
                  }
              }}
              >
                See Team

              </Button>

            </Box>
          </Card>
        ))}
      </Box>
      
    </Stack>
   
    </Container>
      
    );
  }
  