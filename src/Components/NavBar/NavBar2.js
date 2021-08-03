import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from "react-router-dom"

const useStyles = makeStyles({
  list: {
    width: 230,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });
  // const preventDefault = (event) => event.preventDefault();
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor, event) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['WhitePaper', 'Equipe', 'RoadMap', 'Devenir prestataire', "Creation de l'offre"].map((text, index) => (
          <Link to={"/"+text} key={text} variant="body2">
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {['Service client/prestataire', 'Service client', 'CGV', 'Retour sur votre experience'].map((text, index) => (
          <Link to={"/"+text} key={text} variant="body2">
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <div onClick={toggleDrawer(anchor, true)}><MenuIcon /></div>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
 
}
