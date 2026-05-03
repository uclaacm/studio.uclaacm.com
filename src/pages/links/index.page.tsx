'use client'
import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Link,
  Stack,
  Chip,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import InstagramIcon from '@mui/icons-material/Instagram'
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Metadata from '~/components/Metadata'
import { getBannerLinks, NotionBannerLinksSchema } from '~/api/notion/schema'
import { GetStaticProps } from 'next'
import { REVALIDATE_INTERVAL } from '~/Env'

export type LinksPageProps = {
  links: NotionBannerLinksSchema[]
}

export const getStaticProps: GetStaticProps<LinksPageProps> = async () => {
  const links = await getBannerLinks()
  return {
    props: { links },
    revalidate: REVALIDATE_INTERVAL,
  }
}

const DiscordIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 71 55"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" />
  </svg>
)

// Static social/community links (from Banner's linksRow2)
const socialLinks = [
  {
    text: 'Discord',
    href: 'https://discord.gg/bBk2Mcw',
    icon: <DiscordIcon />,
    category: 'Community',
  },
  {
    text: 'Game Jam Discord',
    href: 'https://discord.gg/5D9MB3CfqB',
    icon: <DiscordIcon />,
    category: 'Community',
  },
  {
    text: 'Instagram',
    href: 'https://www.instagram.com/acmstudio.ucla/',
    icon: <InstagramIcon sx={{ fontSize: '1rem' }} />,
    category: 'Social',
  },
  {
    text: 'Itch.io',
    href: 'https://acmstudio.itch.io/',
    icon: <VideogameAssetIcon sx={{ fontSize: '1rem' }} />,
    category: 'Games',
  },
  {
    text: 'Calendar',
    href: 'https://calendar.google.com/calendar/u/0?cid=Y183Mjl2dTV1MW9ia2c3bnU3NjJzaDY4N2JwOEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t',
    icon: <CalendarMonthIcon sx={{ fontSize: '1rem' }} />,
    category: 'Events',
  },
]



type LinkCardProps = {
  text: string
  href: string
  icon: React.ReactNode
  category?: string
  delay?: number
}

function LinkCard({ text, href, icon, category, delay = 0 }: LinkCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      underline="none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        px: 3,
        py: 2,
        borderRadius: 3,
        background: hovered
          ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(252,228,236,0.95) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(252,228,236,0.6) 100%)',
        border: hovered
          ? `2px solid ${theme.palette.primary.main}`
          : '2px solid rgba(216, 27, 96, 0.18)',
        boxShadow: hovered
          ? '0 8px 24px rgba(216, 27, 96, 0.18), 0 2px 8px rgba(0,0,0,0.06)'
          : '0 2px 8px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: theme.transitions.create(
          ['background', 'border-color', 'box-shadow', 'transform'],
          { duration: 220 }
        ),
        cursor: 'pointer',
        animationDelay: `${delay}ms`,
        animation: 'fadeSlideIn 0.4s ease both',
        '@keyframes fadeSlideIn': {
          from: { opacity: 0, transform: 'translateY(12px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      })}
    >
      {/* Left: icon + text */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            borderRadius: 2,
            background: hovered
              ? `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`
              : 'rgba(216, 27, 96, 0.1)',
            color: hovered ? '#fff' : theme.palette.primary.main,
            transition: theme.transitions.create(['background', 'color'], { duration: 220 }),
            flexShrink: 0,
          })}
        >
          {icon}
        </Box>
        <Box>
          <Typography
            sx={(theme) => ({
              fontWeight: 700,
              fontSize: { xs: '0.875rem', md: '1rem' },
              color: theme.palette.primary.main,
              lineHeight: 1.2,
            })}
          >
            {text}
          </Typography>
          {category && (
            <Typography
              sx={{
                fontSize: '0.7rem',
                color: '#ff69b4',
                fontWeight: 600,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                mt: 0.25,
              }}
            >
              {category}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Right: arrow */}
      <OpenInNewIcon
        sx={(theme) => ({
          fontSize: '1rem',
          color: hovered ? theme.palette.primary.main : 'rgba(216, 27, 96, 0.3)',
          transition: theme.transitions.create(['color', 'transform'], { duration: 220 }),
          transform: hovered ? 'translate(2px, -2px)' : 'none',
          flexShrink: 0,
        })}
      />
    </Link>
  )
}

export default function LinksPage({ links }: LinksPageProps) {
  return (
    <>
      <Metadata title="Links" />

      {/* Full-width banner header */}
      <Box
        sx={(theme) => ({
          position: 'relative',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 4, md: 5 },
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #fdf4f7 0%, #f9f3fc 50%, #fdf4f7 100%)',
          borderBottom: '2px solid rgba(216, 27, 96, 0.12)',
          boxShadow: '0 2px 8px rgba(216, 27, 96, 0.05)',
          animation: 'fadeSlideIn 0.5s ease both',
          '@keyframes fadeSlideIn': {
            from: { opacity: 0, transform: 'translateY(-8px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '220px',
            backgroundImage: 'url("/images/banner/fractal_left.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.35,
            pointerEvents: 'none',
            display: { xs: 'none', sm: 'block' },
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '220px',
            backgroundImage: 'url("/images/banner/axolotl_right.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.35,
            pointerEvents: 'none',
          },
        })}
      >
        {/* Title centered over the images */}
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Box
            sx={{
              position: 'absolute',
              inset: '-20px',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(248,187,208,0.6) 0%, rgba(243,229,245,0.2) 70%, transparent 100%)',
              filter: 'blur(12px)',
              zIndex: 0,
            }}
          />
          <Typography
            component="h1"
            variant="display1"
            sx={(theme) => ({
              position: 'relative',
              zIndex: 1,
              color: theme.palette.primary.main,
              fontWeight: 900,
              letterSpacing: '-0.5px',
            })}
          >
            ACM Studio
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="sm" sx={{ py: { xs: 4, md: 5 } }}>
      {/* API-driven links (sign-up forms, events, etc.) */}
      {links.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={(theme) => ({
              fontWeight: 700,
              fontSize: '0.7rem',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: theme.palette.primary.main,
              mb: 1.5,
              pl: 0.5,
            })}
          >
            📋 Sign Ups & Events
          </Typography>
          <Stack gap={1.5}>
            {links.map((link, i) => (
              <LinkCard
                key={i}
                text={link.text}
                href={link.url}
                icon={<EditIcon sx={{ fontSize: '1rem' }} />}
                category="Sign Up"
                delay={i * 60}
              />
            ))}
          </Stack>
        </Box>
      )}

      {/* Static social links */}
      <Box>
        <Typography
          sx={(theme) => ({
            fontWeight: 700,
            fontSize: '0.7rem',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: theme.palette.primary.main,
            mb: 1.5,
            pl: 0.5,
          })}
        >
          🌐 Find Us Online
        </Typography>
        <Stack gap={1.5}>
          {socialLinks.map((link, i) => (
            <LinkCard
              key={link.text}
              text={link.text}
              href={link.href}
              icon={link.icon}
              category={link.category}
              delay={(links.length + i) * 60}
            />
          ))}
        </Stack>
      </Box>

      {/* Footer decoration */}
      <Box
        sx={{
          mt: 6,
          textAlign: 'center',
          opacity: 0.4,
        }}
      >
        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
          © ACM Studio @ UCLA
        </Typography>
      </Box>
    </Container>
    </>
  )
}