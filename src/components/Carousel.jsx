import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Howl } from 'howler';
import Icon from './Icon';
import { useIsMobile } from '../hooks/useIsMobile';

const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.textMuted};
  border-radius: 24px;
  padding: 16px;
  --outer-r: 24px;
  --p-distance: 12px;

  &.round {
    border: 1px solid ${({ theme }) => theme.textMuted};
  }
`;

const CarouselTrack = styled(motion.div)`
  display: flex;
`;

const CarouselItem = styled(motion.div)`
  position: relative;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.textMuted};
  border-radius: calc(var(--outer-r) - var(--p-distance));
  background-color: ${(props) => props.$backgroundColor};
  overflow: hidden;
  cursor: grab;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 0 0 4px ${(props) => props.$backgroundColor};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    mix-blend-mode: multiply;
    opacity: 0.05;
    pointer-events: none;
  }

  &:active {
    cursor: grabbing;
  }

  &.round {
    background-color: ${(props) => props.$backgroundColor};
    position: relative;
    bottom: 0.1em;
    border: 1px solid ${({ theme }) => theme.textMuted};
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const CarouselItemHeader = styled.div`
  margin-bottom: 16px;
  padding: 20px;
  padding-top: 20px;

  &.round {
    padding: 0;
    margin: 0;
  }
`;

const CarouselIconContainer = styled.span`
  display: flex;
  height: 28px;
  width: 28px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);

  .carousel-icon {
    height: 16px;
    width: 16px;
    color: #fff;
  }
`;

const CarouselItemContent = styled.div`
  padding: 20px;
  padding-bottom: 20px;
`;

const CarouselItemTitle = styled.div`
  margin-bottom: 4px;
  font-family: 'Playfair Display', serif;
  font-weight: 900;
  font-size: 22px;
  color: #fff;
`;

const CarouselItemDescription = styled.p`
  font-size: 14px;
  color: #fff;
`;

const CarouselIndicatorsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  &.round {
    position: absolute;
    z-index: 2;
    bottom: 3em;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const CarouselIndicators = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const CarouselIndicator = styled.button`
  height: 8px;
  width: 8px;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${({ theme }) => theme.textMuted};
  border: none;
  padding: 0;
  position: relative;
`;

const ActiveIndicatorPill = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.text};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

const clickSound = new Howl({
  src: ['data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhFAAAAAgAAAD//w=='],
});

export default function Carousel({
  items = [],
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  round = false
}) {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  const containerRef = useRef(null);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % items.length);
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, items.length, pauseOnHover]);

  useEffect(() => {
    if (isMobile && navigator.vibrate) {
      navigator.vibrate(50);
    }
    clickSound.play();
  }, [currentIndex, isMobile]);

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      setCurrentIndex(prev => Math.min(prev + 1, items.length - 1));
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    }
  };

  return (
    <CarouselContainer
      ref={containerRef}
      className={round ? 'round' : ''}
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px`, borderRadius: '50%' })
      }}
    >
      <CarouselTrack
        drag="x"
        dragConstraints={{
          left: -trackItemOffset * (items.length - 1),
          right: 0
        }}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          x
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={SPRING_OPTIONS}
      >
        {items.map((item, index) => {
          return (
            <StyledLink to={`/departments/${item.slug}`} key={index}>
              <CarouselItem
                className={round ? 'round' : ''}
                style={{
                  width: itemWidth,
                  height: round ? itemWidth : '100%',
                  ...(round && { borderRadius: '50%' })
                }}
                $backgroundColor={item.backgroundColor}
              >
                <CarouselItemHeader className={round ? 'round' : ''}>
                  <CarouselIconContainer><Icon name={item.icon} className="carousel-icon" /></CarouselIconContainer>
                </CarouselItemHeader>
                <CarouselItemContent>
                  <CarouselItemTitle>{item.name}</CarouselItemTitle>
                  <CarouselItemDescription></CarouselItemDescription>
                </CarouselItemContent>
              </CarouselItem>
            </StyledLink>
          );
        })}
      </CarouselTrack>
      <CarouselIndicatorsContainer className={round ? 'round' : ''}>
        <CarouselIndicators>
          {items.map((_, index) => (
            <CarouselIndicator
              key={index}
              onClick={() => setCurrentIndex(index)}
            >
              {currentIndex === index && (
                <ActiveIndicatorPill layoutId="active-indicator" />
              )}
            </CarouselIndicator>
          ))}
        </CarouselIndicators>
      </CarouselIndicatorsContainer>
    </CarouselContainer>
  );
}
