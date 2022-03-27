import { Fragment, PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FormSectionConfig } from '../formSectionBuilder';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import { ArrowDropUp } from '@mui/icons-material';

const defaultHrStyles = {
  marginTop: '15px',
  marginBottom: '15px',
  borderBottomWidth: '2px',
};

const headerStyles = {
  position: 'relative',
};
const contentWrapperStyles = {
  transition: 'max-height 0.5s',
};

export function FormSection(props: PropsWithChildren<FormSectionConfig>): JSX.Element {
  const { styles, heading, shrinkable, withDivider, children, component } = props;
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [initialWrapperHeight, setInitialWrapperHeight] = useState<number | null>(null);
  const onCollapseClick = useCallback(() => {
    if (shrinkable) {
      setIsOpen(!isOpen);
    }
  }, [isOpen]);
  const dropDownIconStyles = useMemo(() => ({
    position: 'absolute',
    right: 0,
    top: '-5px',
    transition: 'transform 0.5s',
    ...(isOpen && { transform: 'rotate(180deg)' })
  }), [isOpen]);
  const wrapperStyles = useMemo(() => ({
    paddingLeft: '40px',
    paddingRight: '40px',
    overflow: 'hidden',
    ...(styles || {}),
  }), [styles]);

  useEffect(() => {
    if (contentWrapperRef?.current) {
      const height = initialWrapperHeight ?? contentWrapperRef.current.offsetHeight;

      if (initialWrapperHeight === null) {
        setInitialWrapperHeight(height);
      }

      requestAnimationFrame(() => {
        const wrapper = contentWrapperRef.current!;

        wrapper.style.maxHeight = `${isOpen ? height : 0}px`;

        if (isOpen) {
          wrapper.style.visibility = 'visible';
        } else {
          wrapper.addEventListener('transitionend', () => {
            wrapper.style.visibility = 'hidden';
          }, { once: true });
        }
      });
    }
  }, [isOpen]);

  return (
    <Fragment>
      <Box
        component={component || 'section'}
        sx={wrapperStyles}
      >
        { heading && (
          <Box component="header" sx={headerStyles}>
            <Typography textAlign="center" variant="h6" component="h3" gutterBottom={true}>{heading}</Typography>
            {
              shrinkable &&
              <IconButton sx={dropDownIconStyles} onClick={onCollapseClick}>
                <ArrowDropUp/>
              </IconButton>
            }
          </Box>
        )}
        <Box sx={contentWrapperStyles} ref={contentWrapperRef}>
          {children}
        </Box>
      </Box>
      { withDivider ? <Divider sx={defaultHrStyles}/> : null}
    </Fragment>
  );
}
