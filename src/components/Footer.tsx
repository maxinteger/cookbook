import * as React from 'react'
import Typography from '@material-ui/core/Typography/Typography'
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles'

const styles: any = (theme: any) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6
  }
})

export const Footer = withStyles(styles)(function({ classes }: WithStyles<typeof styles>) {
  return (
    <footer className={classes.footer}>
      <Typography variant="title" align="center" gutterBottom>
        Footer
      </Typography>
      <Typography variant="subheading" align="center" color="textSecondary" component="p">
        Something here to give the footer a purpose!
      </Typography>
    </footer>
  )
})
