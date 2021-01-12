import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

const useStyles:any = makeStyles({
    root: {
        color: "white",
        background: "#5aac44",
    }
  });
  

export const TrelloButton = ({ children, onClick }) => {
    const classes = useStyles();
  return (
    <Button
        variant="contained"
            classes={{
            root:classes.root
        }}
        onMouseDown={onClick}
    >{children}</Button>
  );
};

