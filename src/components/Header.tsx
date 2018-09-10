import AppBar from '@material-ui/core/AppBar/AppBar'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import Typography from '@material-ui/core/Typography/Typography'
import * as React from 'react'
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles'

const styles: any = (theme: any) => ({
  appBar: {
    position: 'relative'
  }
})

export const Header = withStyles(styles)(function({classes}: WithStyles<typeof styles>) {
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="title" color="inherit" noWrap>
          Kedvenc receptek
        </Typography>
      </Toolbar>
    </AppBar>
  )
})
