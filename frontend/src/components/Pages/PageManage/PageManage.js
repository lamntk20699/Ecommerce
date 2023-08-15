// import Header from "../../module-common/Header/Header";
import PageManages from "../../module-common/PageManage/PageManage";
function PageManage({ type }) {
  return (
    <>
      {/* <Header></Header> */}
      <PageManages types={type}></PageManages>
    </>
  );
}

export default PageManage;
