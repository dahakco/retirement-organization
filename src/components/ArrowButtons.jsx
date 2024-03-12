// library imports
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { Button } from "react-bootstrap";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  addItemsDataById,
  removeItemsDataById,
  addGroupItemsDataById,
  removeGroupItemsDataById,
} from "../slices/userReqSlice";

function ArrowButtons() {
  const { itemInfo, groupItemInfo } = useSelector((state) => state.userReq);
  const dispatch = useDispatch();

  const rightToLeftHandler = async (id) => {
    dispatch(removeItemsDataById(id));
    dispatch(addGroupItemsDataById(itemInfo));
  };

  const leftToRighthandler = async (id) => {
    dispatch(removeGroupItemsDataById(id));
    dispatch(addItemsDataById(groupItemInfo));
  };

  return (
    <div className="dashboard__body--buttomGrid-arrows">
      <Button
        variant="outline-primary"
        onClick={() => rightToLeftHandler(itemInfo._id)}
      >
        <KeyboardDoubleArrowLeft />
      </Button>
      <Button
        variant="outline-primary"
        onClick={() => leftToRighthandler(groupItemInfo._id)}
      >
        <KeyboardDoubleArrowRight />
      </Button>
    </div>
  );
}

export default ArrowButtons;