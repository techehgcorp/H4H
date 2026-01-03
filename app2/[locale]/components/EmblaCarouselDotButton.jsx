import React from 'react';

export const DotButton = ({ selected, onClick, className }) => (
  <button
    className={`${className} transition-colors duration-300 ease-in-out`}
    type='button'
    onClick={onClick}
  />
);

export const useDotButton = (emblaApi) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState([]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  React.useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, setScrollSnaps, onSelect]);

  const onDotButtonClick = (index) => emblaApi.scrollTo(index);

  return { selectedIndex, scrollSnaps, onDotButtonClick };
};
