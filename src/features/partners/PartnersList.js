import { useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { selectAllPartners } from "./partnersSlice";
import Partner from "./Partner";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const PartnersList = () => {
  const partners = useSelector(selectAllPartners);
  const isLoading = useSelector((state) => state.partners.isLoading);
  const errMsg = useSelector((state) => state.partners.errMsg);

  if (isLoading) {
    return (
      <Row>
        <Loading />
      </Row>
    );
  }

  if (errMsg) {
    return (
      <Row>
        <Error errMsg={errMsg} />
      </Row>
    );
  }

  return (
    <Col className="mt-4">
      {partners.map((partner) => {
        return (
          <div sm="6" className="d-flex mb-5" key={partner.id}>
            <Partner partner={partner} />
          </div>
        );
      })}
    </Col>
  );
};
export default PartnersList;
