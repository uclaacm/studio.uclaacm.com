'use client'
import React, { useState } from 'react'
import { Box, IconButton, Link, Typography, Divider } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import InstagramIcon from '@mui/icons-material/Instagram'
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { getBannerLinks, NotionBannerLinksSchema } from '~/api/notion/schema'
import { GetStaticProps } from "next";
import { REVALIDATE_INTERVAL } from "~/Env";



export type BannerProps = {
  links: NotionBannerLinksSchema[];
};


export default function Banner(props: BannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  /*const linksRow1 = [
    {
      text: 'SRS Signup Form',
      href: 'https://forms.gle/4crduK38zV62n52n8',
      icon: <EditIcon sx={{ fontSize: '1rem' }} />
    },
    {
      text: 'VR Workshop RSVP',
      href: 'https://forms.gle/sEWCKc8NT1uuGkup9',
      icon: <SportsEsportsIcon sx={{ fontSize: '1rem' }} />
    },
  ]*/

  const {links} = props;

  const DiscordIcon = () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 71 55"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" />
    </svg>
  )

  const linksRow2 = [
    {
      text: 'Discord',
      href: 'https://discord.gg/bBk2Mcw',
      icon: <DiscordIcon />
    },
    {
      text: 'Game Jam Discord',
      href: 'https://discord.gg/5D9MB3CfqB',
      icon: <DiscordIcon />
    },
    {
      text: 'Instagram',
      href: 'https://www.instagram.com/acmstudio.ucla/',
      icon: <InstagramIcon sx={{ fontSize: '0.9rem' }} />
    },
    {
      text: 'Itch.io',
      href: 'https://acmstudio.itch.io/',
      icon: <VideogameAssetIcon sx={{ fontSize: '0.9rem' }} />
    },
    {
      text: 'Calendar',
      href: 'https://calendar.google.com/calendar/u/0?cid=Y183Mjl2dTV1MW9ia2c3bnU3NjJzaDY4N2JwOEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t',
      icon: <CalendarMonthIcon sx={{ fontSize: '0.9rem' }} />
    },
  ]

  // Load banner state on mount
  React.useEffect(() => {
    const loadBannerState = () => {
      try {
        const savedData = localStorage.getItem('banner-closed')
        if (savedData) {
          const parsedData = JSON.parse(savedData)
          const minutesSinceClosed = (Date.now() - parsedData.timestamp) / (1000 * 60)
          
          if (minutesSinceClosed > 10) {
            setIsVisible(true)
          } else {
            setIsVisible(false)
          }
        }
      } catch (error) {
        console.log('No saved banner state')
      } finally {
        setIsLoading(false)
      }
    }
    loadBannerState()
  }, [])

  const handleReopen = () => {
    setIsVisible(true)
    try {
      localStorage.removeItem('banner-closed')
    } catch (error) {
      console.error('Failed to remove banner state:', error)
    }
  }

  if (isLoading) return null

  // Reopen button when banner is closed
  if (!isVisible) {
    return (
      <Box
        sx={(theme) => ({
          position: 'fixed',
          top: 8,
          right: 8,
          zIndex: { xs: theme.zIndex.drawer - 10, md: theme.zIndex.drawer - 3 },
        })}
      >
        <IconButton
          onClick={handleReopen}
          sx={(theme) => ({
            width: 32,
            height: 32,
            bgcolor: 'rgba(248, 187, 208, 0.9)',
            border: '2px solid #d81b60',
            borderRadius: 2,
            transition: theme.transitions.create(['background-color', 'transform', 'border-color'], {
              duration: theme.transitions.duration.standard,
            }),
            '&:hover': {
              bgcolor: '#f48fb1',
              borderColor: '#c2185b',
              boxShadow: 2,
              transform: 'scale(1.1)',
            },
          })}
          aria-label="Reopen banner"
        >
          <KeyboardArrowDownIcon sx={{ width: 20, height: 20, color: '#d81b60' }} />
        </IconButton>
      </Box>
    )
  }

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={(theme) => ({
        position: 'fixed',
        top: 0,
        left: { xs: 0, md: 68 },
        right: 0,
        zIndex: { xs: theme.zIndex.drawer - 10, md: theme.zIndex.drawer - 3 },
        background: 'linear-gradient(135deg, #fce4ec 0%, #f3e5f5 50%, #fce4ec 100%)',
        borderBottom: '2px solid #f8bbd0',
        boxShadow: isHovered ? '0 4px 12px rgba(216, 27, 96, 0.15)' : '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        maxHeight: isHovered ? '200px' : '78px',
        transition: theme.transitions.create(['max-height', 'box-shadow'], {
          duration: 500,
          easing: isHovered ? theme.transitions.easing.easeOut : theme.transitions.easing.easeInOut,
        }),
        cursor: isHovered ? 'default' : 'pointer',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 70,
          top: 0,
          bottom: 0,
          width: '200px',
          backgroundImage: 'url("/images/banner/fractal_left.png")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: isHovered ? 0.5 : 0.3,
          transition: theme.transitions.create(['opacity'], {
            duration: 500,
          }),
          pointerEvents: 'none',
          display: { xs: 'none', md: 'block' },
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '200px',
          backgroundImage: 'url("/images/banner/axolotl_right.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: isHovered ? 0.5 : 0.3,
          transition: theme.transitions.create(['opacity'], {
            duration: 500,
          }),
          pointerEvents: 'none',
        },
      })}
    >
      <Box
        sx={{
          position: 'relative',
          maxWidth: '100%',
          mx: 'auto',
          px: 2,
          pt: 1,
          pb: isHovered ? 1.5 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'padding 0.5s ease-out',
          zIndex: 1,
        }}
      >
        <Box sx={{ textAlign: 'center', m: 0, p: 0 }}>
          <Typography
            sx={(theme) => ({
              color: theme.palette.primary.main,
              fontWeight: 'bold',
              fontSize: { xs: '0.75rem', md: '0.875rem' },
              m: 0,
              p: 0,
              lineHeight: 1.4,
              letterSpacing: '0.3px',
            })}
          >
            Join ACM Studio!
          </Typography>

          {/* Tagline - always visible */}
          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.65rem', md: '0.75rem' },
              lineHeight: 1.3,
              fontStyle: 'italic',
              mt: 0.25,
            }}
          >
            Keep up to date with all our latest events.
          </Typography>

          {/* Hover indicator - disappears when expanded */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 0,
              opacity: isHovered ? 0 : 1,
              maxHeight: isHovered ? '0' : '16px',
              overflow: 'visible',
              transition: 'opacity 0.3s ease-in-out, max-height 0.3s ease-in-out',
            }}
          >
            <KeyboardArrowDownIcon
              sx={(theme) => ({
                fontSize: '1rem',
                color: theme.palette.primary.main,
                animation: 'bounce 2s infinite',
                '@keyframes bounce': {
                  '0%, 100%': {
                    transform: 'translateY(0)',
                  },
                  '50%': {
                    transform: 'translateY(3px)',
                  },
                },
              })}
            />
          </Box>

          {/* Expanded content */}
          <Box
            sx={{
              opacity: isHovered ? 1 : 0,
              maxHeight: isHovered ? '150px' : '0',
              overflow: 'visible',
              transition: isHovered 
                ? 'opacity 0.3s ease-out 0.05s, max-height 0.5s ease-out'
                : 'opacity 0.3s ease-in 0.1s, max-height 0.5s ease-in-out',
              mt: isHovered ? 1 : 0,
            }}
          >
            <Box sx={{ mb: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                {links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url}
                    sx={(theme) => ({
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.5,
                      textDecoration: 'none',
                      color: theme.palette.primary.main,
                      fontSize: { xs: '0.7rem', md: '0.8rem' },
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.6)',
                      border: '1.5px solid rgba(216, 27, 96, 0.2)',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.9)',
                        borderColor: theme.palette.primary.main,
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 8px rgba(216, 27, 96, 0.2)',
                      },
                    })}
                  >
                    {<EditIcon sx={{ fontSize: '1rem' }} />}
                    <span>{link.text}</span>
                  </Link>
                ))}
              </Box>
            </Box>

            <Divider 
              sx={{ 
                my: 0.75, 
                borderColor: 'rgba(216, 27, 96, 0.15)',
                width: '80%',
                mx: 'auto',
              }} 
            />

            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                {linksRow2.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    sx={(theme) => ({
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.4,
                      textDecoration: 'none',
                      color: theme.palette.primary.main,
                      fontSize: { xs: '0.65rem', md: '0.75rem' },
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.5)',
                      border: '1.5px solid rgba(216, 27, 96, 0.15)',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.85)',
                        borderColor: theme.palette.primary.main,
                        transform: 'translateY(-1px)',
                        boxShadow: '0 3px 6px rgba(216, 27, 96, 0.15)',
                      },
                    })}
                  >
                    {link.icon}
                    <span>{link.text}</span>
                  </Link>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        <IconButton
          onClick={() => {
            setIsVisible(false)
            try {
              localStorage.setItem('banner-closed', JSON.stringify({
                timestamp: Date.now()
              }))
            } catch (error) {
              console.error('Failed to save banner state:', error)
            }
          }}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            width: 20,
            height: 20,
            bgcolor: 'rgba(248, 187, 208, 0.8)',
            border: '2px solid #d81b60',
            borderRadius: 2,
            transition: theme.transitions.create(['top', 'background-color', 'transform', 'border-color'], {
              duration: theme.transitions.duration.standard,
              easing: theme.transitions.easing.easeInOut,
            }),
            '&:hover': {
              bgcolor: '#f48fb1',
              borderColor: '#c2185b',
              boxShadow: 2,
              transform: 'rotate(90deg)',
            },
          })}
          aria-label="Close banner"
        >
          <CloseIcon sx={{ width: 14, height: 14, color: '#d81b60' }} />
        </IconButton>
      </Box>
    </Box>
  )
}