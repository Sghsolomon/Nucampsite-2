import { useSelector, useDispatch } from "react-redux";
import { Button, Col } from "reactstrap";
import { selectCommentsByCampsiteId } from "./commentsSlice";
import { clearPostError } from "./commentsSlice";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const CommentsList = ({ campsiteId }) => {
  const dispatch = useDispatch();
  const comments = useSelector(selectCommentsByCampsiteId(campsiteId));

  const isLoading = useSelector((state) => {
    return state.comments.isLoading;
  });

  const errMsg = useSelector((state) => {
    return state.comments.errMsg;
  });

  const postLoading = useSelector((state) => state.comments.postLoading);
  const postError = useSelector((state) => {
    return state.comments.postError;
  });
  let content = null;

  if (isLoading) {
    content = <Loading />;
  } else if (postLoading) {
    content = <Loading />;
  } else if (errMsg) {
    content = <Error errMsg={errMsg} />;
  } else if (postError) {
    content = (
      <Col>
        <Error errMsg={postError} />
        <Button
          color="primary"
          onClick={() => {
            dispatch(clearPostError());
          }}
        >
          Ok
        </Button>
      </Col>
    );
  } else if (comments && comments.length > 0) {
    content = (
      <Col md="5" className="m-1">
        <h4>Comments</h4>
        {comments.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
        <CommentForm campsiteId={campsiteId}></CommentForm>
      </Col>
    );
  } else {
    content = (
      <Col md="5" className="m-1">
        There are no comments for this campsite yet.
      </Col>
    );
  }
  return content;
};

export default CommentsList;
