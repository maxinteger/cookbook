import AppBar from '@material-ui/core/AppBar/AppBar'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import Typography from '@material-ui/core/Typography/Typography'
import * as React from 'react'
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer/Drawer'
import List from '@material-ui/core/List/List'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon'
import AllInboxIcon from '@material-ui/icons/AllInbox'
import ListIcon from '@material-ui/icons/List'
import {pipe} from 'ramda'
import {RouteComponentProps, withRouter} from 'react-router'

interface Props extends WithStyles<typeof styles>, RouteComponentProps<{}> {}

interface State {
  drawer: boolean
}

const styles: any = (theme: any) => ({
  appBar: {
    position: 'relative'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
})

export const Header = pipe(
  withRouter,
  withStyles(styles)
)(
  class extends React.Component<Props, State> {
    state = {
      drawer: false
    }

    private toggleDrawer = (open: boolean) => () => {
      this.setState({ drawer: open })
    }

    private goto = (path:string) => () => {
    	this.props.history.push(path)
		}

    render() {
      const { classes } = this.props

      return (
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={this.toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Kedvenc receptek
            </Typography>
          </Toolbar>
          {this.renderDrawer()}
        </AppBar>
      )
    }

    private renderDrawer() {
      const { drawer } = this.state
      return (
        <Drawer open={drawer} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            <List component="nav">
              <ListItem button onClick={this.goto('/')}>
                <ListItemIcon>
                  <AllInboxIcon />
                </ListItemIcon>
                <ListItemText primary="Receptek" />
              </ListItem>
              <ListItem button onClick={this.goto('/ingredient-types')}>
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Hozzávalók listája" />
              </ListItem>
            </List>
          </div>
        </Drawer>
      )
    }
  }
)
