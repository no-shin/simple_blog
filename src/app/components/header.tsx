import { Button, Box, AppBar, Toolbar, Link as MuiLink, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NextLink from 'next/link';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1, mb: 3 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <MuiLink component={NextLink} href="/" underline="none" color="white" variant="h6" sx={{ flexGrow: 1 }}>
            {"Simple Blog"}
          </MuiLink>
          <Button component={NextLink} color="inherit" href="login">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>

  );
}
