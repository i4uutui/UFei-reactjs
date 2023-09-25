import { useEffect } from "react";

const ElementAuto = ( props ) => {
  // console.log(props);

  const { boxElement, formElement } = props.ele; 
  useEffect(() => {
    const bHeight = boxElement.current.offsetHeight;
    const fHeight = formElement.current.offsetHeight;

    props.handleTotal(bHeight - fHeight - 126);
  })
  

  return <>
    { props.children }
  </>
}

export default ElementAuto;