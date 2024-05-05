import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import NextLink from 'next/link';

type Props = {
  title: string;
  url: string;
  statement: string;
}

export default function BlogCard({ title, url, statement }: Props) {
  const distination: string = "/articles/" + url;
  return (
    <Grid item xs={3} mb={3} sx={{ height: 200 }}>
      <Card sx={{ height: 200 }}>
        <CardContent sx={{ height: 110 }}>
          <Typography gutterBottom variant='h6' component="div">{title}</Typography>
          <Typography variant='body2' color="text.secondary">{statement}</Typography>
        </CardContent>
        <CardActions>
          <Button href={distination} component={NextLink} size="small">read</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
