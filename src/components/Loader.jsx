import { ClipLoader } from "react-spinners"

const override ={
  display:'block',
  margin:'0 auto'
}
const Loader = ({color='blue',size='150'}) => {
  return (
    <div>
      <ClipLoader
        color={color}
        size={size}
        cssOverride={override}
        // cssOverride={override}
      />
    </div>
  )
}

export default Loader