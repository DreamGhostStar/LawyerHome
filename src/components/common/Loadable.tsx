import L from "react-loadable";
import Loading from "./Loading";

const Loadable = (props: any) =>
  L({
    loading: Loading,
    delay: 300,
    timeout: 30000,
    ...props,
  });

export default Loadable;