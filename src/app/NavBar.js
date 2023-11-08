'use client'
import { usePathname } from 'next/navigation'
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import AddSpot from './AddSpot';

export default function NavBar() {
  const pathname = usePathname();
  const links = [
    { path: '/', name: 'Home' }, 
  ];

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      { links.map(l => {
        const isActive = l.path === pathname;
        return (
          <Button component={Link}
                  href={l.path}
                  sx={{ my: 2, color: 'inherit', display: 'block', textDecoration: (isActive ? 'underline' : 'inherit') }}
                  key={l.path}
          >{l.name}</Button>
        )
      })}
      <AddSpot/>
    </Box>
  );
}