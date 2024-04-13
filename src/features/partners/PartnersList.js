import { Row } from "reactstrap";
import { selectAllPartners } from "./partnersSlice";
import Partner from "./Partner";

const Partners = () => {
  const partners = selectAllPartners();
  return (
    <Row className="ms-auto">
      {partners.map((partner, i) => {
        return (
          <div sm="6" className="d-flex mb-5" key={partner.id}>
            <Partner partner={partner} />
          </div>
        );
      })}
    </Row>
  );
};
export default Partners;
